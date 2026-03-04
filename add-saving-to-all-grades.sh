#!/bin/bash
# Add saving functionality to all grades

cd /Users/mushu/.openclaw/workspace/bedrockela-website-

for grade in 1st 2nd 3rd 5th 6th; do
  echo "=== Adding saving to $grade grade ==="
  
  count=0
  for file in ${grade}-grade-day-*.html; do
    if [ -f "$file" ] && ! grep -q "lesson-autosave.js" "$file"; then
      # Add scripts before closing body tag
      sed -i '' 's|</body>|    <script src="js/lesson-autosave.js"></script>\
    <script src="js/save-button-injector.js"></script>\
    <script src="js/answer-validation.js"></script>\
    <script src="js/lesson-completion.js"></script>\
</body>|' "$file"
      count=$((count + 1))
    fi
  done
  
  echo "✅ Updated $count lessons"
done

echo ""
echo "🎉 All grades now have saving functionality!"
