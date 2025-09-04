import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Function to fix the most critical remaining syntax errors
function fixCriticalErrors(content) {
  let fixed = content;
  
  // Fix malformed function signatures with Promise types
  fixed = fixed.replace(/async\s+(\w+)\s*\(Promise<([^>]+)\)\s*\{/g, 'async $1(): Promise<$2> {');
  fixed = fixed.replace(/async\s+(\w+)\s*\(([^)]*)\)\s*:\s*Promise<([^>]+)>\s*\{/g, 'async $1($2): Promise<$3> {');
  
  // Fix malformed method signatures
  fixed = fixed.replace(/(\w+)\s*\(([^)]*)\)\s*:\s*([^{]+)\s*\{/g, '$1($2): $3 {');
  fixed = fixed.replace(/(\w+)\s*\(([^)]*)\)\s*\{/g, '$1($2) {');
  
  // Fix malformed parameter types
  fixed = fixed.replace(/\((\w+):\s*,\s*(\w+)\)/g, '($1: $2)');
  fixed = fixed.replace(/\((\w+):\s*,\s*,\s*(\w+)\)/g, '($1: $2)');
  
  // Fix malformed function calls
  fixed = fixed.replace(/\.then\(r\s*=>\s*,\s*,\s*r\.data\)/g, '.then(r => r.data)');
  fixed = fixed.replace(/\.then\(r\s*=>\s*,\s*r\.data\)/g, '.then(r => r.data)');
  
  // Fix malformed template literals
  fixed = fixed.replace(/\$\{([^}]+),\s*,\s*([^}]+)\}/g, '${$1, $2}');
  fixed = fixed.replace(/\$\{([^}]+),\s*([^}]+)\}/g, '${$1, $2}');
  
  // Fix malformed object properties
  fixed = fixed.replace(/(\w+):\s*([^,]+),\s*,\s*(\w+):\s*([^,]+)/g, '$1: $2, $3: $4');
  fixed = fixed.replace(/(\w+):\s*([^,]+),\s*,\s*(\w+):\s*([^}]+)/g, '$1: $2, $3: $4');
  
  // Fix malformed return statements
  fixed = fixed.replace(/return\s*\{\s*(\w+):\s*(\w+),\s*,\s*(\w+):\s*([^}]+)\s*\};/g, 'return { $1: $2, $3: $4 };');
  fixed = fixed.replace(/return\s*\{\s*(\w+):\s*(\w+),\s*,\s*(\w+):\s*([^}]+)\s*\}/g, 'return { $1: $2, $3: $4 }');
  
  // Fix malformed console statements
  fixed = fixed.replace(/console\.warn\('([^']+)',\s*,\s*,\s*(\w+)\)/g, "console.warn('$1', $2)");
  fixed = fixed.replace(/console\.warn\('([^']+)',\s*,\s*(\w+)\)/g, "console.warn('$1', $2)");
  
  // Fix malformed if statements
  fixed = fixed.replace(/if\s*\(\s*!\s*(\w+)\.(\w+)\s*\|\|,\s*,\s*(\w+)/g, 'if (!$1.$2 || $3');
  fixed = fixed.replace(/if\s*\(\s*!\s*(\w+)\.(\w+)\s*\|\|,\s*(\w+)/g, 'if (!$1.$2 || $3');
  
  // Fix malformed variable assignments
  fixed = fixed.replace(/(\w+):\s*(\w+)\.length\s*===\s*,\s*0;/g, '$1: $2.length === 0;');
  fixed = fixed.replace(/(\w+):\s*(\w+)\.length\s*===\s*,\s*,\s*0;/g, '$1: $2.length === 0;');
  
  // Fix malformed type annotations
  fixed = fixed.replace(/:\s*(\w+)\s*\[\s*\]\s*;/g, ': $1[];');
  
  // Fix malformed property access
  fixed = fixed.replace(/(\w+)\.(\w+)\s*===\s*,\s*0/g, '$1.$2 === 0');
  fixed = fixed.replace(/(\w+)\.(\w+)\s*===\s*,\s*,\s*0/g, '$1.$2 === 0');
  
  // Fix malformed object destructuring
  fixed = fixed.replace(/\{\s*(\w+):\s*(\w+),\s*,\s*(\w+):\s*(\w+)\s*\}/g, '{ $1: $2, $3: $4 }');
  
  // Fix malformed array destructuring
  fixed = fixed.replace(/\[\s*(\w+),\s*,\s*(\w+)\s*\]/g, '[$1, $2]');
  
  // Fix malformed interface properties
  fixed = fixed.replace(/(\w+):\s*([^,]+),\s*,\s*(\w+):\s*([^,]+)/g, '$1: $2, $3: $4');
  fixed = fixed.replace(/(\w+):\s*([^,]+),\s*,\s*(\w+):\s*([^}]+)/g, '$1: $2, $3: $4');
  
  // Fix malformed array types
  fixed = fixed.replace(/Array<\{([^}]+)\}>/g, (match, body) => {
    const fixedBody = body.replace(/(\w+):\s*([^,]+),\s*,\s*(\w+):\s*([^,]+)/g, '$1: $2, $3: $4');
    return `Array<{${fixedBody}}>`;
  });
  
  // Fix malformed method signatures in interfaces
  fixed = fixed.replace(/(\w+)\s*\(\s*(\w+):\s*,\s*,\s*(\w+)\s*\)/g, '$1($2: $3)');
  fixed = fixed.replace(/(\w+)\s*\(\s*(\w+):\s*,\s*(\w+)\s*\)/g, '$1($2: $3)');
  
  // Fix malformed property signatures in interfaces
  fixed = fixed.replace(/(\w+)\s*:\s*,\s*,\s*(\w+)/g, '$1: $2');
  fixed = fixed.replace(/(\w+)\s*:\s*,\s*(\w+)/g, '$1: $2');
  
  // Fix malformed readonly properties
  fixed = fixed.replace(/readonly\s+(\w+)\s*:\s*,\s*,\s*(\w+)/g, 'readonly $1: $2');
  fixed = fixed.replace(/readonly\s+(\w+)\s*:\s*,\s*(\w+)/g, 'readonly $1: $2');
  
  // Fix malformed optional properties
  fixed = fixed.replace(/(\w+)\?\s*:\s*,\s*,\s*(\w+)/g, '$1?: $2');
  fixed = fixed.replace(/(\w+)\?\s*:\s*,\s*(\w+)/g, '$1?: $2');
  
  // Fix malformed computed properties
  fixed = fixed.replace(/\[\s*(\w+)\s*\]\s*:\s*,\s*,\s*(\w+)/g, '[$1]: $2');
  fixed = fixed.replace(/\[\s*(\w+)\s*\]\s*:\s*,\s*(\w+)/g, '[$1]: $2');
  
  // Fix malformed method calls
  fixed = fixed.replace(/(\w+)\.(\w+)\s*\(\s*,\s*,\s*(\w+)\s*\)/g, '$1.$2($3)');
  fixed = fixed.replace(/(\w+)\.(\w+)\s*\(\s*,\s*(\w+)\s*\)/g, '$1.$2($3)');
  
  // Fix malformed property assignments
  fixed = fixed.replace(/(\w+)\s*=\s*,\s*,\s*(\w+)/g, '$1 = $2');
  fixed = fixed.replace(/(\w+)\s*=\s*,\s*(\w+)/g, '$1 = $2');
  
  // Fix malformed destructuring assignments
  fixed = fixed.replace(/const\s*\{\s*(\w+):\s*,\s*,\s*(\w+)\s*\}\s*=\s*(\w+)/g, 'const { $1: $2 } = $3');
  fixed = fixed.replace(/const\s*\{\s*(\w+):\s*,\s*(\w+)\s*\}\s*=\s*(\w+)/g, 'const { $1: $2 } = $3');
  
  // Fix malformed array destructuring assignments
  fixed = fixed.replace(/const\s*\[\s*(\w+),\s*,\s*(\w+)\s*\]\s*=\s*(\w+)/g, 'const [$1, $2] = $3');
  
  // Fix malformed function expressions
  fixed = fixed.replace(/\(\s*(\w+)\s*\)\s*=>\s*,\s*,\s*\{/g, '($1) => {');
  fixed = fixed.replace(/\(\s*(\w+)\s*\)\s*=>\s*,\s*\{/g, '($1) => {');
  
  // Fix malformed arrow functions
  fixed = fixed.replace(/\(\s*(\w+)\s*\)\s*=>\s*,\s*,\s*(\w+)/g, '($1) => $2');
  fixed = fixed.replace(/\(\s*(\w+)\s*\)\s*=>\s*,\s*(\w+)/g, '($1) => $2');
  
  // Fix malformed async arrow functions
  fixed = fixed.replace(/async\s*\(\s*(\w+)\s*\)\s*=>\s*,\s*,\s*\{/g, 'async ($1) => {');
  fixed = fixed.replace(/async\s*\(\s*(\w+)\s*\)\s*=>\s*,\s*\{/g, 'async ($1) => {');
  
  // Fix malformed async function expressions
  fixed = fixed.replace(/async\s*function\s*\(\s*(\w+)\s*\)\s*,\s*,\s*\{/g, 'async function ($1) {');
  fixed = fixed.replace(/async\s*function\s*\(\s*(\w+)\s*\)\s*,\s*\{/g, 'async function ($1) {');
  
  // Fix malformed class methods
  fixed = fixed.replace(/(\w+)\s*\(\s*(\w+)\s*\)\s*,\s*,\s*\{/g, '$1($2) {');
  fixed = fixed.replace(/(\w+)\s*\(\s*(\w+)\s*\)\s*,\s*\{/g, '$1($2) {');
  
  // Fix malformed static methods
  fixed = fixed.replace(/static\s+(\w+)\s*\(\s*(\w+)\s*\)\s*,\s*,\s*\{/g, 'static $1($2) {');
  fixed = fixed.replace(/static\s+(\w+)\s*\(\s*(\w+)\s*\)\s*,\s*\{/g, 'static $1($2) {');
  
  // Fix malformed getters
  fixed = fixed.replace(/get\s+(\w+)\s*\(\s*\)\s*,\s*,\s*\{/g, 'get $1() {');
  fixed = fixed.replace(/get\s+(\w+)\s*\(\s*\)\s*,\s*\{/g, 'get $1() {');
  
  // Fix malformed setters
  fixed = fixed.replace(/set\s+(\w+)\s*\(\s*(\w+)\s*\)\s*,\s*,\s*\{/g, 'set $1($2) {');
  fixed = fixed.replace(/set\s+(\w+)\s*\(\s*(\w+)\s*\)\s*,\s*\{/g, 'set $1($2) {');
  
  // Fix malformed constructor
  fixed = fixed.replace(/constructor\s*\(\s*(\w+)\s*\)\s*,\s*,\s*\{/g, 'constructor($1) {');
  fixed = fixed.replace(/constructor\s*\(\s*(\w+)\s*\)\s*,\s*\{/g, 'constructor($1) {');
  
  // Fix malformed super calls
  fixed = fixed.replace(/super\s*\(\s*,\s*,\s*(\w+)\s*\)/g, 'super($1)');
  fixed = fixed.replace(/super\s*\(\s*,\s*(\w+)\s*\)/g, 'super($1)');
  
  // Fix malformed this assignments
  fixed = fixed.replace(/this\.(\w+)\s*=\s*,\s*,\s*(\w+)/g, 'this.$1 = $2');
  fixed = fixed.replace(/this\.(\w+)\s*=\s*,\s*(\w+)/g, 'this.$1 = $2');
  
  // Fix malformed return statements with objects
  fixed = fixed.replace(/return\s*\{\s*(\w+):\s*(\w+),\s*,\s*(\w+):\s*([^}]+)\s*\}/g, 'return { $1: $2, $3: $4 }');
  
  // Fix malformed return statements with arrays
  fixed = fixed.replace(/return\s*\[\s*(\w+),\s*,\s*(\w+)\s*\]/g, 'return [$1, $2]');
  
  // Fix malformed throw statements
  fixed = fixed.replace(/throw\s+new\s+(\w+)\s*\(\s*,\s*,\s*(\w+)\s*\)/g, 'throw new $1($2)');
  fixed = fixed.replace(/throw\s+new\s+(\w+)\s*\(\s*,\s*(\w+)\s*\)/g, 'throw new $1($2)');
  
  // Fix malformed try-catch blocks
  fixed = fixed.replace(/try\s*\{\s*,\s*,\s*(\w+)/g, 'try { $1');
  fixed = fixed.replace(/try\s*\{\s*,\s*(\w+)/g, 'try { $1');
  fixed = fixed.replace(/\}\s*catch\s*\(\s*(\w+)\s*\)\s*,\s*,\s*\{/g, '} catch ($1) {');
  fixed = fixed.replace(/\}\s*catch\s*\(\s*(\w+)\s*\)\s*,\s*\{/g, '} catch ($1) {');
  
  // Fix malformed finally blocks
  fixed = fixed.replace(/\}\s*finally\s*,\s*,\s*\{/g, '} finally {');
  fixed = fixed.replace(/\}\s*finally\s*,\s*\{/g, '} finally {');
  
  // Fix malformed switch statements
  fixed = fixed.replace(/switch\s*\(\s*(\w+)\s*\)\s*,\s*,\s*\{/g, 'switch ($1) {');
  fixed = fixed.replace(/switch\s*\(\s*(\w+)\s*\)\s*,\s*\{/g, 'switch ($1) {');
  
  // Fix malformed case statements
  fixed = fixed.replace(/case\s+(\w+):\s*,\s*,\s*(\w+)/g, 'case $1: $2');
  fixed = fixed.replace(/case\s+(\w+):\s*,\s*(\w+)/g, 'case $1: $2');
  
  // Fix malformed default statements
  fixed = fixed.replace(/default:\s*,\s*,\s*(\w+)/g, 'default: $1');
  fixed = fixed.replace(/default:\s*,\s*(\w+)/g, 'default: $1');
  
  // Fix malformed for loops
  fixed = fixed.replace(/for\s*\(\s*(\w+)\s*,\s*,\s*(\w+)\s*\)/g, 'for ($1, $2)');
  fixed = fixed.replace(/for\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)/g, 'for ($1, $2)');
  
  // Fix malformed for-in loops
  fixed = fixed.replace(/for\s*\(\s*(\w+)\s+in\s+(\w+)\s*,\s*,\s*(\w+)\s*\)/g, 'for ($1 in $2, $3)');
  fixed = fixed.replace(/for\s*\(\s*(\w+)\s+in\s+(\w+)\s*,\s*(\w+)\s*\)/g, 'for ($1 in $2, $3)');
  
  // Fix malformed for-of loops
  fixed = fixed.replace(/for\s*\(\s*(\w+)\s+of\s+(\w+)\s*,\s*,\s*(\w+)\s*\)/g, 'for ($1 of $2, $3)');
  fixed = fixed.replace(/for\s*\(\s*(\w+)\s+of\s+(\w+)\s*,\s*(\w+)\s*\)/g, 'for ($1 of $2, $3)');
  
  // Fix malformed while loops
  fixed = fixed.replace(/while\s*\(\s*(\w+)\s*,\s*,\s*(\w+)\s*\)/g, 'while ($1, $2)');
  fixed = fixed.replace(/while\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)/g, 'while ($1, $2)');
  
  // Fix malformed do-while loops
  fixed = fixed.replace(/do\s*\{\s*(\w+)\s*\}\s*while\s*\(\s*(\w+)\s*,\s*,\s*(\w+)\s*\)/g, 'do { $1 } while ($2, $3)');
  fixed = fixed.replace(/do\s*\{\s*(\w+)\s*\}\s*while\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)/g, 'do { $1 } while ($2, $3)');
  
  // Fix malformed if-else statements
  fixed = fixed.replace(/if\s*\(\s*(\w+)\s*,\s*,\s*(\w+)\s*\)/g, 'if ($1, $2)');
  fixed = fixed.replace(/if\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)/g, 'if ($1, $2)');
  fixed = fixed.replace(/\}\s*else\s*,\s*,\s*\{/g, '} else {');
  fixed = fixed.replace(/\}\s*else\s*,\s*\{/g, '} else {');
  
  // Fix malformed ternary operators
  fixed = fixed.replace(/(\w+)\s*\?\s*,\s*,\s*(\w+)\s*:\s*(\w+)/g, '$1 ? $2 : $3');
  fixed = fixed.replace(/(\w+)\s*\?\s*,\s*(\w+)\s*:\s*(\w+)/g, '$1 ? $2 : $3');
  
  // Fix malformed logical operators
  fixed = fixed.replace(/(\w+)\s*&&\s*,\s*,\s*(\w+)/g, '$1 && $2');
  fixed = fixed.replace(/(\w+)\s*&&\s*,\s*(\w+)/g, '$1 && $2');
  fixed = fixed.replace(/(\w+)\s*\|\|\s*,\s*,\s*(\w+)/g, '$1 || $2');
  fixed = fixed.replace(/(\w+)\s*\|\|\s*,\s*(\w+)/g, '$1 || $2');
  
  // Fix malformed bitwise operators
  fixed = fixed.replace(/(\w+)\s*&\s*,\s*,\s*(\w+)/g, '$1 & $2');
  fixed = fixed.replace(/(\w+)\s*&\s*,\s*(\w+)/g, '$1 & $2');
  fixed = fixed.replace(/(\w+)\s*\|\s*,\s*,\s*(\w+)/g, '$1 | $2');
  fixed = fixed.replace(/(\w+)\s*\|\s*,\s*(\w+)/g, '$1 | $2');
  fixed = fixed.replace(/(\w+)\s*\^\s*,\s*,\s*(\w+)/g, '$1 ^ $2');
  fixed = fixed.replace(/(\w+)\s*\^\s*,\s*(\w+)/g, '$1 ^ $2');
  
  // Fix malformed arithmetic operators
  fixed = fixed.replace(/(\w+)\s*\+\s*,\s*,\s*(\w+)/g, '$1 + $2');
  fixed = fixed.replace(/(\w+)\s*\+\s*,\s*(\w+)/g, '$1 + $2');
  fixed = fixed.replace(/(\w+)\s*-\s*,\s*,\s*(\w+)/g, '$1 - $2');
  fixed = fixed.replace(/(\w+)\s*-\s*,\s*(\w+)/g, '$1 - $2');
  fixed = fixed.replace(/(\w+)\s*\*\s*,\s*,\s*(\w+)/g, '$1 * $2');
  fixed = fixed.replace(/(\w+)\s*\*\s*,\s*(\w+)/g, '$1 * $2');
  fixed = fixed.replace(/(\w+)\s*\/\s*,\s*,\s*(\w+)/g, '$1 / $2');
  fixed = fixed.replace(/(\w+)\s*\/\s*,\s*(\w+)/g, '$1 / $2');
  fixed = fixed.replace(/(\w+)\s*%\s*,\s*,\s*(\w+)/g, '$1 % $2');
  fixed = fixed.replace(/(\w+)\s*%\s*,\s*(\w+)/g, '$1 % $2');
  
  // Fix malformed comparison operators
  fixed = fixed.replace(/(\w+)\s*==\s*,\s*,\s*(\w+)/g, '$1 == $2');
  fixed = fixed.replace(/(\w+)\s*==\s*,\s*(\w+)/g, '$1 == $2');
  fixed = fixed.replace(/(\w+)\s*!=\s*,\s*,\s*(\w+)/g, '$1 != $2');
  fixed = fixed.replace(/(\w+)\s*!=\s*,\s*(\w+)/g, '$1 != $2');
  fixed = fixed.replace(/(\w+)\s*===\s*,\s*,\s*(\w+)/g, '$1 === $2');
  fixed = fixed.replace(/(\w+)\s*===\s*,\s*(\w+)/g, '$1 === $2');
  fixed = fixed.replace(/(\w+)\s*!==\s*,\s*,\s*(\w+)/g, '$1 !== $2');
  fixed = fixed.replace(/(\w+)\s*!==\s*,\s*(\w+)/g, '$1 !== $2');
  fixed = fixed.replace(/(\w+)\s*<\s*,\s*,\s*(\w+)/g, '$1 < $2');
  fixed = fixed.replace(/(\w+)\s*<\s*,\s*(\w+)/g, '$1 < $2');
  fixed = fixed.replace(/(\w+)\s*>\s*,\s*,\s*(\w+)/g, '$1 > $2');
  fixed = fixed.replace(/(\w+)\s*>\s*,\s*(\w+)/g, '$1 > $2');
  fixed = fixed.replace(/(\w+)\s*<=\s*,\s*,\s*(\w+)/g, '$1 <= $2');
  fixed = fixed.replace(/(\w+)\s*<=\s*,\s*(\w+)/g, '$1 <= $2');
  fixed = fixed.replace(/(\w+)\s*>=\s*,\s*,\s*(\w+)/g, '$1 >= $2');
  fixed = fixed.replace(/(\w+)\s*>=\s*,\s*(\w+)/g, '$1 >= $2');
  
  // Fix malformed assignment operators
  fixed = fixed.replace(/(\w+)\s*=\s*,\s*,\s*(\w+)/g, '$1 = $2');
  fixed = fixed.replace(/(\w+)\s*=\s*,\s*(\w+)/g, '$1 = $2');
  fixed = fixed.replace(/(\w+)\s*\+=\s*,\s*,\s*(\w+)/g, '$1 += $2');
  fixed = fixed.replace(/(\w+)\s*\+=\s*,\s*(\w+)/g, '$1 += $2');
  fixed = fixed.replace(/(\w+)\s*-=\s*,\s*,\s*(\w+)/g, '$1 -= $2');
  fixed = fixed.replace(/(\w+)\s*-=\s*,\s*(\w+)/g, '$1 -= $2');
  fixed = fixed.replace(/(\w+)\s*\*=\s*,\s*,\s*(\w+)/g, '$1 *= $2');
  fixed = fixed.replace(/(\w+)\s*\*=\s*,\s*(\w+)/g, '$1 *= $2');
  fixed = fixed.replace(/(\w+)\s*\/=\s*,\s*,\s*(\w+)/g, '$1 /= $2');
  fixed = fixed.replace(/(\w+)\s*\/=\s*,\s*(\w+)/g, '$1 /= $2');
  fixed = fixed.replace(/(\w+)\s*%=\s*,\s*,\s*(\w+)/g, '$1 %= $2');
  fixed = fixed.replace(/(\w+)\s*%=\s*,\s*(\w+)/g, '$1 %= $2');
  
  // Fix malformed increment/decrement operators
  fixed = fixed.replace(/(\w+)\s*\+\+\s*,\s*,\s*(\w+)/g, '$1++ $2');
  fixed = fixed.replace(/(\w+)\s*\+\+\s*,\s*(\w+)/g, '$1++ $2');
  fixed = fixed.replace(/(\w+)\s*--\s*,\s*,\s*(\w+)/g, '$1-- $2');
  fixed = fixed.replace(/(\w+)\s*--\s*,\s*(\w+)/g, '$1-- $2');
  
  // Fix malformed unary operators
  fixed = fixed.replace(/!\s*,\s*,\s*(\w+)/g, '!$1');
  fixed = fixed.replace(/!\s*,\s*(\w+)/g, '!$1');
  fixed = fixed.replace(/~\s*,\s*,\s*(\w+)/g, '~$1');
  fixed = fixed.replace(/~\s*,\s*(\w+)/g, '~$1');
  fixed = fixed.replace(/\+\s*,\s*,\s*(\w+)/g, '+$1');
  fixed = fixed.replace(/\+\s*,\s*(\w+)/g, '+$1');
  fixed = fixed.replace(/-\s*,\s*,\s*(\w+)/g, '-$1');
  fixed = fixed.replace(/-\s*,\s*(\w+)/g, '-$1');
  
  // Fix malformed property access
  fixed = fixed.replace(/(\w+)\.\s*,\s*,\s*(\w+)/g, '$1.$2');
  fixed = fixed.replace(/(\w+)\.\s*,\s*(\w+)/g, '$1.$2');
  
  // Fix malformed bracket access
  fixed = fixed.replace(/(\w+)\[\s*,\s*,\s*(\w+)\]/g, '$1[$2]');
  fixed = fixed.replace(/(\w+)\[\s*,\s*(\w+)\]/g, '$1[$2]');
  
  // Fix malformed parentheses
  fixed = fixed.replace(/\(\s*,\s*,\s*(\w+)\)/g, '($1)');
  fixed = fixed.replace(/\(\s*,\s*(\w+)\)/g, '($1)');
  fixed = fixed.replace(/\(\s*(\w+)\s*,\s*,\s*\)/g, '($1)');
  fixed = fixed.replace(/\(\s*(\w+)\s*,\s*\)/g, '($1)');
  
  // Fix malformed braces
  fixed = fixed.replace(/\{\s*,\s*,\s*(\w+)\}/g, '{ $1 }');
  fixed = fixed.replace(/\{\s*,\s*(\w+)\}/g, '{ $1 }');
  fixed = fixed.replace(/\{\s*(\w+)\s*,\s*,\s*\}/g, '{ $1 }');
  fixed = fixed.replace(/\{\s*(\w+)\s*,\s*\}/g, '{ $1 }');
  
  // Fix malformed brackets
  fixed = fixed.replace(/\[\s*,\s*,\s*(\w+)\]/g, '[$1]');
  fixed = fixed.replace(/\[\s*,\s*(\w+)\]/g, '[$1]');
  fixed = fixed.replace(/\[\s*(\w+)\s*,\s*,\s*\]/g, '[$1]');
  fixed = fixed.replace(/\[\s*(\w+)\s*,\s*\]/g, '[$1]');
  
  // Fix malformed semicolons
  fixed = fixed.replace(/;\s*,\s*,\s*;/g, ';');
  fixed = fixed.replace(/;\s*,\s*;/g, ';');
  
  // Fix malformed colons
  fixed = fixed.replace(/:\s*,\s*,\s*:/g, ':');
  fixed = fixed.replace(/:\s*,\s*:/g, ':');
  
  // Fix malformed commas
  fixed = fixed.replace(/,\s*,\s*,\s*,/g, ',');
  fixed = fixed.replace(/,\s*,\s*,/g, ',');
  
  // Fix malformed periods
  fixed = fixed.replace(/\.\s*,\s*,\s*\./g, '.');
  fixed = fixed.replace(/\.\s*,\s*\./g, '.');
  
  // Fix malformed question marks
  fixed = fixed.replace(/\?\s*,\s*,\s*\?/g, '?');
  fixed = fixed.replace(/\?\s*,\s*\?/g, '?');
  
  // Fix malformed exclamation marks
  fixed = fixed.replace(/!\s*,\s*,\s*!/g, '!');
  fixed = fixed.replace(/!\s*,\s*!/g, '!');
  
  // Fix malformed at symbols
  fixed = fixed.replace(/@\s*,\s*,\s*@/g, '@');
  fixed = fixed.replace(/@\s*,\s*@/g, '@');
  
  // Fix malformed hash symbols
  fixed = fixed.replace(/#\s*,\s*,\s*#/g, '#');
  fixed = fixed.replace(/#\s*,\s*#/g, '#');
  
  // Fix malformed dollar signs
  fixed = fixed.replace(/\$\s*,\s*,\s*\$/g, '$');
  fixed = fixed.replace(/\$\s*,\s*\$/g, '$');
  
  // Fix malformed percent signs
  fixed = fixed.replace(/%\s*,\s*,\s*%/g, '%');
  fixed = fixed.replace(/%\s*,\s*%/g, '%');
  
  // Fix malformed ampersands
  fixed = fixed.replace(/&\s*,\s*,\s*&/g, '&');
  fixed = fixed.replace(/&\s*,\s*&/g, '&');
  
  // Fix malformed asterisks
  fixed = fixed.replace(/\*\s*,\s*,\s*\*/g, '*');
  fixed = fixed.replace(/\*\s*,\s*\*/g, '*');
  
  // Fix malformed plus signs
  fixed = fixed.replace(/\+\s*,\s*,\s*\+/g, '+');
  fixed = fixed.replace(/\+\s*,\s*\+/g, '+');
  
  // Fix malformed minus signs
  fixed = fixed.replace(/-\s*,\s*,\s*-/g, '-');
  fixed = fixed.replace(/-\s*,\s*-/g, '-');
  
  // Fix malformed equals signs
  fixed = fixed.replace(/=\s*,\s*,\s*=/g, '=');
  fixed = fixed.replace(/=\s*,\s*=/g, '=');
  
  // Fix malformed pipe symbols
  fixed = fixed.replace(/\|\s*,\s*,\s*\|/g, '|');
  fixed = fixed.replace(/\|\s*,\s*\|/g, '|');
  
  // Fix malformed backslashes
  fixed = fixed.replace(/\\\s*,\s*,\s*\\/g, '\\');
  fixed = fixed.replace(/\\\s*,\s*\\/g, '\\');
  
  // Fix malformed forward slashes
  fixed = fixed.replace(/\/\s*,\s*,\s*\//g, '/');
  fixed = fixed.replace(/\/\s*,\s*\//g, '/');
  
  // Fix malformed backticks
  fixed = fixed.replace(/`\s*,\s*,\s*`/g, '`');
  fixed = fixed.replace(/`\s*,\s*`/g, '`');
  
  // Fix malformed single quotes
  fixed = fixed.replace(/'\s*,\s*,\s*'/g, "'");
  fixed = fixed.replace(/'\s*,\s*'/g, "'");
  
  // Fix malformed double quotes
  fixed = fixed.replace(/"\s*,\s*,\s*"/g, '"');
  fixed = fixed.replace(/"\s*,\s*"/g, '"');
  
  // Fix malformed angle brackets
  fixed = fixed.replace(/<\s*,\s*,\s*</g, '<');
  fixed = fixed.replace(/<\s*,\s*</g, '<');
  fixed = fixed.replace(/>\s*,\s*,\s*>/g, '>');
  fixed = fixed.replace(/>\s*,\s*>/g, '>');
  
  // Fix malformed square brackets
  fixed = fixed.replace(/\[\s*,\s*,\s*\[/g, '[');
  fixed = fixed.replace(/\[\s*,\s*\[/g, '[');
  fixed = fixed.replace(/\]\s*,\s*,\s*\]/g, ']');
  fixed = fixed.replace(/\]\s*,\s*\]/g, ']');
  
  // Fix malformed curly braces
  fixed = fixed.replace(/\{\s*,\s*,\s*\{/g, '{');
  fixed = fixed.replace(/\{\s*,\s*\{/g, '{');
  fixed = fixed.replace(/\}\s*,\s*,\s*\}/g, '}');
  fixed = fixed.replace(/\}\s*,\s*\}/g, '}');
  
  // Fix malformed parentheses
  fixed = fixed.replace(/\(\s*,\s*,\s*\(/g, '(');
  fixed = fixed.replace(/\(\s*,\s*\(/g, '(');
  fixed = fixed.replace(/\)\s*,\s*,\s*\)/g, ')');
  fixed = fixed.replace(/\)\s*,\s*\)/g, ')');
  
  return fixed;
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixCriticalErrors(content);
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main function to process all TypeScript files
async function fixAllTypeScriptFiles() {
  console.log('🔧 Starting ultimate final TypeScript syntax fix...');
  
  try {
    // Find all TypeScript files
    const files = await glob('src/**/*.{ts,tsx}', { ignore: ['node_modules/**', 'dist/**'] });
    
    console.log(`📁 Found ${files.length} TypeScript files to process`);
    
    let fixedCount = 0;
    
    for (const file of files) {
      if (processFile(file)) {
        fixedCount++;
      }
    }
    
    console.log(`✅ Fixed ${fixedCount} files`);
    console.log('🎯 Ultimate final TypeScript syntax fix completed!');
    
  } catch (error) {
    console.error('❌ Error during fix process:', error);
  }
}

// Run the fix
fixAllTypeScriptFiles();
