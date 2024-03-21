document.addEventListener("DOMContentLoaded", (e) => {
  const textList = document.getElementById("text-list");

  const textarea = document.querySelector("#textarea");
  const timeStart = document.querySelector("#time-start");
  const timeEnd = document.querySelector("#time-end");

  const btnAdd = document.querySelector("#btn-add");

  // VIDEO
  let video = document.getElementById("myVideo");
  const videoInput = document.getElementById("videoInput");

  videoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);

    video.src = fileUrl;
  });
  video.addEventListener("loadeddata", (e) => console.log(e.target.duration));

  let list = [];
  if (sessionStorage.getItem("list")) {
    list = JSON.parse(sessionStorage.getItem("list"));
  }

  btnAdd.addEventListener("click", () => {
    addText(textarea.value, timeStart.value, timeEnd.value);
  });

  function addText(text, start, end) {
    // if (end < start) {throw Error("invalid values")}

    const newText = {
      text,
      start,
      end,
    };

    list.push(newText);
    domAddText(newText);

    textarea.value = "";
    sessionStorage.setItem("list", JSON.stringify(list));
  }

  function domAddText(textObject) {
    const domTextDIv = document.createElement("div");
    domTextDIv.classList.add("text");
    domTextDIv.textContent = textObject.text;

    textList.appendChild(domTextDIv);
  }

  /**
   * VIDEO
   */
});
