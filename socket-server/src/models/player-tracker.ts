import { Player } from "./player";

export interface PlayerTracker {
    [fullSocketId: string]: Player
}