declare module "rxjs/testing" {
}
declare module "rxjs/testing/internal/testing/TestScheduler" {
  declare export interface RunHelpers {
    cold: typeof undefined;
    hot: typeof undefined;
    flush: typeof undefined;
    expectObservable: typeof undefined;
    expectSubscriptions: typeof undefined;
  }
  declare export type observableToBeFn = (
    marbles: string,
    values?: any,
    errorValue?: any
  ) => void;
  declare export type subscriptionLogsToBeFn = (
    marbles: string | string[]
  ) => void;
  declare export class TestScheduler mixins VirtualTimeScheduler {
    assertDeepEqual: (actual: any, expected: any) => boolean | void;
    hotObservables: HotObservable<any>[];
    coldObservables: ColdObservable<any>[];
    constructor(
      assertDeepEqual: (actual: any, expected: any) => boolean | void
    ): this;
    createTime(marbles: string): number;

    /**
     *
     * @param marbles A diagram in the marble DSL. Letters map to keys in `values` if provided.
     * @param values Values to use for the letters in `marbles`. If ommitted, the letters themselves are used.
     * @param error The error to use for the `#` marble (if present).
     */
    createColdObservable<T>(
      marbles: string,
      values?: {
        [marble: string]: T
      },
      error?: any
    ): ColdObservable<T>;

    /**
     *
     * @param marbles A diagram in the marble DSL. Letters map to keys in `values` if provided.
     * @param values Values to use for the letters in `marbles`. If ommitted, the letters themselves are used.
     * @param error The error to use for the `#` marble (if present).
     */
    createHotObservable<T>(
      marbles: string,
      values?: {
        [marble: string]: T
      },
      error?: any
    ): HotObservable<T>;
    expectObservable(
      observable: Observable<any>,
      subscriptionMarbles?: string
    ): {
      toBe: observableToBeFn
    };
    expectSubscriptions(
      actualSubscriptionLogs: SubscriptionLog[]
    ): {
      toBe: subscriptionLogsToBeFn
    };
    flush(): void;

    /**
     *
     * @nocollapse
     */
    static parseMarblesAsSubscriptions(
      marbles: string,
      runMode?: boolean
    ): SubscriptionLog;

    /**
     *
     * @nocollapse
     */
    static parseMarbles(
      marbles: string,
      values?: any,
      errorValue?: any,
      materializeInnerObservables?: boolean,
      runMode?: boolean
    ): TestMessage[];
    run<T>(callback: (helpers: RunHelpers) => T): T;
  }
}
declare module "rxjs/testing/internal/Observable" {
  /**
   * A representation of any set of values over any amount of time. This is the most basic building block
   * of RxJS.
   * @class  Observable<T>
   */
  declare export class Observable<T> mixins Subscribable<T> {
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
      promiseCtor?: PromiseConstructorLike
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
    toPromise<T>(PromiseCtor: PromiseConstructorLike): Promise<T>;
  }
}
declare module "rxjs/testing/internal/testing/ColdObservable" {
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class ColdObservable<T>
    mixins Observable<T>, SubscriptionLoggable {
    messages: TestMessage[];
    subscriptions: SubscriptionLog[];
    scheduler: Scheduler;
    logSubscribedFrame: () => number;
    logUnsubscribedFrame: (index: number) => void;
    constructor(messages: TestMessage[], scheduler: Scheduler): this;
    scheduleMessages(subscriber: Subscriber<any>): void;
  }
}
declare module "rxjs/testing/internal/testing/HotObservable" {
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class HotObservable<T>
    mixins Subject<T>, SubscriptionLoggable {
    messages: TestMessage[];
    subscriptions: SubscriptionLog[];
    scheduler: Scheduler;
    logSubscribedFrame: () => number;
    logUnsubscribedFrame: (index: number) => void;
    constructor(messages: TestMessage[], scheduler: Scheduler): this;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _subscribe(subscriber: Subscriber<any>): Subscription;
    setup(): void;
  }
}
declare module "rxjs/testing/internal/testing/TestMessage" {
  declare export interface TestMessage {
    frame: number;
    notification: Notification<any>;
    isGhost?: boolean;
  }
}
declare module "rxjs/testing/internal/testing/SubscriptionLog" {
  declare export class SubscriptionLog {
    subscribedFrame: number;
    unsubscribedFrame: number;
    constructor(subscribedFrame: number, unsubscribedFrame?: number): this;
  }
}
declare module "rxjs/testing/internal/scheduler/VirtualTimeScheduler" {
  declare export class VirtualTimeScheduler mixins AsyncScheduler {
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
  declare export class VirtualAction<T> mixins AsyncAction<T> {
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
}
declare module "rxjs/testing/internal/Operator" {
  declare export interface Operator<T, R> {
    call(subscriber: Subscriber<R>, source: any): TeardownLogic;
  }
}
declare module "rxjs/testing/internal/Subscriber" {
  /**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
consuming the values of an {@link Observable}, all Observers get converted to
a Subscriber, in order to provide Subscription-like capabilities such as
`unsubscribe`. Subscriber is a common type in RxJS, and crucial for
implementing operators, but it is rarely used as a public API.
 * @class  Subscriber<T>
*/
  declare export class Subscriber<T> mixins Subscription, Observer<T> {
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
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class SafeSubscriber<T> mixins Subscriber<T> {
    constructor(
      _parentSubscriber: Subscriber<T>,
      observerOrNext?: PartialObserver<T> | ((value: T) => void),
      error?: (e?: any) => void,
      complete?: () => void
    ): this;
    next(value?: T): void;
    error(err?: any): void;
    complete(): void;

    /**
     *
     * @internal  This is an internal implementation detail, do not use.
     */
    _unsubscribe(): void;
  }
}
declare module "rxjs/testing/internal/Subscription" {
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
  declare export class Subscription mixins SubscriptionLike {
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
}
declare module "rxjs/testing/internal/types" {
  /**
   * OPERATOR INTERFACES
   */
  declare export interface UnaryFunction<T, R> {
    (source: T): R;
  }
  declare export type OperatorFunction<T, R> = {} & UnaryFunction;

