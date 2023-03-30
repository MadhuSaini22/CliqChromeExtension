window.onload = function () {
  const body = document.querySelector("body");
  let allColorsSet = false;
  let c = 0;
  const observer = new MutationObserver(function (mutations) {
    const chatsListDiv = document.querySelector("#chatslist");
    const allDivs = chatsListDiv?.querySelectorAll(".LHS-item");

    for (let i = 0; i < allDivs?.length; i++) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      allDivs[i].style.backgroundColor = "#" + randomColor;
      var bgColor = window.getComputedStyle(allDivs[i], null).getPropertyValue("background-color");

      //  const r = parseInt(`#${randomColor}`.slice(1, 3), 16);
      //  const g = parseInt(`#${randomColor}`.slice(3, 5), 16);
      //  const b = parseInt(`#${randomColor}`.slice(5, 7), 16);
      //  console.log({ bgColor, gg: `rgb(${r}, ${g}, ${b})` });
      if (checkColor(bgColor, `#${randomColor}`)) {
        c = c + 1;
        console.log("The background color of the div has been changed ", c);
        allColorsSet = true;
      } else {
        //    console.log("The background color of the div has not been changed.");
      }
    }

    //     const chatsListDiv2 = document.querySelectorAll(".RW-list-container.flexG");
    //     chatsListDiv2?.forEach((element) => {
    //       const allDivs2 = element.querySelectorAll(".RW-list-item.curP");

    //       for (let i = 0; i < allDivs2.length; i++) {
    //         try {
    //           const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    //           allDivs2[i].style.backgroundColor = "#" + randomColor;
    //           allColorsSet = true;
    //         } catch (error) {
    //           allColorsSet = false;
    //         }
    //       }
    //     });
  });

  const config = { childList: true, subtree: true };

  observer.observe(body, config);
  if (allColorsSet) {
    console.log({ allColorsSet });
    observer.disconnect();
  }
};

function checkColor(bgColor, hexCode) {
  // convert background color to hex
  let bgHex = bgColor;
  if (bgColor.slice(0, 1) === "#") {
    bgHex = bgColor;
  } else if (bgColor.slice(0, 3) === "rgb") {
    let rgb = bgColor.slice(bgColor.indexOf("(") + 1, bgColor.indexOf(")")).split(",");
    console.log({ rgb });
    if (rgb.length === 4) {
      rgb.pop();
    }
    bgHex = "#" + rgb.map((x) => parseInt(x).toString(16).padStart(2, "0")).join("");
  }

  // check if colors are equal
  return bgHex.toLowerCase() === hexCode.toLowerCase();
}
