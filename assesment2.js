const http = require('http');
const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'files');

if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/') {
        res.end('File Server is Running');
    }

    else {
        res.statusCode = 404;
        res.end('Route Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
