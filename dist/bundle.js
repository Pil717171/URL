!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),o=t(1),i=t(2);new(function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.shortLinks=[],this.inp=document.querySelector(".big-link"),this.router=new o.Router,this.links=[];new i.Register;this.init(),this.getLink(),this.regBut(),this.logBut()}return r(e,[{key:"init",value:function(){var e=this;fetch("http://localhost:3006/links",{headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(n){e.links=n,e.initRoutes(),console.log(e.links),window.dispatchEvent(new HashChangeEvent("hashchange"))})}},{key:"getLink",value:function(){var e=this;document.querySelector(".submit").addEventListener("click",function(n){n.preventDefault(),e.inp.value?e.sendData(e.inp.value):e.renderInputError()})}},{key:"renderInputError",value:function(){console.log("Ошибка, Вы не ввели ссылку")}},{key:"sendData",value:function(e){var n=this;console.log(e),fetch("http://localhost:3006/links",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({source:e})}).then(function(e){return 201!==e.status&&console.log("Post ERROR"),e.json()}).then(function(e){n.shortLink(e)})}},{key:"shortLink",value:function(e){var n="pil/"+e.id;this.shortLinks.push(n),this.renderLinks(n),console.log(e)}},{key:"renderLinks",value:function(e){var n=document.querySelector(".result"),t=document.createElement("a");console.log(this.inp.value),t.setAttribute("href",this.inp.value),t.innerHTML="Ваша короткая ссылка: "+e+" ; Исходная ссылка: "+this.inp.value+" <br>",n.appendChild(t),this.inp.value=""}},{key:"initRoutes",value:function(){this.router.addRoute("",this.renderHomePage.bind(this)),this.router.addRoute("#about",this.renderAboutPage.bind(this)),this.router.addRoute("#main",this.renderMainPage.bind(this)),this.router.addRoute("404",this.renderErrorPage.bind(this))}},{key:"renderHomePage",value:function(){var e=document.querySelector(".home");console.log(e),e.classList.add("visible")}},{key:"renderAboutPage",value:function(){var e=document.querySelector(".about");console.log(e),e.classList.add("visible")}},{key:"renderMainPage",value:function(){document.querySelector(".main").classList.add("visible")}},{key:"renderErrorPage",value:function(){document.querySelector(".error").classList.add("visible")}},{key:"regBut",value:function(){var e=this;document.querySelector(".registration").addEventListener("click",function(){e.renderAboutPage(),history.pushState({},"about","#about"),window.dispatchEvent(new HashChangeEvent("hashchange"))})}},{key:"logBut",value:function(){var e=this;document.querySelector(".login").addEventListener("click",function(){e.renderMainPage(),history.pushState({},"main","#main"),window.dispatchEvent(new HashChangeEvent("hashchange"))})}}]),e}())},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();n.Router=function(){function e(){var n=this;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.routes={404:function(){console.log("Not found")}},this.mainContentPages=document.querySelectorAll(".page"),window.addEventListener("hashchange",function(e){n.render(decodeURI(window.location.hash))})}return r(e,[{key:"addRoute",value:function(e,n){this.routes[e]=n}},{key:"render",value:function(e){var n=e.split("/")[0];console.log(n),[].concat(function(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}(this.mainContentPages)).forEach(function(e){e.classList.remove("visible")}),this.routes[n]?this.routes[n]():this.routes[404]()}}]),e}()},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();n.Register=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.isRegistered=!1,this.checkLogin()}return r(e,[{key:"checkLogin",value:function(){var e=this,n=document.querySelector(".registration-login"),t=(document.querySelector(".registration-password"),document.querySelector(".registration-password-repeat"),document.querySelector(".registration-submit")),r=[];t.addEventListener("click",function(t){t.preventDefault(),fetch("http://localhost:3006/users",{headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){e.forEach(function(e){r.push(e.login)})}),r.forEach(function(t){if(console.log(t),console.log(n.value),n.value==t)return console.log("Такое имя уже есть. Введите другое"),!1;e.checkPassword()})})}},{key:"checkPassword",value:function(){console.log("checkpassword")}}]),e}()}]);
//# sourceMappingURL=bundle.js.map