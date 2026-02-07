#!/bin/bash

# Gbaki Digital - Code Cleanup Script
# Removes console.logs, fixes common issues, and improves code quality

echo "🧹 Starting code cleanup..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Counter for issues found
CONSOLE_LOGS=0
TODO_COMMENTS=0
TYPE_ASSERTIONS=0

echo ""
echo "📊 Scanning codebase..."
echo ""

# 1. Find and report console.logs
echo "${YELLOW}1. Checking for console.log statements...${NC}"
CONSOLE_LOG_FILES=$(grep -r "console.log" . --include="*.ts" --include="*.tsx" --exclude-dir=node_modules --exclude-dir=.next -l 2>/dev/null)
if [ ! -z "$CONSOLE_LOG_FILES" ]; then
    CONSOLE_LOGS=$(echo "$CONSOLE_LOG_FILES" | wc -l)
    echo "${RED}   Found $CONSOLE_LOGS files with console.log${NC}"
    echo "$CONSOLE_LOG_FILES" | while read file; do
        echo "   - $file"
    done
else
    echo "${GREEN}   ✓ No console.log statements found${NC}"
fi

echo ""

# 2. Find TODO comments
echo "${YELLOW}2. Checking for TODO comments...${NC}"
TODO_FILES=$(grep -r "TODO" . --include="*.ts" --include="*.tsx" --exclude-dir=node_modules --exclude-dir=.next -l 2>/dev/null)
if [ ! -z "$TODO_FILES" ]; then
    TODO_COMMENTS=$(grep -r "TODO" . --include="*.ts" --include="*.tsx" --exclude-dir=node_modules --exclude-dir=.next 2>/dev/null | wc -l)
    echo "${YELLOW}   Found $TODO_COMMENTS TODO comments${NC}"
    echo "$TODO_FILES" | while read file; do
        echo "   - $file"
    done
else
    echo "${GREEN}   ✓ No TODO comments found${NC}"
fi

echo ""

# 3. Find 'as any' type assertions
echo "${YELLOW}3. Checking for 'as any' type assertions...${NC}"
ANY_FILES=$(grep -r "as any" . --include="*.ts" --include="*.tsx" --exclude-dir=node_modules --exclude-dir=.next -l 2>/dev/null)
if [ ! -z "$ANY_FILES" ]; then
    TYPE_ASSERTIONS=$(grep -r "as any" . --include="*.ts" --include="*.tsx" --exclude-dir=node_modules --exclude-dir=.next 2>/dev/null | wc -l)
    echo "${RED}   Found $TYPE_ASSERTIONS 'as any' type assertions${NC}"
    echo "$ANY_FILES" | while read file; do
        COUNT=$(grep "as any" "$file" | wc -l)
        echo "   - $file ($COUNT occurrences)"
    done
else
    echo "${GREEN}   ✓ No 'as any' type assertions found${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Summary:"
echo "   Console.logs: $CONSOLE_LOGS files"
echo "   TODO comments: $TODO_COMMENTS"
echo "   Type assertions: $TYPE_ASSERTIONS"
echo ""

# Ask if user wants to clean console.logs
if [ $CONSOLE_LOGS -gt 0 ]; then
    echo "${YELLOW}Would you like to remove all console.log statements? (y/n)${NC}"
    read -r REMOVE_LOGS
    if [ "$REMOVE_LOGS" = "y" ]; then
        echo "Removing console.log statements..."
        find . -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" -not -path "*/.next/*" -exec sed -i '' '/console\.log/d' {} +
        echo "${GREEN}✓ Console.log statements removed${NC}"
    fi
fi

echo ""
echo "${GREEN}✨ Cleanup complete!${NC}"

