declare module "rxjs" {
  /**
   * A representation of any set of values over any amount of time. This is the most basic building block
   * of RxJS.
   * @class  Observable<T>
   */
  declare export class Observable<T> implements Subscribable<T> {
    /**
     * Internal implementation detail, do not use directly.
     */
    _isScalar: boolean;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    source: Observable<any>;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    operator: Operator<any, T>;

    /**
 *
 * @constructor
 * @param  the function that is called when the Observable is
initially subscribed to. This function is given a Subscriber, to which new values
can be `next`ed, or an `error` method can be called to raise an error, or
`complete` can be called to notify of a successful completion.
*/
    constructor(subscribe?: (subscriber: Subscriber<T>) => TeardownLogic): this;

    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static  true
     * @owner  Observable
     * @method  create
     * @param  ? the subscriber function to be passed to the Observable constructor
     * @return  a new cold observable
     * @nocollapse
     */
    static create: Function;

    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method  lift
     * @param  the operator defining the operation to take on the observable
     * @return  a new observable with the Operator applied
     */
    lift<R>(operator: Operator<T, R>): Observable<R>;
    subscribe(observer?: PartialObserver<T>): Subscription;
    subscribe(
      next?: (value: T) => void,
      error?: (error: any) => void,
      complete?: () => void
    ): Subscription;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _trySubscribe(sink: Subscriber<T>): TeardownLogic;

    /**
 *
 * @method  forEach
 * @param  a handler for each value emitted by the observable
 * @param  a constructor function used to instantiate the Promise
 * @return  a promise that either resolves on observable completion or
rejects with the handled error
*/
    forEach(
      next: (value: T) => void,
      promiseCtor?: Promise.constructor
    ): Promise<void>;

    /**
     *
     * @internal  This is an internal implementation detail, do not use.
     */
    _subscribe(subscriber: Subscriber<any>): TeardownLogic;

    /**
     *
     * @nocollapse
     * @deprecated  In favor of iif creation function: import { iif } from 'rxjs';
     */
    static if: typeof iif;

