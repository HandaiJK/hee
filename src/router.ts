import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import Root from "./views/Root.vue";
import RoomHome from "./views/RoomHome.vue";
import Display from "./views/Display.vue";
import New from "./views/New.vue";
import Admin from "./views/Admin.vue";

export const router = new VueRouter({
    routes: [
        {
            path: "/", component: Root
        },
        {
            path: "/home", component: Home
        },
        {
            path: "/roomhome", component: RoomHome
        },
        {
            path: "/display", component: Display
        },
        {
            path: "/new", component: New
        },
        {
            path: "/admin", component: Admin
        }
    ]
});
