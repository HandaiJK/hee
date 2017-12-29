"use strict";

import Vue from "vue";
import Vuex from "vuex";
import { Store, StoreOptions } from "vuex";
Vue.use(Vuex);
import { client } from "../api/HeeApiClient";
import { types } from "./types";
import { router } from "../router";
import { RoomConfiguration } from "../models/RoomConfiguration";


type RoomJoinState = "normal" | "joining" | "failed";
type RoomCreateState = "normal" | "creating" | "failed";

export interface AppState {
    roomJoinState: RoomJoinState;
    roomCreateState: RoomCreateState;
}
const options: StoreOptions<AppState> = {
    state: {
        roomJoinState: "normal",
        roomCreateState: "normal"
    },
    mutations: {
        changeRoomJoinState(s, newState: RoomJoinState) {
            s.roomJoinState = newState;
        },
        changeRoomCreateState(s, newState: RoomCreateState) {
            s.roomCreateState = newState;
        }
    },
    actions: {
        navigateToNewPage(ctx, payload) {
            router.push({ path: "/new" });
        },
        async requestCreateNewRoom({ commit }, roomConfig: RoomConfiguration) {
            // ルーム作成中
            commit(types.CHANGE_ROOM_CREATE_STATE, "creating");
            const roomAdminClient = await client.createRoom(roomConfig);
            if (roomAdminClient !== undefined) {
                // 管理画面に遷移する
                router.push({ path: "/admin" });
            } else {
                commit(types.CHANGE_ROOM_CREATE_STATE, "failed");
            }
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
