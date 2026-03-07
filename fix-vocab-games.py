#!/usr/bin/env python3
"""
Fix vocab games: replace <script> approach with onLoad callback.
The script tag inside innerHTML doesn't execute, so we use the 
lesson-viewer's page.onLoad() hook instead.
"""
import re, glob, json

def fix_game_page(content):
    """Find vocab game pages and move script logic to onLoad callback."""
    
    # Find pages with Vocabulary Game
    # Pattern: { render: () => `...Vocabulary Game...script...` }
    # Replace with: { render: () => `...no script...`, onLoad: () => { ...script logic... } }
    
    def replace_game_page(match):
        prefix = match.group(1)  # { render: () => `
        page_content = match.group(2)  # content between backticks
        suffix = match.group(3)  # ` }
        
        if 'Vocabulary Game' not in page_content:
            return match.group(0)
        
        # Extract the script content
        script_match = re.search(r'<script>(.*?)<\\/script>', page_content, re.DOTALL)
        if not script_match:
            script_match = re.search(r'<script>(.*?)</script>', page_content, re.DOTALL)
        
        if not script_match:
            return match.group(0)
        
        script_body = script_match.group(1).strip()
        
        # Remove the script tag from the page content
        clean_content = page_content[:script_match.start()] + page_content[script_match.end():]
        
        # Build the onLoad version
        # The script is wrapped in an IIFE, unwrap it
        script_body = script_body.strip()
        if script_body.startswith('(function()'):
            # Remove IIFE wrapper
            script_body = re.sub(r'^\(function\(\)\s*\{', '', script_body)
            script_body = re.sub(r'\}\)\(\);\s*$', '', script_body)
        
        # Build new page object with onLoad
        new_page = f'''{prefix}
{clean_content}
                    `,
                    onLoad: () => {{
                        {script_body}
                    }}
                }}'''
        
        # We need to close differently - the original suffix was `\s*}
        # But now we've already closed with }}
        # So we return without the suffix
        return new_page
    
    # This is tricky because we need to handle the page object boundary correctly
    # Let's use a different approach: find game pages by their content and restructure
    
    # Find all render blocks
    # Pattern: { render: () => `CONTENT` }, or { render: () => `CONTENT` }]
    
    # Simpler approach: find the script inside game pages and replace with onLoad
    # Look for the pattern where a game page's closing looks like:
    # </script>\n                        </div>\n                    `\n                },
    
    pattern = r'(<script>)(.*?)(<\\/script>)(.*?</div>\s*`\s*\})'
    
    def replace_script(m):
        script_content = m.group(2).strip()
        after_script = m.group(4)
        
        # Remove IIFE wrapper if present
        if script_content.startswith('(function(){') or script_content.startswith('(function(){{'):
            script_content = re.sub(r'^\(function\(\)\s*\{{1,2}', '', script_content)
            script_content = re.sub(r'\}{1,2}\)\(\);\s*$', '', script_content)
        
        # The after_script ends with `\s*}
        # We need: (no script)(closing div)(backtick), onLoad: () => { script }, }
        # Replace ` } with `, onLoad: () => { script } }
        after_clean = re.sub(
            r'`(\s*\})',
            f'`,\n                    onLoad: () => {{\n                        {script_content}\n                    }}\n                }}',
            after_script
        )
        
        return after_clean
    
    new_content = re.sub(pattern, replace_script, content, flags=re.DOTALL)
    return new_content

# Process all files
count = 0
for pattern in ['curriculum/grade5/*/*.html', '5th-grade-day-*.html']:
    for f in glob.glob(pattern):
        with open(f) as fh:
            content = fh.read()
        
        if 'Vocabulary Game' not in content:
            continue
        
        if '<script>' not in content and '<\\/script>' not in content:
            continue
        
        new_content = fix_game_page(content)
        
        if new_content != content:
            with open(f, 'w') as fh:
                fh.write(new_content)
            count += 1

print(f"Fixed {count} files")
