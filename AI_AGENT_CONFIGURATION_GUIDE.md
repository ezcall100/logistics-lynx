# AI Agent Auto-Run Configuration Guide

## Overview
This guide helps you configure auto-run settings for AI agents and manage the "Keep all" behavior in your development environment.

## Step 1: Access AI Agent Settings

### For Cursor IDE:
1. Open the Command Palette: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type "AI" or "Agent" to find AI-related settings
3. Look for "AI Agent Settings" or "MCP Configuration"

### For VS Code with Cursor Extension:
1. Open Settings: `Ctrl+,` (Windows/Linux) or `Cmd+,` (Mac)
2. Search for "cursor" or "ai agent"
3. Navigate to the Cursor extension settings

### For VS Code with GitHub Copilot:
1. Open Settings: `Ctrl+,` (Windows/Linux) or `Cmd+,` (Mac)
2. Search for "copilot" or "ai"
3. Look for Copilot settings

## Step 2: Enable Auto-Run for AI Agents

### Method 1: Through Chat Interface
1. Open the AI chat window: `Ctrl+Alt+I` (common shortcut)
2. Select "Agent mode" from the dropdown menu
3. Click the "Tools" button to review available MCP tools
4. Enable "Auto-run" mode to allow automatic tool invocation

### Method 2: Through Settings
1. Navigate to AI Agent settings in your IDE
2. Look for "Auto-run" or "Automatic execution" options
3. Enable the toggle for automatic tool execution
4. Optionally configure which tools can auto-run

### Method 3: MCP-Specific Configuration
Since your project uses MCP (Model Context Protocol), you may need to:
1. Check your `mcp.portals.json` configuration
2. Ensure MCP tools are properly registered
3. Configure auto-run permissions for specific MCP tools

## Step 3: Manage "Keep All" Behavior

### Understanding "Keep All"
- **"Keep All"** is an action, not a setting
- It applies all proposed changes at once
- Available when the AI suggests multiple file modifications

### How to Use "Keep All"
1. **When AI proposes changes:**
   - Review the changes in the diff view
   - Look for a "Save All" or "Keep All" button
   - Click to apply all changes simultaneously

2. **Individual vs. Batch acceptance:**
   - **Individual**: Accept each change one by one
   - **Keep All**: Accept all changes at once

3. **Preview before accepting:**
   - Always review the diff view
   - Check file paths and line numbers
   - Verify the changes match your intent

### Best Practices
1. **Review before accepting:**
   - Always preview changes in diff view
   - Check for unintended modifications
   - Verify file paths are correct

2. **Use "Keep All" strategically:**
   - Use for related changes (e.g., fixing imports across files)
   - Use individual acceptance for critical changes
   - Test after applying changes

3. **Version control:**
   - Commit frequently to preserve work
   - Use descriptive commit messages
   - Consider creating feature branches for major changes

## Step 4: MCP Tool Configuration

### Your Project's MCP Setup
Based on your project structure, you have:
- `mcp.portals.json` - Portal configuration
- Multiple MCP-related scripts and tools
- Autonomous agent integration

### Recommended MCP Auto-Run Settings
```json
{
  "autoRun": {
    "enabled": true,
    "tools": [
      "file_search",
      "codebase_search", 
      "read_file",
      "list_dir"
    ],
    "requireConfirmation": [
      "edit_file",
      "delete_file",
      "run_terminal_cmd"
    ]
  }
}
```

## Step 5: Troubleshooting

### Common Issues
1. **Auto-run not working:**
   - Check if MCP tools are properly configured
   - Verify agent mode is enabled
   - Restart your IDE

2. **"Keep All" button not appearing:**
   - Ensure AI has proposed multiple changes
   - Check if changes are in different files
   - Try refreshing the chat interface

3. **MCP tools not available:**
   - Verify `mcp.portals.json` is properly configured
   - Check if MCP server is running
   - Review tool registration in your IDE

### Debugging Steps
1. Check IDE logs for MCP-related errors
2. Verify MCP server connectivity
3. Test individual tool functionality
4. Review your project's MCP configuration

## Step 6: Advanced Configuration

### Custom Auto-Run Rules
You can create custom rules for when tools should auto-run:
- File type restrictions
- Directory-based rules
- Tool-specific permissions
- User confirmation requirements

### Integration with Your Project
Your project has extensive MCP integration. Consider:
- Configuring auto-run for development scripts
- Setting up automated testing workflows
- Enabling autonomous agent features
- Managing deployment automation

## Security Considerations

### Auto-Run Security
1. **Review tool permissions:**
   - Only enable auto-run for safe tools
   - Require confirmation for file modifications
   - Restrict terminal command execution

2. **Environment isolation:**
   - Use development environments for testing
   - Backup important files before major changes
   - Use version control for all changes

3. **Access control:**
   - Limit auto-run to trusted tools
   - Review changes before accepting
   - Monitor tool usage logs

## Next Steps

1. **Test your configuration:**
   - Try simple auto-run operations
   - Test "Keep All" functionality
   - Verify MCP tool integration

2. **Customize for your workflow:**
   - Adjust auto-run settings based on your needs
   - Configure tool-specific permissions
   - Set up your preferred confirmation workflow

3. **Document your setup:**
   - Record your configuration choices
   - Note any custom settings
   - Share with team members if applicable

---

**Note:** The exact steps may vary depending on your specific IDE and AI agent implementation. Refer to your IDE's documentation for the most accurate instructions.
