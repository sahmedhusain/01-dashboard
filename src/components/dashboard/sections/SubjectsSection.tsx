import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Book, Search, Code, FileText, ExternalLink, Target, Users, Star, Folder, FolderOpen, ChevronRight, ChevronDown, Zap, Layers, Award } from 'lucide-react';
import { useQuery, gql } from '@apollo/client';
import { marked } from 'marked';
import LoadingSpinner from '../../ui/LoadingSpinner';

const GET_ALL_BH_PROJECTS = gql`
  query GetAllBHProjects {
    path(
      where: { 
        _or: [
          { path: { _like: "/bahrain/bh-module/%" } },
          { path: { _like: "/bahrain/bh-piscine/%" } }
        ]
      }
      order_by: { path: asc }
    ) {
      path
      updatedAt
    }
    
    object(
      where: {
        _and: [
          { campus: { _eq: "bahrain" } },
          { type: { _in: ["exercise", "project", "module"] } },
          {
            _or: [
              { type: { _eq: "module" } }, # Always include modules for hierarchy
              { name: { _is_null: false } }, # Include objects with names
              { attrs: { _is_null: false } } # Include objects with attributes
            ]
          }
        ]
      }
      order_by: [
        { type: asc }, # Modules first, then exercises and projects
        { name: asc }
      ]
    ) {
      id
      name
      type
      attrs
      campus
      createdAt
      updatedAt
      authorId
      events {
        id
        path
        createdAt
        endAt
      }
    }
  }
`;

interface ProjectObject {
  id: string;
  name: string;
  type: string;
  campus: string;
  attrs: {
    language?: string;
    expectedFiles?: string[];
    allowedFunctions?: string[];
    validations?: Array<{
      type: string;
      cooldown?: number;
      testImage?: unknown;
      form?: string;
      delay?: number;
      ratio?: number;
      required?: number;
      [key: string]: unknown;
    }>;
    special?: unknown;
    subject?: string | { name: string; type: string };
    groupMin?: number;
    groupMax?: number;
    displayedName?: string;
    requiredAuditRatio?: number;
    [key: string]: unknown;
  };
  createdAt: string;
  updatedAt: string;
  authorId: string;
  events: Array<{
    id: string;
    path: string;
    createdAt: string;
    endAt: string;
  }>;
}

interface PathData {
  path: string;
  updatedAt: string;
}

interface Project {
  id: string;
  name: string;
  language: string;
  expectedFiles: string[];
  allowedFunctions: string[];
  validations: Array<{
    type: string;
    cooldown?: number;
    testImage?: unknown;
  }>;
  createdAt: string;
  path: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  groupMin?: number;
  groupMax?: number;
  displayedName?: string;
  requiredAuditRatio?: number;
  projectObject: ProjectObject;
}

interface TreeNode {
  name: string;
  path: string;
  flattenedPath: string;
  children: Record<string, TreeNode>;
  isProject: boolean;
  project: Project | null;
}

