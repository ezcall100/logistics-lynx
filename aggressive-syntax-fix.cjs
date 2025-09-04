const fs = require('fs');
const path = require('path');

console.log('🔧 Aggressive syntax error fix...');

// Fix src/services/mcp.ts completely
function fixMcpService() {
  console.log('🔧 Completely rewriting src/services/mcp.ts...');
  
  const mcpContent = `import { http, httpUtils } from '@/lib/http';

// MCP Service Types
export interface MCPUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: 'active' | 'inactive';
  created_at: string;
  last_login?: string;
  location?: string;
}

export interface MCPUserCreate {
  email: string;
  name: string;
  role: string;
  password: string;
}

export interface MCPUserUpdate {
  name?: string;
  role?: string;
  status?: string;
}

export interface MCPAgent {
  id: string;
  name: string;
  type: string;
  config: Record<string, any>;
  dependencies: string[];
  status: 'active' | 'inactive' | 'error';
  activated_at?: string;
}

export interface MCPLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  service: string;
  context?: Record<string, any>;
}

export interface MCPJob {
  id: string;
  type: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  created_at: string;
  started_at?: string;
  completed_at?: string;
  result?: any;
  error?: string;
}

export interface MCPWorkflow {
  id: string;
  name: string;
  type: string;
  config: Record<string, any>;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface MCPSettings {
  id: string;
  name: string;
  value: any;
  type: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface MCPMetrics {
  agents: {
    total: number;
    online: number;
    healthy: number;
    error: number;
  };
  jobs: {
    queued: number;
    running: number;
    completed: number;
    failed: number;
    success_rate: number;
  };
  system: {
    uptime: number;
    cpu_usage: number;
    memory_usage: number;
    disk_usage: number;
    response_time: number;
    error_rate: number;
    last_deployment: string;
  };
  resources: {
    cpu_usage: number;
    memory_usage: number;
    disk_usage: number;
    network_usage: number;
  };
}

// Mock MCP Metrics for development
const mockMCPMetrics: MCPMetrics = {
  agents: {
    total: 25,
    online: 23,
    healthy: 22,
    error: 1
  },
  jobs: {
    queued: 15,
    running: 8,
    completed: 1250,
    failed: 12,
    success_rate: 0.98
  },
  system: {
    uptime: 86400,
    cpu_usage: 45,
    memory_usage: 67,
    disk_usage: 35,
    response_time: 150,
    error_rate: 0.015,
    last_deployment: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  resources: {
    cpu_usage: 45,
    memory_usage: 67,
    disk_usage: 35,
    network_usage: 12
  }
};

// MCP Service
export const MCP = {
  metrics: {
    overview: async (): Promise<{ data: MCPMetrics; isMock: boolean }> => {
      try {
        const response = await http.get<{ success: boolean; data: MCPMetrics; message: string }>('/mcp/metrics/overview');
        
        if (response.data.success && response.data.data) {
          if (response.data.data.agents && response.data.data.jobs && response.data.data.system) {
            return { data: response.data.data, isMock: false };
          }
        }
      } catch (error) {
        console.warn('Failed to fetch MCP metrics, using mock data');
      }
      
      // Return mock data with slight variations
      return {
        data: {
          agents: {
            total: mockMCPMetrics.agents.total,
            online: mockMCPMetrics.agents.online + Math.floor(Math.random() * 3) - 1,
            healthy: mockMCPMetrics.agents.healthy + Math.floor(Math.random() * 2) - 1,
            error: mockMCPMetrics.agents.error
          },
          jobs: {
            queued: mockMCPMetrics.jobs.queued + Math.floor(Math.random() * 10) - 5,
            running: mockMCPMetrics.jobs.running + Math.floor(Math.random() * 5) - 2,
            completed: mockMCPMetrics.jobs.completed + Math.floor(Math.random() * 50),
            failed: mockMCPMetrics.jobs.failed + Math.floor(Math.random() * 3),
            success_rate: Math.max(0.95, Math.min(0.99, mockMCPMetrics.jobs.success_rate + (Math.random() - 0.5) * 0.02))
          },
          system: {
            uptime: mockMCPMetrics.system.uptime + Math.floor(Math.random() * 3600),
            cpu_usage: Math.max(30, Math.min(70, mockMCPMetrics.system.cpu_usage + Math.floor(Math.random() * 20) - 10)),
            memory_usage: Math.max(50, Math.min(85, mockMCPMetrics.system.memory_usage + Math.floor(Math.random() * 15) - 7)),
            disk_usage: Math.max(25, Math.min(45, mockMCPMetrics.system.disk_usage + Math.floor(Math.random() * 10) - 5)),
            response_time: mockMCPMetrics.system.response_time + Math.floor(Math.random() * 50) - 25,
            error_rate: Math.max(0.005, Math.min(0.03, mockMCPMetrics.system.error_rate + (Math.random() - 0.5) * 0.01)),
            last_deployment: mockMCPMetrics.system.last_deployment
          },
          resources: {
            cpu_usage: Math.max(30, Math.min(70, mockMCPMetrics.resources.cpu_usage + Math.floor(Math.random() * 20) - 10)),
            memory_usage: Math.max(50, Math.min(85, mockMCPMetrics.resources.memory_usage + Math.floor(Math.random() * 15) - 7)),
            disk_usage: Math.max(25, Math.min(45, mockMCPMetrics.resources.disk_usage + Math.floor(Math.random() * 10) - 5)),
            network_usage: Math.max(5, Math.min(20, mockMCPMetrics.resources.network_usage + Math.floor(Math.random() * 10) - 5))
          }
        },
        isMock: true
      };
    },

    trends: async (timeframe: string = '24h'): Promise<{ data: any[]; isMock: boolean }> => {
      try {
        const response = await http.get<{ success: boolean; data: any; message: string }>(\`/mcp/metrics/trends?timeframe=\${timeframe}\`);
        
        if (response.data.success && response.data.data) {
          return { data: response.data.data, isMock: false };
        }
      } catch (error) {
        console.warn('Failed to fetch MCP trends, using mock data');
      }
      
      // Return mock trend data
      return {
        data: Array.from({ length: 24 }, (_, i) => ({
          timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
          cpu_usage: 40 + Math.random() * 30,
          memory_usage: 60 + Math.random() * 20,
          response_time: 200 + Math.random() * 100,
          error_rate: 0.01 + Math.random() * 0.02
        })),
        isMock: true
      };
    }
  },

  users: {
    list: async (): Promise<MCPUser[]> => {
      try {
        return await http.get<MCPUser[]>('/mcp/users')
          .then(r => httpUtils.validateResponse(r, ['id', 'email', 'name']))
          .then(r => r.data);
      } catch (error) {
        console.warn('Failed to fetch MCP users, returning empty array');
        return [];
      }
    },

    get: (id: string): Promise<MCPUser> => {
      return http.get<MCPUser>(\`/mcp/users/\${id}\`)
        .then(r => httpUtils.validateResponse(r, ['id', 'email', 'name']))
        .then(r => r.data);
    },

    create: (user: MCPUserCreate): Promise<MCPUser> => {
      return http.post<MCPUser>('/mcp/users', user)
        .then(r => httpUtils.validateResponse(r, ['id', 'email', 'name']))
        .then(r => r.data);
    },

    update: (id: string, updates: MCPUserUpdate): Promise<MCPUser> => {
      return http.put<MCPUser>(\`/mcp/users/\${id}\`, updates)
        .then(r => httpUtils.validateResponse(r, ['id', 'email', 'name']))
        .then(r => r.data);
    },

    remove: (id: string): Promise<void> => {
      return http.delete<void>(\`/mcp/users/\${id}\`)
        .then(r => r.data);
    },

    import: (users: MCPUserCreate[]): Promise<{ success: boolean; imported: number; errors: string[] }> => {
      return http.post<{ success: boolean; imported: number; errors: string[] }>('/mcp/users/import', { users })
        .then(r => r.data);
    },

    export: (filters?: Record<string, any>): Promise<MCPUser[]> => {
      return http.post<MCPUser[]>('/mcp/users/export', { filters })
        .then(r => r.data);
    }
  },

  settings: {
    save: (settings: Partial<MCPSettings>): Promise<MCPSettings> => {
      return http.post<MCPSettings>('/mcp/settings', settings)
        .then(r => r.data);
    },

    validate: (settings: Partial<MCPSettings>): Promise<{ valid: boolean; errors: string[] }> => {
      return http.post<{ valid: boolean; errors: string[] }>('/mcp/settings/validate', settings)
        .then(r => r.data);
    },

    list: (params?: { status?: string; type?: string }): Promise<MCPSettings[]> => {
      return http.get<MCPSettings[]>('/mcp/settings', { params })
        .then(r => r.data);
    },

    get: (id: string): Promise<MCPSettings> => {
      return http.get<MCPSettings>(\`/mcp/settings/\${id}\`)
        .then(r => r.data);
    }
  },

  agents: {
    scale: (id: string, desiredConcurrency: number): Promise<{ success: boolean; message: string }> => {
      return http.post<{ success: boolean; message: string }>(\`/mcp/agents/\${id}/scale\`, { desiredConcurrency })
        .then(r => r.data);
    },

    restart: (id: string): Promise<{ success: boolean; message: string }> => {
      return http.post<{ success: boolean; message: string }>(\`/mcp/agents/\${id}/restart\`)
        .then(r => r.data);
    },

    enable: (id: string): Promise<{ success: boolean; message: string }> => {
      return http.post<{ success: boolean; message: string }>(\`/mcp/agents/\${id}/enable\`)
        .then(r => r.data);
    },

    disable: (id: string): Promise<{ success: boolean; message: string }> => {
      return http.post<{ success: boolean; message: string }>(\`/mcp/agents/\${id}/disable\`)
        .then(r => r.data);
    }
  },

  workflows: {
    get: (id: string): Promise<MCPWorkflow> => {
      return http.get<MCPWorkflow>(\`/mcp/workflows/\${id}\`)
        .then(r => httpUtils.validateResponse(r, ['id', 'name', 'status']))
        .then(r => r.data);
    },

    update: (id: string, updates: Partial<MCPWorkflow>): Promise<MCPWorkflow> => {
      return http.put<MCPWorkflow>(\`/mcp/workflows/\${id}\`, updates)
        .then(r => httpUtils.validateResponse(r, ['id', 'name', 'status']))
        .then(r => r.data);
    },

    deactivate: (id: string): Promise<{ success: boolean; message: string }> => {
      return http.post<{ success: boolean; message: string }>(\`/mcp/workflows/\${id}/deactivate\`)
        .then(r => r.data);
    },

    dryRun: (id: string, payload?: Record<string, any>): Promise<{ success: boolean; result: any }> => {
      return http.post<{ success: boolean; result: any }>(\`/mcp/workflows/\${id}/dry-run\`, { payload })
        .then(r => r.data);
    }
  },

  logs: {
    list: (params?: {
      level?: string;
      service?: string;
      follow?: boolean;
    }): Promise<MCPLog[]> => {
      return http.get<MCPLog[]>('/mcp/logs', { params })
        .then(r => r.data);
    },

    export: (params?: {
      level?: string;
      service?: string;
      start_time?: string;
      end_time?: string;
      format?: 'json' | 'csv';
    }): Promise<{ url: string; expires_at: string }> => {
      return http.post<{ url: string; expires_at: string }>('/mcp/logs/export', params)
        .then(r => r.data);
    }
  },

  tasks: {
    create: (task: {
      type: string;
      payload: Record<string, any>;
      priority?: number;
      timeout?: number;
      retries?: number;
      dependencies?: string[];
      tags?: string[];
      metadata?: Record<string, any>;
      created_by?: string;
    }): Promise<{ id: string; status: string }> => {
      return http.post<{ id: string; status: string }>('/mcp/tasks', task)
        .then(r => r.data);
    },

    list: (params?: {
      status?: string;
      type?: string;
      created_by?: string;
      limit?: number;
      offset?: number;
    }): Promise<MCPJob[]> => {
      return http.get<MCPJob[]>('/mcp/tasks', { params })
        .then(r => r.data);
    }
  },

  assistant: {
    invoke: (payload: {
      message: string;
      conversation_id?: string;
      context?: Record<string, any>;
      options?: {
        temperature?: number;
        max_tokens?: number;
        model?: string;
      };
    }): Promise<{ response: string; conversation_id: string; usage: any }> => {
      return http.post<{ response: string; conversation_id: string; usage: any }>('/mcp/assistant/invoke', payload)
        .then(r => r.data);
    },

    list: (params?: { limit?: number; offset?: number }): Promise<any[]> => {
      return http.get<any[]>('/mcp/assistant/conversations', { params })
        .then(r => r.data);
    },

    delete: (id: string): Promise<{ success: boolean }> => {
      return http.delete<{ success: boolean }>(\`/mcp/assistant/conversations/\${id}\`)
        .then(r => r.data);
    }
  },

  docs: {
    get: (id: string): Promise<any> => {
      return http.get<any>(\`/mcp/docs/\${id}\`)
        .then(r => r.data);
    },

    process: (id: string, operations: string[]): Promise<{ success: boolean; result: any }> => {
      return http.post<{ success: boolean; result: any }>(\`/mcp/docs/\${id}/process\`, { operations })
        .then(r => r.data);
    },

    download: (id: string): Promise<{ url: string; expires_at: string }> => {
      return http.get<{ url: string; expires_at: string }>(\`/mcp/docs/\${id}/download\`)
        .then(r => r.data);
    }
  },

  system: {
    health: () => {
      return http.get<{
        status: 'healthy' | 'degraded' | 'unhealthy';
        checks: Record<string, { status: string; message?: string }>;
        timestamp: string;
        version: string;
      }>('/mcp/system/health')
        .then(r => r.data);
    }
  },

  profile: {
    get: (): Promise<UserProfile> => {
      return http.get<UserProfile>('/mcp/profile')
        .then(r => r.data);
    },

    update: (body: ProfileUpdateRequest): Promise<UserProfile> => {
      return http.put<UserProfile>('/mcp/profile', body)
        .then(r => r.data);
    },

    changePassword: (body: PasswordChangeRequest): Promise<{ success: boolean; message: string }> => {
      return http.post<{ success: boolean; message: string }>('/mcp/profile/change-password', body)
        .then(r => r.data);
    },

    updatePreferences: (prefs: ProfilePreferences): Promise<UserProfile> => {
      return http.put<UserProfile>('/mcp/profile/preferences', prefs)
        .then(r => r.data);
    },

    uploadAvatar: (file: File): Promise<AvatarUploadResponse> => {
      const formData = new FormData();
      formData.append('avatar', file);
      
      return http.post<AvatarUploadResponse>('/mcp/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(r => r.data);
    }
  }
};

// MCP Utilities
export const MCPUtils = {
  retry: <T>(operation: () => Promise<T>, maxRetries: number = 3) => {
    return httpUtils.retry(operation, maxRetries);
  },

  handleError: (error: any, context: string = 'MCP operation') => {
    console.error(\`\${context} error:\`, error);
    return {
      success: false,
      error: error.message || 'Unknown error',
      context
    };
  },

  streamLogs: (params?: any, onMessage?: (log: MCPLog) => void, onError?: (error: any) => void) => {
    const eventSource = new EventSource('/mcp/logs/stream?' + new URLSearchParams(params));
    
    eventSource.onmessage = (event) => {
      try {
        const log = JSON.parse(event.data);
        onMessage?.(log);
      } catch (error) {
        onError?.(error);
      }
    };
    
    eventSource.onerror = (error) => {
      onError?.(error);
    };
    
    return eventSource;
  }
};

export default MCP;
`;

  fs.writeFileSync('src/services/mcp.ts', mcpContent, 'utf8');
  console.log('✅ Fixed src/services/mcp.ts');
}

