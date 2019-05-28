import { Login } from "./login";

export class Register {
  constructor(isRegistered) {
    this.login = new Login();
    this.isRegistered = isRegistered;
    this.checkLogin();
  }

  checkLogin() {
    let button = document.querySelector(".registration-submit");
    let login = document.querySelector(".registration-login");
    let loginArray = [];
    fetch("http://localhost:3007/users", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        data.forEach(i => {
          loginArray.push(i.login);
        });
      });

    button.addEventListener("click", e => {
      e.preventDefault();
      if (login.value) {
        let repeat = loginArray.some(i => {
          return i == login.value;
        });
        repeat ? this.repeatLogin() : this.checkPassword(login.value);
      } else {
        this.renderErrorSection("Поле с логином пустое. Введите логин");
      }
    });
  }

  checkPassword(login) {
    let password = document.querySelector(".registration-password");
    let passwordRepeat = document.querySelector(".registration-password-check");
    let loginField = document.querySelector(".registration-login");
    if (password.value && passwordRepeat.value) {
      password.value == passwordRepeat.value
        ? this.sendRegistration(login, password.value)
        : this.failedRegistration(passwordRepeat);
    } else {
      this.renderErrorSection("Поля с паролем не заполнены");
    }
  }

  repeatLogin() {
    this.renderErrorSection("Такой логин уже существует. Введите другой");
  }

  sendRegistration(login, password) {
    this.login.renderExitButton();
    localStorage.setItem("login", login);
    fetch("http://localhost:3007/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: login,
        password: password
      })
    })
      .then(res => {
        if (res.status !== 201) {
          console.log("Post ERROR");
        }
        return res.json();
      })
      .then(res => {
        console.log(res);
      });
    this.isRegistered = true;

    let event = new Event("checkRegister");
    window.dispatchEvent(event);
  }

  failedRegistration(data) {
    this.renderErrorSection("Пароли не совпадают. Попробуйте еще");
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
