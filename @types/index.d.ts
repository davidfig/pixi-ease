import * as PIXI from 'pixi.js'
import { EventEmitter } from 'eventemitter3'

interface EaseOptions {
    duration?: number
    ease?: string | Function
    useRaf?: boolean
    ticker?: PIXI.Ticker
    maxFrame?: number
}

interface EaseParams {
    x?: number
    y?: number
    position?: PIXI.DisplayObject | PIXI.Point
    width?: number
    height?: number
    scale?: number
    scaleX?: number
    scaleY?: number
    alpha?: number
    rotation?: number
    face?: PIXI.DisplayObject | PIXI.Point
    skew?: number
    skewX?: number
    skewY?: number
    tint?: number | number[]
    blend?: number | number[]
    shake?: number
    [generic: string]: any
}

interface AddOptions {
    duration?: number
    ease?: string | Function
    repeat?: boolean | number
    reverse?: boolean
    wait?: number
    removeExisting?: boolean
}

export let ease: Ease

export declare class Ease extends EventEmitter {
    duration: number
    ease: string | Function

    constructor(options: EaseOptions)

    destroy(): void
    add(element: PIXI.DisplayObject | PIXI.DisplayObject[], params: EaseParams, options: AddOptions): Easing
    target(element: PIXI.DisplayObject, target: PIXI.DisplayObject | PIXI.DisplayObject[], speed: number, options: AddOptions): Easing;
    face(element: PIXI.DisplayObject, target: PIXI.DisplayObject | PIXI.DisplayObject[], speed: number, options: AddOptions): Easing;
    removeEase(element: PIXI.DisplayObject, param?: string | string[]): void
    removeAll(): void
    update(elapsed: number): void
    get count(): number;
    countElements(): number
    countRunning(): number
}

export declare class Easing extends EventEmitter {
    static shortestAngle(start: number, finish: number): number
    remove(element?: PIXI.DisplayObject, params?: string | string[]): void

    constructor(element: PIXI.DisplayObject | PIXI.DisplayObject[], params: EaseParams, options: EaseOptions)

    addParam(element: PIXI.DisplayObject, entry: string, param: any): void
    updateOne(ease: Ease, entry: string): void
    updatePoint(ease: Ease, entry: string): void
    updatePosition(ease: Ease): void
    updateCoord(ease: Ease, name: string, coord: any): void
    updateTint(ease: Ease, colors: number[]): void
    updateBlend(ease: Ease, colors: number[]): void
    updateShake(ease: Ease): void
    complete(ease: Ease): void
    reverse(ease: Ease): void
    repeat(ease: Ease): void
    update(elapsed: number): void
    count(): number
}