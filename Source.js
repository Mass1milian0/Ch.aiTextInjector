// ==UserScript==
// @name        text injector
// @namespace   Violentmonkey Scripts
// @match       https://beta.character.ai/chat
// @grant       none
// @version     1.01
// @author      -
// @description 24/5/2023, 19:07:21
// ==/UserScript==
let original = window.fetch
let customPrepend = ""
function createPrependWindow(){
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
            customPrependDiv.style.top = "50px"
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

createPrependWindow()

window.fetch = async function (url, options) {
    if(url == "https://beta.character.ai/chat/streaming/"){
        let optionsCopy = JSON.parse(options.body)
        optionsCopy.text = optionsCopy.text
        if(customPrepend != "") optionsCopy.text = customPrepend + "\n\n" + optionsCopy.text
        options.body = JSON.stringify(optionsCopy)
        return await original.apply(this, arguments)
    }
}
