/** OPERATOR INTERFACES */
declare interface rxjs$UnaryFunction<T, R> {
  (source: T): R;
}
declare interface rxjs$OperatorFunction<T, R>
  extends rxjs$UnaryFunction<rxjs$Observable<T>, rxjs$Observable<R>> {}
declare type rxjs$FactoryOrValue<T> = T | (() => T);
declare interface rxjs$MonoTypeOperatorFunction<T>
  extends rxjs$OperatorFunction<T, T> {}
declare interface rxjs$Timestamp<T> {
  value: T;
  timestamp: number;
}
declare interface rxjs$TimeInterval<T> {
  value: T;
  interval: number;
}
/** SUBSCRIPTION INTERFACES */
declare interface rxjs$Unsubscribable {
  unsubscribe(): void;
}
declare type rxjs$TeardownLogic = rxjs$Unsubscribable | Function | void;
declare interface rxjs$SubscriptionLike extends rxjs$Unsubscribable {
  unsubscribe(): void;
  +closed: boolean;
}
declare type rxjs$SubscribableOrPromise<T> =
  | rxjs$Subscribable<T>
  | rxjs$Subscribable<"NO PRINT IMPLEMENTED: NeverKeyword">
  | Promise<T>
  | rxjs$InteropObservable<T>;

/** OBSERVABLE INTERFACES */
declare interface rxjs$Subscribable<T> {
  subscribe(observer?: rxjs$PartialObserver<T>): rxjs$Unsubscribable;
  subscribe(
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): rxjs$Unsubscribable;
}
declare type ObservableInput<T> =
  | rxjs$SubscribableOrPromise<T>
  | Array<T>
  | Iterable<T>;

/*// @deprecated use {@link rxjs$InteropObservable } */
declare type rxjs$ObservableLike<T> = rxjs$InteropObservable<T>;
declare type rxjs$InteropObservable<T> = {
  [any]: () => rxjs$Subscribable<T>
};
/** OBSERVER INTERFACES */
declare interface rxjs$NextObserver<T> {
  closed?: boolean;
  next: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}
declare interface rxjs$ErrorObserver<T> {
  closed?: boolean;
  next?: (value: T) => void;
  error: (err: any) => void;
  complete?: () => void;
}
declare interface rxjs$CompletionObserver<T> {
  closed?: boolean;
  next?: (value: T) => void;
  error?: (err: any) => void;
  complete: () => void;
}
declare interface rxjs$PartialObserver<T> {
  closed?: boolean;
  next?: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}
declare interface rxjs$Observer<T> {
  closed?: boolean;
  next(value: T): void;
  error(err: any): void;
  complete(): void;
}
/** SCHEDULER INTERFACES */
declare interface rxjs$SchedulerLike {
  now(): number;
  schedule<T>(
    work: (state?: T) => void,
    delay?: number,
    state?: T
  ): rxjs$Subscription;
}
declare interface rxjs$SchedulerAction<T> extends rxjs$Subscription {
  schedule(state?: T, delay?: number): rxjs$Subscription;
}