const SubjectsSection: React.FC = () => {
  // Add CSS to hide all scrollbars and handle scroll behavior
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Hide all scrollbars globally */
      *::-webkit-scrollbar {
        display: none;
      }
      * {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .invisible-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .invisible-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .enhanced-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .enhanced-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .custom-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .custom-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Add scroll detection and control for Search & Filter Projects container
  React.useEffect(() => {
    let isScrollLocked = false;
    let lockScrollPosition = 0;

    const preventScroll = (e: Event) => {
      if (isScrollLocked) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const preventWheel = (e: WheelEvent) => {
      if (isScrollLocked) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const preventTouchMove = (e: TouchEvent) => {
      if (isScrollLocked) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      if (isScrollLocked) {
        const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
        if (scrollKeys.includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    };

    const handleScroll = (e: Event) => {
      const searchFilterElement = document.getElementById('search-filter-container');
      if (!searchFilterElement) return;

      const rect = searchFilterElement.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      
      // Check if the bottom of the search filter is at or above the top of viewport
      if (rect.bottom <= 0 && !isScrollLocked) {
        // Lock the scroll position
        isScrollLocked = true;
        lockScrollPosition = currentScrollY;
        setShouldFixContent(true);
        setIsSearchFilterHidden(true);
        
        // Prevent further scrolling with multiple methods
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${lockScrollPosition}px`;
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        
        // Add multiple event listeners to prevent all scroll attempts
        window.addEventListener('scroll', preventScroll, { passive: false, capture: true });
        window.addEventListener('wheel', preventWheel, { passive: false, capture: true });
        window.addEventListener('touchmove', preventTouchMove, { passive: false, capture: true });
        document.addEventListener('keydown', preventKeyScroll, { passive: false, capture: true });
        
        e.preventDefault();
        e.stopPropagation();
        return false;
      } else if (rect.bottom > 0 && isScrollLocked) {
        // Unlock scroll when scrolling back up
        isScrollLocked = false;
        setShouldFixContent(false);
        setIsSearchFilterHidden(false);
        
        // Remove all scroll prevention listeners
        window.removeEventListener('scroll', preventScroll, { capture: true });
        window.removeEventListener('wheel', preventWheel, { capture: true });
        window.removeEventListener('touchmove', preventTouchMove, { capture: true });
        document.removeEventListener('keydown', preventKeyScroll, { capture: true });
        
        // Restore normal scrolling
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.height = '';
        window.scrollTo(0, lockScrollPosition);
      }
    };

    // Use passive: false to allow preventDefault
    window.addEventListener('scroll', handleScroll, { passive: false });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Cleanup: remove all event listeners and restore normal scrolling
      window.removeEventListener('scroll', preventScroll, { capture: true });
      window.removeEventListener('wheel', preventWheel, { capture: true });
      window.removeEventListener('touchmove', preventTouchMove, { capture: true });
      document.removeEventListener('keydown', preventKeyScroll, { capture: true });
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loadingMarkdown, setLoadingMarkdown] = useState<boolean>(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['piscine-go']));
  const [activeTab, setActiveTab] = useState<'readme' | 'audit'>('readme');
  const [isSearchFilterHidden, setIsSearchFilterHidden] = useState<boolean>(false);
  const [shouldFixContent, setShouldFixContent] = useState<boolean>(false);

  // Smooth scroll utility function
  const smoothScrollToTop = useCallback((element?: HTMLElement) => {
    const target = element || window;
    if (element) {
      element.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      target.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const { data, loading, error } = useQuery(GET_ALL_BH_PROJECTS);

  const getDifficulty = (projectObject: ProjectObject): 'Beginner' | 'Intermediate' | 'Advanced' => {
    const allowedFunctions = projectObject.attrs.allowedFunctions?.length || 0;
    const expectedFiles = projectObject.attrs.expectedFiles?.length || 0;
    const hasValidations = (projectObject.attrs.validations?.length || 0) > 0;
    
    if (allowedFunctions <= 3 && expectedFiles <= 2 && !hasValidations) return 'Beginner';
    if (allowedFunctions <= 8 && expectedFiles <= 5) return 'Intermediate';
    return 'Advanced';
  };

  const projectHierarchy = useMemo(() => {
    if (!data?.object) return {};
    
    const hierarchy: { [key: string]: string } = {};
    
    const div01Module = data.object.find((obj: ProjectObject) => 
      obj.type === 'module' && 
      obj.name === 'Div 01'
    );
    
    if (div01Module?.attrs?.graph?.innerCircle) {
      
      interface GraphSlice {
        innerArc?: {
          contents?: unknown[];
        };
        outerArcs?: Array<{
          contents?: unknown[];
        }>;
      }
      
      div01Module.attrs.graph.innerCircle.forEach((slice: GraphSlice) => {
        const processContents = (contents: unknown[]) => {
          contents.forEach((item: unknown) => {
            if (typeof item === 'string') {
              // Standalone project
            } else if (typeof item === 'object' && item !== null) {
              Object.keys(item).forEach(parentName => {
                const children = (item as Record<string, unknown>)[parentName];
                if (Array.isArray(children)) {
                  children.forEach((childName: string) => {
                    hierarchy[childName] = `${parentName}/${childName}`;
                  });
                }
              });
            }
          });
        };
        
        if (slice.innerArc?.contents) {
          processContents(slice.innerArc.contents);
        }
        
        if (slice.outerArcs) {
          slice.outerArcs.forEach((arc) => {
            if (arc.contents) {
              processContents(arc.contents);
            }
          });
        }
      });
    }
    
    if (Object.keys(hierarchy).length === 0) {
      const fallbackMappings = {
        'color': 'ascii-art/color',
        'output': 'ascii-art/output',
        'fs': 'ascii-art/fs',
        'justify': 'ascii-art/justify',
        'reverse': 'ascii-art/reverse',
        'filters': 'groupie-tracker/filters',
        'geolocalization': 'groupie-tracker/geolocalization',
        'visualizations': 'groupie-tracker/visualizations',
        'search-bar': 'groupie-tracker/search-bar',
        'authentication': 'forum/authentication',
        'image-upload': 'forum/image-upload',
        'security': 'forum/security',
        'moderation': 'forum/moderation',
        'advanced-features': 'forum/advanced-features',
        'score-handling': 'make-your-game/score-handling',
        'history': 'make-your-game/history',
        'different-maps': 'make-your-game/different-maps',
        'typing-in-progress': 'real-time-forum/typing-in-progress',
        'cross-platform-appimage': 'social-network/cross-platform-appimage',
        'stylize': 'ascii-art-web/stylize',
        'dockerize': 'ascii-art-web/dockerize',
        'exportfile': 'ascii-art-web/exportfile',
        'job-control': '0-shell/job-control',
        'scripting': '0-shell/scripting'
      };
      Object.assign(hierarchy, fallbackMappings);
    }
    
    return hierarchy;
  }, [data?.object]);

  const getProjectPath = useCallback((projectName: string): string => {
    if (projectHierarchy[projectName]) {
      return projectHierarchy[projectName];
    }
    
    const staticMappings: { [key: string]: string } = {
      'checkpoints': 'java/checkpoints',
      'piscine': 'java/piscine', 
      'projects': 'java/projects',
      'raids': 'java/raids',
      'financial-instruments': 'blockchain/financial-instruments'
    };

    return staticMappings[projectName] || projectName;
  }, [projectHierarchy]);

  const fetchProjectContent = async (projectName: string, fileType: 'readme' | 'audit', projectObject?: ProjectObject): Promise<string> => {
    const convertProjectNameToPath = (name: string) => getProjectPath(name);

    try {
      const fileName = fileType === 'readme' ? 'README.md' : 'audit.md';
      const possiblePaths: string[] = [];
      
      const convertGraphQLPathToGitHub = (graphqlPath: string, targetFileName: string): string[] => {
        const urls: string[] = [];
        
        if (graphqlPath.includes('/markdown/root/public/subjects/')) {
          const afterSubjects = graphqlPath.split('/subjects/')[1];
          const dirPath = afterSubjects.replace('/README.md', '').replace('/audit/README.md', '');
          
          const convertedPath = convertProjectNameToPath(dirPath);
          urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${convertedPath}/${targetFileName}`);
          
          if (convertedPath !== dirPath) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${dirPath}/${targetFileName}`);
          }
          
        } else if (graphqlPath.includes('/api/content/root/01-edu_module/content/')) {
          const afterContent = graphqlPath.split('/content/')[1];
          const projectPath = afterContent.replace('/README.md', '').replace('/audit/README.md', '');
          
          const convertedPath = convertProjectNameToPath(projectPath);
          urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${convertedPath}/${targetFileName}`);
          
          if (convertedPath !== projectPath) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${projectPath}/${targetFileName}`);
          }
          
          const kebabCase = projectPath.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
          if (kebabCase !== projectPath) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${kebabCase}/${targetFileName}`);
          }
          
          const rootDirs = ['js', 'sh', 'dom'];
          for (const rootDir of rootDirs) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/${rootDir}/${convertedPath}/${targetFileName}`);
            if (convertedPath !== projectPath) {
              urls.push(`https://raw.githubusercontent.com/01-edu/public/master/${rootDir}/${projectPath}/${targetFileName}`);
            }
            if (kebabCase !== projectPath) {
              urls.push(`https://raw.githubusercontent.com/01-edu/public/master/${rootDir}/${kebabCase}/${targetFileName}`);
            }
          }
          
        } else if (graphqlPath.includes('/api/content/root/01-edu_imperative-piscine/content/')) {
          const afterContent = graphqlPath.split('/content/')[1];
          const dirPath = afterContent.replace('/README.md', '').replace('/audit/README.md', '');
          
          const convertedPath = convertProjectNameToPath(dirPath);
          urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${convertedPath}/${targetFileName}`);
          
          if (convertedPath !== dirPath) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${dirPath}/${targetFileName}`);
          }
        } else {
          const pathParts = graphqlPath.split('/');
          const projectName = pathParts[pathParts.length - 1].replace('/README.md', '').replace('/audit/README.md', '');
          
          const convertedPath = convertProjectNameToPath(projectName);
          urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${convertedPath}/${targetFileName}`);
          
          if (convertedPath !== projectName) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${projectName}/${targetFileName}`);
          }
          
          const kebabCase = projectName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
          if (kebabCase !== projectName) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${kebabCase}/${targetFileName}`);
          }
          
          const rootDirs = ['js', 'sh', 'dom'];
          for (const rootDir of rootDirs) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/${rootDir}/${convertedPath}/${targetFileName}`);
            if (convertedPath !== projectName) {
              urls.push(`https://raw.githubusercontent.com/01-edu/public/master/${rootDir}/${projectName}/${targetFileName}`);
            }
            if (kebabCase !== projectName) {
              urls.push(`https://raw.githubusercontent.com/01-edu/public/master/${rootDir}/${kebabCase}/${targetFileName}`);
            }
          }
        }
        
        return [...new Set(urls)]; // Remove duplicates
      };

      const convertedProjectPath = convertProjectNameToPath(projectName);
      
      if (convertedProjectPath !== projectName) {
        possiblePaths.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${convertedProjectPath}/${fileName}`);
      } else {
        possiblePaths.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${projectName}/${fileName}`);
      }
      
      if (projectObject?.attrs?.subject) {
        const subjectPath = typeof projectObject.attrs.subject === 'string' 
          ? projectObject.attrs.subject 
          : projectObject.attrs.subject.name || '';
          
        if (subjectPath && fileType === 'readme' && !subjectPath.includes('getSubject')) {
          const graphqlPaths = convertGraphQLPathToGitHub(subjectPath, fileName);
          const newPaths = graphqlPaths.filter(path => !possiblePaths.includes(path));
          possiblePaths.push(...newPaths);
        } else if (fileType === 'audit') {
          if (projectObject.attrs.validations && Array.isArray(projectObject.attrs.validations)) {
            for (const validation of projectObject.attrs.validations) {
              if (validation.form && typeof validation.form === 'string' && !validation.form.includes('getSubject')) {
                const auditPaths = convertGraphQLPathToGitHub(validation.form, 'README.md');
                const newPaths = auditPaths.filter(path => !possiblePaths.includes(path));
                possiblePaths.push(...newPaths);
              }
            }
          }
        }
      }

      if (possiblePaths.length === 0) {
        possiblePaths.push(
          `https://raw.githubusercontent.com/01-edu/public/master/subjects/${projectName.toLowerCase()}/${fileName}`,
        );
        
        const rootDirs = ['js', 'sh', 'dom'];
        for (const rootDir of rootDirs) {
          possiblePaths.push(`https://raw.githubusercontent.com/01-edu/public/master/${rootDir}/${projectName}/${fileName}`);
        }
      }

      let markdownContent = '';
      let baseUrl = '';
      
      for (const fileUrl of possiblePaths) {
        try {
          const response = await fetch(fileUrl);
          if (response.ok) {
            markdownContent = await response.text();
            baseUrl = fileUrl.substring(0, fileUrl.lastIndexOf('/'));
            break;
          }
        } catch {
          //
        }
      }
      
      if (!markdownContent) {
        throw new Error(`No ${fileName} found in any expected location for "${projectName}". Tried ${possiblePaths.length} URLs.`);
      }

      const processMarkdownAssets = (content: string, baseUrl: string): string => {
        const decodedContent = content
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, ' ')
          .replace(/&#x27;/g, "'")
          .replace(/&#x2F;/g, '/')
          .replace(/&#x60;/g, '`')
          .replace(/&#x3D;/g, '=');
        
        return decodedContent
          .replace(/!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g, `![$1](${baseUrl}/$2)`)
          .replace(/\[([^\]]+)\]\((?!https?:\/\/)([^)#]+)(?:#([^)]*))?\)/g, (_, text, url, fragment) => {
            if (url.startsWith('../')) {
              const parentUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/'));
              const resolvedUrl = url.replace('../', `${parentUrl}/`);
              return `[${text}](${resolvedUrl}${fragment ? '#' + fragment : ''})`;
            } else if (url.endsWith('.md')) {
              const githubUrl = baseUrl.replace('raw.githubusercontent.com', 'github.com').replace('/master/', '/blob/master/');
              return `[${text}](${githubUrl}/${url}${fragment ? '#' + fragment : ''})`;
            } else {
              return `[${text}](${baseUrl}/${url}${fragment ? '#' + fragment : ''})`;
            }
          })
          .replace(/<\s*br\s*\/?>/gi, '\n')
          .replace(/<\s*p\s*>/gi, '\n\n')
          .replace(/<\/\s*p\s*>/gi, '')
          .replace(/\r\n/g, '\n')
          .replace(/\r/g, '\n')
          .replace(/\n{3,}/g, '\n\n')
          .trim();
      };

      const processedContent = processMarkdownAssets(markdownContent, baseUrl);
      
      marked.setOptions({
        breaks: true,
        gfm: true
      });
      
      const htmlContent = marked(processedContent);
      
      return htmlContent;
      
    } catch (error) {
      const fileDisplay = fileType === 'readme' ? 'README' : 'audit/README.md';
      
      const convertedPath = getProjectPath(projectName);
      const githubUrl = `https://github.com/01-edu/public/tree/master/subjects/${convertedPath}`;
      
      return `# ${projectName}


${projectObject ? `
**Language:** ${projectObject.attrs.language || 'Not specified'}  
**Type:** ${projectObject.type}  
**Created:** ${new Date(projectObject.createdAt).toLocaleDateString()}

${projectObject.attrs.expectedFiles ? projectObject.attrs.expectedFiles.map(file => `- \`${file}\``).join('\n') : 'Not specified'}

This project requires specific implementation details. Please check the project repository for complete instructions.
` : ''}


The ${fileDisplay} content could not be loaded automatically. This might be because:
- The file doesn't exist in the expected location
- The project structure is different than expected
- Network connectivity issues


You can try accessing the project directly:
- **GitHub Repository:** [View ${projectName} on GitHub](${githubUrl})
- **Direct README:** [${projectName}/README.md](${githubUrl}/README.md)


**Error:** ${error instanceof Error ? error.message : String(error)}`;
    }
  };

  const projects: Project[] = useMemo(() => {
    if (!data?.object) return [];
    
    const convertProjectNameToPath = (name: string) => getProjectPath(name);
    
    const findProjectPath = (obj: ProjectObject, paths: PathData[]): string => {
      const projectName = obj.name;
      
      for (const pathItem of paths) {
        const path = pathItem.path;
        
        if (path.includes(`/${projectName}`)) {
          return path;
        }
        
        const convertedPath = convertProjectNameToPath(projectName);
        if (convertedPath !== projectName && path.includes(`/${convertedPath}`)) {
          return path;
        }
        
        if (path.endsWith(`/${projectName}`)) {
          return path;
        }
        
        const pathSegments = path.split('/');
        const lastSegment = pathSegments[pathSegments.length - 1];
        if (lastSegment === projectName) {
          return path;
        }
        
        if (convertedPath.includes('/')) {
          const [parent, child] = convertedPath.split('/');
          if (path.includes(`/${parent}`) && path.includes(child)) {
            return path;
          }
        }
        
        const parentPatterns = [
          'piscine-js', 'piscine-rust', 'piscine-flutter', 'piscine-ai', 'piscine-blockchain', 
          'piscine-java', 'piscine-ux', 'piscine-ui', 'piscine-go',
          'real-time-forum', 'ascii-art', 'groupie-tracker', 'ascii-art-web',
          'make-your-game', 'make-your-own', 'checkpoint', 'forum'
        ];
        
        for (const pattern of parentPatterns) {
          if (path.includes(`/${pattern}/`) && path.includes(projectName)) {
            return path;
          }
        }
        
        const kebabCase = projectName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        if (kebabCase !== projectName && path.includes(kebabCase)) {
          return path;
        }
      }
      
      return ''; // No matching path found
    };
    
    const existingProjectNames = new Set(data.object.map((obj: ProjectObject) => obj.name));
    
    const virtualProjects: ProjectObject[] = [];
    
    Object.keys(projectHierarchy).forEach(projectName => {
      if (!existingProjectNames.has(projectName)) {
        virtualProjects.push({
          id: `virtual-${projectName}`,
          name: projectName,
          type: 'project',
          campus: 'bahrain',
          attrs: {
            language: 'Unknown',
            expectedFiles: [],
            allowedFunctions: [],
            validations: [],
            displayedName: projectName
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          authorId: 'virtual',
          events: []
        });
      }
    });
    
    const allObjects = [...data.object, ...virtualProjects];
    
    return allObjects
      .filter((obj: ProjectObject) => {
        if (obj.campus !== 'bahrain') {
          return false;
        }
        
        if (obj.type === 'module') {
          return false;
        }
        
        if (!obj.name || obj.name.trim() === '') {
          return false;
        }
        
        if (obj.type === 'exercise' || obj.type === 'project') {
          const hasAttrs = obj.attrs && typeof obj.attrs === 'object';
          const hasEvents = obj.events && obj.events.length > 0;
          
          if (!hasAttrs && !hasEvents) {
            return false;
          }
        }
        
        let matchingPath = '';
        if (String(obj.id).startsWith('virtual-')) {
          const convertedPath = getProjectPath(obj.name);
          if (convertedPath !== obj.name) {
            const parentProject = convertedPath.split('/')[0];
            matchingPath = `/bahrain/bh-module/${parentProject}/${obj.name}`;
          } else {
            matchingPath = `/bahrain/bh-module/${obj.name}`;
          }
        } else {
          matchingPath = findProjectPath(obj, data.path || []);
        }
        
        const hasValidPath = matchingPath && 
               (matchingPath.includes('/bahrain/bh-module/') || 
                matchingPath.includes('/bahrain/bh-piscine/'));
                
        const hasContent = (obj.type === 'exercise' || obj.type === 'project') && 
                          obj.attrs && 
                          (obj.attrs.language || obj.attrs.subject || obj.attrs.expectedFiles?.length > 0);
        
        const shouldInclude = hasValidPath || hasContent;
        
        return shouldInclude;
      })
      .map((obj: ProjectObject) => {
        const projectName = typeof obj.attrs.displayedName === 'string' 
          ? obj.attrs.displayedName 
          : typeof obj.name === 'string' 
            ? obj.name 
            : 'Project';
            
        const projectPath = findProjectPath(obj, data.path || []);
            
        return {
          id: obj.id,
          name: projectName,
          language: obj.attrs.language || 'Unknown',
          expectedFiles: obj.attrs.expectedFiles || [],
          allowedFunctions: obj.attrs.allowedFunctions || [],
          validations: obj.attrs.validations || [],
          createdAt: obj.createdAt,
          path: projectPath,
          difficulty: getDifficulty(obj),
          groupMin: obj.attrs.groupMin,
          groupMax: obj.attrs.groupMax,
          displayedName: obj.attrs.displayedName,
          requiredAuditRatio: obj.attrs.requiredAuditRatio,
          projectObject: obj
        };
      });
  }, [data, getProjectPath, projectHierarchy]);

      

  const availableLanguages = useMemo(() => {
    const languages = [...new Set(projects.map(p => p.language))].filter(Boolean).sort();
    return languages;
  }, [projects]);

  const availableDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
  
  const availableTypes = useMemo(() => {
    const types = [...new Set(projects.map(p => p.projectObject.type))].filter(Boolean).sort();
    return types;
  }, [projects]);

  // Calculate statistics for the stats cards
  const stats = useMemo(() => {
    const totalSubjects = projects.length;
    const languageCount = availableLanguages.length;
    const difficultyCounts = {
      Beginner: projects.filter(p => p.difficulty === 'Beginner').length,
      Intermediate: projects.filter(p => p.difficulty === 'Intermediate').length,
      Advanced: projects.filter(p => p.difficulty === 'Advanced').length,
    };
    const typeCounts = {
      projects: projects.filter(p => p.projectObject.type === 'project').length,
      exercises: projects.filter(p => p.projectObject.type === 'exercise').length,
    };

    return {
      totalSubjects,
      languageCount,
      difficultyCounts,
      typeCounts,
    };
  }, [projects, availableLanguages]);

  const loadTabContent = async (project: Project, tabType: 'readme' | 'audit') => {
    if (tabType === 'audit' && project.projectObject.type === 'exercise') {
      setMarkdownContent(`# ${project.name}\n\n**This is an exercise**\n\nExercises do not have audit questions. Only projects have audit requirements.`);
      return;
    }
    
    setLoadingMarkdown(true);
    try {
      const content = await fetchProjectContent(project.name, tabType, project.projectObject);
      setMarkdownContent(content);
    } catch {
      setMarkdownContent(`# ${project.name}\n\n**Error loading ${tabType}**\n\nCould not load ${tabType} content. Please try again later.`);
    } finally {
      setLoadingMarkdown(false);
    }
  };

  const handleProjectSelect = async (project: Project) => {
    setSelectedProject(project);
    setActiveTab('readme'); // Reset to README tab
    await loadTabContent(project, 'readme');
    smoothScrollToTop();
  };

  const handleTabChange = async (newTab: 'readme' | 'audit') => {
    if (selectedProject && newTab !== activeTab) {
      setActiveTab(newTab);
      await loadTabContent(selectedProject, newTab);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLanguageFilter('');
    setDifficultyFilter('');
    setTypeFilter('');
  };

  const treeStructure = useMemo(() => {
    if (!data?.path || !data?.object) return {};
    
    const tree: Record<string, TreeNode> = {};
    const projectPaths = data.path.filter((p: PathData) => 
      p.path.includes('/bahrain/bh-module/') || 
      p.path.includes('/bahrain/bh-piscine/')
    );

    projectPaths.forEach((pathItem: PathData) => {
      const pathParts = pathItem.path.split('/').filter(Boolean);
      
      let relevantParts = [];
      if (pathItem.path.includes('/bahrain/bh-module/')) {
        relevantParts = pathParts.slice(2);
      } else if (pathItem.path.includes('/bahrain/bh-piscine/')) {
        relevantParts = ['piscine-go', ...pathParts.slice(2)];
      }
      
      if (relevantParts.length === 0) return;
      
      let current = tree;
      
      for (let i = 0; i < relevantParts.length; i++) {
        const part = relevantParts[i];
        if (!current[part]) {
          current[part] = {
            name: part,
            path: pathItem.path, // Keep original path for project matching
            flattenedPath: '/' + relevantParts.slice(0, i + 1).join('/'),
            children: {},
            isProject: i === relevantParts.length - 1,
            project: null // We'll set this later to avoid circular dependency
          };
        }
        current = current[part].children;
      }
    });

    return tree;
  }, [data]);

  const treeWithProjects = useMemo(() => {
    if (!treeStructure || !projects.length) return treeStructure;
    
    const attachProjects = (node: TreeNode): TreeNode => {
      const updatedNode = { ...node };
      
      if (updatedNode.isProject && updatedNode.path) {
        updatedNode.project = projects.find(p => p.path === updatedNode.path) || null;
      }
      
      const updatedChildren: Record<string, TreeNode> = {};
      Object.keys(updatedNode.children || {}).forEach(key => {
        updatedChildren[key] = attachProjects(updatedNode.children[key]);
      });
      updatedNode.children = updatedChildren;
      
      return updatedNode;
    };
    
    const result: Record<string, TreeNode> = {};
    Object.keys(treeStructure).forEach(key => {
      result[key] = attachProjects(treeStructure[key]);
    });
    
    return result;
  }, [treeStructure, projects]);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Advanced': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      'go': 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
      'js': 'text-teal-400 bg-teal-500/20 border-teal-500/30',
      'javascript': 'text-teal-400 bg-teal-500/20 border-teal-500/30',
      'python': 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
      'rust': 'text-orange-400 bg-orange-500/20 border-orange-500/30',
      'java': 'text-red-400 bg-red-500/20 border-red-500/30',
      'c': 'text-gray-400 bg-gray-500/20 border-gray-500/30',
      'dom': 'text-purple-400 bg-purple-500/20 border-purple-500/30',
      'blockchain': 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30',
    };
    return colors[language.toLowerCase()] || 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
  };

  const getLanguageSymbol = (language: string) => {
    const symbols: Record<string, string> = {
      'go': '🐹',
      'js': '⚡',
      'javascript': '⚡',
      'python': '🐍',
      'rust': '🦀',
      'java': '☕',
      'c': '⚙️',
      'dom': '🌐',
      'blockchain': '⛓️',
      'unknown': '📄',
    };
    return symbols[language.toLowerCase()] || '📄';
  };

  const getDifficultySymbol = (difficulty: string) => {
    const symbols: Record<string, string> = {
      'Beginner': '🌱',
      'Intermediate': '⚡',
      'Advanced': '🔥',
    };
    return symbols[difficulty] || '📊';
  };

  const getTypeSymbol = (type: string) => {
    const symbols: Record<string, string> = {
      'project': '🚀',
      'exercise': '📝',
    };
    return symbols[type] || '📁';
  };

  const TreeNodeComponent: React.FC<{ node: TreeNode; depth: number }> = ({ node, depth }) => {
    const isExpanded = expandedFolders.has(node.flattenedPath || node.name);
    const hasChildren = Object.keys(node.children).length > 0;
    const isSelected = selectedProject?.path === node.path;

    return (
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="select-none"
      >
        <motion.div
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          className={`flex items-center py-2 px-3 rounded-xl cursor-pointer transition-all duration-300 ${
            isSelected 
              ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-400/30 shadow-lg shadow-emerald-500/10' 
              : 'hover:bg-white/5 text-white/80 hover:border-emerald-400/20 border border-transparent'
          }`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleFolder(node.flattenedPath || node.name);
            } else if (node.project) {
              handleProjectSelect(node.project);
            }
          }}
        >
          {hasChildren && (
            <motion.div 
              animate={{ rotate: isExpanded ? 90 : 0 }}
              className="w-4 h-4 flex items-center justify-center mr-2"
            >
              <ChevronRight className="w-3 h-3" />
            </motion.div>
          )}
          {!hasChildren && (
            <div className="w-4 h-4 mr-2" />
          )}
          <div className="w-4 h-4 flex items-center justify-center mr-3">
            {hasChildren ? (
              <motion.div whileHover={{ scale: 1.1 }}>
                <Folder className="w-4 h-4 text-emerald-400" />
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }}>
                <FileText className="w-4 h-4 text-teal-400" />
              </motion.div>
            )}
          </div>
          <span className="text-sm truncate flex-1">
            {node.isProject && node.project 
              ? (typeof node.project.name === 'string' ? node.project.name : node.name)
              : node.name}
          </span>
          {node.project && node.project.projectObject.type === 'exercise' && (
            <span className="ml-2 text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-full">
              exercise
            </span>
          )}
        </motion.div>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {Object.values(node.children)
              .sort((a: TreeNode, b: TreeNode) => {
                const aHasChildren = Object.keys(a.children).length > 0;
                const bHasChildren = Object.keys(b.children).length > 0;
                
                if (aHasChildren && !bHasChildren) return -1;
                if (!aHasChildren && bHasChildren) return 1;
                
                return a.name.localeCompare(b.name);
              })
              .map((child: TreeNode) => (
                <TreeNodeComponent key={child.flattenedPath || child.name} node={child} depth={depth + 1} />
              ))}
          </motion.div>
        )}
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 min-h-full relative flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading Subjects..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 min-h-full relative flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-red-400 mb-2">Error loading projects</p>
          <p className="text-white/60 text-sm">{error.message}</p>
        </motion.div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 35px 35px, rgba(52, 211, 153, 0.08) 2px, transparent 0)`,
          backgroundSize: '70px 70px'
        }}></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 h-full overflow-y-auto custom-scrollbar">
        <div className="space-y-8 pt-8 px-4 sm:px-6 lg:px-8 pb-20">
      
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-10"
        >
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-xl border border-emerald-400/30 mb-6 shadow-2xl shadow-emerald-500/20 relative overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 animate-pulse"></div>
            <Book className="w-12 h-12 text-emerald-400 drop-shadow-lg relative z-10" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-200 via-emerald-100 to-teal-100 bg-clip-text text-transparent mb-4">
              Subjects Library
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Collection of <span className="text-emerald-400 font-bold">{stats.totalSubjects}</span> learning materials 📚
              <br />
              <span className="text-base text-white/60 mt-2 block">
                ✨ Projects, exercises, and detailed documentation for your learning journey ✨
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-12"
        >
          <StatCard 
            icon={Book} 
            title="Total Subjects" 
            value={stats.totalSubjects.toString()} 
            color="bg-gradient-to-r from-emerald-500/30 to-teal-500/30"
            bgGradient="bg-gradient-to-br from-emerald-900/20 to-teal-900/20"
            subValue="Projects & exercises available"
          />
          
          <StatCard 
            icon={Code} 
            title="Programming Languages" 
            value={stats.languageCount.toString()} 
            color="bg-gradient-to-r from-blue-500/30 to-cyan-500/30"
            bgGradient="bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
            subValue="Different technologies"
          />
          
          <StatCard 
            icon={Target} 
            title="Projects" 
            value={stats.typeCounts.projects.toString()} 
            color="bg-gradient-to-r from-purple-500/30 to-violet-500/30"
            bgGradient="bg-gradient-to-br from-purple-900/20 to-violet-900/20"
            subValue="Full-scale projects"
          />
          
          <StatCard 
            icon={FileText} 
            title="Exercises" 
            value={stats.typeCounts.exercises.toString()} 
            color="bg-gradient-to-r from-orange-500/30 to-amber-500/30"
            bgGradient="bg-gradient-to-br from-orange-900/20 to-amber-900/20"
            subValue="Practice exercises"
          />
          
          <StatCard 
            icon={Star} 
            title="Beginner Level" 
            value={stats.difficultyCounts.Beginner.toString()} 
            color="bg-gradient-to-r from-green-500/30 to-emerald-500/30"
            bgGradient="bg-gradient-to-br from-green-900/20 to-emerald-900/20"
            subValue="🌱 Entry-level subjects"
          />
          
          <StatCard 
            icon={Zap} 
            title="Advanced Level" 
            value={stats.difficultyCounts.Advanced.toString()} 
            color="bg-gradient-to-r from-red-500/30 to-rose-500/30"
            bgGradient="bg-gradient-to-br from-red-900/20 to-rose-900/20"
            subValue="🔥 Expert-level subjects"
          />
        </motion.div>

        {/* Enhanced Search and Filters */}
        <motion.div
          id="search-filter-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-3xl px-6 sm:px-8 py-8 sm:py-10 border border-white/20 hover:bg-white/12 hover:border-emerald-400/40 transition-all duration-500 shadow-2xl hover:shadow-3xl hover:shadow-emerald-500/20 mb-8 relative overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-300/10 to-teal-300/10 rounded-full blur-xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-300/10 to-cyan-300/10 rounded-full blur-xl opacity-60"></div>
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-emerald-400/20">
              <Search className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Search & Filter Projects</h3>
              <p className="text-sm text-white/60">Find subjects by name, language, type or difficulty</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
              />
            </div>

            <motion.select
              whileFocus={{ scale: 1.02 }}
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
            >
              <option value="" className="bg-gray-800">All Languages</option>
              {availableLanguages.map((language) => (
                <option key={language} value={language} className="bg-gray-800">
                  {language}
                </option>
              ))}
            </motion.select>

            <motion.select
              whileFocus={{ scale: 1.02 }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
            >
              <option value="" className="bg-gray-800">All Types</option>
              {availableTypes.map((type) => (
                <option key={type} value={type} className="bg-gray-800">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </motion.select>

            <motion.select
              whileFocus={{ scale: 1.02 }}
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
            >
              <option value="" className="bg-gray-800">All Difficulties</option>
              {availableDifficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty} className="bg-gray-800">
                  {difficulty}
                </option>
              ))}
            </motion.select>
          </div>

          {(searchTerm || languageFilter || difficultyFilter || typeFilter) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between"
            >
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 rounded-full text-sm border border-emerald-400/30 backdrop-blur-sm"
                  >
                    Search: "{searchTerm}"
                  </motion.span>
                )}
                {languageFilter && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-400 rounded-full text-sm border border-teal-400/30 backdrop-blur-sm"
                  >
                    Language: {languageFilter}
                  </motion.span>
                )}
                {typeFilter && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-full text-sm border border-cyan-400/30 backdrop-blur-sm"
                  >
                    Type: {typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}
                  </motion.span>
                )}
                {difficultyFilter && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-full text-sm border border-yellow-400/30 backdrop-blur-sm"
                  >
                    Difficulty: {difficultyFilter}
                  </motion.span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/30 rounded-xl text-red-400 transition-all duration-300 backdrop-blur-sm text-sm hover:scale-105"
              >
                Clear All
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Main Content with Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`flex flex-col xl:flex-row gap-6 lg:gap-8 ${
            shouldFixContent 
              ? 'fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 z-50 overflow-hidden p-4 sm:p-6 lg:p-8' 
              : ''
          }`}
          style={{
            height: shouldFixContent ? '100vh' : 'auto'
          }}
        >
          {/* Enhanced Tree Navigation Sidebar */}
          <div className="w-full xl:w-96 xl:flex-shrink-0 order-2 xl:order-1">
            <div className={`bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-emerald-400/30 transition-all duration-500 shadow-2xl hover:shadow-3xl hover:shadow-emerald-500/20 ${
              shouldFixContent ? 'h-full' : 'sticky top-6'
            }`}>
              {/* Enhanced Header */}
              <div className="p-6 border-b border-white/20 flex-shrink-0 relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-xl"></div>
                <div className="flex items-center space-x-4 relative z-10">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-emerald-400/30 shadow-lg"
                  >
                    <Folder className="w-5 h-5 text-emerald-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Subjects Navigator</h3>
                    <p className="text-sm text-white/60">Browse subjects by category</p>
                  </div>
                </div>
              </div>
              
              {/* Scrollable Tree Content */}
              <div className={`overflow-y-auto p-4 invisible-scrollbar ${
                shouldFixContent 
                  ? 'h-[calc(100vh-120px)]' 
                  : 'h-[calc(100vh-240px)]'
              }`}>
                <div className="space-y-2">
                  {Object.values(treeWithProjects)
                    .sort((a: TreeNode, b: TreeNode) => {
                      const aHasChildren = Object.keys(a.children).length > 0;
                      const bHasChildren = Object.keys(b.children).length > 0;
                      
                      if (aHasChildren && !bHasChildren) return -1;
                      if (!aHasChildren && bHasChildren) return 1;
                      
                      return a.name.localeCompare(b.name);
                    })
                    .map((node: TreeNode) => (
                      <TreeNodeComponent key={node.path} node={node} depth={0} />
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Project Details */}
          <div className="flex-1 order-1 xl:order-2">
            {selectedProject ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Enhanced Project Stats and Metadata */}
                <div className={`bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 hover:bg-white/12 hover:border-emerald-400/40 transition-all duration-500 shadow-2xl hover:shadow-3xl hover:shadow-emerald-500/20 z-10 relative overflow-hidden ${
                  shouldFixContent ? 'flex-shrink-0' : 'sticky top-6'
                }`}>
                  {/* Animated background elements */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-emerald-300/10 to-teal-300/10 rounded-full blur-xl opacity-60"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-teal-300/10 to-cyan-300/10 rounded-full blur-xl opacity-60"></div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-400/30 backdrop-blur-sm"
                      >
                        <Target className="w-6 h-6 text-emerald-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {typeof selectedProject.name === 'string' ? selectedProject.name : 'Project'}
                        </h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`text-xs px-3 py-1 rounded-full border flex items-center space-x-1 ${getLanguageColor(selectedProject.language)}`}>
                            <span>{getLanguageSymbol(selectedProject.language)}</span>
                            <span>{selectedProject.language}</span>
                          </span>
                          <span className={`text-xs px-3 py-1 rounded-full border flex items-center space-x-1 ${getDifficultyColor(selectedProject.difficulty)}`}>
                            <span>{getDifficultySymbol(selectedProject.difficulty)}</span>
                            <span>{selectedProject.difficulty}</span>
                          </span>
                          <span className={`text-xs px-3 py-1 rounded-full border flex items-center space-x-1 ${
                            selectedProject.projectObject.type === 'project' 
                              ? 'text-blue-400 bg-blue-500/20 border-blue-500/30'
                              : 'text-gray-400 bg-gray-500/20 border-gray-500/30'
                          }`}>
                            <span>{getTypeSymbol(selectedProject.projectObject.type)}</span>
                            <span>{selectedProject.projectObject.type}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* External Link - Moved to top right */}
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={(() => {
                        const projectPath = getProjectPath(selectedProject.name);
                        return `https://github.com/01-edu/public/tree/master/subjects/${projectPath}`;
                      })()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg px-4 py-2 text-blue-400 transition-all duration-300 text-sm"
                    >
                      <span>View in Public Repository</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>

                  {/* Project Requirements Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {(selectedProject.groupMin || selectedProject.groupMax) && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="w-4 h-4 text-green-400" />
                          <span className="text-sm font-medium text-white">Team Size</span>
                        </div>
                        <span className="text-sm text-green-400 font-mono">
                          {(() => {
                            const min = selectedProject.groupMin || 1;
                            const max = selectedProject.groupMax || 1;
                            if (min === max) {
                              return `${min} ${min === 1 ? 'member' : 'members'}`;
                            }
                            return `${min} - ${max} members`;
                          })()}
                        </span>
                      </motion.div>
                    )}

                    {selectedProject.requiredAuditRatio && selectedProject.projectObject.type === 'project' && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="w-4 h-4 text-orange-400" />
                          <span className="text-sm font-medium text-white">Min Audit Ratio</span>
                        </div>
                        <span className="text-sm text-orange-400">
                          {selectedProject.requiredAuditRatio.toFixed(1)}
                        </span>
                      </motion.div>
                    )}

                  </div>
                </div>

                {/* Enhanced Content Tabs */}
                <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl hover:shadow-emerald-500/20 transition-all duration-500 relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400/50 to-teal-400/50"></div>
                  
                  {/* Enhanced Tab Headers */}
                  <div className="flex border-b border-white/20 relative">
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTabChange('readme')}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                        activeTab === 'readme'
                          ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/10'
                          : 'text-white/60 hover:text-white/80'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Subject Description</span>
                      </div>
                    </motion.button>
                    {selectedProject.projectObject.type === 'project' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTabChange('audit')}
                        className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                          activeTab === 'audit'
                            ? 'text-orange-400 border-b-2 border-orange-400 bg-orange-500/10'
                            : 'text-white/60 hover:text-white/80'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Star className="w-4 h-4" />
                          <span>Audit Questions</span>
                        </div>
                      </motion.button>
                    )}
                  </div>

                  {/* Enhanced Tab Content */}
                  <div className="p-6 sm:p-8 pt-8 pb-8 relative">
                    {loadingMarkdown ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center py-16"
                      >
                        <div className="flex flex-col items-center space-y-4">
                          <div className="relative">
                            <div className="w-8 h-8 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-400/20 rounded-full animate-pulse"></div>
                          </div>
                          <div className="text-center">
                            <span className="text-white/70 font-medium">Loading {activeTab === 'readme' ? 'description' : 'questions'}...</span>
                            <p className="text-white/50 text-sm mt-1">Fetching content from repository</p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        {/* Enhanced Scrollable Content */}
                        <div className={`overflow-y-auto invisible-scrollbar pr-2 ${
                          shouldFixContent 
                            ? 'max-h-[calc(100vh-400px)]' 
                            : 'max-h-[70vh]'
                        }`}>
                          {/* Gradient fade at top and bottom */}
                          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10"></div>
                          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/10 to-transparent pointer-events-none z-10"></div>
                          <div 
                            className="prose prose-invert prose-sm max-w-none text-white/90 text-sm leading-relaxed markdown-content"
                            style={{
                              '--tw-prose-body': 'rgb(255 255 255 / 0.9)',
                              '--tw-prose-headings': 'rgb(255 255 255)',
                              '--tw-prose-lead': 'rgb(255 255 255 / 0.8)',
                              '--tw-prose-links': 'rgb(59 130 246)',
                              '--tw-prose-bold': 'rgb(255 255 255)',
                              '--tw-prose-counters': 'rgb(255 255 255 / 0.6)',
                              '--tw-prose-bullets': 'rgb(255 255 255 / 0.6)',
                              '--tw-prose-hr': 'rgb(255 255 255 / 0.2)',
                              '--tw-prose-quotes': 'rgb(255 255 255 / 0.8)',
                              '--tw-prose-quote-borders': 'rgb(59 130 246 / 0.3)',
                              '--tw-prose-captions': 'rgb(255 255 255 / 0.6)',
                              '--tw-prose-code': 'rgb(255 255 255)',
                              '--tw-prose-pre-code': 'rgb(255 255 255)',
                              '--tw-prose-pre-bg': 'rgb(0 0 0 / 0.3)',
                              '--tw-prose-th-borders': 'rgb(255 255 255 / 0.3)',
                              '--tw-prose-td-borders': 'rgb(255 255 255 / 0.2)'
                            } as React.CSSProperties}
                            dangerouslySetInnerHTML={{ __html: markdownContent }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-3xl p-12 lg:p-16 border border-white/20 text-center relative overflow-hidden shadow-2xl"
              >
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-300/10 to-teal-300/10 rounded-full blur-2xl opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-300/10 to-cyan-300/10 rounded-full blur-2xl opacity-60"></div>
                
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut"
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-400/30 shadow-2xl relative z-10"
                >
                  <FileText className="w-12 h-12 text-emerald-400" />
                </motion.div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4">Explore Learning Materials</h3>
                  <p className="text-white/70 text-lg mb-6 max-w-md mx-auto">
                    Select a subject from the navigator to dive into detailed documentation, requirements, and learning resources.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 text-sm">
                    <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-400/30">
                      📚 Comprehensive docs
                    </span>
                    <span className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-full border border-teal-400/30">
                      🎯 Clear requirements
                    </span>
                    <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-400/30">
                      ⚡ Interactive content
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, color, subValue, trend, bgGradient }: { 
  icon: React.ElementType, 
  title: string, 
  value: string | number, 
  color: string,
  subValue?: string,
  trend?: { value: number, isPositive: boolean },
  bgGradient?: string
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`${bgGradient || 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 dark:from-slate-800/50 dark:to-slate-900/50 light:from-white/80 light:to-slate-50/80'} backdrop-blur-lg rounded-2xl p-6 border border-white/10 dark:border-white/10 light:border-slate-300/30 hover:border-white/20 dark:hover:border-white/20 light:hover:border-slate-400/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl group`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} backdrop-blur-sm`}>
        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
      </div>
      {trend && (
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
          trend.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
    <h3 className="text-3xl font-bold text-white dark:text-white light:text-slate-900 mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300">{value}</h3>
    <p className="text-white/70 dark:text-white/70 light:text-slate-700 text-sm font-medium">{title}</p>
    {subValue && <p className="text-white/50 dark:text-white/50 light:text-slate-600 text-xs mt-2 bg-white/5 dark:bg-white/5 light:bg-slate-800/10 rounded-lg px-2 py-1">{subValue}</p>}
  </motion.div>
);

export default SubjectsSection;
