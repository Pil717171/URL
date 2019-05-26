export class Login {
  constructor() {
    this.checkingLogin();
  }

  renderExitButton() {
    let exit = document.querySelector(".exit");
    exit.classList.add("visible");
    exit.addEventListener("click", this.exitEvent);
  }

  exitEvent() {
    let linkContainer = document.querySelector(".result");
    this.isLogged = false;
    localStorage.clear();
    let exit = document.querySelector(".exit");
    exit.classList.remove("visible");
    let exitEvent = new Event("exitEvent");
    window.dispatchEvent(exitEvent);
    linkContainer.innerHTML = "";
  }

  getLogin() {
    let loginButton = document.querySelector(".logpage-submit");
    let logpageLogin = document.querySelector(".logpage-login");
    let logpagePassword = document.querySelector(".logpage-password");
    loginButton.addEventListener("click", e => {
      e.preventDefault();
      if (logpageLogin.value) {
        this.checkingLogin();
      } else {
      }
    });
  }

  checkingLogin() {
    let button = document.querySelector(".logpage-submit");
    let login = document.querySelector(".logpage-login");
    let password = document.querySelector(".logpage-password");
    let loginArray = [];
    fetch("http://localhost:3006/users", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        data.forEach(i => {
          loginArray.push(i);
        });
      });

    button.addEventListener("click", e => {
      e.preventDefault();
      if (login.value && password.value) {
        loginArray.forEach(i => {
          if (i.login === login.value && i.password === password.value) {
            window.location.hash = "#main";
            localStorage.setItem("login", login);
            this.renderExitButton();
          } else {
            this.renderErrorSection(
              "Проверьте введенные данные. Логин или пароль неверные."
            );
            return false;
          }
        });
      } else {
        this.renderErrorSection("Поля не заполнены полностью");
      }
    });
  }

  renderErrorSection(textMessage) {
    let errorSection = document.querySelector(".error-section");
    let errorSectionText = document.querySelector(".error-section-text");
    errorSection.style = "opacity: 1";
    errorSectionText.innerHTML = textMessage;
    setTimeout(() => {
      let errorSection = document.querySelector(".error-section");
      errorSection.style = "opacity: 0";
    }, 2000);
  }
}
