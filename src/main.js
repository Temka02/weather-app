import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import MainPage from './components/MainPage'
import DetailedForecast from './components/DetailedForecast.vue'
import fiveDayForecast from './components/fiveDayForecast.vue'
//import NotFoundPage from './components/NotFoundPage'
const routes = [
    {
        path:'/',
        name:'MainPage',
        component: MainPage
    },
    {
        path:'/details',
        name:'DetailedForecast',
        component: DetailedForecast
    },
    {
        path:'/fiveDayForecast',
        name:'fiveDayForecast',
        component: fiveDayForecast
    },
    // {
    //     path:'/:pathMatch(.*)*',
    //     name:'err 404',
    //     component: NotFoundPage
    // }
] 



const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router)
app.mount('#app')