declare class rxjs$Observable<T> implements rxjs$Subscribable<T> {
  // @internal
  _isScalar: boolean;
  // @deprecated  This is an internal implementation detail, do not use.
  source: rxjs$Observable<any>;
  // @deprecated  This is an internal implementation detail, do not use.
  operator: rxjs$Operator<any, T>;
  constructor(
    subscribe?: (subscriber: rxjs$Subscriber<T>) => rxjs$TeardownLogic
  ): this;
  static create: Function;
  lift<R>(operator: rxjs$Operator<T, R>): rxjs$Observable<R>;
  subscribe(observer?: rxjs$PartialObserver<T>): rxjs$Subscription;
  subscribe(
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): rxjs$Subscription;
  // @deprecated  This is an internal implementation detail, do not use.
  _trySubscribe(sink: rxjs$Subscriber<T>): rxjs$TeardownLogic;
  forEach(
    next: (value: T) => void,
    promiseCtor?: Promise.constructor
  ): Promise<void>;
  // @internal  This is an internal implementation detail, do not use.
  _subscribe(subscriber: rxjs$Subscriber<any>): rxjs$TeardownLogic;
  // @deprecated  In favor of iif creation function: import { iif } from 'rxjs';
  static if: typeof rxjs$iif;
  // @deprecated  In favor of throwError creation function: import { throwError } from 'rxjs';
  static throw: typeof rxjs$throwError;
  pipe(): rxjs$Observable<T>;
  pipe<A>(op1: rxjs$OperatorFunction<T, A>): rxjs$Observable<A>;
  pipe<A, B>(
    op1: rxjs$OperatorFunction<T, A>,
    op2: rxjs$OperatorFunction<A, B>
  ): rxjs$Observable<B>;
  pipe<A, B, C>(
    op1: rxjs$OperatorFunction<T, A>,
    op2: rxjs$OperatorFunction<A, B>,
    op3: rxjs$OperatorFunction<B, C>
  ): rxjs$Observable<C>;
  pipe<A, B, C, D>(
    op1: rxjs$OperatorFunction<T, A>,
    op2: rxjs$OperatorFunction<A, B>,
    op3: rxjs$OperatorFunction<B, C>,
    op4: rxjs$OperatorFunction<C, D>
  ): rxjs$Observable<D>;
  pipe<A, B, C, D, E>(
    op1: rxjs$OperatorFunction<T, A>,
    op2: rxjs$OperatorFunction<A, B>,
    op3: rxjs$OperatorFunction<B, C>,
    op4: rxjs$OperatorFunction<C, D>,
    op5: rxjs$OperatorFunction<D, E>
  ): rxjs$Observable<E>;
  pipe<A, B, C, D, E, F>(
    op1: rxjs$OperatorFunction<T, A>,
    op2: rxjs$OperatorFunction<A, B>,
    op3: rxjs$OperatorFunction<B, C>,
    op4: rxjs$OperatorFunction<C, D>,
    op5: rxjs$OperatorFunction<D, E>,
    op6: rxjs$OperatorFunction<E, F>
  ): rxjs$Observable<F>;
  pipe<A, B, C, D, E, F, G>(
    op1: rxjs$OperatorFunction<T, A>,
    op2: rxjs$OperatorFunction<A, B>,
    op3: rxjs$OperatorFunction<B, C>,
    op4: rxjs$OperatorFunction<C, D>,
    op5: rxjs$OperatorFunction<D, E>,
    op6: rxjs$OperatorFunction<E, F>,
    op7: rxjs$OperatorFunction<F, G>
  ): rxjs$Observable<G>;
  pipe<A, B, C, D, E, F, G, H>(
    op1: rxjs$OperatorFunction<T, A>,
    op2: rxjs$OperatorFunction<A, B>,
    op3: rxjs$OperatorFunction<B, C>,
    op4: rxjs$OperatorFunction<C, D>,
    op5: rxjs$OperatorFunction<D, E>,
    op6: rxjs$OperatorFunction<E, F>,
    op7: rxjs$OperatorFunction<F, G>,
    op8: rxjs$OperatorFunction<G, H>
  ): rxjs$Observable<H>;
  pipe<A, B, C, D, E, F, G, H, I>(
    op1: rxjs$OperatorFunction<T, A>,
    op2: rxjs$OperatorFunction<A, B>,
    op3: rxjs$OperatorFunction<B, C>,
    op4: rxjs$OperatorFunction<C, D>,
    op5: rxjs$OperatorFunction<D, E>,
    op6: rxjs$OperatorFunction<E, F>,
    op7: rxjs$OperatorFunction<F, G>,
    op8: rxjs$OperatorFunction<G, H>,
    op9: rxjs$OperatorFunction<H, I>
  ): rxjs$Observable<I>;
  pipe<A, B, C, D, E, F, G, H, I>(
    op1: rxjs$OperatorFunction<T, A>,
    op2: rxjs$OperatorFunction<A, B>,
    op3: rxjs$OperatorFunction<B, C>,
    op4: rxjs$OperatorFunction<C, D>,
    op5: rxjs$OperatorFunction<D, E>,
    op6: rxjs$OperatorFunction<E, F>,
    op7: rxjs$OperatorFunction<F, G>,
    op8: rxjs$OperatorFunction<G, H>,
    op9: rxjs$OperatorFunction<H, I>,
    ...operations: rxjs$OperatorFunction<any, any>[]
  ): rxjs$Observable<{}>;
  toPromise<T>(): Promise<T>;
  toPromise<T>(PromiseCtor: typeof Promise): Promise<T>;
  toPromise<T>(PromiseCtor: Promise.constructor): Promise<T>;
}

