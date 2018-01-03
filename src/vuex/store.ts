"use strict";

import Vue from "vue";
import Vuex from "vuex";
import { Store, StoreOptions } from "vuex";
Vue.use(Vuex);
import { client, RoomAdminApiClient, RoomApiClient } from "../api/HeeApiClient";
import { mutationtypes } from "./types";
import { router } from "../router";
import { RoomConfiguration } from "../models/RoomConfiguration";
import { SessionInfo } from "../api/HeeApiClient";
import { start } from "repl";
import { watch } from "fs";
import { fail } from "assert";


type RoomJoinState = "normal" | "joining" | "failed";
type RoomCreateState = "normal" | "creating" | "failed";
type SessionState = "normal" | "changing" | "failed";

export interface AppState {
    roomJoinState: RoomJoinState;
    roomCreateState: RoomCreateState;
    sessionState: SessionState;
    currentSession?: SessionInfo;
    roomAdminClient?: RoomAdminApiClient;
    roomApiClient: RoomApiClient;
}
const options: StoreOptions<AppState> = {
    state: {
        roomJoinState: "normal",
        roomCreateState: "normal",
        sessionState: "normal",
        currentSession: {
            title: "スマート研究室を作ろう",
            sessionNumber: 1,
            attr: {
                isFirst: false,
                isLast: false
            },
            reactions: [
                {
                    id: 0,
                    count: 0
                }, {
                    id: 1,
                    count: 0
                }, {
                    id: 2,
                    count: 0
                }
            ],
        },
        roomApiClient: new RoomApiClient()
    },
    mutations: {
        changeRoomJoinState(s, newState: RoomJoinState) {
            s.roomJoinState = newState;
        },
        changeRoomCreateState(s, newState: RoomCreateState) {
            s.roomCreateState = newState;
        },
        updateCurrentSession(s, newSession: SessionInfo) {
            s.currentSession = newSession;
        },
        setRoomAdminClient(s, c: RoomAdminApiClient) {
            s.roomAdminClient = c;
        },
        changeSessionState(s, newState: SessionState) {
            s.sessionState = newState;
        },
        addCurrentSessionReaction(s, payload) {
            if (s.currentSession) {
                s.currentSession.reactions.find(x => x.id == payload.id)!!.count += payload.count;
            }
        }
    },
    actions: {
        navigateToNewPage(ctx, payload) {
            router.push({ path: "/new" });
        },
        async requestCreateNewRoom({ commit }, roomConfig: RoomConfiguration) {
            // ルーム作成中
            commit(mutationtypes.CHANGE_ROOM_CREATE_STATE, "creating");
            const roomAdminClient = await client.createRoom(roomConfig);
            if (roomAdminClient !== undefined) {
                commit("setRoomAdminClient", roomAdminClient);
                // 管理画面に遷移する
                router.push({ path: "/admin" });
            } else {
                commit(mutationtypes.CHANGE_ROOM_CREATE_STATE, "failed");
            }
        },
        async joinRoom({ commit }, roomName: string) {
            // ルーム参加中
            commit(mutationtypes.CHANGE_ROOM_JOIN_STATE, "joining");
            const roomClient = await client.joinRoom(roomName);
            if (roomClient !== undefined) {
                // ルーム画面に遷移する
                router.push({ path: "/roomhome" });
            } else {
                commit(mutationtypes.CHANGE_ROOM_JOIN_STATE, "failed");
            }
        },
        async requestGotoNextSession({ commit, state }) {
            // セッションを移動中
            commit(mutationtypes.CHANGE_SESSION_STATE, "changing");
            const c = state.roomAdminClient || new RoomAdminApiClient();
            if (c !== undefined) {
                const newSession = await c.gotoNextSession();
                if (newSession !== undefined) {
                    commit(mutationtypes.UPDATE_CURRENT_SESSION, newSession);
                    commit(mutationtypes.CHANGE_SESSION_STATE, "normal");
                } else {
                    commit(mutationtypes.CHANGE_SESSION_STATE, "failed");
                }
            } else {
                commit(mutationtypes.CHANGE_SESSION_STATE, "failed");
            }
        },
        async requestGotoPreviousSession({ commit, state }) {
            // セッションを移動中
            commit(mutationtypes.CHANGE_SESSION_STATE, "changing");
            const c = state.roomAdminClient || new RoomAdminApiClient();
            if (c !== undefined) {
                const newSession = await c.gotoPreviousSession();
                if (newSession !== undefined) {
                    commit(mutationtypes.UPDATE_CURRENT_SESSION, newSession);
                    commit(mutationtypes.CHANGE_SESSION_STATE, "normal");
                } else {
                    commit(mutationtypes.CHANGE_SESSION_STATE, "failed");
                }
            } else {
                commit(mutationtypes.CHANGE_SESSION_STATE, "failed");
            }
        }
    }
};

const store: Store<AppState> = new Store(options);

export default store;
