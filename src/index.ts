import Vue from "vue";
import store from "./vuex/store";
import ToggleButton from "vue-js-toggle-button";
import VueRouter from "vue-router";
import "!vue-style-loader!css-loader!sass-loader!./_default.scss";
import { router } from "./router";

Vue.use(VueRouter);
Vue.use(ToggleButton);

const app = new Vue({
    router,
    store
}).$mount("#app");
