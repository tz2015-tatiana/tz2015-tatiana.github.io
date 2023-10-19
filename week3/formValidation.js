const form = document.querySelector(".form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const submitBtn = form.querySelector(".form_button");

const popupOpen = document.querySelector(".popup-open");
const popup = document.querySelector(".popup");
const popupOverlay = document.querySelector(".popup-overlay");
const popupClose = popup.querySelector(".popup-close");

const re = /\S+@\S+\.\S+/; /*regex for email validation*/

let isNameValid = false;
let isEmailValid = false;
let isPswdValid = false;
let isConfirmValid = false;

submitBtn.setAttribute("disabled", true);

const clearForm = function() {
  username.value = "";
  email.value = "";
  password.value = "";
  confirm.value = "";
}

const setError = function(elem, message) {
  elem.parentElement.classList.add("error");
  elem.nextElementSibling.innerHTML = message;
}

const setSuccess = function(elem) {
  elem.parentElement.classList.remove("error");
  elem.nextElementSibling.innerHTML = "";
}

const validateUserName = function() {
  let val = username.value;

  if(val == "" || val == null) {
    setError(username, "This field can't be empty!");
    isNameValid = false;
  } else {
    setSuccess(username);
    isNameValid = true;
  }
};

const validateEmail = function() {
  let val = email.value;
  
  if (val == "" || val == null) {
    setError(email, "This field can't be empty!");
    isEmailValid = false;
  } else if (!re.test(val)) {
    setError(email, "Your email is not valid!");
    isEmailValid = false;
  } else {
    setSuccess(email);
    isEmailValid = true;
  }
};

const validatePassword = function() {
  let val = password.value;

  if (val == "" || val == null) {
    setError(password, "This field can't be empty!");
    isPswdValid = false;
  } else if(val.length < 8) {
    setError(password, "Password length must be at least 8 symbols");
    isPswdValid = false;
  } else {
    setSuccess(password);
    isPswdValid = true;
  }
};

const validateConfirm = function() {
  let val = confirm.value;

  if (val == "" || val == null) {
    setError(confirm, "This field can't be empty!");
    isConfirmValid = false;
  } else if(val != password.value) {
    setError(confirm, "Don't match your password");
    isConfirmValid = false;
  } else {
    setSuccess(confirm);
    isConfirmValid = true;
  }
};

const checkDisabled = function() {
  if((isNameValid && isEmailValid && isPswdValid && isConfirmValid) 
      && submitBtn.hasAttribute("disabled")) {
    submitBtn.removeAttribute("disabled");
  }
}

const closePopup = function() {
  popup.style.display = "none";
  popupOverlay.style.display = "none";
}

username.addEventListener("focus", () => {
  submitBtn.setAttribute("disabled", true);
  username.nextElementSibling.innerHTML = "";
});

username.addEventListener("focusout", () => {
  validateUserName();
  checkDisabled();
});

email.addEventListener("focus", () => {
  submitBtn.setAttribute("disabled", true);
  email.nextElementSibling.innerHTML = "";
});

email.addEventListener("focusout", () => {
  validateEmail();
  checkDisabled();
});

password.addEventListener("focus", () => {
  submitBtn.setAttribute("disabled", true);
  password.nextElementSibling.innerHTML = "";
});

password.addEventListener("focusout", () => {
  validatePassword();
  checkDisabled();
});

confirm.addEventListener("focus", () => {
  submitBtn.setAttribute("disabled", true);
  confirm.nextElementSibling.innerHTML = "";
});

confirm.addEventListener("focusout", () => {
  validateConfirm();
  checkDisabled();
});

form.addEventListener("submit", evt => {
  evt.preventDefault();
  closePopup();
});

popupOpen.addEventListener("click", () => {
  clearForm();
  popup.style.display = "block";
  popupOverlay.style.display = "block";
});

popupClose.addEventListener("click", closePopup);

window.addEventListener("click", (evt) => {
  if(evt.target.classList.contains("popup-overlay")) {
    closePopup();
  }
});