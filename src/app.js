import { Router } from "./router";
import { Register } from "./register";
import { Login } from "./login";
import { ShortService } from "./shortservice";

class App {
  constructor() {
    this.pages = document.querySelectorAll(".page");
    window.addEventListener("exitEvent", this.renderHomePage.bind(this));
    window.addEventListener("checkRegister", this.checkRegister.bind(this));
    this.router = new Router();
    this.register = new Register();
    this.login = new Login();
    this.shortService = new ShortService();
    this.init();
    this.login.checkingLogin();
    this.regBut();
    this.logBut();
    this.localStorageService();
    this.login.checkingLogin();
  }

  init() {
    const url = "http://localhost:3006/links";
    fetch(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.links = data;
        this.initRoutes();
        console.log(this.links);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      });
  }

  initRoutes() {
    this.router.addRoute("", this.renderHomePage.bind(this));
    this.router.addRoute("#about", this.renderAboutPage.bind(this));
    this.router.addRoute("#main", this.renderMainPage.bind(this));
    this.router.addRoute("#login", this.renderLoginPage.bind(this));
    this.router.addRoute("404", this.renderErrorPage.bind(this));
  }

  renderHomePage() {
    this.pages.forEach(i => {
      console.log(i);
      i.classList.remove("visible");
    });
    let homePage = document.querySelector(".home");
    console.log(homePage);
    homePage.classList.add("visible");
    window.location.hash = "";
    let exit = document.querySelector(".exit");
    exit.classList.remove("visible");
  }

  renderAboutPage() {
    this.pages.forEach(i => {
      console.log(i);
      i.classList.remove("visible");
    });
    let aboutPage = document.querySelector(".about");
    console.log(aboutPage);
    aboutPage.classList.add("visible");
    window.location.hash = "#about";
    let exit = document.querySelector(".exit");
    exit.classList.remove("visible");
  }

  renderMainPage() {
    if (localStorage.getItem("login")) {
      this.pages.forEach(i => {
        i.classList.remove("visible");
      });
      let mainPage = document.querySelector(".main");
      mainPage.classList.add("visible");
      window.location.hash = "#main";
    } else {
      this.renderErrorPage();
    }
  }

  renderErrorPage() {
    this.pages.forEach(i => {
      i.classList.remove("visible");
    });
    let exit = document.querySelector(".exit");
    let errorPage = document.querySelector(".error");
    let backLink = document.querySelector(".main-link");
    errorPage.classList.add("visible");
    window.location.hash = "#error";
    exit.classList.remove("visible");
    backLink.addEventListener("click", this.renderHomePage.bind(this));
  }

  renderLoginPage() {
    this.pages.forEach(i => {
      i.classList.remove("visible");
    });
    let loginPage = document.querySelector(".logpage");
    loginPage.classList.add("visible");
    window.location.hash = "#login";
    let exit = document.querySelector(".exit");
    exit.classList.remove("visible");
  }

  regBut() {
    let reg = document.querySelector(".registration");
    reg.addEventListener("click", () => {
      this.renderAboutPage();
      history.pushState({}, "about", "#about");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
  }

  logBut() {
    let log = document.querySelector(".login");
    log.addEventListener("click", () => {
      this.renderMainPage();
      history.pushState({}, "main", "#login");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
  }

  checkRegister() {
    if (this.register.isRegistered) {
      this.renderMainPage();
    } else {
      console.log("Ошибка регистрации");
    }
  }

  localStorageService() {
    if (localStorage.getItem("login")) {
      this.login.renderExitButton();
    } else {
    }
  }
}

const app = new App();
