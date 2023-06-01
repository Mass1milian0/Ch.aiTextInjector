// ==UserScript==
// @name        Character Ai Utils
// @namespace   Violentmonkey Scripts
// @match       https://beta.character.ai/*
// @grant       none
// @version     1.1
// @author      -
// @description 24/5/2023, 19:07:21
// @license MIT
// ==/UserScript==
const originalFetch = window.fetch;
let customPrepend = ""
function createPrependWindow() {
    //create a floating div which can be resized, dragged, minimized, and closed (like a window) to change the custom prepend
    let customPrependDiv = document.createElement("div")
    customPrependDiv.style.position = "fixed"
    customPrependDiv.style.top = "0px"
    customPrependDiv.style.left = "0px"
    customPrependDiv.style.width = "235px"
    customPrependDiv.style.height = "200px"
    customPrependDiv.style.backgroundColor = "white"
    customPrependDiv.style.border = "1px solid black"
    customPrependDiv.style.zIndex
    customPrependDiv.style.resize = "both"
    customPrependDiv.style.overflow = "auto"
    customPrependDiv.style.display = "none"
    customPrependDiv.style.padding = "5px"
    customPrependDiv.style.fontFamily = "monospace"
    customPrependDiv.style.fontSize = "12px"
    customPrependDiv.style.userSelect = "none"
    customPrependDiv.style.cursor = "move"
    customPrependDiv.style.boxShadow = "0px 0px 10px 0px rgba(0,0,0,0.75)"
    customPrependDiv.style.borderRadius = "5px"
    customPrependDiv.style.transition = "height 0.2s ease-in-out"
    customPrependDiv.style.zIndex = 213098123

    let customPrependDivHeader = document.createElement("div")
    customPrependDivHeader.style.width = "100%"
    customPrependDivHeader.style.height = "20px"
    customPrependDivHeader.style.backgroundColor = "lightgray"
    customPrependDivHeader.style.borderBottom = "1px solid black"
    customPrependDivHeader.style.borderTopLeftRadius = "5px"
    customPrependDivHeader.style.borderTopRightRadius = "5px"
    customPrependDivHeader.style.userSelect = "none"
    customPrependDivHeader.style.cursor = "move"
    customPrependDivHeader.style.display = "flex"
    customPrependDivHeader.style.alignItems = "center"
    customPrependDivHeader.style.justifyContent = "center"

    let customPrependDivHeaderText = document.createElement("span")
    customPrependDivHeaderText.innerText = "Custom Prepend"
    customPrependDivHeaderText.style.fontWeight = "bold"
    customPrependDivHeaderText.style.fontSize = "14px"

    let customPrependDivCloseButton = document.createElement("button")
    customPrependDivCloseButton.innerText = "X"
    customPrependDivCloseButton.style.position = "absolute"
    customPrependDivCloseButton.style.right = "5px"
    customPrependDivCloseButton.style.top = "5px"
    customPrependDivCloseButton.style.width = "20px"
    customPrependDivCloseButton.style.height = "20px"
    customPrependDivCloseButton.style.backgroundColor = "transparent"
    customPrependDivCloseButton.style.border = "none"
    customPrependDivCloseButton.style.outline = "none"
    customPrependDivCloseButton.style.cursor = "pointer"
    customPrependDivCloseButton.style.userSelect = "none"
    customPrependDivCloseButton.style.fontWeight = "bold"
    customPrependDivCloseButton.style.fontSize = "14px"
    customPrependDivCloseButton.style.transition = "height 0.2s ease-in-out"

    let customPrependDivMinimizeButton = document.createElement("button")
    customPrependDivMinimizeButton.innerText = "-"
    customPrependDivMinimizeButton.style.position = "absolute"
    customPrependDivMinimizeButton.style.right = "30px"
    customPrependDivMinimizeButton.style.top = "5px"
    customPrependDivMinimizeButton.style.width = "20px"
    customPrependDivMinimizeButton.style.height = "20px"
    customPrependDivMinimizeButton.style.backgroundColor = "transparent"
    customPrependDivMinimizeButton.style.border = "none"
    customPrependDivMinimizeButton.style.outline = "none"
    customPrependDivMinimizeButton.style.cursor = "pointer"
    customPrependDivMinimizeButton.style.userSelect = "none"
    customPrependDivMinimizeButton.style.fontWeight = "bold"
    customPrependDivMinimizeButton.style.fontSize = "14px"
    customPrependDivMinimizeButton.style.transition = "height 0.2s ease-in-out"

    let customPrependDivContent = document.createElement("div")
    customPrependDivContent.style.width = "100%"
    customPrependDivContent.style.height = "100%"
    customPrependDivContent.style.padding = "5px"
    customPrependDivContent.style.boxSizing = "border-box"

    let customPrependDivTextarea = document.createElement("textarea")
    customPrependDivTextarea.style.width = "100%"
    customPrependDivTextarea.style.height = "100%"
    customPrependDivTextarea.style.resize = "none"
    customPrependDivTextarea.style.outline = "none"
    customPrependDivTextarea.style.border = "none"
    customPrependDivTextarea.style.fontFamily = "monospace"
    customPrependDivTextarea.style.fontSize = "12px"
    customPrependDivTextarea.style.userSelect = "none"
    customPrependDivTextarea.style.cursor = "text"
    customPrependDivTextarea.style.boxShadow = "none"
    customPrependDivTextarea.style.borderRadius = "0px"
    customPrependDivTextarea.style.transition = "height 0.2s ease-in-out"

    customPrependDivHeader.appendChild(customPrependDivHeaderText)
    customPrependDivHeader.appendChild(customPrependDivCloseButton)
    customPrependDivHeader.appendChild(customPrependDivMinimizeButton)
    customPrependDivContent.appendChild(customPrependDivTextarea)
    customPrependDiv.appendChild(customPrependDivHeader)
    customPrependDiv.appendChild(customPrependDivContent)
    document.body.appendChild(customPrependDiv)

    //create a buttton in the top left corner of the screen to open the custom prepend div, with a little animation and margin
    let customPrependDivOpenButton = document.createElement("button")
    customPrependDivOpenButton.innerText = "Custom Prepend"
    customPrependDivOpenButton.style.position = "fixed"
    customPrependDivOpenButton.style.top = "5px"
    customPrependDivOpenButton.style.left = "5px"
    customPrependDivOpenButton.style.border = "1px solid black"
    customPrependDivOpenButton.style.outline = "none"
    customPrependDivOpenButton.style.cursor = "pointer"
    customPrependDivOpenButton.style.userSelect = "none"
    customPrependDivOpenButton.style.fontWeight = "bold"
    customPrependDivOpenButton.style.fontSize = "12px"
    customPrependDivOpenButton.style.transition = "backgroundColor 0.2s ease-in-out"
    customPrependDivOpenButton.style.zIndex = 213098123

    document.body.appendChild(customPrependDivOpenButton)

    customPrependDivOpenButton.addEventListener("click", function () {
        if (customPrependDiv.style.display == "none") {
            customPrependDiv.style.display = "block"
            customPrependDivOpenButton.style.backgroundColor = "lightgray"
            customPrependDiv.style.top = "80px"
        } else {
            customPrependDiv.style.display = "none"
            customPrependDivOpenButton.style.backgroundColor = "transparent"
        }
    })

    customPrependDivCloseButton.addEventListener("click", function () {
        customPrependDiv.style.display = "none"
        customPrependDivOpenButton.style.backgroundColor = "transparent"
    })

    customPrependDivMinimizeButton.addEventListener("click", function () {
        if (customPrependDivMinimizeButton.innerText == "-") {
            customPrependDiv.style.height = "30px"
            customPrependDivMinimizeButton.innerText = "+"
        } else {
            customPrependDiv.style.height = "200px"
            customPrependDivMinimizeButton.innerText = "-"
        }
    })

    //remove transition while being resized
    customPrependDiv.addEventListener("mousedown", function () {
        customPrependDiv.style.transition = "none"
    })
    customPrependDiv.addEventListener("mouseup", function () {
        customPrependDiv.style.transition = "height 0.2s ease-in-out"
    })

    customPrependDivHeader.addEventListener("mousedown", function (e) {
        e.preventDefault()
        let x = e.clientX
        let y = e.clientY
        let top = customPrependDiv.offsetTop
        let left = customPrependDiv.offsetLeft
        console.log("mousedown triggered")
        document.addEventListener("mousemove", drag)
        document.addEventListener("mouseup", stopDrag)
        function drag(e) {
            let newX = e.clientX
            let newY = e.clientY
            let newTop = newY - (y - top)
            let newLeft = newX - (x - left)
            customPrependDiv.style.top = newTop + "px"
            customPrependDiv.style.left = newLeft + "px"
        }
        function stopDrag() {
            document.removeEventListener("mousemove", drag)
            document.removeEventListener("mouseup", stopDrag)
        }
    })

    customPrependDivTextarea.addEventListener("input", function () {
        customPrepend = customPrependDivTextarea.value
    })
}
/**
 * Creates a floating readonly textarea that can be dragged around the screen and resized hidden like the custom prepend div and closed, as well as having a button to open it like the custom prepend div
 */
