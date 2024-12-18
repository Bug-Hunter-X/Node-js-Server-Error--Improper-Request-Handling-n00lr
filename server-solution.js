const http = require('http');

const requestListener = function (req, res) {
  try {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    if (req.method === 'GET') {
      res.end('Hello, World! (GET)');
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        res.end(`You posted: ${body}`);
      });
    } else {
      res.writeHead(405, {'Content-Type': 'text/plain'});
      res.end('Method Not Allowed');
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Internal Server Error');
  }
};

const server = http.createServer(requestListener);

server.on('error', err => {
  console.error('Server error:', err);
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});