declare class rxjs$Subscription implements rxjs$SubscriptionLike {
  static EMPTY: rxjs$Subscription;
  closed: boolean;
  // @internal
  _parent: rxjs$Subscription;
  // @internal
  _parents: rxjs$Subscription[];
  constructor(unsubscribe?: () => void): this;
  unsubscribe(): void;
  add(teardown: rxjs$TeardownLogic): rxjs$Subscription;
  remove(subscription: rxjs$Subscription): void;
}

declare interface rxjs$Operator<T, R> {
  call(subscriber: rxjs$Subscriber<R>, source: any): rxjs$TeardownLogic;
}

declare class rxjs$Subscriber<T> extends rxjs$Subscription
  implements rxjs$Observer<T> {
  static create<T>(
    next?: (x?: T) => void,
    error?: (e?: any) => void,
    complete?: () => void
  ): rxjs$Subscriber<T>;
  // @internal
  syncErrorValue: any;
  // @internal
  syncErrorThrown: boolean;
  // @internal
  syncErrorThrowable: boolean;
  isStopped: boolean;
  destination: rxjs$PartialObserver<any> | rxjs$Subscriber<any>;
  constructor(
    destinationOrNext?: rxjs$PartialObserver<any> | ((value: T) => void),
    error?: (e?: any) => void,
    complete?: () => void
  ): this;
  next(value?: T): void;
  error(err?: any): void;
  complete(): void;
  unsubscribe(): void;
  _next(value: T): void;
  _error(err: any): void;
  _complete(): void;
  // @deprecated  This is an internal implementation detail, do not use.
  _unsubscribeAndRecycle(): rxjs$Subscriber<T>;
}

declare function rxjs$throwError(
  error: any,
  scheduler?: rxjs$SchedulerLike
): rxjs$Observable<"NO PRINT IMPLEMENTED: NeverKeyword">;

declare function rxjs$iif<T, F>(
  condition: () => boolean,
  trueResult?: rxjs$SubscribableOrPromise<T>,
  falseResult?: rxjs$SubscribableOrPromise<F>
): rxjs$Observable<T | F>;