function createResponsePreviewWindow() {
    let responsePreviewDiv = document.createElement("div")
    responsePreviewDiv.style.position = "fixed"
    responsePreviewDiv.style.top = "0px"
    responsePreviewDiv.style.left = "0px"
    responsePreviewDiv.style.width = "235px"
    responsePreviewDiv.style.height = "200px"
    responsePreviewDiv.style.backgroundColor = "white"
    responsePreviewDiv.style.border = "1px solid black"
    responsePreviewDiv.style.zIndex
    responsePreviewDiv.style.resize = "both"
    responsePreviewDiv.style.overflow = "auto"
    responsePreviewDiv.style.display = "none"
    responsePreviewDiv.style.padding = "5px"
    responsePreviewDiv.style.fontFamily = "monospace"
    responsePreviewDiv.style.fontSize = "12px"
    responsePreviewDiv.style.userSelect = "none"
    responsePreviewDiv.style.cursor = "move"
    responsePreviewDiv.style.boxShadow = "0px 0px 10px 0px rgba(0,0,0,0.75)"
    responsePreviewDiv.style.borderRadius = "5px"
    responsePreviewDiv.style.transition = "height 0.2s ease-in-out"
    responsePreviewDiv.style.zIndex = 213098123

    let responsePreviewDivHeader = document.createElement("div")
    responsePreviewDivHeader.style.width = "100%"
    responsePreviewDivHeader.style.height = "20px"
    responsePreviewDivHeader.style.backgroundColor = "lightgray"
    responsePreviewDivHeader.style.borderBottom = "1px solid black"
    responsePreviewDivHeader.style.borderTopLeftRadius = "5px"
    responsePreviewDivHeader.style.borderTopRightRadius = "5px"
    responsePreviewDivHeader.style.userSelect = "none"
    responsePreviewDivHeader.style.cursor = "move"
    responsePreviewDivHeader.style.display = "flex"
    responsePreviewDivHeader.style.alignItems = "center"
    responsePreviewDivHeader.style.justifyContent = "center"

    let responsePreviewDivHeaderText = document.createElement("span")
    responsePreviewDivHeaderText.innerText = "Response Preview"
    responsePreviewDivHeaderText.style.fontWeight = "bold"
    responsePreviewDivHeaderText.style.fontSize = "14px"

    let responsePreviewDivCloseButton = document.createElement("button")
    responsePreviewDivCloseButton.innerText = "X"
    responsePreviewDivCloseButton.style.position = "absolute"
    responsePreviewDivCloseButton.style.right = "5px"
    responsePreviewDivCloseButton.style.top = "5px"
    responsePreviewDivCloseButton.style.width = "20px"
    responsePreviewDivCloseButton.style.height = "20px"
    responsePreviewDivCloseButton.style.backgroundColor = "transparent"
    responsePreviewDivCloseButton.style.border = "none"
    responsePreviewDivCloseButton.style.outline = "none"
    responsePreviewDivCloseButton.style.cursor = "pointer"
    responsePreviewDivCloseButton.style.userSelect = "none"
    responsePreviewDivCloseButton.style.fontWeight = "bold"
    responsePreviewDivCloseButton.style.fontSize = "14px"
    responsePreviewDivCloseButton.style.transition = "height 0.2s ease-in-out"

    let responsePreviewDivMinimizeButton = document.createElement("button")
    responsePreviewDivMinimizeButton.innerText = "-"
    responsePreviewDivMinimizeButton.style.position = "absolute"
    responsePreviewDivMinimizeButton.style.right = "30px"
    responsePreviewDivMinimizeButton.style.top = "5px"
    responsePreviewDivMinimizeButton.style.width = "20px"
    responsePreviewDivMinimizeButton.style.height = "20px"
    responsePreviewDivMinimizeButton.style.backgroundColor = "transparent"
    responsePreviewDivMinimizeButton.style.border = "none"
    responsePreviewDivMinimizeButton.style.outline = "none"
    responsePreviewDivMinimizeButton.style.cursor = "pointer"
    responsePreviewDivMinimizeButton.style.userSelect = "none"
    responsePreviewDivMinimizeButton.style.fontWeight = "bold"
    responsePreviewDivMinimizeButton.style.fontSize = "14px"
    responsePreviewDivMinimizeButton.style.transition = "height 0.2s ease-in-out"

    let responsePreviewDivContent = document.createElement("div")
    responsePreviewDivContent.style.width = "100%"
    responsePreviewDivContent.style.height = "85%"
    responsePreviewDivContent.style.padding = "5px"
    responsePreviewDivContent.style.boxSizing = "border-box"

    //a colored bar which shows the status of the response preview, green for success, yellow for loading
    let responsePreviewStatusBar = document.createElement("div")
    responsePreviewStatusBar.style.width = "100%"
    responsePreviewStatusBar.style.height = "10px"
    responsePreviewStatusBar.style.backgroundColor = "yellow"
    responsePreviewStatusBar.style.borderRadius = "5px"
    responsePreviewStatusBar.style.transition = "height 0.2s ease-in-out"
    responsePreviewStatusBar.style.display = "none"
    responsePreviewStatusBar.style["--darkreader-inline-bgcolor"] = "#ffff00"

    let responsePreviewDivTextarea = document.createElement("textarea")
    responsePreviewDivTextarea.style.width = "100%"
    responsePreviewDivTextarea.style.height = "100%"
    responsePreviewDivTextarea.style.resize = "none"
    responsePreviewDivTextarea.style.outline = "none"
    responsePreviewDivTextarea.style.border = "none"
    responsePreviewDivTextarea.style.fontFamily = "monospace"
    responsePreviewDivTextarea.style.fontSize = "12px"
    responsePreviewDivTextarea.style.userSelect = "none"
    responsePreviewDivTextarea.style.cursor = "text"
    responsePreviewDivTextarea.style.boxShadow = "none"
    responsePreviewDivTextarea.style.borderRadius = "0px"
    responsePreviewDivTextarea.style.transition = "height 0.2s ease-in-out"
    responsePreviewDivTextarea.disabled = true
    responsePreviewDivTextarea.style.color = "white"

    responsePreviewDivHeader.appendChild(responsePreviewDivHeaderText)
    responsePreviewDivHeader.appendChild(responsePreviewDivCloseButton)
    responsePreviewDivHeader.appendChild(responsePreviewDivMinimizeButton)
    responsePreviewDivContent.appendChild(responsePreviewDivTextarea)
    responsePreviewDiv.appendChild(responsePreviewDivHeader)
    responsePreviewDiv.appendChild(responsePreviewDivContent)
    responsePreviewDiv.appendChild(responsePreviewStatusBar)
    document.body.appendChild(responsePreviewDiv)

    //create a buttton in the top left corner of the screen to open the custom prepend div, with a little animation and margin
    let responsePreviewDivOpenButton = document.createElement("button")
    responsePreviewDivOpenButton.innerText = "Response Preview"
    responsePreviewDivOpenButton.style.position = "fixed"
    responsePreviewDivOpenButton.style.top = "35px"
    responsePreviewDivOpenButton.style.left = "5px"
    responsePreviewDivOpenButton.style.border = "1px solid black"
    responsePreviewDivOpenButton.style.outline = "none"
    responsePreviewDivOpenButton.style.cursor = "pointer"
    responsePreviewDivOpenButton.style.userSelect = "none"
    responsePreviewDivOpenButton.style.fontWeight = "bold"
    responsePreviewDivOpenButton.style.fontSize = "12px"
    responsePreviewDivOpenButton.style.transition = "backgroundColor 0.2s ease-in-out"
    responsePreviewDivOpenButton.style.zIndex = 213098123

    document.body.appendChild(responsePreviewDivOpenButton)

    responsePreviewDivOpenButton.addEventListener("click", function () {
        if (responsePreviewDiv.style.display == "none") {
            responsePreviewDiv.style.display = "block"
            responsePreviewDivOpenButton.style.backgroundColor = "lightgray"
            responsePreviewDiv.style.top = "80px"
        } else {
            responsePreviewDiv.style.display = "none"
            responsePreviewDivOpenButton.style.backgroundColor = "transparent"
        }
    })

    responsePreviewDivCloseButton.addEventListener("click", function () {
        responsePreviewDiv.style.display = "none"
        responsePreviewDivOpenButton.style.backgroundColor = "transparent"
    })

    responsePreviewDivMinimizeButton.addEventListener("click", function () {
        if (responsePreviewDivMinimizeButton.innerText == "-") {
            responsePreviewDiv.style.height = "30px"
            responsePreviewDivMinimizeButton.innerText = "+"
        } else {
            responsePreviewDiv.style.height = "200px"
            responsePreviewDivMinimizeButton.innerText = "-"
        }
    })

    //remove transition while being resized
    responsePreviewDiv.addEventListener("mousedown", function () {
        responsePreviewDiv.style.transition = "none"
    })
    responsePreviewDiv.addEventListener("mouseup", function () {
        responsePreviewDiv.style.transition = "height 0.2s ease-in-out"
    })

    responsePreviewDivHeader.addEventListener("mousedown", function (e) {
        e.preventDefault()
        let x = e.clientX
        let y = e.clientY
        let top = responsePreviewDiv.offsetTop
        let left = responsePreviewDiv.offsetLeft
        console.log("mousedown triggered")
        document.addEventListener("mousemove", drag)
        document.addEventListener("mouseup", stopDrag)
        function drag(e) {
            let newX = e.clientX
            let newY = e.clientY
            let newTop = newY - (y - top)
            let newLeft = newX - (x - left)
            responsePreviewDiv.style.top = newTop + "px"
            responsePreviewDiv.style.left = newLeft + "px"
        }
        function stopDrag() {
            document.removeEventListener("mousemove", drag)
            document.removeEventListener("mouseup", stopDrag)
        }
    })
    let displayResponsePreviewStatusBar = function (boolean) {
        if (boolean) {
            responsePreviewStatusBar.style.display = "block"
            responsePreviewStatusBar.style.backgroundColor = "lightgray"
        } else {
            responsePreviewStatusBar.style.display = "none"
        }
    }
    let responsePreviewSetResponseFinished = function (boolean) {
        if (boolean) {
            responsePreviewStatusBar.style.backgroundColor = "lightgreen"
            responsePreviewStatusBar.style["--darkreader-inline-bgcolor"] = "#00ff00"
        } else {
            responsePreviewStatusBar.style.backgroundColor = "yellow"
            responsePreviewStatusBar.style["--darkreader-inline-bgcolor"] = "#ffff00"
        }
    }
    return { displayResponsePreviewStatusBar, responsePreviewSetResponseFinished, responsePreviewDivTextarea }
}

