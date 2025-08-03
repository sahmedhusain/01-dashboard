import { User } from '../types'

interface ExportData {
  user: User
  xpData?: any
  auditData?: any
  progressData?: any
  statsData?: any
}

export const exportToJSON = (data: ExportData, filename?: string) => {
  const exportData = {
    exportDate: new Date().toISOString(),
    user: {
      login: data.user.login,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      campus: data.user.campus,
      auditRatio: data.user.auditRatio,
      totalUp: data.user.totalUp,
      totalDown: data.user.totalDown,
      createdAt: data.user.createdAt
    },
    xpData: data.xpData,
    auditData: data.auditData,
    progressData: data.progressData,
    statsData: data.statsData
  }

  const jsonString = JSON.stringify(exportData, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename || `${data.user.login}_profile_data_${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const exportToCSV = (data: any[], filename: string, headers: string[]) => {
  if (!data || data.length === 0) {
    return
  }

  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = getNestedValue(row, header)
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value || ''
      }).join(',')
    )
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const exportXPDataToCSV = (xpData: any[], userLogin: string) => {
  const headers = ['date', 'project', 'xp_amount', 'path', 'type']
  const csvData = xpData.map(transaction => ({
    date: new Date(transaction.createdAt).toLocaleDateString(),
    project: transaction.object?.name || 'Unknown',
    xp_amount: transaction.amount,
    path: transaction.path,
    type: transaction.type
  }))
  
  exportToCSV(csvData, `${userLogin}_xp_data.csv`, headers)
}

export const exportAuditDataToCSV = (auditData: any[], userLogin: string) => {
  const headers = ['date', 'project', 'grade', 'status', 'team_members']
  const csvData = auditData.map(audit => ({
    date: new Date(audit.createdAt).toLocaleDateString(),
    project: audit.group?.object?.name || 'Unknown',
    grade: audit.grade,
    status: audit.grade >= 1 ? 'PASS' : 'FAIL',
    team_members: audit.group?.group_users?.map((gu: any) => gu.user.login).join('; ') || ''
  }))
  
  exportToCSV(csvData, `${userLogin}_audit_data.csv`, headers)
}

export const exportProgressDataToCSV = (progressData: any[], userLogin: string) => {
  const headers = ['date', 'project', 'grade', 'status', 'path', 'type']
  const csvData = progressData.map(progress => ({
    date: new Date(progress.createdAt).toLocaleDateString(),
    project: progress.object?.name || 'Unknown',
    grade: progress.grade || 'N/A',
    status: progress.isDone 
      ? (progress.grade >= 1 ? 'PASSED' : 'FAILED')
      : 'IN PROGRESS',
    path: progress.path,
    type: progress.object?.type || 'Unknown'
  }))
  
  exportToCSV(csvData, `${userLogin}_progress_data.csv`, headers)
}

export const exportStatsReport = (data: ExportData) => {
  const { user, xpData, auditData, progressData } = data
  
  const totalXP = xpData?.reduce((sum: number, t: any) => sum + (t.amount || 0), 0) || 0
  const completedProjects = progressData?.filter((p: any) => p.isDone && p.grade >= 1).length || 0
  const failedProjects = progressData?.filter((p: any) => p.isDone && p.grade < 1).length || 0
  const inProgressProjects = progressData?.filter((p: any) => !p.isDone).length || 0
  const successRate = completedProjects + failedProjects > 0 
    ? ((completedProjects / (completedProjects + failedProjects)) * 100).toFixed(1)
    : '0.0'

  const reportContent = `
STUDENT PROFILE REPORT
Generated: ${new Date().toLocaleString()}

=== BASIC INFORMATION ===
Name: ${user.firstName} ${user.lastName}
Login: ${user.login}
Campus: ${user.campus}
Join Date: ${new Date(user.createdAt).toLocaleDateString()}

=== XP STATISTICS ===
Total XP: ${Math.round(totalXP / 1000)}kB
Total Transactions: ${xpData?.length || 0}
Average XP per Project: ${xpData?.length > 0 ? Math.round(totalXP / xpData.length / 1000) : 0}kB
Current Level: ${Math.floor(totalXP / 1000)}

=== PROJECT STATISTICS ===
Projects Completed: ${completedProjects}
Projects Failed: ${failedProjects}
Projects In Progress: ${inProgressProjects}
Success Rate: ${successRate}%

=== AUDIT STATISTICS ===
Audit Ratio: ${user.auditRatio?.toFixed(2) || '0.00'}
Audits Given: ${user.totalUp || 0}
Audits Received: ${user.totalDown || 0}
Total Audits: ${auditData?.length || 0}

=== PERFORMANCE INSIGHTS ===
${getPerformanceInsights(user, totalXP, completedProjects, successRate)}

---
This report was generated from the reboot01 Student Dashboard.
  `.trim()

  const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `${user.login}_profile_report_${new Date().toISOString().split('T')[0]}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

const getPerformanceInsights = (user: any, totalXP: number, completedProjects: number, successRate: string): string => {
  const insights = []
  
  if (user.auditRatio >= 1.5) {
    insights.push('• Excellent audit ratio - you are actively contributing to peer reviews')
  } else if (user.auditRatio < 1.0) {
    insights.push('• Consider participating in more peer reviews to improve your audit ratio')
  }
  
  if (totalXP > 50000) {
    insights.push('• High XP achiever - great progress through the curriculum')
  } else if (totalXP < 10000) {
    insights.push('• Early in your journey - keep pushing forward!')
  }
  
  if (parseFloat(successRate) > 80) {
    insights.push('• Excellent success rate - you are mastering the projects well')
  } else if (parseFloat(successRate) < 60) {
    insights.push('• Focus on understanding project requirements to improve success rate')
  }
  
  if (completedProjects > 20) {
    insights.push('• Experienced student with many completed projects')
  }
  
  return insights.length > 0 ? insights.join('\n') : '• Keep up the great work on your coding journey!'
}

export default {
  exportToJSON,
  exportToCSV,
  exportXPDataToCSV,
  exportAuditDataToCSV,
  exportProgressDataToCSV,
  exportStatsReport
}
