import os
import sys
from http.server import SimpleHTTPRequestHandler, HTTPServer

PORT = 8080

class UnityBrotliHTTPRequestHandler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        clean_path = path.split('?')[0]
        if clean_path.endswith('.wasm') or clean_path.endswith('.wasm.br'):
            return 'application/wasm'
        elif clean_path.endswith('.js') or clean_path.endswith('.js.br'):
            return 'application/javascript'
        elif clean_path.endswith('.data') or clean_path.endswith('.data.br'):
            return 'application/octet-stream'
        return super().guess_type(path)

    def end_headers(self):
        clean_path = self.path.split('?')[0]
        if clean_path.endswith('.br'):
            self.send_header('Content-Encoding', 'br')
            self.send_header('Vary', 'Accept-Encoding')
            self.send_header('Cache-Control', 'no-cache')

        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def run_server():
    ports_to_try = [8080, 8000, 3000, 5000, 8085, 8888, 0]
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    server = None
    selected_port = None
    for port in ports_to_try:
        try:
            server = HTTPServer(('127.0.0.1', port), UnityBrotliHTTPRequestHandler)
            selected_port = server.server_address[1]
            break
        except OSError:
            continue

    if not server:
        print("Sunucu başlatılamadı.")
        return

    print(f"Serving Unity WebGL on http://localhost:{selected_port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass

if __name__ == '__main__':
    run_server()
