document.addEventListener("DOMContentLoaded", (e) => {
  const mainList = []
  // Active list will be select like this: maintList[activeListIndex].list
  let activeListIndex = 0;


  // DOM
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
    const fileName = file.name;
    const fileUrl = URL.createObjectURL(file);
    let isInMain = false

    if (mainList.length <= 0) {
      const getMainList = JSON.parse(localStorage.getItem("mainList"))
      if (getMainList !== null) {
        mainList.push(...getMainList)
      }

    }

    for (let i = 0; i < mainList.length; i++) {
      const element = mainList[i];
      if (element.name === fileName) {
        isInMain = true
        break
      }
    }

    if (!isInMain) {
      console.log("not in main");
      createList(fileName)
      // activeList = mainList[mainList.length - 1]
      activeListIndex = mainList.length - 1
      localStorage.setItem("mainList", JSON.stringify(mainList))
    } else {

      for (let i = 0; i < mainList.length; i++) {
        const element = mainList[i];
        if (element.name === fileName) {
          activeListIndex = i
          break
        }
      }
    }

    listToDom()


    video.src = fileUrl;
  });
  // video.addEventListener("loadeddata", (e) => console.log(e));



  // if (localStorage.getItem("list")) {
  //   mainList[activeListIndex] = JSON.parse(localStorage.getItem("list"));
  // }


  // Retrive storage list to Dom
  function listToDom() {
    //! DELETE PREV DOM LIST
    // console.log("1: om func");
    if (textList.firstChild) {
      // console.log("2: firstchild");
      while (textList.firstChild) {
        // console.log("3: firstchild remove " + textList.firstChild);
        textList.removeChild(textList.firstChild)
      }
    }

    // console.log("4: " + mainList[activeListIndex].list.length);
    for (let i = 0; i < mainList[activeListIndex].list.length; i++) {
      const element = mainList[activeListIndex].list[i]

      domAddText(element)
    }
  }
  // listToDom()

  /**
   * Add new text
   */
  btnAdd.addEventListener("click", () => {
    if (textarea.value !== "") {
      addText(textarea.value, timeStart.value, timeEnd.value);
      // console.log(textarea.value, timeStart.value, timeEnd.value);
    }
  });

  function addText(text, start, end) {
    // if (end < start) {throw Error("invalid values")}

    const newText = {
      text,
      start,
      end,
    };

    mainList[activeListIndex].list.push(newText);
    console.log(mainList);
    domAddText(newText);

    textarea.value = "";
    localStorage.setItem("mainList", JSON.stringify(mainList));
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


  function createList(name) {
    const addNewMedia = {
      name: name,
      list: []
    };
    mainList.push(addNewMedia)
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
