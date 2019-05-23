import { Router } from './router';
import { Register } from './register';

class App {
    constructor () {
        this.shortLinks = [];
        this.inp = document.querySelector('.big-link');
        this.router = new Router();
        this.links = [];
        const register = new Register();
        this.init();
        this.getLink();
        this.regBut();
        this.logBut();
        
    }

    

    init() {
        const url = 'http://localhost:3006/links';
        fetch(url, { headers: {
            'Content-Type': 'application/json'
        }})
            .then((res) => res.json())
            .then((data) => {
                this.links = data;
                this.initRoutes();
                console.log(this.links);
                window.dispatchEvent(new HashChangeEvent('hashchange'))
            })
    }

    getLink() {
        
        let but = document.querySelector('.submit');
        
        but.addEventListener('click', (e) => {
            e.preventDefault();
            if(this.inp.value) {
                this.sendData(this.inp.value);
            } else {
                this.renderInputError();
            }
        })
    }

    renderInputError() {
        console.log('Ошибка, Вы не ввели ссылку')
    }

    sendData(data) {
        console.log(data)
        fetch('http://localhost:3006/links', { method: 'post', headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                source: data
            })
        }) 
            
        .then((res) => {
            if(res.status !== 201) {
                console.log("Post ERROR")
            }
            return res.json();
        })
        .then((res) => {
            this.shortLink(res);
        })
    }

    shortLink(data) {
        let pref = 'pil/';
        let shortLink = pref + data.id;
        this.shortLinks.push(shortLink);
        this.renderLinks(shortLink)
        console.log(data)
    }

    renderLinks(data) {
        let div = document.querySelector('.result');
        let container = document.createElement('a')
        console.log(this.inp.value)
        container.setAttribute('href', this.inp.value )
        container.innerHTML = `Ваша короткая ссылка: ${data} ; Исходная ссылка: ${this.inp.value} <br>`;
        div.appendChild(container)
        this.inp.value = '';
    }

    initRoutes() {
       this.router.addRoute('', this.renderHomePage.bind(this));
       this.router.addRoute('#about', this.renderAboutPage.bind(this));
       this.router.addRoute('#main', this.renderMainPage.bind(this));
       this.router.addRoute('404', this.renderErrorPage.bind(this));
    }

    renderHomePage() {
        let homePage = document.querySelector('.home');
        console.log(homePage)
        homePage.classList.add('visible');
    }

    renderAboutPage() {
        let aboutPage = document.querySelector('.about');
        console.log(aboutPage)
        aboutPage.classList.add('visible');
    }

    renderMainPage() {
        let mainPage = document.querySelector('.main');
        mainPage.classList.add('visible');
    }

    renderErrorPage() {
        let errorPage = document.querySelector('.error');
        errorPage.classList.add('visible');
    }

    regBut() {
        let reg = document.querySelector('.registration');
        reg.addEventListener('click', () => {
            this.renderAboutPage()
            history.pushState( {},"about" , "#about");
            window.dispatchEvent(new HashChangeEvent('hashchange'))
            
        })
    }

    logBut() {
        let log = document.querySelector('.login');
        log.addEventListener('click', () => {
            this.renderMainPage()
            history.pushState( {},"main" , "#main");
            window.dispatchEvent(new HashChangeEvent('hashchange'))
        })
    }


}

const app = new App();