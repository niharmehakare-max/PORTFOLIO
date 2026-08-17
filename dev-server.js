const http = require('http');
const fs = require('fs');
const path = require('path');

// Load local environment variables from .env.local
if (fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  envContent.split('\n').forEach(line => {
    const [k, ...v] = line.trim().split('=');
    if (k && v.length) process.env[k.trim()] = v.join('=').trim();
  });
}

const spotifyHandler = require('./api/spotify.js');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const url = req.url.split('?')[0];

  if (url === '/api/spotify') {
    const mockRes = {
      setHeader: (name, value) => res.setHeader(name, value),
      status: (code) => ({
        json: (data) => {
          res.writeHead(code, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(data));
        }
      })
    };
    return spotifyHandler(req, mockRes);
  }

  let filePath = path.join(__dirname, url === '/' ? 'index.html' : url);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(data);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('\n=========================================');
  console.log('  Portfolio Local Dev Server Running!');
  console.log(`  Local URL: http://localhost:${PORT}`);
  console.log(`  Test Spotify API: http://localhost:${PORT}/api/spotify`);
  console.log('=========================================\n');
});
