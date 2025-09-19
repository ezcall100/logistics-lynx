npx tsc --noEmit --skipLibCheck 2>&1 | Select-String "Found.*errors" | Select-Object -First 1
