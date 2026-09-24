const EventEmitter = require("events");

class Element extends EventEmitter {
    constructor(name, parent = null) {
        super();
        this.name = name;
        this.parent = parent;
    }

    // Similar to browser's addEventListener()
    addEventListener(type, handler) {
        this.on(type, handler);
    }

    // Similar to browser's removeEventListener()
    removeEventListener(type, handler) {
        this.off(type, handler);
    }

    // Similar to browser's dispatchEvent()
    dispatchEvent(type, data = null) {
        // The element where event started
        const target = this;

        const event = {
            type: type,
            target: target,
            currentTarget: null,
            data: data,

            stopPropagation() {
                this.propagationStopped = true;
            },

            propagationStopped: false
        };

        // Start bubbling
        let current = this;

        while (current !== null) {
            event.currentTarget = current;

            current.emit(type, event);

            // Stop if stopPropagation() was called
            if (event.propagationStopped) {
                break;
            }

            current = current.parent;
        }
    }
}


// Create hierarchy
const documentElement = new Element("document");
const form = new Element("form", documentElement);
const button = new Element("button", form);


// ---------------- BUTTON LISTENER ----------------

function buttonClickHandler(event) {
    console.log(
        `Button handler: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}

button.addEventListener("click", buttonClickHandler);


// ---------------- FORM LISTENER ----------------

function formClickHandler(event) {
    console.log(
        `Form handler: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}

form.addEventListener("click", formClickHandler);


// ---------------- DOCUMENT LISTENER ----------------

function documentClickHandler(event) {
    console.log(
        `Document handler: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}

documentElement.addEventListener("click", documentClickHandler);


// =================================================
// SCENARIO A
// =================================================

console.log("\n--- Scenario A ---");

button.dispatchEvent("click", {
    message: "Button clicked"
});


// =================================================
// SCENARIO B
// =================================================

console.log("\n--- Scenario B ---");

// Replace form listener so that it stops propagation
form.removeEventListener("click", formClickHandler);

function formStopHandler(event) {
    console.log(
        `Form handler: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );

    console.log("Form calls stopPropagation()");
    event.stopPropagation();
}

form.addEventListener("click", formStopHandler);

button.dispatchEvent("click", {
    message: "Button clicked again"
});


// =================================================
// SCENARIO C
// =================================================

console.log("\n--- Scenario C ---");

// Remove button's listener
button.removeEventListener("click", buttonClickHandler);

button.dispatchEvent("click", {
    message: "Button clicked after removing listener"
});


// =================================================
// KEYPRESS EVENT
// =================================================

console.log("\n--- Keypress Event ---");

form.addEventListener("keypress", (event) => {
    console.log(
        `Keypress handler: target=${event.target.name}, currentTarget=${event.currentTarget.name}, key=${event.data.key}`
    );
});

form.dispatchEvent("keypress", {
    key: "Enter"
});