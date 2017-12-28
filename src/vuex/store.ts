"use strict";

import Vue from "vue";
import Vuex from "vuex";
import { Store, StoreOptions } from "vuex";
Vue.use(Vuex);


export interface AppState {
    metadata: {
        papers?: any[];
        projects?: any[];
    };
}
const options: StoreOptions<AppState> = {
    state: {
        metadata: {}
    },
    mutations: {
    },
    actions: {
    }
};

const store: Store<AppState> = new Store(options);

export default store;
