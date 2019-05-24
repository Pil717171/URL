export class Register {
    constructor (isRegistered) {
        this.isRegistered = isRegistered;
        this.checkLogin();
        
        
    }

    checkLogin() {
        let button = document.querySelector('.registration-submit');
        let login = document.querySelector('.registration-login');
        let loginArray = [];
        fetch('http://localhost:3006/users', { headers: {
                'Content-Type': 'application/json'
                }})
                    .then((res) => res.json())
                    .then((data) => {
                        data.forEach((i) => {
                            loginArray.push(i.login)
                        });
                    })
        
        button.addEventListener('click', (e) => { 
            e.preventDefault();
            if (login.value) {
                let repeat = loginArray.some((i) => {
                    return (i == login.value);
                })
                repeat ? this.repeatLogin() : this.checkPassword(login.value);
            } else {
                console.log('Поле пустое')
            }
        })  
    }

    checkPassword(login) {
        let password = document.querySelector('.registration-password');
        let passwordRepeat = document.querySelector('.registration-password-check');

        if (password.value && passwordRepeat.value) {
            // console.log('yes')
            (password.value == passwordRepeat.value) ? this.sendRegistration(login, password.value) : this.failedRegistration(passwordRepeat);
        } else {
            console.log('Поля с паролем не заполнены')
        }
        console.log('checkpassword')

    }

    repeatLogin() {
        console.log('Repeat login')
    }

    sendRegistration(login, password) {
        
        console.log('Регистрация прошла успешно')
        fetch('http://localhost:3006/users', { method: 'post', headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                login: login,
                password: password
            })
        }) 
            
        .then((res) => {
            if(res.status !== 201) {
                console.log("Post ERROR")
            }
            return res.json();
        })
        .then((res) => {
            console.log(res);
        })
        this.isRegistered = true;
        localStorage.setItem('login', login);
        let event = new Event('checkRegister');
        window.dispatchEvent(event)
    }

    failedRegistration(data) {
        data.value = ''
        console.log('Пароли не совпадают. Попробуйте еще')
    }


 }