import { Register } from "./register";

export class ShortService {
  constructor() {
    this.shortLinks = [];
    this.inp = document.querySelector(".big-link");
    this.links = [];
    this.getLink();
    this.register2 = new Register();
  }

  getLink() {
    let but = document.querySelector(".submit");

    but.addEventListener("click", e => {
      e.preventDefault();
      if (this.inp.value) {
        this.sendData(this.inp.value);
      } else {
        this.renderInputError();
      }
    });
  }

  renderInputError() {
    this.register2.renderErrorSection(
      "Чтобы укоротить ссылку, ее надо сначала ввести."
    );
  }

  sendData(data) {
    console.log(data);
    fetch(`https://clck.ru/--?url=${data}`, {
      method: "get"
      // headers: {
      //   "Content-Type": "application/json"
      // },
      // body: JSON.stringify({
      //   source: data
      // })
    }).then(res => {
      if (res.status !== 201) {
        res.text().then(data => {
          this.shortLink(data);
        });
      }
    });
  }

  shortLink(data) {
    this.sendLink(data);
    let shortLink = data;
    this.shortLinks.push(shortLink);
    this.renderLinks(shortLink);
    
  }

  sendLink(data) {
    fetch("http://localhost:3007/links", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        link: data,
        login: localStorage.getItem("login")
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
  }

  renderLinks(data) {
    let div = document.querySelector(".result");
    let container = document.createElement("a");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let span3 = document.createElement("span");
    span1.innerHTML = "Короткая ссылка -  ";
    container.setAttribute("href", this.inp.value);
    container.innerHTML = data;
    span2.innerHTML = " Оригинальная ссылка: ";
    span3.innerHTML = `${this.inp.value} <br>`;
    div.appendChild(span1);
    div.appendChild(container);
    div.appendChild(span2);
    div.appendChild(span3);
    this.inp.value = "";
  }
}
