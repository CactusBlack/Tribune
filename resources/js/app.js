/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform';

import Gate from "./Gates";
Vue.prototype.$gate = new Gate(window.user);


import Swal from 'sweetalert2';
window.Swal= Swal;

const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
window.toast = toast;

window.Form = Form;
import moment from 'moment'
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Dashboard from './components/Dashboard.vue';
import Profile from './components/Profile.vue';
import Developer from './components/Developer.vue';
import Users from './components/Users.vue';
import notFound from './components/notFound.vue';
import VueProgressBar from 'vue-progressbar';

Vue.use(VueProgressBar,{
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
})

// let routes = [
//     { path: '/dashboard', component:require('./components/Dashboard.vue') },
//     { path: '/user', component:require('./components/Profile.vue')  }
//   ];

// import User from './components/User.vue';
// import Dashboard from './components/Dashboard.vue';
// Vue.component('dashboard', Dashboard);
// Vue.component('user', User);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/dashboard', component:Dashboard },
    { path: '/user', component:Profile },
    { path: '/config', component:Users },
    { path: '/developer', component:Developer },
     { path: '*', component:notFound }
  ]
});

//Global filter
Vue.filter('upText',function(text){
   return text.charAt(0).toUpperCase() + text.slice(1)
});

Vue.filter('date',function(made){
  return moment(made).format('MMMM Do YYYY');
});
// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

window.fire= new Vue();

Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue').default
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue').default
);
Vue.component(
  'page-not-found',
  require('./components/notFound.vue').default
);

Vue.component('pagination',require('laravel-vue-pagination'));

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue').default
);

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
//Vue.component('dashboard', require('./components/Dashboard.vue').default);
// Vue.component('user', require('./components/Profile.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    data:{
      search:''
    },
    methods:{

      lookUp:_.debounce(()=>{
         fire.$emit('searchingSon');
      },1500),

      printme(){
        window.print();
      }
      
      }
    
}).$mount('#app')
