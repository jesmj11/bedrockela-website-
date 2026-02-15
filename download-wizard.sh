#!/bin/bash
# Try to download Wizard of Oz from multiple sources

echo "Attempting to download The Wonderful Wizard of Oz..."

# Method 1: Direct Gutenberg
curl -L --connect-timeout 10 --max-time 30 \
  "https://www.gutenberg.org/cache/epub/55/pg55.txt" \
  -o /tmp/wiz-test1.txt 2>/dev/null && \
  wc -l /tmp/wiz-test1.txt && \
  mv /tmp/wiz-test1.txt /tmp/wizard-oz-final.txt && \
  echo "Success via Gutenberg!" && exit 0

# Method 2: Try raw.githubusercontent from a public repo
curl -L --connect-timeout 10 --max-time 30 \
  "https://gist.githubusercontent.com/macdis/61fd98ae42bd9ed05e5e87754277f40b/raw/wizard-of-oz.txt" \
  -o /tmp/wiz-test2.txt 2>/dev/null && \
  [ $(wc -l < /tmp/wiz-test2.txt) -gt 100 ] && \
  mv /tmp/wiz-test2.txt /tmp/wizard-oz-final.txt && \
  echo "Success via GitHub!" && exit 0

echo "Download failed, will use manual method"
exit 1
