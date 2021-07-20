const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        // this.elements.container = document.createElement("div");/*for drag-drop*/

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden"); /*, "item" */
        this.elements.keysContainer.classList.add("keyboard__keys");
        // this.elements.container.classList.add("container"); /*for drag-drop*/
        // this.elements.container.appendChild(this.elements.keysContainer); /*for drag-drop*/
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "ё", "1", '2', "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х","ъ",
            // "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д","ж","э", "enter",
            // "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "я", "ч", "с", "м", "и", "т", "ь", "б","ю", ",", ".",  
            // "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "ъ", "enter", "."].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;
                // my insert
                case "1":
                    keyElement.textContent = "1";
                    keyElement.textContent = this.properties.capsLock ? `!` : "1";
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? `!` : "1";
                        keyElement.textContent = this.properties.capsLock ? `!` : "1";
                        this._triggerEvent("oninput");
                    });

                    break;
                
                case "2":
                keyElement.textContent = "2";
                keyElement.textContent = this.properties.capsLock ? `"` : "2";
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? `"` : "2";
                    keyElement.textContent = this.properties.capsLock ? `"` : "2";
                    this._triggerEvent("oninput");
                });

                break;

                case "3":
                keyElement.textContent = "3";
                keyElement.textContent = this.properties.capsLock ? `№` : "3";
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? `№` : "3";
                    keyElement.textContent = this.properties.capsLock ? `№` : "3";
                    this._triggerEvent("oninput");
                });

                break;

                case "4":
                keyElement.textContent = "4";
                keyElement.textContent = this.properties.capsLock ? `;` : "4";
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? `;` : "4";
                    keyElement.textContent = this.properties.capsLock ? `;` : "4";
                    this._triggerEvent("oninput");
                });

                break;

                case "5":
                keyElement.textContent = "5";
                keyElement.textContent = this.properties.capsLock ? `%` : "5";
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? `%` : "5";
                    keyElement.textContent = this.properties.capsLock ? `%` : "5";
                    this._triggerEvent("oninput");
                });

                break;

                case "6":
                keyElement.textContent = "6";
                keyElement.textContent = this.properties.capsLock ? `:` : "6";
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? `:` : "6";
                    keyElement.textContent = this.properties.capsLock ? `:` : "6";
                    this._triggerEvent("oninput");
                });

                break;

                case "7":
                keyElement.textContent = "7";
                keyElement.textContent = this.properties.capsLock ? `?` : "7";
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? `?` : "7";
                    keyElement.textContent = this.properties.capsLock ? `7` : "7";
                    this._triggerEvent("oninput");
                });

                break;

                case "8":
                keyElement.textContent = "8";
                keyElement.textContent = this.properties.capsLock ? `*` : "8";
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? `*` : "8";
                    keyElement.textContent = this.properties.capsLock ? `*` : "8";
                    this._triggerEvent("oninput");
                });

                break;

                case "9":
                keyElement.textContent = "9";
                keyElement.textContent = this.properties.capsLock ? `(` : "9";
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? `(` : "9";
                    keyElement.textContent = this.properties.capsLock ? `(` : "9";
                    this._triggerEvent("oninput");
                });

                break;

                case "0":
                keyElement.textContent = "0";
                keyElement.textContent = this.properties.capsLock ? `)` : "0";
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? `)` : "0";
                    keyElement.textContent = this.properties.capsLock ? `)` : "0";
                    this._triggerEvent("oninput");
                });

                break;

                case "-":
                keyElement.textContent = "-";
                keyElement.textContent = this.properties.capsLock ? `_` : "-";
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? `_` : "-";
                    keyElement.textContent = this.properties.capsLock ? `_` : "-";
                    this._triggerEvent("oninput");
                });

                break;

                case "=":
                keyElement.textContent = "=";
                keyElement.textContent = this.properties.capsLock ? `+` : "=";
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? `+` : "=";
                    keyElement.textContent = this.properties.capsLock ? `+` : "=";
                    this._triggerEvent("oninput");
                });

                break;

                case ".":
                keyElement.textContent = ".";
                keyElement.textContent = this.properties.capsLock ? `,` : ".";
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? `,` : ".";
                    keyElement.textContent = this.properties.capsLock ? `,` : ".";
                    this._triggerEvent("oninput");
                });

                break;
                // end of my insert
                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            // my insert
            if(key.textContent === "1"){
                key.textContent = this.properties.capsLock ? "!" : "1";
                console.log(key.textContent)
            }
            else if(key.textContent === "2"){
                key.textContent = this.properties.capsLock ? '"' : "2";
                console.log(key.textContent)
            }
            else if(key.textContent === "3"){
                key.textContent = this.properties.capsLock ? "№" : "3";
                console.log(key.textContent)
            }
            else if(key.textContent === "4"){
                key.textContent = this.properties.capsLock ? ";" : "4";
                console.log(key.textContent)
            }
            else if(key.textContent === "5"){
                key.textContent = this.properties.capsLock ? "%" : "5";
                console.log(key.textContent)
            }
            else if(key.textContent === "6"){
                key.textContent = this.properties.capsLock ? ":" : "6";
                console.log(key.textContent)
            }
            else if(key.textContent === "7"){
                key.textContent = this.properties.capsLock ? "?" : "7";
                console.log(key.textContent)
            }
            else if(key.textContent === "8"){
                key.textContent = this.properties.capsLock ? "*" : "8";
                console.log(key.textContent)
            }
            else if(key.textContent === "9"){
                key.textContent = this.properties.capsLock ? "(" : "9";
                console.log(key.textContent)
            }
            else if(key.textContent === "0"){
                key.textContent = this.properties.capsLock ? ")" : "0";
                console.log(key.textContent)
            }
            else if(key.textContent === "-"){
                key.textContent = this.properties.capsLock ? "_" : "-";
                console.log(key.textContent)
            }
            else if(key.textContent === "="){
                key.textContent = this.properties.capsLock ? "+" : "=";
                console.log(key.textContent)
            }
            else if(key.textContent === "."){
                key.textContent = this.properties.capsLock ? "," : ".";
                console.log(key.textContent)
            }
            // end of my insert
            else if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});





// drag the keyboard


// id="container">
// id="item">

var dragItem = document.querySelector(".item");
var container = document.querySelector(".container");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === dragItem) {
    active = true;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}

function drag(e) {
  if (active) {
  
    e.preventDefault();
  
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, dragItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}