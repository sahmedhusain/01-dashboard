import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Book, Search, Code, FileText, ExternalLink, Target, Users, Star, Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { useQuery, gql } from '@apollo/client';
import { marked } from 'marked';

// GraphQL query to fetch ALL BH projects with complete metadata
const GET_ALL_BH_PROJECTS = gql`
  query GetAllBHProjects {
    # Get all BH paths (modules and piscines)
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
    
    # Get objects data with complete metadata (including modules for hierarchy extraction)
    object(
      where: {
        campus: { _eq: "bahrain" }
        type: { _in: ["exercise", "project", "module"] }
      }
      order_by: { name: asc }
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

  // Fetch ALL BH projects from GraphQL
  const { data, loading, error } = useQuery(GET_ALL_BH_PROJECTS);

  // Function to determine difficulty based on project attributes
  const getDifficulty = (projectObject: ProjectObject): 'Beginner' | 'Intermediate' | 'Advanced' => {
    const allowedFunctions = projectObject.attrs.allowedFunctions?.length || 0;
    const expectedFiles = projectObject.attrs.expectedFiles?.length || 0;
    const hasValidations = (projectObject.attrs.validations?.length || 0) > 0;
    
    if (allowedFunctions <= 3 && expectedFiles <= 2 && !hasValidations) return 'Beginner';
    if (allowedFunctions <= 8 && expectedFiles <= 5) return 'Intermediate';
    return 'Advanced';
  };

  // Memoize the project hierarchy extraction to prevent infinite loops
  const projectHierarchy = useMemo(() => {
    if (!data?.object) return {};
    
    const hierarchy: { [key: string]: string } = {};
    
    // Debug: Check what modules are available
    const modules = data.object.filter((obj: any) => obj.type === 'module');
    console.log('🔍 Available modules:', modules.map((m: any) => ({ id: m.id, name: m.name })));
    
    // Find Div 01 module which contains the main project structure
    const div01Module = data.object.find((obj: any) => 
      obj.type === 'module' && 
      obj.name === 'Div 01'
    );
    
    console.log('🔍 Div 01 module found:', !!div01Module);
    if (div01Module) {
      console.log('🔍 Div 01 structure:', div01Module.attrs?.graph?.innerCircle ? 'Has innerCircle' : 'No innerCircle');
    }
    
    if (div01Module?.attrs?.graph?.innerCircle) {
      console.log('🔍 Found Div 01 module, extracting project hierarchy...');
      
      div01Module.attrs.graph.innerCircle.forEach((slice: any) => {
        const processContents = (contents: any[]) => {
          contents.forEach((item: any) => {
            if (typeof item === 'string') {
              // Simple standalone project - no parent mapping needed
              console.log(`📁 Standalone project: ${item}`);
            } else if (typeof item === 'object') {
              // Parent project with nested children
              Object.keys(item).forEach(parentName => {
                const children = item[parentName];
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
        
        // Process inner arc contents
        if (slice.innerArc?.contents) {
          processContents(slice.innerArc.contents);
        }
        
        // Process outer arcs contents
        if (slice.outerArcs) {
          slice.outerArcs.forEach((arc: any) => {
            if (arc.contents) {
              processContents(arc.contents);
            }
          });
        }
      });
    }
    
    console.log(`🎯 Extracted ${Object.keys(hierarchy).length} project mappings from Div 01 module`);
    
    // If no hierarchy was extracted, provide fallback essential mappings
    if (Object.keys(hierarchy).length === 0) {
      console.log('⚠️ No module hierarchy found, using fallback essential mappings');
      const fallbackMappings = {
        // Essential mappings from the original test file structure
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
    // Use the memoized project hierarchy
    if (projectHierarchy[projectName]) {
      return projectHierarchy[projectName];
    }
    
    // Fallback to minimal static mappings for projects not in Div 01 module
    const staticMappings: { [key: string]: string } = {
      // Non-Div 01 projects that still need mapping
      'checkpoints': 'java/checkpoints',
      'piscine': 'java/piscine', 
      'projects': 'java/projects',
      'raids': 'java/raids',
      'financial-instruments': 'blockchain/financial-instruments'
    };
    
    return staticMappings[projectName] || projectName;
  }, [projectHierarchy]);

  // Function to fetch content (README.md or audit.md) with comprehensive path handling
  const fetchProjectContent = async (projectName: string, fileType: 'readme' | 'audit', projectObject?: ProjectObject): Promise<string> => {
    // Use the comprehensive path mapping function
    const convertProjectNameToPath = (name: string) => getProjectPath(name);

    try {
      const fileName = fileType === 'readme' ? 'README.md' : 'audit.md';
      const possiblePaths: string[] = [];
      
      // Helper function to convert various GraphQL paths to GitHub URLs
      const convertGraphQLPathToGitHub = (graphqlPath: string, targetFileName: string): string[] => {
        const urls: string[] = [];
        
        if (graphqlPath.includes('/markdown/root/public/subjects/')) {
          // Pattern: /markdown/root/public/subjects/... -> subjects/...
          const afterSubjects = graphqlPath.split('/subjects/')[1];
          const dirPath = afterSubjects.replace('/README.md', '').replace('/audit/README.md', '');
          
          // Try converted path for nested projects
          const convertedPath = convertProjectNameToPath(dirPath);
          urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${convertedPath}/${targetFileName}`);
          
          // Also try original path if different
          if (convertedPath !== dirPath) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${dirPath}/${targetFileName}`);
          }
          
        } else if (graphqlPath.includes('/api/content/root/01-edu_module/content/')) {
          // Pattern: /api/content/root/01-edu_module/content/... -> subjects/...
          const afterContent = graphqlPath.split('/content/')[1];
          const projectPath = afterContent.replace('/README.md', '').replace('/audit/README.md', '');
          
          // First try to convert project name to nested path
          const convertedPath = convertProjectNameToPath(projectPath);
          urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${convertedPath}/${targetFileName}`);
          
          // Also try original path if different
          if (convertedPath !== projectPath) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${projectPath}/${targetFileName}`);
          }
          
          // Try kebab-case variation
          const kebabCase = projectPath.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
          if (kebabCase !== projectPath) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${kebabCase}/${targetFileName}`);
          }
          
          // Try other possible root directories found in the repository
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
          // Pattern: /api/content/root/01-edu_imperative-piscine/content/... -> subjects/...
          const afterContent = graphqlPath.split('/content/')[1];
          const dirPath = afterContent.replace('/README.md', '').replace('/audit/README.md', '');
          
          // Try converted path for nested projects
          const convertedPath = convertProjectNameToPath(dirPath);
          urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${convertedPath}/${targetFileName}`);
          
          // Also try original path if different
          if (convertedPath !== dirPath) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${dirPath}/${targetFileName}`);
          }
        } else {
          // For other paths, try to extract the project name and convert
          const pathParts = graphqlPath.split('/');
          const projectName = pathParts[pathParts.length - 1].replace('/README.md', '').replace('/audit/README.md', '');
          
          const convertedPath = convertProjectNameToPath(projectName);
          urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${convertedPath}/${targetFileName}`);
          
          // Try original project name
          if (convertedPath !== projectName) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${projectName}/${targetFileName}`);
          }
          
          // Try kebab-case
          const kebabCase = projectName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
          if (kebabCase !== projectName) {
            urls.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${kebabCase}/${targetFileName}`);
          }
          
          // Also try under different root directories
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

      // Always start with hardcoded mapping first - this should be our primary source
      const convertedProjectPath = convertProjectNameToPath(projectName);
      
      // Primary path using hardcoded mapping
      if (convertedProjectPath !== projectName) {
        // This is a nested project - use the exact mapping
        possiblePaths.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${convertedProjectPath}/${fileName}`);
      } else {
        // This is a standalone project
        possiblePaths.push(`https://raw.githubusercontent.com/01-edu/public/master/subjects/${projectName}/${fileName}`);
      }
      
      // Only use GraphQL paths as backup if hardcoded mapping didn't work
      if (projectObject?.attrs?.subject) {
        const subjectPath = typeof projectObject.attrs.subject === 'string' 
          ? projectObject.attrs.subject 
          : projectObject.attrs.subject.name || '';
          
        // Only add GraphQL paths if they're different from our hardcoded paths
        if (subjectPath && fileType === 'readme' && !subjectPath.includes('getSubject')) {
          const graphqlPaths = convertGraphQLPathToGitHub(subjectPath, fileName);
          // Filter out any paths we already have
          const newPaths = graphqlPaths.filter(path => !possiblePaths.includes(path));
          possiblePaths.push(...newPaths);
        } else if (fileType === 'audit') {
          // For audit files, look for validation forms
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

      // Add minimal fallbacks only if needed
      if (possiblePaths.length === 0) {
        // Final fallback paths (should be very rare with comprehensive hardcoded mappings)
        possiblePaths.push(
          `https://raw.githubusercontent.com/01-edu/public/master/subjects/${projectName.toLowerCase()}/${fileName}`,
        );
        
        // Try alternative root directories as last resort
        const rootDirs = ['js', 'sh', 'dom'];
        for (const rootDir of rootDirs) {
          possiblePaths.push(`https://raw.githubusercontent.com/01-edu/public/master/${rootDir}/${projectName}/${fileName}`);
        }
      }

      // Try each possible path until one works
      let markdownContent = '';
      let baseUrl = '';
      
      console.log(`🔍 Fetching README for "${projectName}" using ${possiblePaths.length} path(s)`);
      
      for (const fileUrl of possiblePaths) {
        try {
          const response = await fetch(fileUrl);
          if (response.ok) {
            markdownContent = await response.text();
            // Store the base URL for asset resolution
            baseUrl = fileUrl.substring(0, fileUrl.lastIndexOf('/'));
            console.log(`✅ Successfully loaded README for "${projectName}" (${markdownContent.length} chars)`);
            break;
          }
        } catch (urlError) {
          // Silently continue to next URL
        }
      }
      
      if (!markdownContent) {
        console.error(`🚫 No ${fileName} found for "${projectName}" in any of ${possiblePaths.length} locations`);
        throw new Error(`No ${fileName} found in any expected location for "${projectName}". Tried ${possiblePaths.length} URLs.`);
      }

      // Process markdown content to fix relative links and assets with improved decoding
      const processMarkdownAssets = (content: string, baseUrl: string): string => {
        // First, decode any HTML entities that might be in the raw markdown
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
          // Fix relative image links
          .replace(/!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g, `![$1](${baseUrl}/$2)`)
          // Fix relative links
          .replace(/\[([^\]]+)\]\((?!https?:\/\/)([^)#]+)(?:#([^)]*))?\)/g, (_, text, url, fragment) => {
            if (url.startsWith('../')) {
              // Handle parent directory references
              const parentUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/'));
              const resolvedUrl = url.replace('../', `${parentUrl}/`);
              return `[${text}](${resolvedUrl}${fragment ? '#' + fragment : ''})`;
            } else if (url.endsWith('.md')) {
              // Convert markdown links to GitHub blob view
              const githubUrl = baseUrl.replace('raw.githubusercontent.com', 'github.com').replace('/master/', '/blob/master/');
              return `[${text}](${githubUrl}/${url}${fragment ? '#' + fragment : ''})`;
            } else {
              // Regular relative file
              return `[${text}](${baseUrl}/${url}${fragment ? '#' + fragment : ''})`;
            }
          })
          // Clean up any malformed HTML that might have been introduced
          .replace(/<\s*br\s*\/?>/gi, '\n')
          .replace(/<\s*p\s*>/gi, '\n\n')
          .replace(/<\/\s*p\s*>/gi, '')
          // Normalize line breaks
          .replace(/\r\n/g, '\n')
          .replace(/\r/g, '\n')
          // Clean up excessive whitespace
          .replace(/\n{3,}/g, '\n\n')
          .trim();
      };

      // Process the markdown content
      const processedContent = processMarkdownAssets(markdownContent, baseUrl);
      
      // Configure marked for better markdown processing
      marked.setOptions({
        breaks: true,
        gfm: true
      });
      
      // Convert markdown to HTML using marked with improved processing
      const htmlContent = marked(processedContent);
      
      return htmlContent;
      
    } catch (error) {
      console.error(`❌ Error fetching ${fileType} for "${projectName}":`, error);
      
      const fileDisplay = fileType === 'readme' ? 'README' : 'audit.md';
      
      // Try to construct a helpful GitHub link for manual access
      const convertedPath = getProjectPath(projectName);
      const githubUrl = `https://github.com/01-edu/public/tree/master/subjects/${convertedPath}`;
      
      return `# ${projectName}

## Project Information

${projectObject ? `
**Language:** ${projectObject.attrs.language || 'Not specified'}  
**Type:** ${projectObject.type}  
**Created:** ${new Date(projectObject.createdAt).toLocaleDateString()}

### Expected Files:
${projectObject.attrs.expectedFiles ? projectObject.attrs.expectedFiles.map(file => `- \`${file}\``).join('\n') : 'Not specified'}

### Requirements:
This project requires specific implementation details. Please check the project repository for complete instructions.
` : ''}

### 📋 ${fileDisplay} Not Available

The ${fileDisplay} content could not be loaded automatically. This might be because:
- The file doesn't exist in the expected location
- The project structure is different than expected
- Network connectivity issues

### 🔗 Manual Access

You can try accessing the project directly:
- **GitHub Repository:** [View ${projectName} on GitHub](${githubUrl})
- **Direct README:** [${projectName}/README.md](${githubUrl}/README.md)

### 🔧 Debug Information

**Error:** ${error instanceof Error ? error.message : String(error)}`;
    }
  };

  // Transform data into projects array
  const projects: Project[] = useMemo(() => {
    if (!data?.object) return [];
    
    // Use the comprehensive path mapping function
    const convertProjectNameToPath = (name: string) => getProjectPath(name);
    
    // Helper function to find matching path for a project
    const findProjectPath = (obj: ProjectObject, paths: PathData[]): string => {
      const projectName = obj.name;
      console.log(`🔍 Finding path for project "${projectName}"`);
      
      // Try different path matching strategies
      for (const pathItem of paths) {
        const path = pathItem.path;
        
        // Strategy 1: Direct name match
        if (path.includes(`/${projectName}`)) {
          console.log(`✅ Direct match found: ${path}`);
          return path;
        }
        
        // Strategy 2: Match with converted path (parent-child structure)
        const convertedPath = convertProjectNameToPath(projectName);
        if (convertedPath !== projectName && path.includes(`/${convertedPath}`)) {
          console.log(`✅ Converted path match found: ${path} for ${convertedPath}`);
          return path;
        }
        
        // Strategy 3: Check if path ends with project name (handles nested structures)
        if (path.endsWith(`/${projectName}`)) {
          console.log(`✅ End match found: ${path}`);
          return path;
        }
        
        // Strategy 4: Match by project path segments (for complex nested structures)
        const pathSegments = path.split('/');
        const lastSegment = pathSegments[pathSegments.length - 1];
        if (lastSegment === projectName) {
          console.log(`✅ Last segment match found: ${path}`);
          return path;
        }
        
        // Strategy 5: Check parent directory patterns
        if (convertedPath.includes('/')) {
          const [parent, child] = convertedPath.split('/');
          if (path.includes(`/${parent}`) && path.includes(child)) {
            console.log(`✅ Parent-child match found: ${path} for ${parent}/${child}`);
            return path;
          }
        }
        
        // Strategy 6: Check if project name is part of the path with parent context
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
        
        // Strategy 7: Try kebab-case variations
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
    
    // Get all project names from GraphQL objects
    const existingProjectNames = new Set(data.object.map((obj: ProjectObject) => obj.name));
    
    // Create virtual objects for nested projects from module data
    const virtualProjects: ProjectObject[] = [];
    
    // Create virtual projects for missing nested projects from the memoized hierarchy
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
    
    // Combine real objects with virtual projects
    const allObjects = [...data.object, ...virtualProjects];
    
    return allObjects
      .filter((obj: ProjectObject) => {
        // Only include Bahrain campus objects
        if (obj.campus !== 'bahrain') {
          return false;
        }
        
        // Exclude module objects from display (they're only used for hierarchy extraction)
        if (obj.type === 'module') {
          return false;
        }
        
        // For virtual projects, create synthetic paths
        let matchingPath = '';
        if (String(obj.id).startsWith('virtual-')) {
          // This is a virtual project - create a synthetic path
          const convertedPath = getProjectPath(obj.name);
          if (convertedPath !== obj.name) {
            // This is a nested project
            const parentProject = convertedPath.split('/')[0];
            matchingPath = `/bahrain/bh-module/${parentProject}/${obj.name}`;
            console.log(`🔧 Created synthetic path for virtual project "${obj.name}": ${matchingPath}`);
          } else {
            // This is a standalone virtual project
            matchingPath = `/bahrain/bh-module/${obj.name}`;
            console.log(`🔧 Created synthetic path for standalone virtual project "${obj.name}": ${matchingPath}`);
          }
        } else {
          // This is a real project - find matching path
          matchingPath = findProjectPath(obj, data.path || []);
        }
        
        // Include objects that have corresponding paths in bh-module or bh-piscine
        const hasValidPath = matchingPath && 
               (matchingPath.includes('/bahrain/bh-module/') || 
                matchingPath.includes('/bahrain/bh-piscine/'));
        
        if (!hasValidPath) {
          console.log(`❌ Filtered out "${obj.name}" - no valid path found`);
        } else {
          console.log(`✅ Including "${obj.name}" with path: ${matchingPath}`);
        }
        
        return hasValidPath;
      })
      .map((obj: ProjectObject) => {
        // Ensure name is always a string
        const projectName = typeof obj.attrs.displayedName === 'string' 
          ? obj.attrs.displayedName 
          : typeof obj.name === 'string' 
            ? obj.name 
            : 'Project';
            
        // Find the actual path for this project
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

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = !searchTerm || 
        project.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = !languageFilter || 
        project.language.toLowerCase() === languageFilter.toLowerCase();
      const matchesDifficulty = !difficultyFilter || 
        project.difficulty === difficultyFilter;
      const matchesType = !typeFilter || 
        project.projectObject.type === typeFilter;
      
      return matchesSearch && matchesLanguage && matchesDifficulty && matchesType;
    });
  }, [projects, searchTerm, languageFilter, difficultyFilter, typeFilter]);

  // Get unique languages and difficulties
  const availableLanguages = useMemo(() => {
    const languages = [...new Set(projects.map(p => p.language))].filter(Boolean).sort();
    return languages;
  }, [projects]);

  const availableDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
  
  const availableTypes = useMemo(() => {
    const types = [...new Set(projects.map(p => p.projectObject.type))].filter(Boolean).sort();
    return types;
  }, [projects]);

  // Load content based on active tab
  const loadTabContent = async (project: Project, tabType: 'readme' | 'audit') => {
    console.log(`Loading ${tabType} for project:`, project.name);
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

  // Handle project selection
  const handleProjectSelect = async (project: Project) => {
    console.log('Selecting project:', project.name, 'Type:', project.projectObject.type);
    setSelectedProject(project);
    setActiveTab('readme'); // Reset to README tab
    await loadTabContent(project, 'readme');
  };

  // Handle tab change
  const handleTabChange = async (newTab: 'readme' | 'audit') => {
    if (selectedProject && newTab !== activeTab) {
      setActiveTab(newTab);
      await loadTabContent(selectedProject, newTab);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setLanguageFilter('');
    setDifficultyFilter('');
    setTypeFilter('');
  };

  // Build flattened tree structure from paths and projects
  const treeStructure = useMemo(() => {
    if (!data?.path || !data?.object) return {};
    
    const tree = {};
    const projectPaths = data.path.filter((p: PathData) => 
      p.path.includes('/bahrain/bh-module/') || 
      p.path.includes('/bahrain/bh-piscine/')
    );

    projectPaths.forEach((pathItem: PathData) => {
      const pathParts = pathItem.path.split('/').filter(Boolean);
      
      // Remove "bahrain" and extract actual project structure
      let relevantParts = [];
      if (pathItem.path.includes('/bahrain/bh-module/')) {
        // Remove "bahrain" and "bh-module", keep the rest
        relevantParts = pathParts.slice(2);
      } else if (pathItem.path.includes('/bahrain/bh-piscine/')) {
        // Remove "bahrain", replace "bh-piscine" with "piscine-go", keep the rest
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

  // Attach projects to tree structure after both are calculated
  const treeWithProjects = useMemo(() => {
    if (!treeStructure || !projects.length) return treeStructure;
    
    const attachProjects = (node: any): any => {
      const updatedNode = { ...node };
      
      // If this is a project node, find and attach the matching project
      if (updatedNode.isProject && updatedNode.path) {
        updatedNode.project = projects.find(p => p.path === updatedNode.path) || null;
      }
      
      // Recursively process children
      const updatedChildren: any = {};
      Object.keys(updatedNode.children || {}).forEach(key => {
        updatedChildren[key] = attachProjects(updatedNode.children[key]);
      });
      updatedNode.children = updatedChildren;
      
      return updatedNode;
    };
    
    const result: any = {};
    Object.keys(treeStructure).forEach(key => {
      result[key] = attachProjects((treeStructure as any)[key]);
    });
    
    return result;
  }, [treeStructure, projects]);

  // Toggle folder expansion
  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Advanced': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  // Get language color
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      'go': 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
      'js': 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      'javascript': 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      'python': 'text-blue-400 bg-blue-500/20 border-blue-500/30',
      'rust': 'text-orange-400 bg-orange-500/20 border-orange-500/30',
      'java': 'text-red-400 bg-red-500/20 border-red-500/30',
      'c': 'text-gray-400 bg-gray-500/20 border-gray-500/30',
      'dom': 'text-purple-400 bg-purple-500/20 border-purple-500/30',
      'blockchain': 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30',
    };
    return colors[language.toLowerCase()] || 'text-blue-400 bg-blue-500/20 border-blue-500/30';
  };

  // TreeNode component for rendering the navigation tree
  const TreeNode: React.FC<{ node: any; depth: number }> = ({ node, depth }) => {
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
          className={`flex items-center py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 ${
            isSelected 
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
              : 'hover:bg-white/5 text-white/80'
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
                <Folder className="w-4 h-4 text-yellow-400" />
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }}>
                <FileText className="w-4 h-4 text-blue-400" />
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
              .sort((a: any, b: any) => {
                // Folders first, then files
                const aHasChildren = Object.keys(a.children).length > 0;
                const bHasChildren = Object.keys(b.children).length > 0;
                
                if (aHasChildren && !bHasChildren) return -1;
                if (!aHasChildren && bHasChildren) return 1;
                
                // If both are folders or both are files, sort alphabetically
                return a.name.localeCompare(b.name);
              })
              .map((child: any) => (
                <TreeNode key={child.flattenedPath || child.name} node={child} depth={depth + 1} />
              ))}
          </motion.div>
        )}
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 min-h-full relative flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading projects...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 min-h-full relative flex items-center justify-center">
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
    <div className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 min-h-full relative">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 40px 40px, rgba(59, 130, 246, 0.1) 2px, transparent 0)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="relative z-10 space-y-8 p-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-4"
          >
            <Book className="w-10 h-10 text-blue-400" />
          </motion.div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Subjects Dashboard
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explore <span className="text-blue-400 font-semibold">{projects.length}</span> Projects & Exercises
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Search className="w-5 h-5 text-purple-400" />
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
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
              />
            </div>

            <motion.select
              whileFocus={{ scale: 1.02 }}
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm transition-all"
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
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm transition-all"
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
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm transition-all"
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
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/20"
                  >
                    Search: "{searchTerm}"
                  </motion.span>
                )}
                {languageFilter && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/20"
                  >
                    Language: {languageFilter}
                  </motion.span>
                )}
                {typeFilter && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/20"
                  >
                    Type: {typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}
                  </motion.span>
                )}
                {difficultyFilter && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm border border-yellow-500/20"
                  >
                    Difficulty: {difficultyFilter}
                  </motion.span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/20 rounded-xl text-red-400 transition-all duration-300 backdrop-blur-sm text-sm"
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
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 h-[calc(100vh-300px)] flex flex-col sticky top-6">
              <div className="p-4 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/20">
                    <Folder className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Project Tree</h3>
                </div>
              </div>
              <div className="p-3 flex-1 overflow-y-auto scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/30">
                {Object.values(treeWithProjects)
                  .sort((a: any, b: any) => {
                    // Folders first, then files
                    const aHasChildren = Object.keys(a.children).length > 0;
                    const bHasChildren = Object.keys(b.children).length > 0;
                    
                    if (aHasChildren && !bHasChildren) return -1;
                    if (!aHasChildren && bHasChildren) return 1;
                    
                    // If both are folders or both are files, sort alphabetically
                    return a.name.localeCompare(b.name);
                  })
                  .map((node: any) => (
                    <TreeNode key={node.path} node={node} depth={0} />
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
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/20"
                    >
                      <Target className="w-6 h-6 text-green-400" />
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
                      // Use the comprehensive path mapping function
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
                          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-white/60">Loading {activeTab === 'readme' ? 'description' : 'questions'}...</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/30"
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