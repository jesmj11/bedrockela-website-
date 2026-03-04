#!/bin/bash
# Standardize all grade levels to match 4th grade format

cd /Users/mushu/.openclaw/workspace/bedrockela-website-

for grade in 1st 2nd 3rd 5th 6th; do
  echo "=== Processing $grade grade ==="
  
  # Rename REVISED files to day-N.html format
  for file in ${grade}-grade-lesson-*-REVISED.html; do
    if [ -f "$file" ]; then
      # Extract lesson number
      num=$(echo "$file" | grep -o 'lesson-[0-9]*' | grep -o '[0-9]*')
      newname="${grade}-grade-day-${num}.html"
      mv "$file" "$newname" 2>/dev/null
    fi
  done
  
  # Update CSS path to lesson-viewer.css?v=3.2
  sed -i '' 's|css/lesson-v[0-9]*.css|css/lesson-viewer.css?v=3.2|g' ${grade}-grade-day-*.html 2>/dev/null
  sed -i '' 's|css/lesson-viewer.css"|css/lesson-viewer.css?v=3.2"|g' ${grade}-grade-day-*.html 2>/dev/null
  
  # Add save button injector if not present
  for file in ${grade}-grade-day-*.html; do
    if [ -f "$file" ] && ! grep -q "save-button-injector.js" "$file"; then
      sed -i '' 's|<script src="js/lesson-autosave.js"></script>|<script src="js/lesson-autosave.js"></script>\n    <script src="js/save-button-injector.js"></script>|g' "$file"
    fi
  done
  
  count=$(ls ${grade}-grade-day-*.html 2>/dev/null | wc -l)
  echo "✅ $grade grade: $count lessons ready"
done

echo ""
echo "🎉 All grades standardized!"
