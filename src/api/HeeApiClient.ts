import { RoomConfiguration } from "../models/RoomConfiguration";
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

class RoomApiClient {

}

class RoomAdminApiClient extends RoomApiClient {

}

export const client = new HeeApiClient();
