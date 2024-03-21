document.addEventListener("DOMContentLoaded", (e) => {
  const textList = document.getElementById("text-list");

  const textarea = document.querySelector("#textarea");
  const timeStart = document.querySelector("#time-start");
  const timeEnd = document.querySelector("#time-end");

  const btnAdd = document.querySelector("#btn-add");

  // VIDEO
  let video = document.getElementById("myVideo");
  // VIDEO BUTTONS
  const videoInput = document.getElementById("videoInput");
  const btnShow = document.getElementById("btn-show");
  const btnPress = document.getElementById("btn-press");
  const btnPlay = document.getElementById("btn-play");
  const btnPause = document.getElementById("btn-pause");
  const btnRepeat = document.getElementById("btn-repeat");
  const btnPrev2 = document.getElementById("btn-prev2");
  const btnPrev5 = document.getElementById("btn-prev5");
  // VIDEO TIME
  let currentTime = 0
  let startTime = 0
  let endTime

  videoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);

    video.src = fileUrl;
  });
  video.addEventListener("loadeddata", (e) => console.log(e));

  let list = [];
  if (sessionStorage.getItem("list")) {
    list = JSON.parse(sessionStorage.getItem("list"));
  }

  /**
   * Add new text
   */
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
  video.addEventListener("timeupdate", () => {
    currentTime = video.currentTime
    console.log(currentTime);
  })

  // buttons
  btnShow.addEventListener("click", () => {
    video.classList.toggle("show")
  })

  btnPress.addEventListener("mousedown", () => {
    startTime = currentTime
  })
  btnPress.addEventListener("mouseup", () => {
    endTime = currentTime
    console.log(startTime, endTime);
  })

  // player
  btnPlay.addEventListener("click", () => {
    video.play()
  })
  btnPause.addEventListener("click", () => {
    video.pause()
  })
  // prev seconds
  btnPrev2.addEventListener("click", () => {
    video.pause()
    const newCurrentTime = currentTime - 2

    if (newCurrentTime > 0) {
      video.currentTime = newCurrentTime
      video.play()
    } else {
      video.currentTime = 0
      video.play()
    }

  })

  btnPrev5.addEventListener("click", () => {
    video.pause()
    const newCurrentTime = currentTime - 5

    if (newCurrentTime > 0) {
      video.currentTime = newCurrentTime
      video.play()
    } else {
      video.currentTime = 0
      video.play()
    }

  })

});
