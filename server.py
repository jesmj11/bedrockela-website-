#!/usr/bin/env python3
"""
Simple HTTP server for BedrockELA PWA
Serves static files with proper MIME types for offline functionality
"""

import http.server
import socketserver
import mimetypes
import os
from urllib.parse import urlparse

class BedrockELAHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add PWA-specific headers
        self.send_header('Cache-Control', 'public, max-age=0')
        if self.path.endswith('/sw.js'):
            self.send_header('Service-Worker-Allowed', '/')
        super().end_headers()
    
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Remove query parameters and fragments
        if path.endswith('/') or path == '':
            path = '/index.html'
        elif not '.' in os.path.basename(path):
            # If no file extension, serve index.html (SPA fallback)
            path = '/index.html'
        
        # Set the path for the parent class
        self.path = path
        
        # Ensure proper MIME types for PWA files
        if path.endswith('.json'):
            mimetypes.add_type('application/json', '.json')
        elif path.endswith('.js'):
            mimetypes.add_type('application/javascript', '.js')
        elif path.endswith('.css'):
            mimetypes.add_type('text/css', '.css')
        elif path.endswith('.html'):
            mimetypes.add_type('text/html', '.html')
        elif path.endswith('.jpg') or path.endswith('.jpeg'):
            mimetypes.add_type('image/jpeg', '.jpg')
        elif path.endswith('.png'):
            mimetypes.add_type('image/png', '.png')
        elif path.endswith('.svg'):
            mimetypes.add_type('image/svg+xml', '.svg')
        
        # Call the parent class method
        return super().do_GET()
    
    def guess_type(self, path):
        """Override to ensure correct MIME types"""
        base, ext = os.path.splitext(path)
        
        # PWA-specific MIME types
        if ext == '.json':
            return 'application/json'
        elif ext == '.js':
            return 'application/javascript'
        elif path.endswith('/sw.js'):
            return 'application/javascript'
        elif path.endswith('/manifest.json'):
            return 'application/manifest+json'
        
        # Default behavior
        return super().guess_type(path)

def run_server(port=8080):
    """Start the BedrockELA PWA server"""
    
    # Change to the directory containing the files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print(f"🏔️ BedrockELA PWA Server starting on port {port}")
    print(f"📱 Norwegian Mountain Learning Adventure ready!")
    print(f"🌐 Visit: http://localhost:{port}")
    print(f"📦 PWA features: Service Worker, Offline Support, Installable")
    
    with socketserver.TCPServer(("", port), BedrockELAHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🐐 BedrockELA server stopped. Happy learning!")

if __name__ == "__main__":
    import sys
    
    # Get port from environment or command line
    port = int(os.environ.get('PORT', 8080))
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Invalid port number. Using default port 8080.")
    
    run_server(port)