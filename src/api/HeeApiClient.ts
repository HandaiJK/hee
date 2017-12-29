import { RoomConfiguration } from "../models/RoomConfiguration";
import { resolve } from "url";

class HeeApiClient {

    createRoom(roomConfig: RoomConfiguration) {

    }

    joinRoom(roomName: string): Promise<RoomApiClient | undefined> {
        const rooms = [
            "myroom1",
            "myroom2",
            "myroom3"
        ];
        return new Promise((resolve) => {
            setTimeout(() => {
                rooms.indexOf(roomName) >= 0
                    ? resolve(new RoomApiClient())
                    : resolve(undefined);
            }, 1000);
        });
    }
}

class RoomApiClient {

}

export const client = new HeeApiClient();
