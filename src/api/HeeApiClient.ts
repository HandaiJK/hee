import { RoomConfiguration, Session } from "../models/RoomConfiguration";
import { resolve } from "url";
import { inherits } from "util";
import store from "../vuex/store";
import { mutationtypes } from "../vuex/types";

export type ReactionId = number;

class HeeApiClient {
    private static DUMMY_ROOMS = [
        "myroom1",
        "myroom2",
        "myroom3"
    ];

    createRoom(roomConfig: RoomConfiguration): Promise<RoomAdminApiClient | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                HeeApiClient.DUMMY_ROOMS.indexOf(roomConfig.roomName) >= 0
                    ? resolve(new RoomAdminApiClient())
                    : resolve(undefined);
            }, 1000);
        });
    }

    joinRoom(roomName: string): Promise<RoomApiClient | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                HeeApiClient.DUMMY_ROOMS.indexOf(roomName) >= 0
                    ? resolve(new RoomApiClient())
                    : resolve(undefined);
            }, 1000);
        });
    }
}

export class RoomApiClient {
    makeReaction(reactionId: ReactionId) {
        store.commit(mutationtypes.ADD_CURRENT_SESSION_REACTION, {
            id: reactionId,
            count: 1
        });
    }
}

export class RoomAdminApiClient extends RoomApiClient {
    initialCount = [
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
    ];

    gotoPreviousSession(): Promise<SessionInfo | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    title: "前のセッション",
                    sessionNumber: 100,
                    attr: {
                        isFirst: true,
                        isLast: false
                    },
                    reactions: this.initialCount
                });
            }, 1000);
        });
    }

    gotoNextSession(): Promise<SessionInfo | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    title: "次のセッション",
                    sessionNumber: 200,
                    attr: {
                        isFirst: false,
                        isLast: true
                    },
                    reactions: this.initialCount
                });
            }, 1000);
        });
    }

    getCurrentSession(): Promise<SessionInfo | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    title: "現在のセッション",
                    sessionNumber: 150,
                    attr: {
                        isFirst: false,
                        isLast: false
                    },
                    reactions: this.initialCount
                });
            }, 1000);
        });
    }
}

interface Reaction {
    readonly id: ReactionId;
    count: number;
}

export interface SessionInfo {
    title: string;
    sessionNumber: number;
    attr: {
        isFirst: boolean;
        isLast: boolean;
    };
    reactions: Reaction[];
}

export const client = new HeeApiClient();
