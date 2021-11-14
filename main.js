"use strict";
const body = document.querySelector("body");
const background = document.querySelector(".background");
const countDisplay = document.querySelector(".countDisplay");
const result = document.querySelector(".result");

let count = 0;

// パソコンかスマートフォンか判定
const eventType = window.ontouchstart !== null ? "click" : "touchstart";
const addCount = function (e) {
  // クリックをカウント・表示
  count++;
  countDisplay.textContent = count;
  // クリック時のアニメーション
  let x = e.pageX;
  let y = e.pageY;
  const mash = document.createElement("div");
  mash.style.top = y + "px";
  mash.style.left = x + "px";
  document.body.appendChild(mash);
  mash.className = "mash";
  mash.addEventListener("animationend", () => {
    mash.parentNode.removeChild(mash);
  });
};
// 背景を縮めるアニメーション
const shrinkAnim = function () {
  countDisplay.classList.remove("blink");
  body.removeEventListener(eventType, shrinkAnim);
  body.addEventListener(eventType, addCount);
  background
    .animate(
      {
        width: ["350px", "0px"],
        height: ["350px", "0px"],
        opacity: [1, 0.5, 1],
        offset: [0, 0.9],
      },
      { duration: 3000, fill: "forwards" }
    )
    .finished // ゲーム終了後の処理
    .then(() => {
      body.removeEventListener(eventType, addCount);
      result.textContent = "Click to return";
      result.classList.add("blink");
      result.addEventListener("click", () => {
        location.reload();
      });
    });
};
body.addEventListener(eventType, shrinkAnim);

