export class Router {
    constructor () {
        this.routes = {
            '404': () => {
                console.log('Not found');
            }
        }
        this.mainContentPages = document.querySelectorAll('.page');
        
    
        window.addEventListener('hashchange', (e) => {
            this.render(decodeURI(window.location.hash))
        })
    }
    
    addRoute(route, action) {
        this.routes[route] = action;
    }

    render(url) {
        let temp = url.split('/')[0];
        console.log(temp);
        [...this.mainContentPages].forEach((page) => {
            page.classList.remove('visible');
        });

        this.routes[temp] ? this.routes[temp]() : this.routes['404']();
    }
}