import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Book, Search, Code, FileText, ExternalLink, Target, Users, Star, Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { useQuery, gql } from '@apollo/client';
import { marked } from 'marked';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loadingMarkdown, setLoadingMarkdown] = useState<boolean>(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['piscine-go']));
  const [activeTab, setActiveTab] = useState<'readme' | 'audit'>('readme');

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
    
    const modules = data.object.filter((obj: ProjectObject) => obj.type === 'module');
    console.log('🔍 Available modules:', modules.map((m: ProjectObject) => ({ id: m.id, name: m.name })));
    
    const div01Module = data.object.find((obj: ProjectObject) => 
      obj.type === 'module' && 
      obj.name === 'Div 01'
    );
    
    console.log('🔍 Div 01 module found:', !!div01Module);
    if (div01Module) {
      console.log('🔍 Div 01 structure:', div01Module.attrs?.graph?.innerCircle ? 'Has innerCircle' : 'No innerCircle');
    }
    
    if (div01Module?.attrs?.graph?.innerCircle) {
      console.log('🔍 Found Div 01 module, extracting project hierarchy...');
      
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
              console.log(`📁 Standalone project: ${item}`);
            } else if (typeof item === 'object' && item !== null) {
              Object.keys(item).forEach(parentName => {
                const children = (item as Record<string, unknown>)[parentName];
                if (Array.isArray(children)) {
                  children.forEach((childName: string) => {
                    hierarchy[childName] = `${parentName}/${childName}`;
                    console.log(`📁 Mapped: ${childName} → ${parentName}/${childName}`);
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
    
    console.log(`🎯 Extracted ${Object.keys(hierarchy).length} project mappings from Div 01 module`);
    
    if (Object.keys(hierarchy).length === 0) {
      console.log('⚠️ No module hierarchy found, using fallback essential mappings');
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
      console.log(`🔄 Added ${Object.keys(fallbackMappings).length} fallback mappings`);
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
      
      console.log(`🔍 Fetching README for "${projectName}" using ${possiblePaths.length} path(s)`);
      
      for (const fileUrl of possiblePaths) {
        try {
          const response = await fetch(fileUrl);
          if (response.ok) {
            markdownContent = await response.text();
            baseUrl = fileUrl.substring(0, fileUrl.lastIndexOf('/'));
            console.log(`✅ Successfully loaded README for "${projectName}" (${markdownContent.length} chars)`);
            break;
          }
        } catch {
        }
      }
      
      if (!markdownContent) {
        console.error(`🚫 No ${fileName} found for "${projectName}" in any of ${possiblePaths.length} locations`);
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
      console.error(`❌ Error fetching ${fileType} for "${projectName}":`, error);
      
      const fileDisplay = fileType === 'readme' ? 'README' : 'audit.md';
      
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
      console.log(`🔍 Finding path for project "${projectName}"`);
      
      for (const pathItem of paths) {
        const path = pathItem.path;
        
        if (path.includes(`/${projectName}`)) {
          console.log(`✅ Direct match found: ${path}`);
          return path;
        }
        
        const convertedPath = convertProjectNameToPath(projectName);
        if (convertedPath !== projectName && path.includes(`/${convertedPath}`)) {
          console.log(`✅ Converted path match found: ${path} for ${convertedPath}`);
          return path;
        }
        
        if (path.endsWith(`/${projectName}`)) {
          console.log(`✅ End match found: ${path}`);
          return path;
        }
        
        const pathSegments = path.split('/');
        const lastSegment = pathSegments[pathSegments.length - 1];
        if (lastSegment === projectName) {
          console.log(`✅ Last segment match found: ${path}`);
          return path;
        }
        
        if (convertedPath.includes('/')) {
          const [parent, child] = convertedPath.split('/');
          if (path.includes(`/${parent}`) && path.includes(child)) {
            console.log(`✅ Parent-child match found: ${path} for ${parent}/${child}`);
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
            console.log(`✅ Parent pattern match found: ${path} for pattern ${pattern}`);
            return path;
          }
        }
        
        const kebabCase = projectName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        if (kebabCase !== projectName && path.includes(kebabCase)) {
          console.log(`✅ Kebab-case match found: ${path} for ${kebabCase}`);
          return path;
        }
      }
      
      console.log(`❌ No path found for project "${projectName}"`);
      return ''; // No matching path found
    };
    
    console.log(`📊 Total objects from GraphQL: ${data.object?.length || 0}`);
    console.log(`📊 Total paths from GraphQL: ${data.path?.length || 0}`);
    
    const objectTypes = data.object.reduce((acc: Record<string, number>, obj: ProjectObject) => {
      acc[obj.type] = (acc[obj.type] || 0) + 1;
      return acc;
    }, {});
    console.log('📊 Object types breakdown:', objectTypes);
    
    ['exercise', 'project', 'module'].forEach(type => {
      const examples = data.object.filter((obj: ProjectObject) => obj.type === type).slice(0, 3);
      if (examples.length > 0) {
        console.log(`📋 Sample ${type}s:`, examples.map((obj: ProjectObject) => ({
          name: obj.name,
          hasAttrs: !!obj.attrs,
          hasEvents: obj.events?.length > 0,
          campus: obj.campus
        })));
      }
    });
    
    const existingProjectNames = new Set(data.object.map((obj: ProjectObject) => obj.name));
    
    const virtualProjects: ProjectObject[] = [];
    
    Object.keys(projectHierarchy).forEach(projectName => {
      if (!existingProjectNames.has(projectName)) {
        console.log(`🔧 Creating virtual project for "${projectName}" from module data`);
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
    
    console.log(`🔧 Created ${virtualProjects.length} virtual projects`);
    
    const allObjects = [...data.object, ...virtualProjects];
    
    return allObjects
      .filter((obj: ProjectObject) => {
        if (obj.campus !== 'bahrain') {
          console.log(`❌ Filtered out "${obj.name}" - wrong campus: ${obj.campus}`);
          return false;
        }
        
        if (obj.type === 'module') {
          console.log(`📁 Skipping module "${obj.name}" from display`);
          return false;
        }
        
        if (!obj.name || obj.name.trim() === '') {
          console.log(`❌ Filtered out object with ID "${obj.id}" - no valid name`);
          return false;
        }
        
        if (obj.type === 'exercise' || obj.type === 'project') {
          const hasAttrs = obj.attrs && typeof obj.attrs === 'object';
          const hasEvents = obj.events && obj.events.length > 0;
          
          if (!hasAttrs && !hasEvents) {
            console.log(`❌ Filtered out "${obj.name}" (${obj.type}) - no meaningful content`);
            return false;
          }
        }
        
        let matchingPath = '';
        if (String(obj.id).startsWith('virtual-')) {
          const convertedPath = getProjectPath(obj.name);
          if (convertedPath !== obj.name) {
            const parentProject = convertedPath.split('/')[0];
            matchingPath = `/bahrain/bh-module/${parentProject}/${obj.name}`;
            console.log(`🔧 Created synthetic path for virtual project "${obj.name}": ${matchingPath}`);
          } else {
            matchingPath = `/bahrain/bh-module/${obj.name}`;
            console.log(`🔧 Created synthetic path for standalone virtual project "${obj.name}": ${matchingPath}`);
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
        
        if (!shouldInclude) {
          console.log(`❌ Filtered out "${obj.name}" (${obj.type}) - no valid path or content`);
        } else {
          console.log(`✅ Including "${obj.name}" (${obj.type}) with path: ${matchingPath || 'content-based'}`);
        }
        
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

  const loadTabContent = async (project: Project, tabType: 'readme' | 'audit') => {
    console.log(`Loading ${tabType} for project:`, project.name, 'Type:', project.projectObject.type);
    
    if (tabType === 'audit' && project.projectObject.type === 'exercise') {
      console.log(`⚠️ Skipping audit load for exercise "${project.name}"`);
      setMarkdownContent(`# ${project.name}\n\n**This is an exercise**\n\nExercises do not have audit questions. Only projects have audit requirements.`);
      return;
    }
    
    setLoadingMarkdown(true);
    try {
      const content = await fetchProjectContent(project.name, tabType, project.projectObject);
      console.log(`Successfully loaded ${tabType} content, length:`, content.length);
      setMarkdownContent(content);
    } catch (error) {
      console.error(`Error loading ${tabType}:`, error);
      setMarkdownContent(`# ${project.name}\n\n**Error loading ${tabType}**\n\nCould not load ${tabType} content. Please try again later.`);
    } finally {
      setLoadingMarkdown(false);
    }
  };

  const handleProjectSelect = async (project: Project) => {
    console.log('Selecting project:', project.name, 'Type:', project.projectObject.type);
    setSelectedProject(project);
    setActiveTab('readme'); // Reset to README tab
    await loadTabContent(project, 'readme');
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
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading projects...</p>
        </motion.div>
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
    <div className="bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 min-h-full relative">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 35px 35px, rgba(52, 211, 153, 0.1) 2px, transparent 0)`,
          backgroundSize: '70px 70px'
        }}></div>
      </div>

      <div className="relative z-10 space-y-8 p-6">
        {/* Enhanced Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
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
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent mb-4">
              Subjects Dashboard
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Explore <span className="text-emerald-400 font-semibold">{projects.length}</span> projects & exercises
            </p>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-emerald-400/20">
              <Search className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Search & Filter Projects</h3>
              <p className="text-sm text-white/60">Find projects by name, language, type or difficulty</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

        {/* Main Content with Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-6"
        >
          {/* Tree Navigation Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-emerald-400/20 transition-all duration-300 shadow-xl h-[calc(100vh-300px)] flex flex-col sticky top-6">
              <div className="p-4 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-emerald-400/20">
                    <Folder className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Project Tree</h3>
                </div>
              </div>
              <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
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

          {/* Project Details */}
          <div className="flex-1">
            {selectedProject ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Project Stats and Metadata */}
                <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10">
                  <div className="flex items-center space-x-4 mb-6">
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
                        <span className={`text-xs px-3 py-1 rounded-full border ${getLanguageColor(selectedProject.language)}`}>
                          {selectedProject.language}
                        </span>
                        <span className={`text-xs px-3 py-1 rounded-full border ${getDifficultyColor(selectedProject.difficulty)}`}>
                          {selectedProject.difficulty}
                        </span>
                        <span className={`text-xs px-3 py-1 rounded-full border ${
                          selectedProject.projectObject.type === 'project' 
                            ? 'text-blue-400 bg-blue-500/20 border-blue-500/30'
                            : 'text-gray-400 bg-gray-500/20 border-gray-500/30'
                        }`}>
                          {selectedProject.projectObject.type}
                        </span>
                      </div>
                    </div>
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

                    {selectedProject.expectedFiles.length > 0 && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <FileText className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium text-white">Expected Files</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {selectedProject.expectedFiles.slice(0, 2).map((file, index) => (
                            <span key={index} className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded font-mono">
                              {file}
                            </span>
                          ))}
                          {selectedProject.expectedFiles.length > 2 && (
                            <span className="text-xs bg-white/10 text-white/50 px-2 py-1 rounded">
                              +{selectedProject.expectedFiles.length - 2} more
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* External Link */}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={(() => {
                      const projectPath = getProjectPath(selectedProject.name);
                      return `https://github.com/01-edu/public/tree/master/subjects/${projectPath}`;
                    })()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg px-4 py-2 text-blue-400 transition-all duration-300 text-sm"
                  >
                    <span>View in Repository</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>

                {/* Content Tabs */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  {/* Tab Headers */}
                  <div className="flex border-b border-white/10">
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
                        <span>Project Description</span>
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

                  {/* Tab Content */}
                  <div className="p-6">
                    {loadingMarkdown ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center py-12"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-white/60">Loading {activeTab === 'readme' ? 'description' : 'questions'}...</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-h-96 overflow-y-auto custom-scrollbar"
                      >
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
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 text-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <FileText className="w-8 h-8 text-white/40" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">Select a Project</h3>
                <p className="text-white/60">Choose a project from the tree to view its details and documentation.</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubjectsSection;