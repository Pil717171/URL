export class Register {
    constructor () {
        this.isRegistered = false;
        this.checkLogin();
        
    }

    checkLogin() {
        let login = document.querySelector('.registration-login');
        let password = document.querySelector('.registration-password');
        let passwordRepeat = document.querySelector('.registration-password-repeat');
        let button = document.querySelector('.registration-submit');
        let loginArray = [];

        button.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('http://localhost:3006/users', { headers: {
            'Content-Type': 'application/json'
            }})
                .then((res) => res.json())
                .then((data) => {
                    data.forEach((i) => {
                        loginArray.push(i.login)
                    });
                })
            loginArray.forEach((i) => {
                console.log(i)
                console.log(login.value)
                if(login.value == i) {
                    console.log('Такое имя уже есть. Введите другое');
                    return false;
                } else {
                    this.checkPassword();
                }
            })
        })
        
    }

    checkPassword() {
        console.log('checkpassword')
    }
 }