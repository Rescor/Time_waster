const currentPwd = document.getElementById("currentPwd");
const history = [];
let passwords = [];
document.addEventListener("keypress", event => {
  if (event.code === "Space") nextHandler();
})

// init
localStorage.getItem("passwords") ? init() : firstInit();

function firstInit() {
  console.log("first init")
  for (let i = 0; i < 10000; i++) {
      passwords.push(i)
    }
  localStorage.setItem('passwords', passwords);
}

function init() {
  savedPasswords = localStorage.getItem("passwords");
  passwords = JSON.parse("[" + savedPasswords + "]");
  console.log("pwd", passwords)
  console.log("init complete")
}
function resetHandler() {
  if (confirm("Reset?")) {
    localStorage.removeItem("passwords");
    location.reload();
  }
}
function nextHandler() {
  updatePasswords();
  generatePwd();
}

function generatePwd() {
  currentPwd.innerHTML = "";
	for (let i = 0; i < 5; i++) {
    let pwdIndex = Math.floor(Math.random() * passwords.length);
    if (passwords[pwdIndex] < 10) {
      currentPwd.innerHTML += "<span>000" + passwords[pwdIndex] + "</span>";
    }
    else if (passwords[pwdIndex] < 100) {
      currentPwd.innerHTML += "<span>00" + passwords[pwdIndex] + "</span>";
    }
    else if (passwords[pwdIndex] < 1000) {
      currentPwd.innerHTML += "<span>0" + passwords[pwdIndex] + "</span>";
    }
    else currentPwd.innerHTML += "<span>" + passwords[pwdIndex] + "</span>";
    passwords.splice(pwdIndex, 1)
  }
  currentPwd.innerHTML += "<br>"
}

function updatePasswords() {
  localStorage.setItem('passwords', passwords);
}

generatePwd();
