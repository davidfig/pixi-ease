import type { ColorSource, Container, PointData, Ticker } from 'pixi.js'
import { EventEmitter } from 'eventemitter3'

export type EaseFunction = (time: number, start: number, delta: number, duration: number) => number

export interface EaseOptions {
    duration?: number
    wait?: number
    ease?: string | EaseFunction
    useRAF?: boolean
    ticker?: Ticker
    maxFrame?: number
}

export interface EaseParams {
    x?: number
    y?: number
    position?: PointData
    width?: number
    height?: number
    scale?: number
    scaleX?: number
    scaleY?: number
    alpha?: number
    rotation?: number
    face?: PointData
    skew?: number
    skewX?: number
    skewY?: number
    tint?: ColorSource | ColorSource[]
    blend?: ColorSource | ColorSource[]
    shake?: number
    [generic: string]: any
}

export interface AddOptions {
    duration?: number
    ease?: string | EaseFunction
    repeat?: boolean | number
    reverse?: boolean
    wait?: number
}

export interface EaseEvents {
    each: [ease: Ease]
    complete: [ease: Ease]
}

export interface EasingEvents {
    each: [easing: Easing]
    complete: [easing: Easing]
    reverse: [easing: Easing]
    repeat: [easing: Easing]
    wait: [easing: Easing]
    'wait-end': [easing: Easing]
}

// eases accept any object with the eased properties (usually a PIXI.Container)
export type EaseElement = Container | Record<string, any>

export declare class Ease extends EventEmitter<EaseEvents> {
    static id: number
    static ease: Ease

    options: Required<Omit<EaseOptions, 'ticker'>> & { ticker: Ticker | null }
    easings: Easing[]
    duration: number
    ease: string | EaseFunction

    constructor(options?: EaseOptions)

    destroy(): void
    add(element: EaseElement | EaseElement[], params: EaseParams, options?: AddOptions): Easing
    target(element: EaseElement, target: PointData, speed: number, options?: AddOptions): Easing
    face(element: EaseElement, target: PointData, speed: number, options?: AddOptions): Easing
    removeEase(element: EaseElement, param?: string | string[]): void
    removeAll(): void
    update(elapsed?: number): void
    get count(): number
    countRunning(): number
}

export declare let ease: Ease

export declare class Easing extends EventEmitter<EasingEvents> {
    static shortestAngle(start: number, finish: number): number

    elements: EaseElement[]
    options: AddOptions
    time: number

    constructor(element: EaseElement | EaseElement[], params: EaseParams, options: AddOptions)

    remove(element?: EaseElement, params?: string | string[]): boolean | undefined
    update(elapsed: number): boolean | undefined
    get count(): number
}