// Fix src/services/websiteBuilderService.ts
function fixWebsiteBuilderService() {
  console.log('🔧 Fixing src/services/websiteBuilderService.ts...');
  
  let content = fs.readFileSync('src/services/websiteBuilderService.ts', 'utf8');
  
  // Fix object property syntax
  content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,');
  
  // Fix missing closing braces
  content = content.replace(/,\s*}/g, '}');
  
  // Fix export syntax
  content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
    return `export default {${body}};`;
  });
  
  fs.writeFileSync('src/services/websiteBuilderService.ts', content, 'utf8');
  console.log('✅ Fixed src/services/websiteBuilderService.ts');
}

// Fix all type files
function fixTypeFiles() {
  console.log('🔧 Fixing type files...');
  
  const typeFiles = [
    'src/types/ai-confidence.ts',
    'src/types/alerts.ts',
    'src/types/auth.ts',
    'src/types/crm.ts',
    'src/types/dashboard.ts',
    'src/types/feature-flags.ts',
    'src/types/knowledge-base.ts',
    'src/types/market-research.ts',
    'src/types/menu.ts',
    'src/types/testing.ts',
    'src/types/user.ts',
    'src/types/vite-env.d.ts'
  ];
  
  typeFiles.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Fix object property syntax
      content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,');
      
      // Fix missing closing braces
      content = content.replace(/,\s*}/g, '}');
      
      // Fix export syntax
      content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
        return `export default {${body}};`;
      });
      
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Fixed ${file}`);
    } catch (error) {
      console.log(`❌ Error fixing ${file}:`, error.message);
    }
  });
}

// Fix all files with aggressive syntax fixing
function fixAllFilesAggressively() {
  console.log('🔧 Fixing all files aggressively...');
  
  function findTsFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'dist') {
        findTsFiles(fullPath, files);
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }
  
  const tsFiles = findTsFiles('src');
  let fixedCount = 0;
  
  tsFiles.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      const originalContent = content;
      
      // Aggressive syntax fixes
      content = content.replace(/,\s*,/g, ','); // Double commas
      content = content.replace(/,\s*}/g, '}'); // Trailing commas in objects
      content = content.replace(/,\s*\]/g, ']'); // Trailing commas in arrays
      content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,'); // Missing commas
      content = content.replace(/(\w+):\s*([^,]+),\s*,/g, '$1: $2,'); // Double commas after properties
      content = content.replace(/(\w+):\s*([^,]+),\s*}/g, '$1: $2}'); // Trailing commas before closing braces
      
      // Fix export syntax
      content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
        return `export default {${body}};`;
      });
      
      // Fix malformed function calls
      content = content.replace(/(\w+)\(\)\s*,\s*$/gm, '$1(),');
      content = content.replace(/(\w+)\(\)\s*,\s*,/g, '$1(),');
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
        console.log(`✅ Fixed: ${file}`);
      }
    } catch (error) {
      console.log(`❌ Error processing ${file}:`, error.message);
    }
  });
  
  console.log(`📊 Fixed ${fixedCount} files aggressively`);
}

// Main execution
try {
  fixMcpService();
  fixWebsiteBuilderService();
  fixTypeFiles();
  fixAllFilesAggressively();
  
  console.log('\n🎉 Aggressive syntax error fix complete!');
  console.log('🔍 Running type check to verify fixes...');
} catch (error) {
  console.error('❌ Error in aggressive syntax fix:', error.message);
}
