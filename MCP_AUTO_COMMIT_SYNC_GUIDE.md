# MCP Auto Commit and Sync System Guide

## Overview
The MCP Auto Commit and Sync system provides automatic Git commit and synchronization functionality for your Logistics Lynx TMS project. This system integrates seamlessly with your existing MCP configuration and autonomous agents.

## Features

### 🔄 Auto Commit
- **Automatic staging** of changes
- **Smart commit messages** with timestamps
- **Branch-aware** committing (excludes protected branches)
- **File filtering** (includes/excludes specific file types)
- **Size limits** to prevent large commits

### 🔄 Auto Sync
- **Bidirectional synchronization** with remote repositories
- **Automatic pull before push** to prevent conflicts
- **Branch-specific sync** rules
- **Backup creation** before sync operations
- **Conflict resolution** strategies

### 🛡️ Security Features
- **Branch protection** (excludes hotfix/release branches)
- **File type restrictions** (excludes logs, builds, etc.)
- **Manual conflict resolution** by default
- **Backup branches** for safety

## Configuration

### Auto Commit Settings
```json
{
  "autoCommit": {
    "enabled": true,
    "settings": {
      "commitMessageTemplate": "feat: {description} - {timestamp}",
      "autoPush": true,
      "autoPull": true,
      "commitFrequency": "after_changes",
      "maxCommitSize": 10,
      "excludedFiles": ["node_modules/**", "dist/**", "build/**", "*.log", "*.lock"],
      "includedFileTypes": ["*.ts", "*.tsx", "*.js", "*.jsx", "*.json", "*.md", "*.css", "*.scss"]
    }
  }
}
```

### Auto Sync Settings
```json
{
  "autoSync": {
    "enabled": true,
    "settings": {
      "syncMode": "bidirectional",
      "autoPullBeforePush": true,
      "conflictResolution": "manual",
      "syncFrequency": "on_change",
      "remoteTracking": true,
      "backupBeforeSync": true,
      "syncBranches": ["main", "develop", "feature/*"],
      "excludedBranches": ["hotfix/*", "release/*"]
    }
  }
}
```

## Usage

### Command Line Interface

#### Basic Commands
```bash
# Check system status
npm run mcp:status

# Manual commit with description
npm run mcp:commit "Add new feature"

# Manual sync
npm run mcp:sync

# Push changes
npm run mcp:push

# Pull changes
npm run mcp:pull

# Start monitoring mode
npm run mcp:monitor
```

#### Direct Node Commands
```bash
# Auto commit with default message
node mcp-auto-commit-sync.js commit

# Auto commit with custom description
node mcp-auto-commit-sync.js commit "Fix authentication bug"

# Auto sync
node mcp-auto-commit-sync.js sync

# Check status
node mcp-auto-commit-sync.js status

# Start monitoring
node mcp-auto-commit-sync.js monitor
```

### Integration with MCP Agents

The system automatically integrates with your MCP agents through the configuration in `mcp-auto-run-config.json`. When agents make changes:

1. **Changes are detected** automatically
2. **Auto-commit triggers** if conditions are met
3. **Auto-sync executes** for appropriate branches
4. **Backup branches** are created for safety

## Branch Strategy

### Sync Branches (Auto-sync enabled)
- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches

### Protected Branches (Auto-sync disabled)
- `hotfix/*` - Hotfix branches
- `release/*` - Release branches

### Backup Strategy
- Automatic backup branches created before sync
- Format: `backup/YYYY-MM-DDTHH-MM-SS-sssZ`
- Pushed to remote for safety

## Monitoring Mode

### Continuous Monitoring
```bash
npm run mcp:monitor
```

The monitoring mode:
- **Checks for changes** every 30 seconds
- **Auto-commits** when conditions are met
- **Auto-syncs** for appropriate branches
- **Logs all activities** for tracking