declare module "rxjs" {
  declare module.exports: {
    Observable: typeof rxjs$Observable,
    Subscriber: typeof rxjs$Subscriber,
    throwError: typeof rxjs$throwError,
    iif: typeof rxjs$iif,
    ConnectableObservable: typeof ConnectableObservable,
    GroupedObservable: typeof GroupedObservable,
    observable: string | any,
    Subject: typeof Subject,
    BehaviorSubject: typeof BehaviorSubject,
    ReplaySubject: typeof ReplaySubject,
    AsyncSubject: typeof AsyncSubject,
    asapScheduler: AsapScheduler,
    asyncScheduler: AsyncScheduler,
    queueScheduler: QueueScheduler,
    animationFrameScheduler: AnimationFrameScheduler,
    VirtualTimeScheduler: typeof VirtualTimeScheduler,
    VirtualAction: typeof VirtualAction,
    Scheduler: typeof Scheduler,
    Notification: typeof Notification,
    pipe<T>(): rxjs$UnaryFunction<T, T>,
    noop(): void,
    identity<T>(x: T): T,
    isObservable<T>(obj: any): boolean,
    concat<T>(
      v1: ObservableInput<T>,
      scheduler?: rxjs$SchedulerLike
    ): rxjs$Observable<T>,
    defer<T>(
      observableFactory: () => rxjs$SubscribableOrPromise<T> | void
    ): rxjs$Observable<T>,
    empty(
      scheduler?: rxjs$SchedulerLike
    ): rxjs$Observable<"NO PRINT IMPLEMENTED: NeverKeyword">,
    forkJoin<T>(sources: [ObservableInput<T>]): rxjs$Observable<T[]>,
    from<T>(
      input: ObservableInput<T>,
      scheduler?: rxjs$SchedulerLike
    ): rxjs$Observable<T>,
    ArgumentOutOfRangeError: ArgumentOutOfRangeError,
    EmptyError: EmptyError,
    ObjectUnsubscribedError: ObjectUnsubscribedError,
    UnsubscriptionError: UnsubscriptionError,
    TimeoutError: TimeoutError,
    fromEvent<T>(
      target: FromEventTarget<T>,
      eventName: string
    ): rxjs$Observable<T>,
    fromEventPattern<T>(
      addHandler: (handler: Function) => any,
      removeHandler?: (handler: Function, signal?: any) => void
    ): rxjs$Observable<T>,
    generate<T, S>(
      initialState: S,
      condition: ConditionFunc<S>,
      iterate: IterateFunc<S>,
      resultSelector: ResultFunc<S, T>,
      scheduler?: rxjs$SchedulerLike
    ): rxjs$Observable<T>,
    interval(
      period?: number,
      scheduler?: rxjs$SchedulerLike
    ): rxjs$Observable<number>,
    merge<T>(
      v1: ObservableInput<T>,
      scheduler?: rxjs$SchedulerLike
    ): rxjs$Observable<T>,
    of<T>(a: T, scheduler?: rxjs$SchedulerLike): rxjs$Observable<T>,
    onErrorResumeNext<R>(v: ObservableInput<R>): rxjs$Observable<R>,
    pairs<T>(
      obj: Object,
      scheduler?: rxjs$SchedulerLike
    ): rxjs$Observable<[string, T]>,
    race<T>(observables: Array<rxjs$Observable<T>>): rxjs$Observable<T>,
    range(
      start?: number,
      count?: number,
      scheduler?: rxjs$SchedulerLike
    ): rxjs$Observable<number>,
    timer(
      dueTime?: number | Date,
      periodOrScheduler?: number | rxjs$SchedulerLike,
      scheduler?: rxjs$SchedulerLike
    ): rxjs$Observable<number>,
    using<T>(
      resourceFactory: () => rxjs$Unsubscribable | void,
      observableFactory: (
        resource: rxjs$Unsubscribable | void
      ) => ObservableInput<T> | void
    ): rxjs$Observable<T>,
    config: {
      Promise: Promise.constructor,
      useDeprecatedSynchronousErrorHandling: boolean
    },
    // @deprecated  resultSelector is no longer supported, pipe to map instead
    zip<T, R>(
      v1: ObservableInput<T>,
      resultSelector: (v1: T) => R
    ): rxjs$Observable<R>,
    // @deprecated  Deprecated in favor of using {@link  NEVER} constant.
    never(): rxjs$Observable<"NO PRINT IMPLEMENTED: NeverKeyword">,
    // @deprecated  resultSelector is no longer supported, use a mapping function.
    bindCallback(
      callbackFunc: Function,
      resultSelector: Function,
      scheduler?: rxjs$SchedulerLike
    ): (...args: any[]) => rxjs$Observable<any>,
    // @deprecated  resultSelector is deprecated, pipe to map instead
    bindNodeCallback(
      callbackFunc: Function,
      resultSelector: Function,
      scheduler?: rxjs$SchedulerLike
    ): (...args: any[]) => rxjs$Observable<any>,
    // @deprecated  resultSelector no longer supported, pipe to map instead
    combineLatest<T, R>(
      v1: ObservableInput<T>,
      resultSelector: (v1: T) => R,
      scheduler?: rxjs$SchedulerLike
    ): rxjs$Observable<R>
  };

  declare class ConnectableObservable<T> extends rxjs$Observable<T> {
    source: rxjs$Observable<T>;
    subjectFactory: () => Subject<T>;
    _subject: Subject<T>;
    _refCount: number;
    _connection: rxjs$Subscription;
    // @internal
    _isComplete: boolean;
    constructor(
      source: rxjs$Observable<T>,
      subjectFactory: () => Subject<T>
    ): this;
    // @deprecated  This is an internal implementation detail, do not use.
    _subscribe(subscriber: rxjs$Subscriber<T>): rxjs$Subscription;
    getSubject(): Subject<T>;
    connect(): rxjs$Subscription;
    refCount(): rxjs$Observable<T>;
  }

  declare interface RefCountSubscription {
    count: number;
    unsubscribe: () => void;
    closed: boolean;
    attemptedToUnsubscribe: boolean;
  }