    /**
     *
     * @nocollapse
     * @deprecated  In favor of throwError creation function: import { throwError } from 'rxjs';
     */
    static throw: typeof throwError;
    pipe(): Observable<T>;
    pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
    pipe<A, B>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>
    ): Observable<B>;
    pipe<A, B, C>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>
    ): Observable<C>;
    pipe<A, B, C, D>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>
    ): Observable<D>;
    pipe<A, B, C, D, E>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>,
      op5: OperatorFunction<D, E>
    ): Observable<E>;
    pipe<A, B, C, D, E, F>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>,
      op5: OperatorFunction<D, E>,
      op6: OperatorFunction<E, F>
    ): Observable<F>;
    pipe<A, B, C, D, E, F, G>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>,
      op5: OperatorFunction<D, E>,
      op6: OperatorFunction<E, F>,
      op7: OperatorFunction<F, G>
    ): Observable<G>;
    pipe<A, B, C, D, E, F, G, H>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>,
      op5: OperatorFunction<D, E>,
      op6: OperatorFunction<E, F>,
      op7: OperatorFunction<F, G>,
      op8: OperatorFunction<G, H>
    ): Observable<H>;
    pipe<A, B, C, D, E, F, G, H, I>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>,
      op5: OperatorFunction<D, E>,
      op6: OperatorFunction<E, F>,
      op7: OperatorFunction<F, G>,
      op8: OperatorFunction<G, H>,
      op9: OperatorFunction<H, I>
    ): Observable<I>;
    pipe<A, B, C, D, E, F, G, H, I>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>,
      op5: OperatorFunction<D, E>,
      op6: OperatorFunction<E, F>,
      op7: OperatorFunction<F, G>,
      op8: OperatorFunction<G, H>,
      op9: OperatorFunction<H, I>,
      ...operations: OperatorFunction<any, any>[]
    ): Observable<{}>;
    toPromise<T>(): Promise<T>;
    toPromise<T>(PromiseCtor: typeof Promise): Promise<T>;
    toPromise<T>(PromiseCtor: Promise.constructor): Promise<T>;
  }

  /**
   *
   * @class  ConnectableObservable<T>
   */
  declare export class ConnectableObservable<T> extends Observable<T> {
    source: Observable<T>;
    subjectFactory: () => Subject<T>;
    _subject: Subject<T>;
    _refCount: number;
    _connection: Subscription;

    /**
     *
     * @internal
     */
    _isComplete: boolean;
    constructor(source: Observable<T>, subjectFactory: () => Subject<T>): this;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _subscribe(subscriber: Subscriber<T>): Subscription;
    getSubject(): Subject<T>;
    connect(): Subscription;
    refCount(): Observable<T>;
  }

  declare interface RefCountSubscription {
    count: number;
    unsubscribe: () => void;
    closed: boolean;
    attemptedToUnsubscribe: boolean;
  }

  /**
 * An Observable representing values belonging to the same group represented by
 * a common key. The values emitted by a GroupedObservable come from the source
Observable. The common key is available as the field `key` on a
GroupedObservable instance.
 * @class  GroupedObservable<K, T>
*/
  declare export class GroupedObservable<K, T> extends Observable<T> {
    key: K;

    /**
     *
     * @deprecated  Do not construct this type. Internal use only
     */
    constructor(
      key: K,
      groupSubject: Subject<T>,
      refCountSubscription?: RefCountSubscription
    ): this;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _subscribe(subscriber: Subscriber<T>): Subscription;
  }

  declare export interface Operator<T, R> {
    call(subscriber: Subscriber<R>, source: any): TeardownLogic;
  }

  declare export var observable: string | any;

  /**
 * A Subject is a special type of Observable that allows values to be
 * multicasted to many Observables. Subjects are like EventEmitters.

Every Subject is an Observable and an Observer. You can subscribe to a
Subject, and you can call next to feed values as well as error and complete.
 * @class  Subject<T>
*/
  declare export class Subject<T> extends Observable<T>
    implements SubscriptionLike {
    observers: Observer<T>[];
    closed: boolean;
    isStopped: boolean;
    hasError: boolean;
    thrownError: any;
    constructor(): this;

    /**
     *
     * @nocollapse
     */
    static create: Function;
    lift<R>(operator: Operator<T, R>): Observable<R>;
    next(value?: T): void;
    error(err: any): void;
    complete(): void;
    unsubscribe(): void;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _trySubscribe(subscriber: Subscriber<T>): TeardownLogic;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _subscribe(subscriber: Subscriber<T>): Subscription;

    /**
 * Creates a new Observable with this Subject as the source. You can do this
 * to create customize Observer-side logic of the Subject and conceal it from
code that uses the Observable.
 * @return  Observable that the Subject casts to
*/
    asObservable(): Observable<T>;
  }

  /**
   * A variant of Subject that requires an initial value and emits its current
   * value whenever it is subscribed to.
   * @class  BehaviorSubject<T>
   */
  declare export class BehaviorSubject<T> extends Subject<T> {
    constructor(_value: T): this;
    value: T;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _subscribe(subscriber: Subscriber<T>): Subscription;
    getValue(): T;
    next(value: T): void;
  }

  /**
 * A variant of Subject that "replays" or emits old values to new subscribers.
 * It buffers a set number of values and will emit those values immediately to
any new subscribers in addition to emitting new values to existing subscribers.
 * @class  ReplaySubject<T>
*/
  declare export class ReplaySubject<T> extends Subject<T> {
    constructor(
      bufferSize?: number,
      windowTime?: number,
      scheduler?: SchedulerLike
    ): this;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _subscribe(subscriber: Subscriber<T>): Subscription;
    _getNow(): number;
  }

  /**
   * A variant of Subject that only emits a value when it completes. It will emit
   * its latest value to all its observers on completion.
   * @class  AsyncSubject<T>
   */
  declare export class AsyncSubject<T> extends Subject<T> {
    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _subscribe(subscriber: Subscriber<any>): Subscription;
    next(value: T): void;
    error(error: any): void;
    complete(): void;
  }

  declare export var asapScheduler: AsapScheduler;

  declare export var asyncScheduler: AsyncScheduler;

  declare export var queueScheduler: QueueScheduler;

  declare export var animationFrameScheduler: AnimationFrameScheduler;

  declare export class VirtualTimeScheduler extends AsyncScheduler {
    maxFrames: number;
    static frameTimeFactor: number;
    frame: number;
    index: number;
    constructor(SchedulerAction?: typeof AsyncAction, maxFrames?: number): this;

    /**
     * Prompt the Scheduler to execute all of its queued actions, therefore
     * clearing its queue.
     * @return
     */
    flush(): void;
  }

  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @nodoc
   */
  declare export class VirtualAction<T> extends AsyncAction<T> {
    scheduler: VirtualTimeScheduler;
    work: (state?: T) => void;
    index: number;
    active: boolean;
    constructor(
      scheduler: VirtualTimeScheduler,
      work: (state?: T) => void,
      index?: number
    ): this;
    schedule(state?: T, delay?: number): Subscription;
    requestAsyncId(
      scheduler: VirtualTimeScheduler,
      id?: any,
      delay?: number
    ): any;
    recycleAsyncId(
      scheduler: VirtualTimeScheduler,
      id?: any,
      delay?: number
    ): any;
    _execute(state: T, delay: number): any;
    static sortActions<T>(a: VirtualAction<T>, b: VirtualAction<T>): number;
  }

  /**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
`now()` getter method.

Each unit of work in a Scheduler is called an `Action`.

```ts
class Scheduler {
   now(): number;
   schedule(work, delay?, state?): Subscription;
}
```
 * @class  Scheduler
 * @deprecated  Scheduler is an internal implementation detail of RxJS, and
should not be used directly. Rather, create your own class and implement
{
 * @link  SchedulerLike}
*/
  declare export class Scheduler extends SchedulerLike {
    /**
     * Note: the extra arrow function wrapper is to make testing by overriding
     * Date.now easier.
     * @nocollapse
     */
    static now: () => number;
    constructor(SchedulerAction: typeof Action, now?: () => number): this;

    /**
 * A getter method that returns a number representing the current time
 * (at the time this function was called) according to the scheduler's own
internal clock.
 * @return  A number that represents the current time. May or may not
have a relation to wall-clock time. May or may not refer to a time unit
(e.g. milliseconds).
*/
    now: () => number;

    /**
 * Schedules a function, `work`, for execution. May happen at some point in
 * the future, according to the `delay` parameter, if specified. May be passed
some context object, `state`, which will be passed to the `work` function.

The given arguments will be processed an stored as an Action object in a
queue of actions.
 * @param  ): ?Subscription} work A function representing a
task, or some unit of work to be executed by the Scheduler.
 * @param  Time to wait before executing the work, where the
time unit is implicit and defined by the Scheduler itself.
 * @param  Some contextual data that the `work` function uses when
called by the Scheduler.
 * @return  A subscription in order to be able to unsubscribe
the scheduled work.
*/
    schedule<T>(
      work: (state?: T) => void,
      delay?: number,
      state?: T
    ): Subscription;
  }

  /**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
and just disposes the resource held by the subscription.

Additionally, subscriptions may be grouped together through the `add()`
method, which will attach a child Subscription to the current Subscription.
When a Subscription is unsubscribed, all its children (and its grandchildren)
will be unsubscribed as well.
 * @class  Subscription
*/
  declare export class Subscription extends SubscriptionLike {
    /**
     *
     * @nocollapse
     */
    static EMPTY: Subscription;

    /**
     * A flag to indicate whether this Subscription has already been unsubscribed.
     * @type
     */
    closed: boolean;

    /**
     *
     * @internal
     */
    _parent: Subscription;

    /**
     *
     * @internal
     */
    _parents: Subscription[];

    /**
 *
 * @param  A function describing how to
perform the disposal of resources when the `unsubscribe` method is called.
*/
    constructor(unsubscribe?: () => void): this;

    /**
 * Disposes the resources held by the subscription. May, for instance, cancel
 * an ongoing Observable execution or cancel any other type of work that
started when the Subscription was created.
 * @return
*/
    unsubscribe(): void;

    /**
 * Adds a tear down to be called during the unsubscribe() of this
 * Subscription.

If the tear down being added is a subscription that is already
unsubscribed, is the same reference `add` is being called on, or is
`Subscription.EMPTY`, it will not be added.

If this subscription is already in an `closed` state, the passed
tear down logic will be executed immediately.
 * @param  The additional logic to execute on
teardown.
 * @return  Returns the Subscription used or created to be
added to the inner subscriptions list. This Subscription can be used with
`remove()` to remove the passed teardown logic from the inner subscriptions
list.
*/
    add(teardown: TeardownLogic): Subscription;

    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param  The subscription to remove.
     * @return
     */
    remove(subscription: Subscription): void;
  }

  /**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
consuming the values of an {@link Observable}, all Observers get converted to
a Subscriber, in order to provide Subscription-like capabilities such as
`unsubscribe`. Subscriber is a common type in RxJS, and crucial for
implementing operators, but it is rarely used as a public API.
 * @class  Subscriber<T>
*/
  declare export class Subscriber<T> extends Subscription
    implements Observer<T> {
    /**
 * A static factory for a Subscriber, given a (potentially partial) definition
 * of an Observer.
 * @param  ): void} [next] The `next` callback of an Observer.
 * @param  ): void} [error] The `error` callback of an
Observer.
 * @param  The `complete` callback of an
Observer.
 * @return  A Subscriber wrapping the (partially defined)
Observer represented by the given arguments.
 * @nocollapse
*/
    static create<T>(
      next?: (x?: T) => void,
      error?: (e?: any) => void,
      complete?: () => void
    ): Subscriber<T>;

    /**
     *
     * @internal
     */
    syncErrorValue: any;

    /**
     *
     * @internal
     */
    syncErrorThrown: boolean;

    /**
     *
     * @internal
     */
    syncErrorThrowable: boolean;
    isStopped: boolean;
    destination: PartialObserver<any> | Subscriber<any>;

    /**
 *
 * @param  ): void} [destinationOrNext] A partially
defined Observer or a `next` callback function.
 * @param  ): void} [error] The `error` callback of an
Observer.
 * @param  The `complete` callback of an
Observer.
*/
    constructor(
      destinationOrNext?: PartialObserver<any> | ((value: T) => void),
      error?: (e?: any) => void,
      complete?: () => void
    ): this;

    /**
 * The {@link Observer} callback to receive notifications of type `next` from
 * the Observable, with a value. The Observable may call this method 0 or more
times.
 * @param  The `next` value.
 * @return
*/
    next(value?: T): void;

    /**
 * The {@link Observer} callback to receive notifications of type `error` from
 * the Observable, with an attached `Error`. Notifies the Observer that
the Observable has experienced an error condition.
 * @param  The `error` exception.
 * @return
*/
    error(err?: any): void;

    /**
 * The {@link Observer} callback to receive a valueless notification of type
 * `complete` from the Observable. Notifies the Observer that the Observable
has finished sending push-based notifications.
 * @return
*/
    complete(): void;
    unsubscribe(): void;
    _next(value: T): void;
    _error(err: any): void;
    _complete(): void;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _unsubscribeAndRecycle(): Subscriber<T>;
  }

  /**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
others. Besides wrapping the actual delivered value, it also annotates it
with metadata of, for instance, what type of push message it is (`next`,
`error`, or `complete`).
 * @see  {
 * @link  materialize}
 * @see  {
 * @link  dematerialize}
 * @see  {
 * @link  observeOn}
 * @class  Notification<T>
*/
  declare export class Notification<T> {
    kind: string;
    value: T;
    error: any;
    hasValue: boolean;
    constructor(kind: string, value?: T, error?: any): this;

    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param
     * @return
     */
    observe(observer: PartialObserver<T>): any;

    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param  ): void} next An Observer `next` callback.
     * @param  ): void} [error] An Observer `error` callback.
     * @param  An Observer `complete` callback.
     * @return
     */
    do(
      next: (value: T) => void,
      error?: (err: any) => void,
      complete?: () => void
    ): any;

    /**
 * Takes an Observer or its individual callback functions, and calls `observe`
 * or `do` methods accordingly.
 * @param  ): void} nextOrObserver An Observer or
the `next` callback.
 * @param  ): void} [error] An Observer `error` callback.
 * @param  An Observer `complete` callback.
 * @return
*/
    accept(
      nextOrObserver: PartialObserver<T> | ((value: T) => void),
      error?: (err: any) => void,
      complete?: () => void
    ): any;

    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return
     */
    toObservable(): Observable<T>;

    /**
 * A shortcut to create a Notification instance of the type `next` from a
 * given value.
 * @param  The `next` value.
 * @return  The "next" Notification representing the
argument.
 * @nocollapse
*/
    static createNext<T>(value: T): Notification<T>;

    /**
 * A shortcut to create a Notification instance of the type `error` from a
 * given error.
 * @param  The `error` error.
 * @return  The "error" Notification representing the
argument.
 * @nocollapse
*/
    static createError<T>(err?: any): Notification<T>;

    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return  The valueless "complete" Notification.
     * @nocollapse
     */
    static createComplete(): Notification<any>;
  }

  declare export function pipe<T>(): UnaryFunction<T, T>;

  declare export function noop(): void;

  declare export function identity<T>(x: T): T;

  /**
   * Tests to see if the object is an RxJS {@link Observable}
   * @param obj the object to test
   */
  declare export function isObservable<T>(obj: any): Observable;

  declare export interface ArgumentOutOfRangeError extends Error {}

  declare export interface EmptyError extends Error {}

  declare export interface ObjectUnsubscribedError extends Error {}

  declare export interface UnsubscriptionError extends Error {
    errors: any[];
  }

  declare export interface TimeoutError extends Error {}

  /**
   *
   * @deprecated  resultSelector is no longer supported, use a mapping function.
   */
  declare export function bindCallback(
    callbackFunc: Function,
    resultSelector: Function,
    scheduler?: SchedulerLike
  ): (...args: any[]) => Observable<any>;

  /**
   *
   * @deprecated  resultSelector is deprecated, pipe to map instead
   */
  declare export function bindNodeCallback(
    callbackFunc: Function,
    resultSelector: Function,
    scheduler?: SchedulerLike
  ): (...args: any[]) => Observable<any>;

  /**
   *
   * @deprecated  resultSelector no longer supported, pipe to map instead
   */
  declare export function combineLatest<T, R>(
    v1: ObservableInput<T>,
    resultSelector: (v1: T) => R,
    scheduler?: SchedulerLike
  ): Observable<R>;

  declare export function concat<T>(
    v1: ObservableInput<T>,
    scheduler?: SchedulerLike
  ): Observable<T>;

  /**
 * Creates an Observable that, on subscribe, calls an Observable factory to
 * make an Observable for each new Observer.

<span class="informal">Creates the Observable lazily, that is, only when it
is subscribed.
</span>

![](defer.png)

`defer` allows you to create the Observable only when the Observer
subscribes, and create a fresh Observable for each Observer. It waits until
an Observer subscribes to it, and then it generates an Observable,
typically with an Observable factory function. It does this afresh for each
subscriber, so although each subscriber may think it is subscribing to the
same Observable, in fact each subscriber gets its own individual
Observable.

## Example
### Subscribe to either an Observable of clicks or an Observable of interval, at random
```javascript
const clicksOrInterval = defer(function () {
   return Math.random() > 0.5
     ? fromEvent(document, 'click')
     : interval(1000);
});
clicksOrInterval.subscribe(x => console.log(x));

// Results in the following behavior:
// If the result of Math.random() is greater than 0.5 it will listen
// for clicks anywhere on the "document"; when document is clicked it
// will log a MouseEvent object to the console. If the result is less
// than 0.5 it will emit ascending numbers, one every second(1000ms).
```
 * @see  {
 * @link  Observable}
 * @param  The Observable
factory function to invoke for each Observer that subscribes to the output
Observable. May also return a Promise, which will be converted on the fly
to an Observable.
 * @return  An Observable whose Observers' subscriptions trigger
an invocation of the given Observable factory function.
 * @static  true
 * @name  defer
 * @owner  Observable
*/
  declare export function defer<T>(
    observableFactory: () => SubscribableOrPromise<T> | void
  ): Observable<T>;

  /**
 * Creates an Observable that emits no items to the Observer and immediately
 * emits a complete notification.

<span class="informal">Just emits 'complete', and nothing else.
</span>

![](empty.png)

This static operator is useful for creating a simple Observable that only
emits the complete notification. It can be used for composing with other
Observables, such as in a {@link mergeMap}.

## Examples
### Emit the number 7, then complete
```javascript
const result = empty().pipe(startWith(7));
result.subscribe(x => console.log(x));
```

### Map and flatten only odd numbers to the sequence 'a', 'b', 'c'
```javascript
const interval$ = interval(1000);
result = interval$.pipe(
   mergeMap(x => x % 2 === 1 ? of('a', 'b', 'c') : empty()),
);
result.subscribe(x => console.log(x));

// Results in the following to the console:
// x is equal to the count on the interval eg(0,1,2,3,...)
// x will occur every 1000ms
// if x % 2 is equal to 1 print abc
// if x % 2 is not equal to 1 nothing will be output
```
 * @see  {
 * @link  Observable}
 * @see  {
 * @link  never}
 * @see  {
 * @link  of}
 * @see  {
 * @link  throwError}
 * @param  A {
 * @link  SchedulerLike} to use for scheduling
the emission of the complete notification.
 * @return  An "empty" Observable: emits only the complete
notification.
 * @static  true
 * @name  empty
 * @owner  Observable
 * @deprecated  Deprecated in favor of using {
 * @link  index/EMPTY} constant.
*/
  declare export function empty(
    scheduler?: SchedulerLike
  ): Observable<"NO PRINT IMPLEMENTED: NeverKeyword">;

  declare export function forkJoin<T>(
    sources: [ObservableInput<T>]
  ): Observable<T[]>;

  declare export function from<T>(
    input: ObservableInput<T>,
    scheduler?: SchedulerLike
  ): Observable<T>;

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

  declare export function fromEvent<T>(
    target: FromEventTarget<T>,
    eventName: string
  ): Observable<T>;

  declare export function fromEventPattern<T>(
    addHandler: (handler: Function) => any,
    removeHandler?: (handler: Function, signal?: any) => void
  ): Observable<T>;

  declare type ConditionFunc<S> = (state: S) => boolean;
  declare type IterateFunc<S> = (state: S) => S;
  declare type ResultFunc<S, T> = (state: S) => T;
  declare interface GenerateBaseOptions<S> {
    /**
     * Initial state.
     */
    initialState: S;

    /**
 * Condition function that accepts state and returns boolean.
 * When it returns false, the generator stops.
If not specified, a generator never stops.
*/
    condition?: ConditionFunc<S>;

    /**
     * Iterate function that accepts state and returns new state.
     */
    iterate: IterateFunc<S>;

    /**
     * SchedulerLike to use for generation process.
     * By default, a generator starts immediately.
     */
    scheduler?: SchedulerLike;
  }
  declare interface GenerateOptions<T, S> extends GenerateBaseOptions<S> {
    /**
     * Result selection function that accepts state and returns a value to emit.
     */
    resultSelector: ResultFunc<S, T>;
  }

  /**
 * Generates an observable sequence by running a state-driven loop
 * producing the sequence's elements, using the specified scheduler
to send out observer messages.

![](generate.png)
 * @example  <caption>Produces sequence of 0, 1, 2, ... 9, then completes.</caption>
const res = generate(0, x => x < 10, x => x + 1, x => x);
 * @example  <caption>Using asap scheduler, produces sequence of 2, 3, 5, then completes.</caption>
const res = generate(1, x => x < 5, x =>  * 2, x => x + 1, asap);
 * @see  {
 * @link  from}
 * @see  {
 * @link  Observable}
 * @param  Initial state.
 * @param  ): boolean} condition Condition to terminate generation (upon returning false).
 * @param  ): S} iterate Iteration step function.
 * @param  ): T} resultSelector Selector function for results produced in the sequence. (deprecated)
 * @param  A {
 * @link  SchedulerLike} on which to run the generator loop. If not provided, defaults to emit immediately.
 * @returns  The generated sequence.
*/
  declare export function generate<T, S>(
    initialState: S,
    condition: ConditionFunc<S>,
    iterate: IterateFunc<S>,
    resultSelector: ResultFunc<S, T>,
    scheduler?: SchedulerLike
  ): Observable<T>;

  /**
 * Decides at subscription time which Observable will actually be subscribed.
 *
<span class="informal">`If` statement for Observables.</span>

`iif` accepts a condition function and two Observables. When
an Observable returned by the operator is subscribed, condition function will be called.
Based on what boolean it returns at that moment, consumer will subscribe either to
the first Observable (if condition was true) or to the second (if condition was false). Condition
function may also not return anything - in that case condition will be evaluated as false and
second Observable will be subscribed.

Note that Observables for both cases (true and false) are optional. If condition points to an Observable that
was left undefined, resulting stream will simply complete immediately. That allows you to, rather
then controlling which Observable will be subscribed, decide at runtime if consumer should have access
to given Observable or not.

If you have more complex logic that requires decision between more than two Observables, {@link defer}
will probably be a better choice. Actually `iif` can be easily implemented with {@link defer}
and exists only for convenience and readability reasons.


## Examples
### Change at runtime which Observable will be subscribed
```javascript
let subscribeToFirst;
const firstOrSecond = iif(
   () => subscribeToFirst,
   of('first'),
   of('second'),
);

subscribeToFirst = true;
firstOrSecond.subscribe(value => console.log(value));

// Logs:
// "first"

subscribeToFirst = false;
firstOrSecond.subscribe(value => console.log(value));

// Logs:
// "second"

```

### Control an access to an Observable
```javascript
let accessGranted;
const observableIfYouHaveAccess = iif(
   () => accessGranted,
   of('It seems you have an access...'), // Note that only one Observable is passed to the operator.
);

accessGranted = true;
observableIfYouHaveAccess.subscribe(
   value => console.log(value),
   err => {},
   () => console.log('The end'),
);

// Logs:
// "It seems you have an access..."
// "The end"

accessGranted = false;
observableIfYouHaveAccess.subscribe(
   value => console.log(value),
   err => {},
   () => console.log('The end'),
);

// Logs:
// "The end"
```
 * @see  {
 * @link  defer}
 * @param  Condition which Observable should be chosen.
 * @param  An Observable that will be subscribed if condition is true.
 * @param  An Observable that will be subscribed if condition is false.
 * @return  Either first or second Observable, depending on condition.
 * @static  true
 * @name  iif
 * @owner  Observable
*/
  declare export function iif<T, F>(
    condition: () => boolean,
    trueResult?: SubscribableOrPromise<T>,
    falseResult?: SubscribableOrPromise<F>
  ): Observable<T | F>;

  /**
 * Creates an Observable that emits sequential numbers every specified
 * interval of time, on a specified {@link SchedulerLike}.

<span class="informal">Emits incremental numbers periodically in time.
</span>

![](interval.png)

`interval` returns an Observable that emits an infinite sequence of
ascending integers, with a constant interval of time of your choosing
between those emissions. The first emission is not sent immediately, but
only after the first period has passed. By default, this operator uses the
`async` {@link SchedulerLike} to provide a notion of time, but you may pass any
{@link SchedulerLike} to it.

## Example
Emits ascending numbers, one every second (1000ms) up to the number 3
```javascript
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const numbers = interval(1000);

const takeFourNumbers = numbers.pipe(take(4));

takeFourNumbers.subscribe(x => console.log('Next: ', x));

// Logs:
// Next: 0
// Next: 1
// Next: 2
// Next: 3
```
 * @see  {
 * @link  timer}
 * @see  {
 * @link  delay}
 * @param  The interval size in milliseconds (by default)
or the time unit determined by the scheduler's clock.
 * @param  The {
 * @link  SchedulerLike} to use for scheduling
the emission of values, and providing a notion of "time".
 * @return  An Observable that emits a sequential number each time
interval.
 * @static  true
 * @name  interval
 * @owner  Observable
*/
  declare export function interval(
    period?: number,
    scheduler?: SchedulerLike
  ): Observable<number>;

  declare export function merge<T>(
    v1: ObservableInput<T>,
    scheduler?: SchedulerLike
  ): Observable<T>;

  /**
   *
   * @deprecated  Deprecated in favor of using {
   * @link  NEVER} constant.
   */
  declare export function never(): Observable<
    "NO PRINT IMPLEMENTED: NeverKeyword"
  >;

  declare export function of<T>(a: T, scheduler?: SchedulerLike): Observable<T>;

  declare export function onErrorResumeNext<R>(
    v: ObservableInput<R>
  ): Observable<R>;

  /**
 * Convert an object into an Observable of `[key, value]` pairs.
 *
<span class="informal">Turn entries of an object into a stream.</span>

<img src="./img/pairs.png" width="100%">

`pairs` takes an arbitrary object and returns an Observable that emits arrays. Each
emitted array has exactly two elements - the first is a key from the object
and the second is a value corresponding to that key. Keys are extracted from
an object via `Object.keys` function, which means that they will be only
enumerable keys that are present on an object directly - not ones inherited
via prototype chain.

By default these arrays are emitted synchronously. To change that you can
pass a {@link SchedulerLike} as a second argument to `pairs`.
 * @example  <caption>Converts a javascript object to an Observable</caption>
```javascript
const obj = {
foo: 42,
bar: 56,
baz: 78
};

pairs(obj)
.subscribe(
value => console.log(value),
err => {},
() => console.log('the end!')
);

// Logs:
// ["foo": 42],
// ["bar": 56],
// ["baz": 78],
// "the end!"
```
 * @param  The object to inspect and turn into an
Observable sequence.
 * @param  An optional IScheduler to schedule
when resulting Observable will emit values.
 * @returns  >>)} An observable sequence of
[key, value] pairs from the object.
*/
  declare export function pairs<T>(
    obj: Object,
    scheduler?: SchedulerLike
  ): Observable<[string, T]>;

  /**
 * Returns an Observable that mirrors the first source Observable to emit an item.
 *
## Example
### Subscribes to the observable that was the first to start emitting.

```javascript
const obs1 = interval(1000).pipe(mapTo('fast one'));
const obs2 = interval(3000).pipe(mapTo('medium one'));
const obs3 = interval(5000).pipe(mapTo('slow one'));

race(obs3, obs1, obs2)
.subscribe(
   winner => console.log(winner)
);

// result:
// a series of 'fast one'
```
 * @param  ...observables sources used to race for which Observable emits first.
 * @return  an Observable that mirrors the output of the first Observable to emit an item.
 * @static  true
 * @name  race
 * @owner  Observable
*/
  declare export function race<T>(
    observables: Array<Observable<T>>
  ): Observable<T>;

  /**
 * Creates an Observable that emits a sequence of numbers within a specified
 * range.

<span class="informal">Emits a sequence of numbers in a range.</span>

![](range.png)

`range` operator emits a range of sequential integers, in order, where you
select the `start` of the range and its `length`. By default, uses no
{@link SchedulerLike} and just delivers the notifications synchronously, but may use
an optional {@link SchedulerLike} to regulate those deliveries.

## Example
Emits the numbers 1 to 10</caption>
```javascript
const numbers = range(1, 10);
numbers.subscribe(x => console.log(x));
```
 * @see  {
 * @link  timer}
 * @see  {
 * @link  index/interval}
 * @param  The value of the first integer in the sequence.
 * @param  The number of sequential integers to generate.
 * @param  A {
 * @link  SchedulerLike} to use for scheduling
the emissions of the notifications.
 * @return  An Observable of numbers that emits a finite range of
sequential integers.
 * @static  true
 * @name  range
 * @owner  Observable
*/
  declare export function range(
    start?: number,
    count?: number,
    scheduler?: SchedulerLike
  ): Observable<number>;

  /**
 * Creates an Observable that emits no items to the Observer and immediately
 * emits an error notification.

<span class="informal">Just emits 'error', and nothing else.
</span>

![](throw.png)

This static operator is useful for creating a simple Observable that only
emits the error notification. It can be used for composing with other
Observables, such as in a {@link mergeMap}.

## Examples
### Emit the number 7, then emit an error
```javascript
import { throwError, concat, of } from 'rxjs';

const result = concat(of(7), throwError(new Error('oops!')));
result.subscribe(x => console.log(x), e => console.error(e));

// Logs:
// 7
// Error: oops!
```

---

### Map and flatten numbers to the sequence 'a', 'b', 'c', but throw an error for 13
```javascript
import { throwError, interval, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

interval(1000).pipe(
   mergeMap(x => x === 2
     ? throwError('Twos are bad')
     : of('a', 'b', 'c')
   ),
).subscribe(x => console.log(x), e => console.error(e));

// Logs:
// a
// b
// c
// a
// b
// c
// Twos are bad
```
 * @see  {
 * @link  Observable}
 * @see  {
 * @link  empty}
 * @see  {
 * @link  never}
 * @see  {
 * @link  of}
 * @param  The particular Error to pass to the error notification.
 * @param  A {
 * @link  SchedulerLike} to use for scheduling
the emission of the error notification.
 * @return  An error Observable: emits only the error notification
using the given error argument.
 * @static  true
 * @name  throwError
 * @owner  Observable
*/
  declare export function throwError(
    error: any,
    scheduler?: SchedulerLike
  ): Observable<"NO PRINT IMPLEMENTED: NeverKeyword">;

  /**
 * Creates an Observable that starts emitting after an `dueTime` and
 * emits ever increasing numbers after each `period` of time thereafter.

<span class="informal">Its like {@link index/interval}, but you can specify when
should the emissions start.</span>

![](timer.png)

`timer` returns an Observable that emits an infinite sequence of ascending
integers, with a constant interval of time, `period` of your choosing
between those emissions. The first emission happens after the specified
`dueTime`. The initial delay may be a `Date`. By default, this
operator uses the {@link asyncScheduler} {@link SchedulerLike} to provide a notion of time, but you
may pass any {@link SchedulerLike} to it. If `period` is not specified, the output
Observable emits only one value, `0`. Otherwise, it emits an infinite
sequence.

## Examples
### Emits ascending numbers, one every second (1000ms), starting after 3 seconds
```javascript
const numbers = timer(3000, 1000);
numbers.subscribe(x => console.log(x));
```

### Emits one number after five seconds
```javascript
const numbers = timer(5000);
numbers.subscribe(x => console.log(x));
```
 * @see  {
 * @link  index/interval}
 * @see  {
 * @link  delay}
 * @param  The initial delay time specified as a Date object or as an integer denoting
milliseconds to wait before emitting the first value of 0`.
 * @param  The period of time between emissions of the
subsequent numbers.
 * @param  The {
 * @link  SchedulerLike} to use for scheduling
the emission of values, and providing a notion of "time".
 * @return  An Observable that emits a `0` after the
`dueTime` and ever increasing numbers after each `period` of time
thereafter.
 * @static  true
 * @name  timer
 * @owner  Observable
*/
  declare export function timer(
    dueTime?: number | Date,
    periodOrScheduler?: number | SchedulerLike,
    scheduler?: SchedulerLike
  ): Observable<number>;

  /**
 * Creates an Observable that uses a resource which will be disposed at the same time as the Observable.
 *
<span class="informal">Use it when you catch yourself cleaning up after an Observable.</span>

`using` is a factory operator, which accepts two functions. First function returns a disposable resource.
It can be an arbitrary object that implements `unsubscribe` method. Second function will be injected with
that object and should return an Observable. That Observable can use resource object during its execution.
Both functions passed to `using` will be called every time someone subscribes - neither an Observable nor
resource object will be shared in any way between subscriptions.

When Observable returned by `using` is subscribed, Observable returned from the second function will be subscribed
as well. All its notifications (nexted values, completion and error events) will be emitted unchanged by the output
Observable. If however someone unsubscribes from the Observable or source Observable completes or errors by itself,
the `unsubscribe` method on resource object will be called. This can be used to do any necessary clean up, which
otherwise would have to be handled by hand. Note that complete or error notifications are not emitted when someone
cancels subscription to an Observable via `unsubscribe`, so `using` can be used as a hook, allowing you to make
sure that all resources which need to exist during an Observable execution will be disposed at appropriate time.
 * @see  {
 * @link  defer}
 * @param  A function which creates any resource object
that implements `unsubscribe` method.
 * @param  ): Observable<T>} observableFactory A function which
creates an Observable, that can use injected resource object.
 * @return  An Observable that behaves the same as Observable returned by `observableFactory`, but
which - when completed, errored or unsubscribed - will also call `unsubscribe` on created resource object.
*/
  declare export function using<T>(
    resourceFactory: () => Unsubscribable | void,
    observableFactory: (
      resource: Unsubscribable | void
    ) => ObservableInput<T> | void
  ): Observable<T>;

  /**
   *
   * @deprecated  resultSelector is no longer supported, pipe to map instead
   */
  declare export function zip<T, R>(
    v1: ObservableInput<T>,
    resultSelector: (v1: T) => R
  ): Observable<R>;

  /**
   * OPERATOR INTERFACES
   */
  declare export interface UnaryFunction<T, R> {
    (source: T): R;
  }
  declare export interface OperatorFunction<T, R>
    extends UnaryFunction<Observable<T>, Observable<R>> {}
  declare export type FactoryOrValue<T> = T | (() => T);
  declare export interface MonoTypeOperatorFunction<T>
    extends OperatorFunction<T, T> {}
  declare export interface Timestamp<T> {
    value: T;
    timestamp: number;
  }
  declare export interface TimeInterval<T> {
    value: T;
    interval: number;
  }
  /** SUBSCRIPTION INTERFACES */
  declare export interface Unsubscribable {
    unsubscribe(): void;
  }
  declare export type TeardownLogic = Unsubscribable | Function | void;
  declare export interface SubscriptionLike extends Unsubscribable {
    unsubscribe(): void;
    closed: boolean;
  }
  declare export type SubscribableOrPromise<T> =
    | Subscribable<T>
    | Subscribable<"NO PRINT IMPLEMENTED: NeverKeyword">
    | Promise<T>
    | InteropObservable<T>;

  /** OBSERVABLE INTERFACES */
  declare export interface Subscribable<T> {
    subscribe(observer?: PartialObserver<T>): Unsubscribable;
    subscribe(
      next?: (value: T) => void,
      error?: (error: any) => void,
      complete?: () => void
    ): Unsubscribable;
  }
  declare export type ObservableInput<T> =
    | SubscribableOrPromise<T>
    | Array<T>
    | Iterable<T>;

  /** @deprecated use {@link InteropObservable } */
  declare export type ObservableLike<T> = InteropObservable<T>;
  declare export type InteropObservable<T> = {
    [any]: () => Subscribable<T>
  };
  /** OBSERVER INTERFACES */
  declare export interface NextObserver<T> {
    closed?: boolean;
    next: (value: T) => void;
    error?: (err: any) => void;
    complete?: () => void;
  }
  declare export interface ErrorObserver<T> {
    closed?: boolean;
    next?: (value: T) => void;
    error: (err: any) => void;
    complete?: () => void;
  }
  declare export interface CompletionObserver<T> {
    closed?: boolean;
    next?: (value: T) => void;
    error?: (err: any) => void;
    complete: () => void;
  }
  declare export type PartialObserver<T> =
    | NextObserver<T>
    | ErrorObserver<T>
    | CompletionObserver<T>;
  declare export interface Observer<T> {
    closed?: boolean;
    next: (value: T) => void;
    error: (err: any) => void;
    complete: () => void;
  }
  /** SCHEDULER INTERFACES */
  declare export interface SchedulerLike {
    now(): number;
    schedule<T>(
      work: (state?: T) => void,
      delay?: number,
      state?: T
    ): Subscription;
  }
  declare export interface SchedulerAction<T> extends Subscription {
    schedule(state?: T, delay?: number): Subscription;
  }

  declare export var config: {
    /**
     * The promise constructor used by default for methods such as
     * {@link toPromise} and {@link forEach}
     */
    Promise: Promise.constructor,

    /**
 * If true, turns on synchronous error rethrowing, which is a deprecated behavior
 * in v6 and higher. This behavior enables bad patterns like wrapping a subscribe
call in a try/catch block. It also enables producer interference, a nasty bug
where a multicast can be broken for all observers by a downstream consumer with
an unhandled error. DO NOT USE THIS FLAG UNLESS IT'S NEEDED TO BY TIME
FOR MIGRATION REASONS.
*/
    useDeprecatedSynchronousErrorHandling: boolean
  };

  declare class AsapScheduler extends AsyncScheduler {
    flush(action?: AsyncAction<any>): void;
  }

  declare class AsyncScheduler extends Scheduler {
    static delegate: Scheduler;
    actions: Array<AsyncAction<any>>;

    /**
     * A flag to indicate whether the Scheduler is currently executing a batch of
     * queued actions.
     * @type
     * @deprecated  internal use only
     */
    active: boolean;

    /**
 * An internal ID used to track the latest asynchronous task such as those
 * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
others.
 * @type
 * @deprecated  internal use only
*/
    scheduled: any;
    constructor(SchedulerAction: typeof Action, now?: () => number): this;
    schedule<T>(
      work: (state?: T) => void,
      delay?: number,
      state?: T
    ): Subscription;
    flush(action: AsyncAction<any>): void;
  }

  declare class QueueScheduler extends AsyncScheduler {}

  declare class AnimationFrameScheduler extends AsyncScheduler {
    flush(action?: AsyncAction<any>): void;
  }

  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare class AsyncAction<T> extends Action<T> {
    scheduler: AsyncScheduler;
    work: (state?: T) => void;
    id: any;
    state: T;
    delay: number;
    pending: boolean;
    constructor(scheduler: AsyncScheduler, work: (state?: T) => void): this;
    schedule(state?: T, delay?: number): Subscription;
    requestAsyncId(scheduler: AsyncScheduler, id?: any, delay?: number): any;
    recycleAsyncId(scheduler: AsyncScheduler, id: any, delay?: number): any;

    /**
     * Immediately executes this action and the `work` it contains.
     * @return
     */
    execute(state: T, delay: number): any;
    _execute(state: T, delay: number): any;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _unsubscribe(): void;
  }

  /**
 * A unit of work to be executed in a `scheduler`. An action is typically
 * created from within a {@link SchedulerLike} and an RxJS user does not need to concern
themselves about creating and manipulating an Action.

```ts
class Action<T> extends Subscription {
   new (scheduler: Scheduler, work: (state?: T) => void);
   schedule(state?: T, delay: number = 0): Subscription;
}
```
 * @class  Action<T>
*/
  declare class Action<T> extends Subscription {
    constructor(scheduler: Scheduler, work: (state?: T) => void): this;

    /**
 * Schedules this action on its parent {@link SchedulerLike} for execution. May be passed
 * some context object, `state`. May happen at some point in the future,
according to the `delay` parameter, if specified.
 * @param  Some contextual data that the `work` function uses when
called by the Scheduler.
 * @param  Time to wait before executing the work, where the
time unit is implicit and defined by the Scheduler.
 * @return
*/
    schedule(state?: T, delay?: number): Subscription;
  }
}