createPrependWindow()

let { displayResponsePreviewStatusBar, responsePreviewSetResponseFinished, responsePreviewDivTextarea } = createResponsePreviewWindow()

function processResponse(response) {
    if (response.body) {
        const reader = response.body.getReader();

        const workerURL = URL.createObjectURL(
            new Blob([`(${workerCode.toString()})()`], { type: 'application/javascript' })
        );

        const worker = new Worker(workerURL);

        worker.onmessage = event => {
            const { data } = event;
            responsePreviewDivTextarea.value = data.text;
        };

        const processChunks = () => {
            reader.read().then(({ done, value }) => {
                if (done) {
                    // Terminate the web worker after sending the last message
                    worker.onmessage = event => {
                        const { data } = event;
                        responsePreviewDivTextarea.value = data.text;
                        if (data.is_final_chunk === true) {
                            responsePreviewSetResponseFinished(true)
                            worker.terminate();
                            //asyncronously wait 3 seconds and then hide the response preview div
                            setTimeout(function () {
                                displayResponsePreviewStatusBar(false)
                            }, 8000)
                        }
                    };
                    return;
                }
                // Send each chunk of data to the web worker for processing
                worker.postMessage(value);

                processChunks(); // Continue reading the next chunk of data
            }).catch(error => {
                console.log(error);
                worker.terminate(); // Terminate the web worker in case of error
            });
        };
        processChunks(); // Start reading the chunks of data
    }
}

window.fetch = function (url, options) {
    if (url == "https://beta.character.ai/chat/streaming/") {
        let optionsCopy = JSON.parse(options.body)
        optionsCopy.text = optionsCopy.text
        if (customPrepend != "") optionsCopy.text = customPrepend + "\n\n" + optionsCopy.text
        options.body = JSON.stringify(optionsCopy)
        const fetchPromise = originalFetch(url, options);

        fetchPromise.then(response => {
            const cloneResponse = response.clone(); // Create a clone of the response
            displayResponsePreviewStatusBar(true)
            responsePreviewSetResponseFinished(false)
            processResponse(cloneResponse); // Process the clone in the background
        }).catch(error => {
            console.log(error);
        });

        return fetchPromise;
    } else {
        return originalFetch(url, options);
    }
};

function workerCode() {
    self.onmessage = event => {
        const data = event.data;
        const decodedData = new TextDecoder().decode(data);
        let structuredData = { text: JSON.parse(decodedData).replies[0].text, is_final_chunk: JSON.parse(decodedData).is_final_chunk }
        self.postMessage(structuredData);
    };
}
