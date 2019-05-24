import { Router } from './router';
import { Register } from './register';
import { Login } from './login';

class App {
    constructor () {
        this.shortLinks = [];
        this.inp = document.querySelector('.big-link');
        this.router = new Router();
        this.links = [];
        this.register = new Register(false);
        this.login = new Login(false);
        this.login.checkLogger();
        this.init();
        this.getLink();
        this.regBut();
        this.logBut();
        window.addEventListener('checkRegister', this.checkRegister.bind(this));
        this.pages = document.querySelectorAll('.page');
        
        
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
       this.router.addRoute('#login', this.renderLoginPage.bind(this));
       this.router.addRoute('404', this.renderErrorPage.bind(this));
    }

    renderHomePage() {
        this.pages.forEach((i) => {
            console.log(i)
            i.classList.remove('visible')
        })
        let homePage = document.querySelector('.home');
        console.log(homePage)
        homePage.classList.add('visible');
        window.location.hash = ''
       
    }

    renderAboutPage() {
        this.pages.forEach((i) => {
            console.log(i)
            i.classList.remove('visible')
        })
        let aboutPage = document.querySelector('.about');
        console.log(aboutPage)
        aboutPage.classList.add('visible');
        window.location.hash = '#about'
       
    }

    renderMainPage() {
        console.log(this.pages)
        this.pages.forEach((i) => {
            console.log(i)
            i.classList.remove('visible')
        })
        let mainPage = document.querySelector('.main');
        mainPage.classList.add('visible');
        window.location.hash = '#main'
        
    }

    renderErrorPage() {
        this.pages.forEach((i) => {
            console.log(i)
            i.classList.remove('visible')
        })
        let errorPage = document.querySelector('.error');
        errorPage.classList.add('visible');
        window.location.hash = '#error'
       
    }

    renderLoginPage() {
        this.pages.forEach((i) => {
            console.log(i)
            i.classList.remove('visible')
        })
        let loginPage = document.querySelector('.logpage');
        loginPage.classList.add('visible');
        window.location.hash = '#login'
       
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
            history.pushState( {},"main" , "#login");
            window.dispatchEvent(new HashChangeEvent('hashchange'))
        })
    }

    checkRegister() {
       if(this.register.isRegistered) {
           console.log(1)

            this.renderMainPage();
       } else {
           console.log('Ошибка регистрации')
       }
    }
}

const app = new App();