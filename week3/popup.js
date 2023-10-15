popupOpen = document.querySelector(".popup-open");
popup = document.querySelector(".popup");
popupOverlay = document.querySelector(".popup-overlay");
popupClose = popup.querySelector(".popup-close");

popupOpen.addEventListener("click", () => {
  console.log("click");
  popup.style.display = "block";
  popupOverlay.style.display = "block";
});

popupClose.addEventListener("click", () => {
  popup.style.display = "none";
  popupOverlay.style.display = "none";
});

window.addEventListener("click", (evt) => {
  if(evt.target.classList.contains("popup-overlay")) {
    popup.style.display = "none";
    popupOverlay.style.display = "none";
  }
});