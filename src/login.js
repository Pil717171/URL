export class Login {
    constructor (isLogged) {
        this.isLogged = isLogged;
        
    }

    checkLogger() {
        console.log(localStorage.getItem('login'))
        if(localStorage.getItem('login')) {
            console.log(123)
            this.renderExitButton();
            this.isLogged = true;
        } else {
            
        };    
    }

    renderExitButton() {
        let exit = document.querySelector('.exit');
        exit.classList.add('visible');
        exit.addEventListener('click', this.exitEvent)
    }
    
    exitEvent() {
        this.isLogged = false;
        localStorage.removeItem('login');
        let exit = document.querySelector('.exit');
        exit.classList.remove('visible');       
    }

   

    






}