import * as PIXI from 'pixi.js'
import { EventEmitter } from 'eventemitter3'

interface EaseOptions
{
    duration?: number
    ease?: string | Function
    useTicker?: boolean
    ticker?: PIXI.Ticker
    maxFrame?: number
}

interface EaseParams
{
     x?: number
     y?: number
     position?:  PIXI.DisplayObject | PIXI.Point
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

interface AddOptions
{
    duration?: number
    ease?: string | Function
    repeat?: boolean | number
    reverse?: boolean
    wait?: number
    removeExisting?: boolean
}

export let ease: Ease

export declare class Ease extends EventEmitter
{
    duration: number
    ease: string | Function

    constructor(options: EaseOptions)

    destroy(): void
    add(element: PIXI.DisplayObject, params: EaseParams, options: AddOptions): EaseDisplayObject | EaseDisplayObject[]
    removeAllEases(element: PIXI.DisplayObject): void
    removeEase(element: PIXI.DisplayObject, param: string | string[]): void
    removeAll(force: boolean): void
    update(): void
    countElements(): number
    countRunning(): number

}

export declare class EaseDisplayObject extends EventEmitter
{
    count: number

    constructor(element: PIXI.DisplayObject, ease: Ease)
    remove(params: string | string[]): void
    add(params: EaseParams, options: AddOptions): void
    update(elapsed: number): void
}