import { Node2D } from "./Node2D.js";

export class Shape extends Node2D{
    collide(shape) {
        return false;
    }
}

