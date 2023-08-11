let isDeepWork = false;
let startTime;
let timer;

document.addEventListener("DOMContentLoaded", function () {
  //Click event on element settings
  document.getElementById("settings").addEventListener("click", function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("../settings.html") });
  });

  chrome.storage.local.get("isDeepWork", function (result) {
    if (result != undefined) {
      isDeepWork = result.isDeepWork;
      button.innerText = isDeepWork ? "Stop Deep Work" : "Start Deep Work";

      if (isDeepWork) {
        chrome.storage.local.get("startTime", function (result) {
          startTime = Date.parse(result.startTime);
          updateTime();
          timer = setInterval(updateTime, 1000);
        });
      } else {
        document.getElementById("time").innerText = " ";
      }
    } else
      chrome.storage.local.set({ isDeepWork: false }, function () {
        console.log("Variable saved to local storage.");
      });
  });

  let button = document.getElementById("startDeepWork");
  button.addEventListener("click", function () {
    isDeepWork = !isDeepWork;
    startTime = new Date();
    button.innerText = isDeepWork ? "Stop Deep Work" : "Start Deep Work";
    chrome.storage.local.set(
      { isDeepWork: isDeepWork, startTime: startTime.toUTCString() },
      function () {
        if (chrome.runtime.lastError) console.log(chrome.runtime.lastError);
        else console.log("Variable saved to local storage.");
      }
    );
    if (isDeepWork) {
      updateTime();
      timer = setInterval(updateTime, 1000);
    } else if (timer != null) {
      clearInterval(timer);
      document.getElementById("time").innerText = " ";
    }
  });
});

function updateTime() {
  let currentTime = new Date();
  let timeDiff = currentTime - startTime;
  let timeDiffInMins = Math.round(timeDiff / 60000);
  if (timeDiffInMins < 60)
    document.getElementById("time").innerText =
      "You have been working for " + timeDiffInMins + " mins";
  else {
    let hours = Math.floor(timeDiffInMins / 60);
    let mins = timeDiffInMins % 60;
    document.getElementById("time").innerText =
      "You have been working for " + hours + " hrs " + mins + " mins";
  }
}
