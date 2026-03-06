#!/bin/bash

# Renumber 5th Grade Mythology Lessons
# Greek: 161-180 → 99-118
# Roman: 181-200 → 119-138
# Norse: 141-160 → 139-158

echo "🐉 Renumbering 5th Grade Mythology Lessons"
echo ""

cd /Users/mushu/.openclaw/workspace/bedrockela-website-

# Step 1: Renumber Greek (161-180 → 99-118)
echo "📗 Renumbering Greek Mythology..."
for old in {161..180}; do
    new=$((old - 62))
    if [ -f "curriculum/grade5/greek/5th-grade-lesson-$old.html" ]; then
        # Rename file
        mv "curriculum/grade5/greek/5th-grade-lesson-$old.html" "curriculum/grade5/greek/5th-grade-lesson-$new.html"
        
        # Update lesson IDs and day numbers inside the file
        sed -i '' "s/Day $old/Day $new/g" "curriculum/grade5/greek/5th-grade-lesson-$new.html"
        sed -i '' "s/day-$old/day-$new/g" "curriculum/grade5/greek/5th-grade-lesson-$new.html"
        sed -i '' "s/lesson-$old/lesson-$new/g" "curriculum/grade5/greek/5th-grade-lesson-$new.html"
        
        echo "  ✅ Renamed lesson $old → $new"
    else
        echo "  ⚠️  File not found: 5th-grade-lesson-$old.html"
    fi
done

# Step 2: Renumber Roman (181-200 → 119-138)
echo ""
echo "📘 Renumbering Roman Mythology..."
for old in {181..200}; do
    new=$((old - 62))
    if [ -f "curriculum/grade5/roman/5th-grade-lesson-$old.html" ]; then
        # Rename file
        mv "curriculum/grade5/roman/5th-grade-lesson-$old.html" "curriculum/grade5/roman/5th-grade-lesson-$new.html"
        
        # Update lesson IDs and day numbers inside the file
        sed -i '' "s/Day $old/Day $new/g" "curriculum/grade5/roman/5th-grade-lesson-$new.html"
        sed -i '' "s/day-$old/day-$new/g" "curriculum/grade5/roman/5th-grade-lesson-$new.html"
        sed -i '' "s/lesson-$old/lesson-$new/g" "curriculum/grade5/roman/5th-grade-lesson-$new.html"
        
        echo "  ✅ Renamed lesson $old → $new"
    else
        echo "  ⚠️  File not found: 5th-grade-lesson-$old.html"
    fi
done

# Step 3: Renumber Norse (141-160 → 139-158)
echo ""
echo "📙 Renumbering Norse Mythology..."
for old in {141..160}; do
    new=$((old - 2))
    if [ -f "curriculum/grade5/norse/5th-grade-lesson-$old.html" ]; then
        # Rename file
        mv "curriculum/grade5/norse/5th-grade-lesson-$old.html" "curriculum/grade5/norse/5th-grade-lesson-$new.html"
        
        # Update lesson IDs and day numbers inside the file
        sed -i '' "s/Day $old/Day $new/g" "curriculum/grade5/norse/5th-grade-lesson-$new.html"
        sed -i '' "s/day-$old/day-$new/g" "curriculum/grade5/norse/5th-grade-lesson-$new.html"
        sed -i '' "s/lesson-$old/lesson-$new/g" "curriculum/grade5/norse/5th-grade-lesson-$new.html"
        
        # Update week numbers (Norse starts at Week 28, but now should be Week 29-32)
        # This is complex - let me calculate the week for each day
        week=$(( (new - 1) / 5 + 1 ))
        old_week=$(( (old - 1) / 5 + 1 ))
        sed -i '' "s/Week $old_week/Week $week/g" "curriculum/grade5/norse/5th-grade-lesson-$new.html"
        
        echo "  ✅ Renamed lesson $old → $new (Week $week)"
    else
        echo "  ⚠️  File not found: 5th-grade-lesson-$old.html"
    fi
done

echo ""
echo "✅ Renumbering complete!"
echo ""
echo "📊 Summary:"
echo "  Greek: 161-180 → 99-118 (Days 99-118)"
echo "  Roman: 181-200 → 119-138 (Days 119-138)"
echo "  Norse: 141-160 → 139-158 (Days 139-158)"
echo ""
echo "Next: Build Celtic (Days 49-54) and Egyptian (Days 55-58) lessons"
