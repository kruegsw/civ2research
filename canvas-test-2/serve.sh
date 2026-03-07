#!/bin/sh
cd "$(dirname "$0")" && python3 -c "
from http.server import HTTPServer, SimpleHTTPRequestHandler
class H(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
HTTPServer(('', 8000), H).serve_forever()
"