  declare class GroupedObservable<K, T> extends rxjs$Observable<T> {
    key: K;
    // @deprecated  Do not construct this type. Internal use only
    constructor(
      key: K,
      groupSubject: Subject<T>,
      refCountSubscription?: RefCountSubscription
    ): this;
    // @deprecated  This is an internal implementation detail, do not use.
    _subscribe(subscriber: rxjs$Subscriber<T>): rxjs$Subscription;
  }

  declare class Subject<T> extends rxjs$Observable<T>
    implements rxjs$SubscriptionLike {
    observers: rxjs$Observer<T>[];
    closed: boolean;
    isStopped: boolean;
    hasError: boolean;
    thrownError: any;
    constructor(): this;
    static create: Function;
    lift<R>(operator: rxjs$Operator<T, R>): rxjs$Observable<R>;
    next(value?: T): void;
    error(err: any): void;
    complete(): void;
    unsubscribe(): void;
    // @deprecated  This is an internal implementation detail, do not use.
    _trySubscribe(subscriber: rxjs$Subscriber<T>): rxjs$TeardownLogic;
    // @deprecated  This is an internal implementation detail, do not use.
    _subscribe(subscriber: rxjs$Subscriber<T>): rxjs$Subscription;
    asObservable(): rxjs$Observable<T>;
  }

  declare class BehaviorSubject<T> extends Subject<T> {
    constructor(_value: T): this;
    +value: T;
    // @deprecated  This is an internal implementation detail, do not use.
    _subscribe(subscriber: rxjs$Subscriber<T>): rxjs$Subscription;
    getValue(): T;
    next(value?: T): void;
  }

  declare class ReplaySubject<T> extends Subject<T> {
    constructor(
      bufferSize?: number,
      windowTime?: number,
      scheduler?: rxjs$SchedulerLike
    ): this;
    // @deprecated  This is an internal implementation detail, do not use.
    _subscribe(subscriber: rxjs$Subscriber<T>): rxjs$Subscription;
    _getNow(): number;
  }

  declare class AsyncSubject<T> extends Subject<T> {
    // @deprecated  This is an internal implementation detail, do not use.
    _subscribe(subscriber: rxjs$Subscriber<any>): rxjs$Subscription;
    next(value?: T): void;
    error(error: any): void;
    complete(): void;
  }

  declare class VirtualTimeScheduler extends AsyncScheduler {
    maxFrames: number;
    static frameTimeFactor: number;
    frame: number;
    index: number;
    constructor(SchedulerAction?: typeof AsyncAction, maxFrames?: number): this;
    flush(): void;
  }

  declare class VirtualAction<T> extends AsyncAction<T> {
    // $FlowFixMe: flow fails due to class inheritance issues
    scheduler: VirtualTimeScheduler;
    work: (state?: T) => void;
    index: number;
    active: boolean;
    // $FlowFixMe: flow fails due to class inheritance issues
    constructor(
      scheduler: VirtualTimeScheduler,
      work: (state?: T) => void,
      index?: number
    ): this;
    schedule(state?: T, delay?: number): rxjs$Subscription;
    requestAsyncId(
      // $FlowFixMe: flow fails due to class inheritance issues
      scheduler: VirtualTimeScheduler,
      id?: any,
      delay?: number
    ): any;
    recycleAsyncId(
      // $FlowFixMe: flow fails due to class inheritance issues
      scheduler: VirtualTimeScheduler,
      id?: any,
      delay?: number
    ): any;
    _execute(state: T, delay: number): any;
    static sortActions<T>(a: VirtualAction<T>, b: VirtualAction<T>): number;
  }

  declare class Scheduler implements rxjs$SchedulerLike {
    static now: () => number;
    constructor(SchedulerAction: typeof Action, now?: () => number): this;
    now: () => number;
    schedule<T>(
      work: (state?: T) => void,
      delay?: number,
      state?: T
    ): rxjs$Subscription;
  }

  declare class Notification<T> {
    kind: string;
    value: T;
    error: any;
    hasValue: boolean;
    constructor(kind: string, value?: T, error?: any): this;
    observe(observer: rxjs$PartialObserver<T>): any;
    do(
      next: (value: T) => void,
      error?: (err: any) => void,
      complete?: () => void
    ): any;
    accept(
      nextOrObserver: rxjs$PartialObserver<T> | ((value: T) => void),
      error?: (err: any) => void,
      complete?: () => void
    ): any;
    toObservable(): rxjs$Observable<T>;
    static createNext<T>(value: T): Notification<T>;
    static createError<T>(err?: any): Notification<T>;
    static createComplete(): Notification<any>;
  }

