export type ReactionId = number;

export interface ReactionInfo {
    readonly id: ReactionId;
    readonly displayName: string;
    readonly color: string;
}

export const ReactionData: ReactionInfo[] = [
    {
        id: 0,
        displayName: "へぇ",
        color: "blue"
    },
    {
        id: 1,
        displayName: "わかる",
        color: "purple"
    },
    {
        id: 2,
        displayName: "!?",
        color: "green"
    }
];
