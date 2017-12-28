export interface SessionModel {
    title: string;
}

export class RoomConfigurationModel {
    /**
     * ルーム名
     */
    roomName: string;

    sessions: SessionModel[];

    constructor() {
        this.roomName = "";
        this.sessions = [{ title: "" }, { title: "" }, { title: "" }];
    }

    toString(): string {
        return `ルーム名: ${this.roomName} (セッション: [${this.sessions.map(x => x.title).join(",")}])`;
    }
}
