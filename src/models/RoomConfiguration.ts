export interface Session {
    title: string;
}

export class RoomConfiguration {
    /**
     * ルーム名
     */
    roomName: string;

    sessions: Session[];

    constructor(roomName: string = "", sessions: Session[] = []) {
        this.roomName = roomName;
        this.sessions = sessions;
    }

    toString(): string {
        return `ルーム名: ${this.roomName} (セッション: [${this.sessions.map(x => x.title).join(",")}])`;
    }
}
