const textList = document.getElementById("text-list")

const textarea = document.querySelector("#textarea")
const timeStart = document.querySelector("#time-start")
const timeEnd = document.querySelector("#time-end")

const btnAdd = document.querySelector("#btn-add")

// VIDEO
// let video = document.getElementById("myVideo");
const videoInput = document.getElementById("videoInput")
videoInput.addEventListener("change", (e) => {
    // const src = document.querySelector("#videoSrc")
    // src.src = videoInput.value
    // video.style.display = "block"
    const v = document.createElement("video")
    v.id = "myVideo"
    const s = document.createElement("source")
    s.src = videoInput.a
    console.log(e);
    v.appendChild(s)

    document.querySelector(".video-container").appendChild(v)



    // src.src = "../../../Videos/2023-08-11 22-27-57.mp4"
})


let list = []
if (sessionStorage.getItem("list")) {
    list = JSON.parse(sessionStorage.getItem("list"))
}

btnAdd.addEventListener("click", () => {
    addText(
        textarea.value,
        timeStart.value,
        timeEnd.value
    )
})

function addText (text, start, end) {
    // if (end < start) {throw Error("invalid values")}

    const newText = {
        text, start, end
    }

    list.push(newText)
    domAddText(newText)

    textarea.value = ""
    sessionStorage.setItem("list", JSON.stringify(list))
}

function domAddText(textObject) {
    const domTextDIv = document.createElement("div")
    domTextDIv.classList.add("text")
    domTextDIv.textContent = textObject.text

    textList.appendChild(domTextDIv)
}

/**
 * VIDEO
 */
