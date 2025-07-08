import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import {
  GET_USER_PROFILE,
  GET_XP_PROGRESS,
  GET_AUDIT_STATS
} from '../graphql/queries/profile';

export interface UserStats {
  totalXP: number;
  level: number;
  auditRatio: number;
  projectStats: {
    total: number;
    completed: number;
    failed: number;
    inProgress: number;
  };
  skills: Array<{
    name: string;
    level: number;
  }>;
  recentProjects: Array<{
    name: string;
    status: string;
    score: number;
    date: string;
  }>;
}

export const useProfile = () => {
  const { data: profileData, loading: profileLoading, error: profileError } = useQuery(GET_USER_PROFILE);
  const { data: xpData, loading: xpLoading } = useQuery(GET_XP_PROGRESS);
  const { data: auditData, loading: auditLoading } = useQuery(GET_AUDIT_STATS);

  const loading = profileLoading || xpLoading || auditLoading;

  const stats: UserStats = useMemo(() => {
    if (!profileData?.user) {
      return {
        totalXP: 0,
        level: 0,
        auditRatio: 0,
        projectStats: {
          total: 0,
          completed: 0,
          failed: 0,
          inProgress: 0
        },
        skills: [],
        recentProjects: []
      };
    }

    // Calculate total XP
    const totalXP = profileData.user.transactions?.reduce((sum: number, t: any) => 
      sum + (t.amount || 0), 0) || 0;

    // Calculate level (example formula: level = floor(sqrt(xp/100)))
    const level = Math.floor(Math.sqrt(totalXP / 100));

    // Calculate audit ratio
    const audits = profileData.user.audits || [];
    const successfulAudits = audits.filter((a: any) => a.grade >= 1).length;
    const auditRatio = audits.length > 0 ? successfulAudits / audits.length : 0;

    // Calculate project statistics
    const projects = profileData.user.results || [];
    const projectStats = {
      total: projects.length,
      completed: projects.filter((p: any) => p.grade >= 1).length,
      failed: projects.filter((p: any) => p.grade < 1 && p.grade !== null).length,
      inProgress: projects.filter((p: any) => p.grade === null).length
    };

    // Extract skills from project paths
    const skillsMap = new Map();
    projects.forEach((p: any) => {
      const skill = p.path?.split('/')[2]; // Assuming path format: /user/skill/project
      if (skill) {
        const currentLevel = skillsMap.get(skill) || { count: 0, totalGrade: 0 };
        skillsMap.set(skill, {
          count: currentLevel.count + 1,
          totalGrade: currentLevel.totalGrade + (p.grade || 0)
        });
      }
    });

    const skills = Array.from(skillsMap.entries()).map(([name, data]: [string, any]) => ({
      name,
      level: Math.round((data.totalGrade / data.count) * 100) || 0
    }));

    // Get recent projects
    const recentProjects = projects
      .filter((p: any) => p.object?.type === 'project')
      .sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5)
      .map((p: any) => ({
        name: p.object?.name || 'Unknown Project',
        status: p.grade === null ? 'in_progress' : p.grade >= 1 ? 'completed' : 'failed',
        score: Math.round((p.grade || 0) * 100),
        date: format(parseISO(p.createdAt), 'yyyy-MM-dd')
      }));

    return {
      totalXP,
      level,
      auditRatio,
      projectStats,
      skills,
      recentProjects
    };
  }, [profileData]);

  // Format XP progress data for charts
  const xpProgressData = useMemo(() => {
    if (!xpData?.transaction) return [];
    
    return xpData.transaction.map((t: any, index: number) => ({
      x: index,
      y: t.amount,
      label: format(parseISO(t.createdAt), 'MMM dd'),
    }));
  }, [xpData]);

  // Format project pass/fail data for donut chart
  const projectRatioData = useMemo(() => {
    if (!stats.projectStats) return [];
    
    return [
      {
        x: 0,
        y: stats.projectStats.completed,
        label: 'Passed',
        category: 'passed',
        color: '#4CAF50' // success green
      },
      {
        x: 1,
        y: stats.projectStats.failed,
        label: 'Failed',
        category: 'failed',
        color: '#f44336' // error red
      }
    ];
  }, [stats.projectStats]);

  return {
    user: profileData?.user,
    stats,
    xpProgressData,
    projectRatioData,
    loading,
    error: profileError
  };
};
