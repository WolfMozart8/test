const textarea = document.querySelector("#textarea")
const n1 = document.querySelector("#n1")
const n2 = document.querySelector("#n2")

const btnAdd = document.querySelector("#btn-add")

const list = JSON.parse(sessionStorage.getItem("list"))
console.log(sessionStorage.getItem("list"));


btnAdd.addEventListener("click", () => {
    addText(
        textarea.value,
        n1.value,
        n2.value
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