  declare interface ArgumentOutOfRangeError extends Error {}

  declare interface EmptyError extends Error {}

  declare interface ObjectUnsubscribedError extends Error {}

  declare interface UnsubscriptionError extends Error {
    +errors: any[];
  }

  declare interface TimeoutError extends Error {}

  declare interface NodeStyleEventEmitter {
    addListener: (eventName: string | any, handler: NodeEventHandler) => void;
    removeListener: (
      eventName: string | any,
      handler: NodeEventHandler
    ) => void;
  }
  declare type NodeEventHandler = (...args: any[]) => void;
  declare interface NodeCompatibleEventEmitter {
    addListener: (eventName: string, handler: NodeEventHandler) => void | {};
    removeListener: (eventName: string, handler: NodeEventHandler) => void | {};
  }
  declare interface JQueryStyleEventEmitter {
    on: (eventName: string, handler: Function) => void;
    off: (eventName: string, handler: Function) => void;
  }
  declare interface HasEventTargetAddRemove<E> {
    addEventListener(
      type: string,
      listener: ((evt: E) => void) | null,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener(
      type: string,
      listener?: ((evt: E) => void) | null,
      options?: EventListenerOptions | boolean
    ): void;
  }
  declare type EventTargetLike<T> =
    | HasEventTargetAddRemove<T>
    | NodeStyleEventEmitter
    | NodeCompatibleEventEmitter
    | JQueryStyleEventEmitter;
  declare type FromEventTarget<T> =
    | EventTargetLike<T>
    | Array<EventTargetLike<T>>;
  declare interface EventListenerOptions {
    capture?: boolean;
    passive?: boolean;
    once?: boolean;
  }
  declare interface AddEventListenerOptions extends EventListenerOptions {
    once?: boolean;
    passive?: boolean;
  }

  declare type ConditionFunc<S> = (state: S) => boolean;
  declare type IterateFunc<S> = (state: S) => S;
  declare type ResultFunc<S, T> = (state: S) => T;
  declare interface GenerateBaseOptions<S> {
    initialState: S;
    condition?: ConditionFunc<S>;
    iterate: IterateFunc<S>;
    scheduler?: rxjs$SchedulerLike;
  }
  declare interface GenerateOptions<T, S> extends GenerateBaseOptions<S> {
    resultSelector: ResultFunc<S, T>;
  }

  declare class AsapScheduler extends AsyncScheduler {
    flush(action?: AsyncAction<any>): void;
  }

  declare class AsyncScheduler extends Scheduler {
    static delegate: Scheduler;
    actions: Array<AsyncAction<any>>;
    // @deprecated  internal use only
    active: boolean;
    // @deprecated  internal use only
    scheduled: any;
    constructor(SchedulerAction: typeof Action, now?: () => number): this;
    schedule<T>(
      work: (state?: T) => void,
      delay?: number,
      state?: T
    ): rxjs$Subscription;
    flush(action: AsyncAction<any>): void;
  }

  declare class QueueScheduler extends AsyncScheduler {}

  declare class AnimationFrameScheduler extends AsyncScheduler {
    flush(action?: AsyncAction<any>): void;
  }

  declare class AsyncAction<T> extends Action<T> {
    scheduler: AsyncScheduler;
    work: (state?: T) => void;
    id: any;
    state: T;
    delay: number;
    pending: boolean;
    constructor(scheduler: AsyncScheduler, work: (state?: T) => void): this;
    schedule(state?: T, delay?: number): rxjs$Subscription;
    requestAsyncId(scheduler: AsyncScheduler, id?: any, delay?: number): any;
    recycleAsyncId(scheduler: AsyncScheduler, id: any, delay?: number): any;
    execute(state: T, delay: number): any;
    _execute(state: T, delay: number): any;
    // @deprecated  This is an internal implementation detail, do not use.
    _unsubscribe(): void;
  }

  declare class Action<T> extends rxjs$Subscription {
    constructor(scheduler: Scheduler, work: (state?: T) => void): this;
    schedule(state?: T, delay?: number): rxjs$Subscription;
  }
}
