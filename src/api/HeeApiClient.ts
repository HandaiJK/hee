import { RoomConfiguration, Session } from "../models/RoomConfiguration";
import { resolve } from "url";

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

}

export class RoomAdminApiClient extends RoomApiClient {
    gotoPreviousSession(): Promise<SessionInfo | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    title: "前のセッション",
                    sessionNumber: 100,
                    attr: {
                        isFirst: true,
                        isLast: false
                    }
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
                    }
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
                    }
                });
            }, 1000);
        });
    }
}

export interface SessionInfo {
    title: string;
    sessionNumber: number;
    attr: {
        isFirst: boolean;
        isLast: boolean;
    };
}

export const client = new HeeApiClient();