  declare export type FactoryOrValue<T> = T | (() => T);
  declare export type MonoTypeOperatorFunction<T> = {} & OperatorFunction;

  declare export interface Timestamp<T> {
    value: T;
    timestamp: number;
  }
  declare export interface TimeInterval<T> {
    value: T;
    interval: number;
  }

  /**
   * SUBSCRIPTION INTERFACES
   */
  declare export interface Unsubscribable {
    unsubscribe(): void;
  }
  declare export type TeardownLogic = Unsubscribable | Function | void;
  declare export type SubscriptionLike = {
    unsubscribe(): void,
    closed: boolean
  } & Unsubscribable;

  declare export type SubscribableOrPromise<T> =
    | Subscribable<T>
    | Subscribable<"NO PRINT IMPLEMENTED: NeverKeyword">
    | PromiseLike<T>
    | InteropObservable<T>;

  /**
   * OBSERVABLE INTERFACES
   */
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
    | ArrayLike<T>
    | Iterable<T>;

  /**
   *
   * @deprecated  use {
   * @link  InteropObservable }
   */
  declare export type ObservableLike<T> = InteropObservable<T>;
  declare export type InteropObservable<T> = {
    undefined: () => Subscribable<T>
  };

  /**
   * OBSERVER INTERFACES
   */
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

  /**
   * SCHEDULER INTERFACES
   */
  declare export interface SchedulerLike {
    now(): number;
    schedule<T>(
      work: (state?: T) => void,
      delay?: number,
      state?: T
    ): Subscription;
  }
  declare export type SchedulerAction<T> = {
    schedule(state?: T, delay?: number): Subscription
  } & Subscription;
}
declare module "rxjs/testing/internal/observable/iif" {
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
}
declare module "rxjs/testing/internal/observable/throwError" {
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
}
declare module "rxjs/testing/internal/Scheduler" {
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
  declare export class Scheduler mixins SchedulerLike {
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
}
declare module "rxjs/testing/internal/testing/SubscriptionLoggable" {
  declare export class SubscriptionLoggable {
    subscriptions: SubscriptionLog[];
    scheduler: Scheduler;
    logSubscribedFrame(): number;
    logUnsubscribedFrame(index: number): void;
  }
}
declare module "rxjs/testing/internal/Subject" {
  /**
   *
   * @class  SubjectSubscriber<T>
   */
  declare export class SubjectSubscriber<T> mixins Subscriber<T> {
    destination: Subject<T>;
    constructor(destination: Subject<T>): this;
  }

  /**
 * A Subject is a special type of Observable that allows values to be
 * multicasted to many Observables. Subjects are like EventEmitters.

Every Subject is an Observable and an Observer. You can subscribe to a
Subject, and you can call next to feed values as well as error and complete.
 * @class  Subject<T>
*/
  declare export class Subject<T> mixins Observable<T>, SubscriptionLike {
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
   *
   * @class  AnonymousSubject<T>
   */
  declare export class AnonymousSubject<T> mixins Subject<T> {
    destination: Observer<T>;
    constructor(destination?: Observer<T>, source?: Observable<T>): this;
    next(value: T): void;
    error(err: any): void;
    complete(): void;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _subscribe(subscriber: Subscriber<T>): Subscription;
  }
}
declare module "rxjs/testing/internal/Notification" {
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
}
declare module "rxjs/testing/internal/scheduler/AsyncAction" {
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class AsyncAction<T> mixins Action<T> {
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
}
declare module "rxjs/testing/internal/scheduler/AsyncScheduler" {
  declare export class AsyncScheduler mixins Scheduler {
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
}
declare module "rxjs/testing/internal/scheduler/Action" {
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
  declare export class Action<T> mixins Subscription {
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
