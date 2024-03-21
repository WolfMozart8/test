const textarea = document.querySelector("#textarea")
const timeStart = document.querySelector("#time-start")
const timeEnd = document.querySelector("#time-end")

const btnAdd = document.querySelector("#btn-add")

const list = JSON.parse(sessionStorage.getItem("list"))

btnAdd.addEventListener("click", () => {
    addText(
        textarea.value,
        timeStart.value,
        timeEnd.value
    )
})

function addText (text, start, end) {
    if (end < start) throw Error("invalid values")

    const newText = {
        text, start, end
    }

    list.push(newText)

    textarea.value = ""
    console.log(list);
    sessionStorage.setItem("list", JSON.stringify(list))
}
