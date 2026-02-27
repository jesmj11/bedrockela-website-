#!/bin/bash

# 📚 Download Missing Public Domain Books
# Gets books from Project Gutenberg for 4th Grade curriculum

echo "🐉 Downloading missing books from Project Gutenberg..."
echo ""

# Create books directory if it doesn't exist
mkdir -p books

# Download Around the World in 80 Days (Jules Verne)
if [ ! -f "books/around-the-world-in-80-days.txt" ]; then
  echo "📖 Downloading Around the World in 80 Days..."
  curl -o books/around-the-world-in-80-days.txt https://www.gutenberg.org/files/103/103-0.txt
  echo "✅ Downloaded Around the World in 80 Days"
else
  echo "✅ Around the World in 80 Days already downloaded"
fi

# Download Black Beauty (Anna Sewell)
if [ ! -f "books/black-beauty.txt" ]; then
  echo "📖 Downloading Black Beauty..."
  curl -o books/black-beauty.txt https://www.gutenberg.org/files/271/271-0.txt
  echo "✅ Downloaded Black Beauty"
else
  echo "✅ Black Beauty already downloaded"
fi

# Download Adventures of Sherlock Holmes (Arthur Conan Doyle)
if [ ! -f "books/sherlock-holmes.txt" ]; then
  echo "📖 Downloading Adventures of Sherlock Holmes..."
  curl -o books/sherlock-holmes.txt https://www.gutenberg.org/files/1661/1661-0.txt
  echo "✅ Downloaded Adventures of Sherlock Holmes"
else
  echo "✅ Adventures of Sherlock Holmes already downloaded"
fi

# Download Alice in Wonderland (Lewis Carroll)
if [ ! -f "books/alice-in-wonderland.txt" ]; then
  echo "📖 Downloading Alice's Adventures in Wonderland..."
  curl -o books/alice-in-wonderland.txt https://www.gutenberg.org/files/11/11-0.txt
  echo "✅ Downloaded Alice's Adventures in Wonderland"
else
  echo "✅ Alice's Adventures in Wonderland already downloaded"
fi

echo ""
echo "🎉 All books downloaded!"
echo ""
echo "📂 Books saved in: ./books/"
echo ""
echo "Next steps:"
echo "  1. Run parsing scripts to convert to JSON"
echo "  2. Create chapter mappings for each book"
echo "  3. Create automation scripts to add to lessons"
echo "  4. Run automation scripts"
echo ""
echo "See DIGITAL-BOOKS-ROADMAP.md for full instructions."
