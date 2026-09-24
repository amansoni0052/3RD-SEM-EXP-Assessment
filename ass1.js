const EventEmitter = require("events");

class SessionManager extends EventEmitter {

    // Method to trigger only allowed events
    trigger(command, ...args) {
        if (command === "greet" || command === "exit") {
            this.emit(command, ...args);
        } else {
            console.log(`Unknown event: ${command}`);
        }
    }
}

// Create object
const session = new SessionManager();

// greet listener
session.on("greet", (username) => {
    console.log(`Hello, ${username}! Welcome.`);
});

// once listener - runs only once
session.once("greet", () => {
    console.log("First login of the day!");
});

// exit listener
session.on("exit", (code) => {
    console.log(`Session closed with code ${code}. Goodbye!`);
});

// error listener
session.on("error", (message) => {
    console.log(`Error: ${message}`);
});

// Emit greet three times
session.emit("greet", "Aman");
session.emit("greet", "Rahul");
session.emit("greet", "Priya");

// Print listener count for greet
console.log("Greet listener count:", session.listenerCount("greet"));

// Emit exit
session.emit("exit", 0);

// Unknown event
session.trigger("login");

// Emit error event
session.emit("error", "Something went wrong in the session.");