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
  let endTime = 0
  let isRepeat = false

  videoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);

    video.src = fileUrl;
  });
  // video.addEventListener("loadeddata", (e) => console.log(e));

  let list = [];
  if (sessionStorage.getItem("list")) {
    list = JSON.parse(sessionStorage.getItem("list"));
  }


  // Retrive storage list to Dom
  function listToDom() {
    for (let i = 0; i < list.length; i++) {
      const element = list[i]

      domAddText(element)
    }
  }
  listToDom()

  /**
   * Add new text
   */
  btnAdd.addEventListener("click", () => {
    addText(textarea.value, timeStart.value, timeEnd.value);
    console.log(textarea.value, timeStart.value, timeEnd.value);
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
    //* DOM
    const domTextDIv = document.createElement("div");
    domTextDIv.classList.add("text-container");

    const text = document.createElement("p")
    text.classList.add("text")
    text.textContent = textObject.text;
    domTextDIv.appendChild(text)

    //TODO: delete text from list
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("btn-delete-text")
    deleteBtn.textContent = "X"
    domTextDIv.appendChild(deleteBtn)

    // Add time as data
    domTextDIv.setAttribute("data-start", textObject.start)
    domTextDIv.setAttribute("data-end", textObject.end)

    // add click to retrieve time data
    domTextDIv.addEventListener("click", () => {
      timeStart.value = textObject.start
      timeEnd.value = textObject.end
    })

    textList.appendChild(domTextDIv);
  }

  /**
   * VIDEO
   */
  video.addEventListener("timeupdate", () => {
    currentTime = video.currentTime

    if (isRepeat) {
      if (video.currentTime >= endTime) {
        video.pause()
        isRepeat = false
      }
    }
    // console.log(currentTime);
  })

  // buttons
  btnShow.addEventListener("click", () => {
    video.classList.toggle("show")
  })

  btnPress.addEventListener("mousedown", pressOnButton)
  btnPress.addEventListener("mouseup", pressOutButton)
  btnPress.addEventListener("touchstart", pressOnButton)
  btnPress.addEventListener("touchend", pressOutButton)

  function pressOnButton () {
    startTime = currentTime
  }
  function pressOutButton () {
    endTime = currentTime
    // add to numbr inputs
    timeStart.value = startTime
    timeEnd.value = endTime
    console.log(startTime, endTime);
  }

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

  btnRepeat.addEventListener("click", (e) => {
    isRepeat = true
    video.currentTime = timeStart.value
    endTime = timeEnd.value
    video.play()
  })

});