### Monitoring Output
```
👀 Starting MCP Auto Commit & Sync Monitor...
📝 Detected 3 changes
🔄 Starting auto-commit process...
✅ Changes staged
✅ Committed: feat: Auto commit by MCP agent - 2024-01-15T10-30-45-123Z
🔄 Pushing changes...
✅ Changes pushed successfully
🔄 Starting auto-sync process...
✅ Auto-sync completed successfully
```

## Status Information

### Status Command Output
```json
{
  "currentBranch": "feature/user-management",
  "changesCount": 5,
  "autoCommitEnabled": true,
  "autoSyncEnabled": true,
  "lastCommitTime": "2024-01-15T10:30:45.123Z",
  "shouldAutoCommit": true,
  "shouldAutoSync": true
}
```

## Error Handling

### Common Scenarios

#### Git Conflicts
- **Manual resolution** by default
- **Abort option** available in config
- **Backup branches** created before sync

#### Network Issues
- **Retry logic** for push/pull operations
- **Graceful degradation** when remote unavailable
- **Local commits** preserved

#### Permission Issues
- **Branch protection** respected
- **File permissions** checked
- **Error logging** for debugging

## Best Practices

### Development Workflow
1. **Work on feature branches** for new development
2. **Use monitoring mode** during active development
3. **Review commits** before pushing to main
4. **Test changes** before auto-sync

### Configuration Management
1. **Customize commit messages** for your team
2. **Adjust file filters** based on project needs
3. **Set appropriate branch rules** for your workflow
4. **Monitor system logs** for issues

### Security Considerations
1. **Review auto-commit settings** regularly
2. **Test backup functionality** periodically
3. **Monitor sync operations** for conflicts
4. **Keep configuration secure** and version controlled

## Troubleshooting

### Common Issues

#### Auto-commit not working
```bash
# Check if conditions are met
npm run mcp:status

# Verify git status
git status

# Check configuration
cat mcp-auto-run-config.json
```

#### Auto-sync conflicts
```bash
# Check current branch
git branch --show-current

# Review sync settings
npm run mcp:status

# Manual conflict resolution
git status
git diff
```

#### Monitoring not detecting changes
```bash
# Restart monitoring
npm run mcp:monitor

# Check file permissions
ls -la

# Verify git repository
git status
```

### Debug Mode
Enable debug logging by modifying the configuration:
```json
{
  "debug": true,
  "logLevel": "verbose"
}
```

## Integration with Existing Systems

### MCP Agent Integration
- **Seamless integration** with existing MCP agents
- **No code changes** required for agents
- **Automatic triggering** on file changes
- **Configurable behavior** per portal

### CI/CD Pipeline
- **Compatible** with existing CI/CD systems
- **Branch protection** integration
- **Deployment safety** maintained
- **Rollback capability** through backups

### Team Collaboration
- **Branch-based workflow** support
- **Conflict resolution** strategies
- **Backup and safety** features
- **Audit trail** through commit history

## Advanced Configuration

### Custom Commit Messages
```json
{
  "commitMessageTemplate": "feat({portal}): {description} - {timestamp}"
}
```

### File Type Filters
```json
{
  "includedFileTypes": [
    "*.ts", "*.tsx", "*.js", "*.jsx", 
    "*.json", "*.md", "*.css", "*.scss",
    "*.sql", "*.yaml", "*.yml"
  ]
}
```

### Branch Rules
```json
{
  "syncBranches": ["main", "develop", "feature/*", "bugfix/*"],
  "excludedBranches": ["hotfix/*", "release/*", "experimental/*"]
}
```

## Support and Maintenance

### Regular Maintenance
- **Monitor system logs** for issues
- **Update configuration** as needed
- **Test backup functionality** regularly
- **Review branch strategies** periodically

### Performance Optimization
- **Adjust monitoring frequency** based on needs
- **Optimize file filters** for performance
- **Configure appropriate commit sizes**
- **Monitor resource usage**

---

**Note**: This system is designed to work with your existing MCP configuration and autonomous agents. Always test changes in a development environment before applying to production.
