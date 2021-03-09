import HomePage from "./components/TheHomePageComponent.js";
import LoginPage from "./components/TheLoginComponent.js";
import Protected from "./components/TheProtectedComponent.js";

(() => {
    console.log('fried!');

    //add our VueRouter here, setup
    const router = new VueRouter({
       routes: [
                    {path: "/", component: HomePage },

                    {path: "/login", component:LoginPage},

                    //only access this route or sectin if you are logged in /authenticate
                    { path: "/admin", 
                    component:Protected,

                    beforeEnter: (to, from, next) => {
                        if(!vm.authenticated){
                            next("/login");// redirect un-login user to login page
                        }else{
                            next();//if user already login in, you can go to the protected section
                        }
                    }}

               ]
    })
    
    //vue
    const vm = new Vue({
        data: {
            message: "Hello!", 
            authenticated:false,
            user:""
        },

        created:function(){
            if(window.localStorage.getItem("creds")){
                this.authenticated = true;
                this.user = JSON.parse(window.localStorage.getItem("creds")).name;
            }
        },

        router//tell Vue to use Router

    }).$mount("#app");

})();