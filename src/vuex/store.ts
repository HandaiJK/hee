"use strict";

import Vue from "vue";
import Vuex from "vuex";
import { Store, StoreOptions } from "vuex";
Vue.use(Vuex);
import { client } from "../api/HeeApiClient";
import { types } from "./types";
import { router } from "../router";
import { watch } from "fs";


type RoomJoinState = "normal" | "joining" | "failed";

export interface AppState {
    roomJoinState: RoomJoinState;
}
const options: StoreOptions<AppState> = {
    state: {
        roomJoinState: "normal"
    },
    mutations: {
        changeRoomJoinState(s, newState: RoomJoinState) {
            s.roomJoinState = newState;
        }
    },
    actions: {
        createRoom(ctx, payload) {
            router.push({ path: "/new" });
        },
        async joinRoom({ commit }, roomName: string) {
            // ルーム参加中
            commit(types.CHANGE_ROOM_JOIN_STATE, "joining");
            const roomClient = await client.joinRoom(roomName);
            if (roomClient !== undefined) {
                // ルーム画面に遷移する
                router.push({ path: "/roomhome" });
            } else {
                commit(types.CHANGE_ROOM_JOIN_STATE, "failed");
            }
        }
    }
};

const store: Store<AppState> = new Store(options);

export default store;
