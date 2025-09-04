// Fix missing commas in arrays
$content = $content -replace 'dependencies: \[\s*\]\s*}\s*\n\s*//', 'dependencies: []' + "`n" + '      },'
$content = $content -replace 'dependencies: \[\s*\]\s*}\s*\n\s*{', 'dependencies: []' + "`n" + '      },'

// Fix missing semicolons
$content = $content -replace 'this\.performHealthCheck\(\)}\s*2', 'this.performHealthCheck(); }, 2'
$content = $content -replace 'this\.executeTasks\(\)}\s*5', 'this.executeTasks(); }, 5'
$content = $content -replace 'this\.performSystemBackup\(\)}\s*60', 'this.performSystemBackup(); }, 60'
$content = $content -replace 'this\.triggerWebsiteBuild\(\)}\s*15', 'this.triggerWebsiteBuild(); }, 15'
$content = $content -replace 'this\.triggerModuleDevelopment\(\)}\s*10', 'this.triggerModuleDevelopment(); }, 10'
$content = $content -replace 'this\.triggerDocumentationUpdate\(\)}\s*20', 'this.triggerDocumentationUpdate(); }, 20'
$content = $content -replace 'this\.syncLoadBoardData\(\)}\s*5', 'this.syncLoadBoardData(); }, 5'

// Fix missing semicolons in forEach
$content = $content -replace 'this\.tasks\.set\(taskId, fullTask\)}', 'this.tasks.set(taskId, fullTask); }'
$content = $content -replace 'this\.taskQueue\.push\(taskId\)}\)', 'this.taskQueue.push(taskId); });'
$content = $content -replace 'console\.log\(`.*`\)}', 'console.log(`Task queue initialized with ${this.taskQueue.length} development tasks`); }'
