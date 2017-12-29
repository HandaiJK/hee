export interface Session {
    title: string;
}

export class RoomConfiguration {
    /**
     * ルーム名
     */
    roomName: string;

    sessions: Session[];

    constructor() {
        this.roomName = "";
        this.sessions = [{ title: "" }, { title: "" }, { title: "" }];
    }

    toString(): string {
        return `ルーム名: ${this.roomName} (セッション: [${this.sessions.map(x => x.title).join(",")}])`;
    }
}
