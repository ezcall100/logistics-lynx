# 🚀 Pre-Commit Test Checklist

Use this checklist before every commit to catch issues early and maintain code quality.

## ✅ Quick Pre-Commit Checks

### 1. **ESLint Validation**

```bash
# Check for any TypeScript/ESLint errors
npx eslint src/ --max-warnings 0

# If you get errors, fix them before committing
```

### 2. **TypeScript Type Check**

```bash
# Verify no type errors exist
npx tsc --noEmit

# Fix any type errors before committing
```

### 3. **Common Issues to Watch For**

#### 🚫 **Avoid These Patterns:**

- `any` types (use proper TypeScript types instead)
- Unused imports (remove them)
- Missing imports (add them)
- Console.log statements in production code

#### ✅ **Good Patterns:**

- Proper TypeScript interfaces
- Type-safe function parameters
- Clean imports (only what you use)
- Proper error handling

### 4. **Quick Fixes for Common Errors**

#### **ESLint `any` Type Errors:**

```typescript
// ❌ Bad
const handleData = (data: any) => { ... }

// ✅ Good
const handleData = (data: string | number) => { ... }
// or
interface DataType {
  id: string;
  value: string;
}
const handleData = (data: DataType) => { ... }
```

#### **Unused Import Errors:**

```typescript
// ❌ Bad - unused import
import { Button, Input, Modal } from 'lucide-react';
// Only using Button

// ✅ Good - only import what you use
import { Button } from 'lucide-react';
```

#### **Missing Import Errors:**

```typescript
// ❌ Bad - using component without importing
<CheckCircle className="w-4 h-4" />

// ✅ Good - import the component
import { CheckCircle } from 'lucide-react';
```

### 5. **Automated Pre-Commit Hook**

Your project already has Husky configured! The pre-commit hook will automatically run ESLint and prevent commits with errors.

### 6. **Emergency Bypass (Use Sparingly)**

If you absolutely need to commit without running checks:

```bash
git commit --no-verify -m "Emergency commit - will fix later"
```

⚠️ **Warning:** Only use this in emergencies and fix the issues immediately after.

## 🎯 **Integration Status Check**

Before major commits, verify all integrations are working:

- ✅ **n8n**: Webhook endpoints accessible
- ✅ **Supabase**: Database connection active
- ✅ **MCP Agents**: All 302 agents operational on port 3001
- ✅ **GitHub**: Repository access confirmed
- ✅ **OpenAI**: API integration ready
- ✅ **Cursor AI**: Development environment stable

## 📋 **Commit Message Template**

Use this format for consistent commits:

```
type(scope): brief description

- What was changed
- Why it was changed
- Any breaking changes

Fixes #issue-number (if applicable)
```

**Examples:**

```
fix(types): remove any types from MCPOverview and UserRolesPage

- Replace any with proper union types for selectedTab
- Use string | number for sorting comparisons
- Improves type safety and prevents runtime errors

fix(imports): add missing lucide-react imports

- Add CheckCircle, Star, Route imports to DriverMobileApp
- Remove unused imports from TMSCoreApplication
- Resolves TypeScript compilation errors
```

## 🚨 **Red Flags - Don't Commit If:**

- [ ] ESLint shows any errors
- [ ] TypeScript compilation fails
- [ ] Console shows build errors
- [ ] Tests are failing
- [ ] Integration services are down
- [ ] You have uncommitted `any` types

## 🎉 **Green Light - Safe to Commit When:**

- [ ] ESLint passes with 0 errors
- [ ] TypeScript compiles successfully
- [ ] All tests pass
- [ ] Code follows project patterns
- [ ] Integration services are operational
- [ ] Commit message follows template

---

**Remember:** It's always better to fix issues before committing than to deal with them later! 🚀
