#!/bin/bash
# Renumber Norse Mythology from Days 141-160 to Days 139-158

cd /Users/mushu/.openclaw/workspace/bedrockela-website-

echo "🔄 Renumbering Norse Mythology lessons..."

# Renumber in reverse order to avoid overwrites
for oldDay in {160..141}; do
    newDay=$((oldDay - 2))
    oldFile="5th-grade-day-${oldDay}.html"
    newFile="5th-grade-day-${newDay}.html"
    
    if [ -f "$oldFile" ]; then
        echo "Renumbering Day $oldDay → Day $newDay..."
        
        # Copy file
        cp "$oldFile" "$newFile"
        
        # Update all lesson numbers in the new file
        sed -i '' "s/Lesson ${oldDay}/Lesson ${newDay}/g" "$newFile"
        sed -i '' "s/day-${oldDay}/day-${newDay}/g" "$newFile"
        sed -i '' "s/lesson${oldDay}Config/lesson${newDay}Config/g" "$newFile"
        sed -i '' "s/Assessment ${oldDay}/Assessment ${newDay}/g" "$newFile"
        
        # Remove old file
        rm "$oldFile"
    fi
done

echo "✅ Norse lessons renumbered to Days 139-158"
ls -1 5th-grade-day-1{39..58}.html 2>/dev/null | wc -l
