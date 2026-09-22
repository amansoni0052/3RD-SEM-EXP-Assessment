const fs = require("fs");

// CREATE
fs.writeFileSync("data.txt", "Hello, this is my file.");
console.log("File created");

// READ
let data = fs.readFileSync("data.txt", "utf8");
console.log("File content:", data);

// UPDATE
fs.appendFileSync("data.txt", "\nThis is new content.");
console.log("File updated");

// READ again
data = fs.readFileSync("data.txt", "utf8");
console.log("Updated content:", data);

// DELETE
fs.unlinkSync("data.txt");
console.log("File deleted");