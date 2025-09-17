@echo off
echo 🔍 Quick Pre-Commit Check
echo =========================
echo.

echo Running ESLint...
npx eslint src/ --max-warnings 0 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ ESLint: PASSED
) else (
    echo ❌ ESLint: FAILED - Run 'npx eslint src/' to see errors
)

echo Running TypeScript check...
npx tsc --noEmit >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ TypeScript: PASSED
) else (
    echo ❌ TypeScript: FAILED - Run 'npx tsc --noEmit' to see errors
)

echo.

npx eslint src/ --max-warnings 0 >nul 2>&1
set eslint_result=%errorlevel%
npx tsc --noEmit >nul 2>&1
set ts_result=%errorlevel%

if %eslint_result% equ 0 if %ts_result% equ 0 (
    echo 🎉 ALL CHECKS PASSED! Safe to commit.
    echo.
    echo Next steps:
    echo   git add .
    echo   git commit -m "Your commit message"
) else (
    echo ❌ CHECKS FAILED! Fix issues before committing.
    echo.
    echo Common fixes:
    echo   - Remove any types
    echo   - Add missing imports
    echo   - Remove unused imports
)
