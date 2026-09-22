const http = require("http");

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/users") {
        res.end("GET: Fetch users");
    }

    else if (req.method === "POST" && req.url === "/users") {
        res.end("POST: Create user");
    }

    else if (req.method === "PUT" && req.url === "/users") {
        res.end("PUT: Update user");
    }

    else if (req.method === "DELETE" && req.url === "/users") {
        res.end("DELETE: Delete user");
    }

    else {
        res.statusCode = 404;
        res.end("Route not found");
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});