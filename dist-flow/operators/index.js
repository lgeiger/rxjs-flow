declare module "rxjs/operators" {
}
declare module "rxjs/operators/internal/operators/audit" {
  /**
 * Ignores source values for a duration determined by another Observable, then
 * emits the most recent value from the source Observable, then repeats this
process.

<span class="informal">It's like {@link auditTime}, but the silencing
duration is determined by a second Observable.</span>

![](audit.png)

`audit` is similar to `throttle`, but emits the last value from the silenced
time window, instead of the first value. `audit` emits the most recent value
from the source Observable on the output Observable as soon as its internal
timer becomes disabled, and ignores source values while the timer is enabled.
Initially, the timer is disabled. As soon as the first source value arrives,
the timer is enabled by calling the `durationSelector` function with the
source value, which returns the "duration" Observable. When the duration
Observable emits a value or completes, the timer is disabled, then the most
recent source value is emitted on the output Observable, and this process
repeats for the next source value.

## Example

Emit clicks at a rate of at most one click per second
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(audit(ev => interval(1000)));
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  auditTime}
 * @see  {
 * @link  debounce}
 * @see  {
 * @link  delayWhen}
 * @see  {
 * @link  sample}
 * @see  {
 * @link  throttle}
 * @param  ): SubscribableOrPromise} durationSelector A function
that receives a value from the source Observable, for computing the silencing
duration, returned as an Observable or a Promise.
 * @return  An Observable that performs rate-limiting of
emissions from the source Observable.
 * @method  audit
 * @owner  Observable
*/
  declare export function audit<T>(
    durationSelector: (value: T) => SubscribableOrPromise<any>
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/auditTime" {
  /**
 * Ignores source values for `duration` milliseconds, then emits the most recent
 * value from the source Observable, then repeats this process.

<span class="informal">When it sees a source values, it ignores that plus
the next ones for `duration` milliseconds, and then it emits the most recent
value from the source.</span>

![](auditTime.png)

`auditTime` is similar to `throttleTime`, but emits the last value from the
silenced time window, instead of the first value. `auditTime` emits the most
recent value from the source Observable on the output Observable as soon as
its internal timer becomes disabled, and ignores source values while the
timer is enabled. Initially, the timer is disabled. As soon as the first
source value arrives, the timer is enabled. After `duration` milliseconds (or
the time unit determined internally by the optional `scheduler`) has passed,
the timer is disabled, then the most recent source value is emitted on the
output Observable, and this process repeats for the next source value.
Optionally takes a {@link SchedulerLike} for managing timers.

## Example

Emit clicks at a rate of at most one click per second
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(auditTime(1000));
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  audit}
 * @see  {
 * @link  debounceTime}
 * @see  {
 * @link  delay}
 * @see  {
 * @link  sampleTime}
 * @see  {
 * @link  throttleTime}
 * @param  Time to wait before emitting the most recent source
value, measured in milliseconds or the time unit determined internally
by the optional `scheduler`.
 * @param  The {
 * @link  SchedulerLike} to use for
managing the timers that handle the rate-limiting behavior.
 * @return  An Observable that performs rate-limiting of
emissions from the source Observable.
 * @method  auditTime
 * @owner  Observable
*/
  declare export function auditTime<T>(
    duration: number,
    scheduler?: SchedulerLike
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/buffer" {
  /**
 * Buffers the source Observable values until `closingNotifier` emits.
 * 
<span class="informal">Collects values from the past as an array, and emits
that array only when another Observable emits.</span>

![](buffer.png)

Buffers the incoming Observable values until the given `closingNotifier`
Observable emits a value, at which point it emits the buffer on the output
Observable and starts a new buffer internally, awaiting the next time
`closingNotifier` emits.

## Example

On every click, emit array of most recent interval events

```javascript
const clicks = fromEvent(document, 'click');
const interval = interval(1000);
const buffered = interval.pipe(buffer(clicks));
buffered.subscribe(x => console.log(x));
```
 * @see  {
 * @link  bufferCount}
 * @see  {
 * @link  bufferTime}
 * @see  {
 * @link  bufferToggle}
 * @see  {
 * @link  bufferWhen}
 * @see  {
 * @link  window}
 * @param  An Observable that signals the
buffer to be emitted on the output Observable.
 * @return  An Observable of buffers, which are arrays of
values.
 * @method  buffer
 * @owner  Observable
*/
  declare export function buffer<T>(
    closingNotifier: Observable<any>
  ): OperatorFunction<T, T[]>;
}
declare module "rxjs/operators/internal/operators/bufferCount" {
  /**
 * Buffers the source Observable values until the size hits the maximum
 * `bufferSize` given.

<span class="informal">Collects values from the past as an array, and emits
that array only when its size reaches `bufferSize`.</span>

![](bufferCount.png)

Buffers a number of values from the source Observable by `bufferSize` then
emits the buffer and clears it, and starts a new buffer each
`startBufferEvery` values. If `startBufferEvery` is not provided or is
`null`, then new buffers are started immediately at the start of the source
and when each buffer closes and is emitted.

## Examples

Emit the last two click events as an array

```javascript
const clicks = fromEvent(document, 'click');
const buffered = clicks.pipe(bufferCount(2));
buffered.subscribe(x => console.log(x));
```

On every click, emit the last two click events as an array

```javascript
const clicks = fromEvent(document, 'click');
const buffered = clicks.pipe(bufferCount(2, 1));
buffered.subscribe(x => console.log(x));
```
 * @see  {
 * @link  buffer}
 * @see  {
 * @link  bufferTime}
 * @see  {
 * @link  bufferToggle}
 * @see  {
 * @link  bufferWhen}
 * @see  {
 * @link  pairwise}
 * @see  {
 * @link  windowCount}
 * @param  The maximum size of the buffer emitted.
 * @param  Interval at which to start a new buffer.
For example if `startBufferEvery` is `2`, then a new buffer will be started
on every other value from the source. A new buffer is started at the
beginning of the source by default.
 * @return  An Observable of arrays of buffered values.
 * @method  bufferCount
 * @owner  Observable
*/
  declare export function bufferCount<T>(
    bufferSize: number,
    startBufferEvery?: number
  ): OperatorFunction<T, T[]>;
}
declare module "rxjs/operators/internal/operators/bufferTime" {
  declare export function bufferTime<T>(
    bufferTimeSpan: number,
    scheduler?: SchedulerLike
  ): OperatorFunction<T, T[]>;
}
declare module "rxjs/operators/internal/operators/bufferToggle" {
  /**
 * Buffers the source Observable values starting from an emission from
 * `openings` and ending when the output of `closingSelector` emits.

<span class="informal">Collects values from the past as an array. Starts
collecting only when `opening` emits, and calls the `closingSelector`
function to get an Observable that tells when to close the buffer.</span>

![](bufferToggle.png)

Buffers values from the source by opening the buffer via signals from an
Observable provided to `openings`, and closing and sending the buffers when
a Subscribable or Promise returned by the `closingSelector` function emits.

## Example

Every other second, emit the click events from the next 500ms

```javascript
const clicks = fromEvent(document, 'click');
const openings = interval(1000);
const buffered = clicks.pipe(bufferToggle(openings, i =>
   i % 2 ? interval(500) : empty()
));
buffered.subscribe(x => console.log(x));
```
 * @see  {
 * @link  buffer}
 * @see  {
 * @link  bufferCount}
 * @see  {
 * @link  bufferTime}
 * @see  {
 * @link  bufferWhen}
 * @see  {
 * @link  windowToggle}
 * @param  A Subscribable or Promise of notifications to start new
buffers.
 * @param  ): SubscribableOrPromise} closingSelector A function that takes
the value emitted by the `openings` observable and returns a Subscribable or Promise,
which, when it emits, signals that the associated buffer should be emitted
and cleared.
 * @return  An observable of arrays of buffered values.
 * @method  bufferToggle
 * @owner  Observable
*/
  declare export function bufferToggle<T, O>(
    openings: SubscribableOrPromise<O>,
    closingSelector: (value: O) => SubscribableOrPromise<any>
  ): OperatorFunction<T, T[]>;
}
declare module "rxjs/operators/internal/operators/bufferWhen" {
  /**
 * Buffers the source Observable values, using a factory function of closing
 * Observables to determine when to close, emit, and reset the buffer.

<span class="informal">Collects values from the past as an array. When it
starts collecting values, it calls a function that returns an Observable that
tells when to close the buffer and restart collecting.</span>

![](bufferWhen.png)

Opens a buffer immediately, then closes the buffer when the observable
returned by calling `closingSelector` function emits a value. When it closes
the buffer, it immediately opens a new buffer and repeats the process.

## Example

Emit an array of the last clicks every [1-5] random seconds

```javascript
const clicks = fromEvent(document, 'click');
const buffered = clicks.pipe(bufferWhen(() =>
   interval(1000 + Math.random() * 4000)
));
buffered.subscribe(x => console.log(x));
```
 * @see  {
 * @link  buffer}
 * @see  {
 * @link  bufferCount}
 * @see  {
 * @link  bufferTime}
 * @see  {
 * @link  bufferToggle}
 * @see  {
 * @link  windowWhen}
 * @param  A function that takes no
arguments and returns an Observable that signals buffer closure.
 * @return  An observable of arrays of buffered values.
 * @method  bufferWhen
 * @owner  Observable
*/
  declare export function bufferWhen<T>(
    closingSelector: () => Observable<any>
  ): OperatorFunction<T, T[]>;
}
declare module "rxjs/operators/internal/operators/catchError" {
  /**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 * 
![](catch.png)

## Examples
Continues with a different Observable when there's an error

```javascript
of(1, 2, 3, 4, 5).pipe(
     map(n => {
   	   if (n == 4) {
 	       throw 'four!';
       }
	     return n;
     }),
     catchError(err => of('I', 'II', 'III', 'IV', 'V')),
   )
   .subscribe(x => console.log(x));
   // 1, 2, 3, I, II, III, IV, V
```

Retries the caught source Observable again in case of error, similar to retry() operator

```javascript
of(1, 2, 3, 4, 5).pipe(
     map(n => {
   	   if (n === 4) {
   	     throw 'four!';
       }
 	     return n;
     }),
     catchError((err, caught) => caught),
     take(30),
   )
   .subscribe(x => console.log(x));
   // 1, 2, 3, 1, 2, 3, ...
```

Throws a new error when the source Observable throws an error

```javascript
of(1, 2, 3, 4, 5).pipe(
     map(n => {
       if (n == 4) {
         throw 'four!';
       }
       return n;
     }),
     catchError(err => {
       throw 'error in source. Details: ' + err;
     }),
   )
   .subscribe(
     x => console.log(x),
     err => console.log(err)
   );
   // 1, 2, 3, error in source. Details: four!
```

  
 * @param  a function that takes as arguments `err`, which is the error, and `caught`, which
is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
is returned by the `selector` will be used to continue the observable chain.
 * @return  An observable that originates from either the source or the observable returned by the
catch `selector` function.
 * @name  catchError
*/
  declare export function catchError<T>(
    selector: (
      err: any,
      caught: Observable<T>
    ) => "NO PRINT IMPLEMENTED: NeverKeyword"
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/combineAll" {
  declare export function combineAll<T>(): OperatorFunction<
    ObservableInput<T>,
    T[]
  >;
}
declare module "rxjs/operators/internal/operators/combineLatest" {
  /**
   *
   * @deprecated  Deprecated in favor of static combineLatest.
   */
  declare export function combineLatest<T, R>(
    project: (v1: T) => R
  ): OperatorFunction<T, R>;
}
declare module "rxjs/operators/internal/operators/concat" {
  /**
   *
   * @deprecated  Deprecated in favor of static concat.
   */
  declare export function concat<T>(
    scheduler?: SchedulerLike
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/concatAll" {
  declare export function concatAll<T>(): OperatorFunction<
    ObservableInput<T>,
    T
  >;
}
declare module "rxjs/operators/internal/operators/concatMap" {
  declare export function concatMap<T, R>(
    project: (value: T, index: number) => ObservableInput<R>
  ): OperatorFunction<T, R>;
}
declare module "rxjs/operators/internal/operators/concatMapTo" {
  declare export function concatMapTo<T>(
    observable: ObservableInput<T>
  ): OperatorFunction<any, T>;
}
declare module "rxjs/operators/internal/operators/count" {
  /**
 * Counts the number of emissions on the source and emits that number when the
 * source completes.

<span class="informal">Tells how many values were emitted, when the source
completes.</span>

![](count.png)

`count` transforms an Observable that emits values into an Observable that
emits a single value that represents the number of values emitted by the
source Observable. If the source Observable terminates with an error, `count`
will pass this error notification along without emitting a value first. If
the source Observable does not terminate at all, `count` will neither emit
a value nor terminate. This operator takes an optional `predicate` function
as argument, in which case the output emission will represent the number of
source values that matched `true` with the `predicate`.

## Examples

Counts how many seconds have passed before the first click happened
```javascript
const seconds = interval(1000);
const clicks = fromEvent(document, 'click');
const secondsBeforeClick = seconds.pipe(takeUntil(clicks));
const result = secondsBeforeClick.pipe(count());
result.subscribe(x => console.log(x));
```

Counts how many odd numbers are there between 1 and 7
```javascript
const numbers = range(1, 7);
const result = numbers.pipe(count(i => i % 2 === 1));
result.subscribe(x => console.log(x));
// Results in:
// 4
```
 * @see  {
 * @link  max}
 * @see  {
 * @link  min}
 * @see  {
 * @link  reduce}
 * @param  , i: number, source: Observable<T>): boolean} [predicate] A
boolean function to select what values are to be counted. It is provided with
arguments of:
- `value`: the value from the source Observable.
- `index`: the (zero-based) "index" of the value from the source Observable.
- `source`: the source Observable instance itself.
 * @return  An Observable of one number that represents the count as
described above.
 * @method  count
 * @owner  Observable
*/
  declare export function count<T>(
    predicate?: (value: T, index: number, source: Observable<T>) => boolean
  ): OperatorFunction<T, number>;
}
declare module "rxjs/operators/internal/operators/debounce" {
  /**
 * Emits a value from the source Observable only after a particular time span
 * determined by another Observable has passed without another source emission.

<span class="informal">It's like {@link debounceTime}, but the time span of
emission silence is determined by a second Observable.</span>

![](debounce.png)

`debounce` delays values emitted by the source Observable, but drops previous
pending delayed emissions if a new value arrives on the source Observable.
This operator keeps track of the most recent value from the source
Observable, and spawns a duration Observable by calling the
`durationSelector` function. The value is emitted only when the duration
Observable emits a value or completes, and if no other value was emitted on
the source Observable since the duration Observable was spawned. If a new
value appears before the duration Observable emits, the previous value will
be dropped and will not be emitted on the output Observable.

Like {@link debounceTime}, this is a rate-limiting operator, and also a
delay-like operator since output emissions do not necessarily occur at the
same time as they did on the source Observable.

## Example
Emit the most recent click after a burst of clicks
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(debounce(() => interval(1000)));
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  audit}
 * @see  {
 * @link  debounceTime}
 * @see  {
 * @link  delayWhen}
 * @see  {
 * @link  throttle}
 * @param  ): SubscribableOrPromise} durationSelector A function
that receives a value from the source Observable, for computing the timeout
duration for each source value, returned as an Observable or a Promise.
 * @return  An Observable that delays the emissions of the source
Observable by the specified duration Observable returned by
`durationSelector`, and may drop some values if they occur too frequently.
 * @method  debounce
 * @owner  Observable
*/
  declare export function debounce<T>(
    durationSelector: (value: T) => SubscribableOrPromise<any>
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/debounceTime" {
  /**
 * Emits a value from the source Observable only after a particular time span
 * has passed without another source emission.

<span class="informal">It's like {@link delay}, but passes only the most
recent value from each burst of emissions.</span>

![](debounceTime.png)

`debounceTime` delays values emitted by the source Observable, but drops
previous pending delayed emissions if a new value arrives on the source
Observable. This operator keeps track of the most recent value from the
source Observable, and emits that only when `dueTime` enough time has passed
without any other value appearing on the source Observable. If a new value
appears before `dueTime` silence occurs, the previous value will be dropped
and will not be emitted on the output Observable.

This is a rate-limiting operator, because it is impossible for more than one
value to be emitted in any time window of duration `dueTime`, but it is also
a delay-like operator since output emissions do not occur at the same time as
they did on the source Observable. Optionally takes a {@link SchedulerLike} for
managing timers.

## Example
Emit the most recent click after a burst of clicks
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(debounceTime(1000));
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  auditTime}
 * @see  {
 * @link  debounce}
 * @see  {
 * @link  delay}
 * @see  {
 * @link  sampleTime}
 * @see  {
 * @link  throttleTime}
 * @param  The timeout duration in milliseconds (or the time
unit determined internally by the optional `scheduler`) for the window of
time required to wait for emission silence before emitting the most recent
source value.
 * @param  The {
 * @link  SchedulerLike} to use for
managing the timers that handle the timeout for each value.
 * @return  An Observable that delays the emissions of the source
Observable by the specified `dueTime`, and may drop some values if they occur
too frequently.
 * @method  debounceTime
 * @owner  Observable
*/
  declare export function debounceTime<T>(
    dueTime: number,
    scheduler?: SchedulerLike
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/defaultIfEmpty" {
  declare export function defaultIfEmpty<T>(
    defaultValue?: T
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/delay" {
  /**
 * Delays the emission of items from the source Observable by a given timeout or
 * until a given Date.

<span class="informal">Time shifts each item by some specified amount of
milliseconds.</span>

![](delay.png)

If the delay argument is a Number, this operator time shifts the source
Observable by that amount of time expressed in milliseconds. The relative
time intervals between the values are preserved.

If the delay argument is a Date, this operator time shifts the start of the
Observable execution until the given date occurs.

## Examples
Delay each click by one second
```javascript
const clicks = fromEvent(document, 'click');
const delayedClicks = clicks.pipe(delay(1000)); // each click emitted after 1 second
delayedClicks.subscribe(x => console.log(x));
```

Delay all clicks until a future date happens
```javascript
const clicks = fromEvent(document, 'click');
const date = new Date('March 15, 2050 12:00:00'); // in the future
const delayedClicks = clicks.pipe(delay(date)); // click emitted only after that date
delayedClicks.subscribe(x => console.log(x));
```
 * @see  {
 * @link  debounceTime}
 * @see  {
 * @link  delayWhen}
 * @param  The delay duration in milliseconds (a `number`) or
a `Date` until which the emission of the source items is delayed.
 * @param  The {
 * @link  SchedulerLike} to use for
managing the timers that handle the time-shift for each item.
 * @return  An Observable that delays the emissions of the source
Observable by the specified timeout or Date.
 * @method  delay
 * @owner  Observable
*/
  declare export function delay<T>(
    delay: number | Date,
    scheduler?: SchedulerLike
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/delayWhen" {
  /**
   *
   * @deprecated  In future versions, empty notifiers will no longer re-emit the source value on the output observable.
   */
  declare export function delayWhen<T>(
    delayDurationSelector: (
      value: T,
      index: number
    ) => Observable<"NO PRINT IMPLEMENTED: NeverKeyword">,
    subscriptionDelay?: Observable<any>
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/dematerialize" {
  /**
 * Converts an Observable of {@link Notification} objects into the emissions
 * that they represent.

<span class="informal">Unwraps {@link Notification} objects as actual `next`,
`error` and `complete` emissions. The opposite of {@link materialize}.</span>

![](dematerialize.png)

`dematerialize` is assumed to operate an Observable that only emits
{@link Notification} objects as `next` emissions, and does not emit any
`error`. Such Observable is the output of a `materialize` operation. Those
notifications are then unwrapped using the metadata they contain, and emitted
as `next`, `error`, and `complete` on the output Observable.

Use this operator in conjunction with {@link materialize}.

## Example
Convert an Observable of Notifications to an actual Observable
```javascript
const notifA = new Notification('N', 'A');
const notifB = new Notification('N', 'B');
const notifE = new Notification('E', undefined,
   new TypeError('x.toUpperCase is not a function')
);
const materialized = of(notifA, notifB, notifE);
const upperCase = materialized.pipe(dematerialize());
upperCase.subscribe(x => console.log(x), e => console.error(e));

// Results in:
// A
// B
// TypeError: x.toUpperCase is not a function
```
 * @see  {
 * @link  Notification}
 * @see  {
 * @link  materialize}
 * @return  An Observable that emits items and notifications
embedded in Notification objects emitted by the source Observable.
 * @method  dematerialize
 * @owner  Observable
*/
  declare export function dematerialize<T>(): OperatorFunction<
    Notification<T>,
    T
  >;
}
declare module "rxjs/operators/internal/operators/distinct" {
  /**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
 * 
If a keySelector function is provided, then it will project each value from the source observable into a new value that it will
check for equality with previously projected values. If a keySelector function is not provided, it will use each value from the
source observable directly with an equality check against previous values.

In JavaScript runtimes that support `Set`, this operator will use a `Set` to improve performance of the distinct value checking.

In other runtimes, this operator will use a minimal implementation of `Set` that relies on an `Array` and `indexOf` under the
hood, so performance will degrade as more values are checked for distinction. Even in newer browsers, a long-running `distinct`
use might result in memory leaks. To help alleviate this in some scenarios, an optional `flushes` parameter is also provided so
that the internal `Set` can be "flushed", basically clearing it of values.

## Examples
A simple example with numbers
```javascript
of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1).pipe(
     distinct(),
   )
   .subscribe(x => console.log(x)); // 1, 2, 3, 4
```

An example using a keySelector function
```typescript
interface Person {
    age: number,
    name: string
}

of<Person>(
     { age: 4, name: 'Foo'},
     { age: 7, name: 'Bar'},
     { age: 5, name: 'Foo'},
   ).pipe(
     distinct((p: Person) => p.name),
   )
   .subscribe(x => console.log(x));

// displays:
// { age: 4, name: 'Foo' }
// { age: 7, name: 'Bar' }
```
 * @see  {
 * @link  distinctUntilChanged}
 * @see  {
 * @link  distinctUntilKeyChanged}
 * @param  Optional function to select which value you want to check as distinct.
 * @param  Optional Observable for flushing the internal HashSet of the operator.
 * @return  An Observable that emits items from the source Observable with distinct values.
 * @method  distinct
 * @owner  Observable
*/
  declare export function distinct<T, K>(
    keySelector?: (value: T) => K,
    flushes?: Observable<any>
  ): MonoTypeOperatorFunction<T>;

  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class DistinctSubscriber<T, K> mixins OuterSubscriber<T, T> {
    constructor(
      destination: Subscriber<T>,
      keySelector: (value: T) => K,
      flushes: Observable<any>
    ): this;
    notifyNext(
      outerValue: T,
      innerValue: T,
      outerIndex: number,
      innerIndex: number,
      innerSub: InnerSubscriber<T, T>
    ): void;
    notifyError(error: any, innerSub: InnerSubscriber<T, T>): void;
    _next(value: T): void;
  }
}
declare module "rxjs/operators/internal/operators/distinctUntilChanged" {
  declare export function distinctUntilChanged<T>(
    compare?: (x: T, y: T) => boolean
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/distinctUntilKeyChanged" {
  declare export function distinctUntilKeyChanged<T>(
    key: "NO PRINT IMPLEMENTED: TypeOperator"
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/elementAt" {
  /**
 * Emits the single value at the specified `index` in a sequence of emissions
 * from the source Observable.

<span class="informal">Emits only the i-th value, then completes.</span>

![](elementAt.png)

`elementAt` returns an Observable that emits the item at the specified
`index` in the source Observable, or a default value if that `index` is out
of range and the `default` argument is provided. If the `default` argument is
not given and the `index` is out of range, the output Observable will emit an
`ArgumentOutOfRangeError` error.

## Example
Emit only the third click event
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(elementAt(2));
result.subscribe(x => console.log(x));

// Results in:
// click 1 = nothing
// click 2 = nothing
// click 3 = MouseEvent object logged to console
```
 * @see  {
 * @link  first}
 * @see  {
 * @link  last}
 * @see  {
 * @link  skip}
 * @see  {
 * @link  single}
 * @see  {
 * @link  take}
 * @throws  {ArgumentOutOfRangeError} When using `elementAt(i)`, it delivers an
ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0` or the
Observable has completed before emitting the i-th `next` notification.
 * @param  Is the number `i` for the i-th source emission that has
happened since the subscription, starting from the number `0`.
 * @param  The default value returned for missing indices.
 * @return  An Observable that emits a single item, if it is found.
Otherwise, will emit the default value if given. If not, then emits an error.
 * @method  elementAt
 * @owner  Observable
*/
  declare export function elementAt<T>(
    index: number,
    defaultValue?: T
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/endWith" {
  declare export function endWith<T>(
    scheduler?: SchedulerLike
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/every" {
  /**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 * 
## Example
A simple example emitting true if all elements are less than 5, false otherwise
```javascript
  of(1, 2, 3, 4, 5, 6).pipe(
     every(x => x < 5),
)
.subscribe(x => console.log(x)); // -> false
```
 * @param  A function for determining if an item meets a specified condition.
 * @param  Optional object to use for `this` in the callback.
 * @return  An Observable of booleans that determines if all items of the source Observable meet the condition specified.
 * @method  every
 * @owner  Observable
*/
  declare export function every<T>(
    predicate: (value: T, index: number, source: Observable<T>) => boolean,
    thisArg?: any
  ): OperatorFunction<T, boolean>;
}
declare module "rxjs/operators/internal/operators/exhaust" {
  declare export function exhaust<T>(): OperatorFunction<ObservableInput<T>, T>;
}
declare module "rxjs/operators/internal/operators/exhaustMap" {
  declare export function exhaustMap<T, R>(
    project: (value: T, index: number) => ObservableInput<R>
  ): OperatorFunction<T, R>;
}
declare module "rxjs/operators/internal/operators/expand" {
  declare export function expand<T, R>(
    project: (value: T, index: number) => ObservableInput<R>,
    concurrent?: number,
    scheduler?: SchedulerLike
  ): OperatorFunction<T, R>;

  declare export class ExpandOperator<T, R> mixins Operator<T, R> {
    constructor(
      project: (value: T, index: number) => ObservableInput<R>,
      concurrent: number,
      scheduler: SchedulerLike
    ): this;
    call(subscriber: Subscriber<R>, source: any): any;
  }

  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class ExpandSubscriber<T, R> mixins OuterSubscriber<T, R> {
    constructor(
      destination: Subscriber<R>,
      project: (value: T, index: number) => ObservableInput<R>,
      concurrent: number,
      scheduler: SchedulerLike
    ): this;
    _next(value: any): void;
    _complete(): void;
    notifyNext(
      outerValue: T,
      innerValue: R,
      outerIndex: number,
      innerIndex: number,
      innerSub: InnerSubscriber<T, R>
    ): void;
    notifyComplete(innerSub: Subscription): void;
  }
}
declare module "rxjs/operators/internal/operators/filter" {
  declare export function filter<T, S>(
    predicate: (value: T, index: number) => S,
    thisArg?: any
  ): OperatorFunction<T, S>;
}
declare module "rxjs/operators/internal/operators/finalize" {
  /**
   * Returns an Observable that mirrors the source Observable, but will call a specified function when
   * the source terminates on complete or error.
   * @param  Function to be called when source terminates.
   * @return  An Observable that mirrors the source, but will call the specified function on termination.
   * @method  finally
   * @owner  Observable
   */
  declare export function finalize<T>(
    callback: () => void
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/find" {
  declare export function find<T, S>(
    predicate: (value: T, index: number, source: Observable<T>) => S,
    thisArg?: any
  ): OperatorFunction<T, S | void>;

  declare export class FindValueOperator<T>
    mixins Operator<T, T | number | void> {
    constructor(
      predicate: (value: T, index: number, source: Observable<T>) => boolean,
      source: Observable<T>,
      yieldIndex: boolean,
      thisArg?: any
    ): this;
    call(observer: Subscriber<T>, source: any): any;
  }

  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class FindValueSubscriber<T> mixins Subscriber<T> {
    constructor(
      destination: Subscriber<T>,
      predicate: (value: T, index: number, source: Observable<T>) => boolean,
      source: Observable<T>,
      yieldIndex: boolean,
      thisArg?: any
    ): this;
    _next(value: T): void;
    _complete(): void;
  }
}
declare module "rxjs/operators/internal/operators/findIndex" {
  /**
 * Emits only the index of the first value emitted by the source Observable that
 * meets some condition.

<span class="informal">It's like {@link find}, but emits the index of the
found value, not the value itself.</span>

![](findIndex.png)

`findIndex` searches for the first item in the source Observable that matches
the specified condition embodied by the `predicate`, and returns the
(zero-based) index of the first occurrence in the source. Unlike
{@link first}, the `predicate` is required in `findIndex`, and does not emit
an error if a valid value is not found.

## Example
Emit the index of first click that happens on a DIV element
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(findIndex(ev => ev.target.tagName === 'DIV'));
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  filter}
 * @see  {
 * @link  find}
 * @see  {
 * @link  first}
 * @see  {
 * @link  take}
 * @param  , index: number, source: Observable<T>): boolean} predicate
A function called with each item to test for condition matching.
 * @param  An optional argument to determine the value of `this`
in the `predicate` function.
 * @return  An Observable of the index of the first item that
matches the condition.
 * @method  find
 * @owner  Observable
*/
  declare export function findIndex<T>(
    predicate: (value: T, index: number, source: Observable<T>) => boolean,
    thisArg?: any
  ): OperatorFunction<T, number>;
}
declare module "rxjs/operators/internal/operators/first" {
  declare export function first<T, D>(
    predicate?: null,
    defaultValue?: D
  ): OperatorFunction<T, T | D>;
}
declare module "rxjs/operators/internal/operators/groupBy" {
  declare export function groupBy<T, K>(
    keySelector: (value: T) => K
  ): OperatorFunction<T, GroupedObservable<K, T>>;

  declare export interface RefCountSubscription {
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
  declare export class GroupedObservable<K, T> mixins Observable<T> {
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
}
declare module "rxjs/operators/internal/operators/ignoreElements" {
  /**
 * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
 * 
![](ignoreElements.png)

## Examples
### Ignores emitted values, reacts to observable's completion.
```javascript
of('you', 'talking', 'to', 'me').pipe(
   ignoreElements(),
)
.subscribe(
   word => console.log(word),
   err => console.log('error:', err),
   () => console.log('the end'),
);
// result:
// 'the end'
```
 * @return  An empty Observable that only calls `complete`
or `error`, based on which one is called by the source Observable.
 * @method  ignoreElements
 * @owner  Observable
*/
  declare export function ignoreElements(): OperatorFunction<
    any,
    "NO PRINT IMPLEMENTED: NeverKeyword"
  >;
}
declare module "rxjs/operators/internal/operators/isEmpty" {
  declare export function isEmpty<T>(): OperatorFunction<T, boolean>;
}
declare module "rxjs/operators/internal/operators/last" {
  declare export function last<T, D>(
    predicate?: null,
    defaultValue?: D
  ): OperatorFunction<T, T | D>;
}
declare module "rxjs/operators/internal/operators/map" {
  /**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.

<span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
it passes each source value through a transformation function to get
corresponding output values.</span>

![](map.png)

Similar to the well known `Array.prototype.map` function, this operator
applies a projection to each value and emits that projection in the output
Observable.

## Example
Map every click to the clientX position of that click
```javascript
const clicks = fromEvent(document, 'click');
const positions = clicks.pipe(map(ev => ev.clientX));
positions.subscribe(x => console.log(x));
```
 * @see  {
 * @link  mapTo}
 * @see  {
 * @link  pluck}
 * @param  , index: number): R} project The function to apply
to each `value` emitted by the source Observable. The `index` parameter is
the number `i` for the i-th emission that has happened since the
subscription, starting from the number `0`.
 * @param  An optional argument to define what `this` is in the
`project` function.
 * @return  An Observable that emits the values from the source
Observable transformed by the given `project` function.
 * @method  map
 * @owner  Observable
*/
  declare export function map<T, R>(
    project: (value: T, index: number) => R,
    thisArg?: any
  ): OperatorFunction<T, R>;

  declare export class MapOperator<T, R> mixins Operator<T, R> {
    constructor(project: (value: T, index: number) => R, thisArg: any): this;
    call(subscriber: Subscriber<R>, source: any): any;
  }
}
declare module "rxjs/operators/internal/operators/mapTo" {
  /**
 * Emits the given constant value on the output Observable every time the source
 * Observable emits a value.

<span class="informal">Like {@link map}, but it maps every source value to
the same output value every time.</span>

![](mapTo.png)

Takes a constant `value` as argument, and emits that whenever the source
Observable emits a value. In other words, ignores the actual source value,
and simply uses the emission moment to know when to emit the given `value`.

## Example
Map every click to the string 'Hi'
```javascript
const clicks = fromEvent(document, 'click');
const greetings = clicks.pipe(mapTo('Hi'));
greetings.subscribe(x => console.log(x));
```
 * @see  {
 * @link  map}
 * @param  The value to map each source value to.
 * @return  An Observable that emits the given `value` every time
the source Observable emits something.
 * @method  mapTo
 * @owner  Observable
*/
  declare export function mapTo<T, R>(value: R): OperatorFunction<T, R>;
}
declare module "rxjs/operators/internal/operators/materialize" {
  /**
 * Represents all of the notifications from the source Observable as `next`
 * emissions marked with their original types within {@link Notification}
objects.

<span class="informal">Wraps `next`, `error` and `complete` emissions in
{@link Notification} objects, emitted as `next` on the output Observable.
</span>

![](materialize.png)

`materialize` returns an Observable that emits a `next` notification for each
`next`, `error`, or `complete` emission of the source Observable. When the
source Observable emits `complete`, the output Observable will emit `next` as
a Notification of type "complete", and then it will emit `complete` as well.
When the source Observable emits `error`, the output will emit `next` as a
Notification of type "error", and then `complete`.

This operator is useful for producing metadata of the source Observable, to
be consumed as `next` emissions. Use it in conjunction with
{@link dematerialize}.

## Example
Convert a faulty Observable to an Observable of Notifications
```javascript
const letters = of('a', 'b', 13, 'd');
const upperCase = letters.pipe(map(x => x.toUpperCase()));
const materialized = upperCase.pipe(materialize());
materialized.subscribe(x => console.log(x));

// Results in the following:
// - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
// - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
// - Notification {kind: "E", value: undefined, error: TypeError:
//   x.toUpperCase is not a function at MapSubscriber.letters.map.x
//   [as project] (http://1…, hasValue: false}
```
 * @see  {
 * @link  Notification}
 * @see  {
 * @link  dematerialize}
 * @return  An Observable that emits
{
 * @link  Notification} objects that wrap the original emissions from the source
Observable with metadata.
 * @method  materialize
 * @owner  Observable
*/
  declare export function materialize<T>(): OperatorFunction<
    T,
    Notification<T>
  >;
}
declare module "rxjs/operators/internal/operators/max" {
  /**
 * The Max operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
 * and when source Observable completes it emits a single item: the item with the largest value.

![](max.png)

## Examples
Get the maximal value of a series of numbers
```javascript
of(5, 4, 7, 2, 8).pipe(
   max(),
)
.subscribe(x => console.log(x)); // -> 8
```

Use a comparer function to get the maximal item
```typescript
interface Person {
   age: number,
   name: string
}
of<Person>(
   {age: 7, name: 'Foo'},
   {age: 5, name: 'Bar'},
   {age: 9, name: 'Beer'},
).pipe(
   max<Person>((a: Person, b: Person) => a.age < b.age ? -1 : 1),
)
.subscribe((x: Person) => console.log(x.name)); // -> 'Beer'
```
 * @see  {
 * @link  min}
 * @param  - Optional comparer function that it will use instead of its default to compare the
value of two items.
 * @return  An Observable that emits item with the largest value.
 * @method  max
 * @owner  Observable
*/
  declare export function max<T>(
    comparer?: (x: T, y: T) => number
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/merge" {
  /**
   *
   * @deprecated  Deprecated in favor of static merge.
   */
  declare export function merge<T>(
    scheduler?: SchedulerLike
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/mergeAll" {
  declare export function mergeAll<T>(
    concurrent?: number
  ): OperatorFunction<ObservableInput<T>, T>;
}
declare module "rxjs/operators/internal/operators/mergeMap" {
  declare export function mergeMap<T, R>(
    project: (value: T, index: number) => ObservableInput<R>,
    concurrent?: number
  ): OperatorFunction<T, R>;

  declare export class MergeMapOperator<T, R> mixins Operator<T, R> {
    constructor(
      project: (value: T, index: number) => ObservableInput<R>,
      concurrent?: number
    ): this;
    call(observer: Subscriber<R>, source: any): any;
  }

  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class MergeMapSubscriber<T, R> mixins OuterSubscriber<T, R> {
    index: number;
    constructor(
      destination: Subscriber<R>,
      project: (value: T, index: number) => ObservableInput<R>,
      concurrent?: number
    ): this;
    _next(value: T): void;
    _tryNext(value: T): void;
    _complete(): void;
    notifyNext(
      outerValue: T,
      innerValue: R,
      outerIndex: number,
      innerIndex: number,
      innerSub: InnerSubscriber<T, R>
    ): void;
    notifyComplete(innerSub: Subscription): void;
  }
}
declare module "rxjs/operators/internal/operators/mergeMapTo" {
  declare export function mergeMapTo<T>(
    innerObservable: ObservableInput<T>,
    concurrent?: number
  ): OperatorFunction<any, T>;
}
declare module "rxjs/operators/internal/operators/mergeScan" {
  /**
 * Applies an accumulator function over the source Observable where the
 * accumulator function itself returns an Observable, then each intermediate
Observable returned is merged into the output Observable.

<span class="informal">It's like {@link scan}, but the Observables returned
by the accumulator are merged into the outer Observable.</span>

## Example
Count the number of click events
```javascript
const click$ = fromEvent(document, 'click');
const one$ = click$.pipe(mapTo(1));
const seed = 0;
const count$ = one$.pipe(
   mergeScan((acc, one) => of(acc + one), seed),
);
count$.subscribe(x => console.log(x));

// Results:
1
2
3
4
// ...and so on for each click
```
 * @param  , value: T): Observable<R>} accumulator
The accumulator function called on each source value.
 * @param seed The initial accumulation value.
 * @param  Maximum number of
input Observables being subscribed to concurrently.
 * @return  An observable of the accumulated values.
 * @method  mergeScan
 * @owner  Observable
*/
  declare export function mergeScan<T, R>(
    accumulator: (acc: R, value: T) => ObservableInput<R>,
    seed: R,
    concurrent?: number
  ): OperatorFunction<T, R>;

  declare export class MergeScanOperator<T, R> mixins Operator<T, R> {
    constructor(
      accumulator: (acc: R, value: T) => ObservableInput<R>,
      seed: R,
      concurrent: number
    ): this;
    call(subscriber: Subscriber<R>, source: any): any;
  }

  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class MergeScanSubscriber<T, R> mixins OuterSubscriber<T, R> {
    index: number;
    constructor(
      destination: Subscriber<R>,
      accumulator: (acc: R, value: T) => ObservableInput<R>,
      acc: R,
      concurrent: number
    ): this;
    _next(value: any): void;
    _complete(): void;
    notifyNext(
      outerValue: T,
      innerValue: R,
      outerIndex: number,
      innerIndex: number,
      innerSub: InnerSubscriber<T, R>
    ): void;
    notifyComplete(innerSub: Subscription): void;
  }
}
declare module "rxjs/operators/internal/operators/min" {
  /**
 * The Min operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
 * and when source Observable completes it emits a single item: the item with the smallest value.

![](min.png)

## Examples
Get the minimal value of a series of numbers
```javascript
of(5, 4, 7, 2, 8).pipe(
   min(),
)
.subscribe(x => console.log(x)); // -> 2
```

Use a comparer function to get the minimal item
```typescript
interface Person {
   age: number,
   name: string
}
of<Person>(
   {age: 7, name: 'Foo'},
   {age: 5, name: 'Bar'},
   {age: 9, name: 'Beer'},
).pipe(
   min<Person>( (a: Person, b: Person) => a.age < b.age ? -1 : 1),
)
.subscribe((x: Person) => console.log(x.name)); // -> 'Bar'
```
 * @see  {
 * @link  max}
 * @param  - Optional comparer function that it will use instead of its default to compare the
value of two items.
 * @return  An Observable that emits item with the smallest value.
 * @method  min
 * @owner  Observable
*/
  declare export function min<T>(
    comparer?: (x: T, y: T) => number
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/multicast" {
  declare export function multicast<T>(
    subjectOrSubjectFactory: FactoryOrValue<Subject<T>>
  ): UnaryFunction<Observable<T>, ConnectableObservable<T>>;

  declare export class MulticastOperator<T, R> mixins Operator<T, R> {
    constructor(
      subjectFactory: () => Subject<T>,
      selector: (source: Observable<T>) => Observable<R>
    ): this;
    call(subscriber: Subscriber<R>, source: any): any;
  }
}
declare module "rxjs/operators/internal/operators/observeOn" {
  /**
 * Re-emits all notifications from source Observable with specified scheduler.
 * 
<span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>

`observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
notifications emitted by the source Observable. It might be useful, if you do not have control over
internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.

Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
little bit more, to ensure that they are emitted at expected moments.

As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
will delay all notifications - including error notifications - while `delay` will pass through error
from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
for notification emissions in general.

## Example
Ensure values in subscribe are called just before browser repaint.
```javascript
const intervals = interval(10);                // Intervals are scheduled
                                                // with async scheduler by default...
intervals.pipe(
   observeOn(animationFrameScheduler),          // ...but we will observe on animationFrame
)                                              // scheduler to ensure smooth animation.
.subscribe(val => {
   someDiv.style.height = val + 'px';
});
```
 * @see  {
 * @link  delay}
 * @param  Scheduler that will be used to reschedule notifications from source Observable.
 * @param  Number of milliseconds that states with what delay every notification should be rescheduled.
 * @return  Observable that emits the same notifications as the source Observable,
but with provided scheduler.
 * @method  observeOn
 * @owner  Observable
*/
  declare export function observeOn<T>(
    scheduler: SchedulerLike,
    delay?: number
  ): MonoTypeOperatorFunction<T>;

  declare export class ObserveOnOperator<T> mixins Operator<T, T> {
    constructor(scheduler: SchedulerLike, delay?: number): this;
    call(subscriber: Subscriber<T>, source: any): TeardownLogic;
  }

  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class ObserveOnSubscriber<T> mixins Subscriber<T> {
    /**
     *
     * @nocollapse
     */
    static dispatch(arg: ObserveOnMessage): void;
    constructor(
      destination: Subscriber<T>,
      scheduler: SchedulerLike,
      delay?: number
    ): this;
    _next(value: T): void;
    _error(err: any): void;
    _complete(): void;
  }
  declare export class ObserveOnMessage {
    notification: Notification<any>;
    destination: PartialObserver<any>;
    constructor(
      notification: Notification<any>,
      destination: PartialObserver<any>
    ): this;
  }
}
declare module "rxjs/operators/internal/operators/onErrorResumeNext" {
  declare export function onErrorResumeNext<T, R>(
    v: ObservableInput<R>
  ): OperatorFunction<T, R>;

  declare export function onErrorResumeNextStatic<R>(
    v: ObservableInput<R>
  ): Observable<R>;
}
declare module "rxjs/operators/internal/operators/pairwise" {
  /**
 * Groups pairs of consecutive emissions together and emits them as an array of
 * two values.

<span class="informal">Puts the current value and previous value together as
an array, and emits that.</span>

![](pairwise.png)

The Nth emission from the source Observable will cause the output Observable
to emit an array [(N-1)th, Nth] of the previous and the current value, as a
pair. For this reason, `pairwise` emits on the second and subsequent
emissions from the source Observable, but not on the first emission, because
there is no previous value in that case.

## Example
On every click (starting from the second), emit the relative distance to the previous click
```javascript
const clicks = fromEvent(document, 'click');
const pairs = clicks.pipe(pairwise());
const distance = pairs.pipe(
   map(pair => {
     const x0 = pair[0].clientX;
     const y0 = pair[0].clientY;
     const x1 = pair[1].clientX;
     const y1 = pair[1].clientY;
     return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
   }),
);
distance.subscribe(x => console.log(x));
```
 * @see  {
 * @link  buffer}
 * @see  {
 * @link  bufferCount}
 * @return  An Observable of pairs (as arrays) of
consecutive values from the source Observable.
 * @method  pairwise
 * @owner  Observable
*/
  declare export function pairwise<T>(): OperatorFunction<T, [T, T]>;
}
declare module "rxjs/operators/internal/operators/partition" {
  /**
 * Splits the source Observable into two, one with values that satisfy a
 * predicate, and another with values that don't satisfy the predicate.

<span class="informal">It's like {@link filter}, but returns two Observables:
one like the output of {@link filter}, and the other with values that did not
pass the condition.</span>

![](partition.png)

`partition` outputs an array with two Observables that partition the values
from the source Observable through the given `predicate` function. The first
Observable in that array emits source values for which the predicate argument
returns true. The second Observable emits source values for which the
predicate returns false. The first behaves like {@link filter} and the second
behaves like {@link filter} with the predicate negated.

## Example
Partition click events into those on DIV elements and those elsewhere
```javascript
const clicks = fromEvent(document, 'click');
const parts = clicks.pipe(partition(ev => ev.target.tagName === 'DIV'));
const clicksOnDivs = parts[0];
const clicksElsewhere = parts[1];
clicksOnDivs.subscribe(x => console.log('DIV clicked: ', x));
clicksElsewhere.subscribe(x => console.log('Other clicked: ', x));
```
 * @see  {
 * @link  filter}
 * @param  , index: number): boolean} predicate A function that
evaluates each value emitted by the source Observable. If it returns `true`,
the value is emitted on the first Observable in the returned array, if
`false` the value is emitted on the second Observable in the array. The
`index` parameter is the number `i` for the i-th source emission that has
happened since the subscription, starting from the number `0`.
 * @param  An optional argument to determine the value of `this`
in the `predicate` function.
 * @return  An array with two Observables: one
with values that passed the predicate, and another with values that did not
pass the predicate.
 * @method  partition
 * @owner  Observable
*/
  declare export function partition<T>(
    predicate: (value: T, index: number) => boolean,
    thisArg?: any
  ): UnaryFunction<Observable<T>, [Observable<T>, Observable<T>]>;
}
declare module "rxjs/operators/internal/operators/pluck" {
  /**
 * Maps each source value (an object) to its specified nested property.
 * 
<span class="informal">Like {@link map}, but meant only for picking one of
the nested properties of every emitted object.</span>

![](pluck.png)

Given a list of strings describing a path to an object property, retrieves
the value of a specified nested property from all values in the source
Observable. If a property can't be resolved, it will return `undefined` for
that value.

## Example
Map every click to the tagName of the clicked target element
```javascript
const clicks = fromEvent(document, 'click');
const tagNames = clicks.pipe(pluck('target', 'tagName'));
tagNames.subscribe(x => console.log(x));
```
 * @see  {
 * @link  map}
 * @param  The nested properties to pluck from each source
value (an object).
 * @return  A new Observable of property values from the source values.
 * @method  pluck
 * @owner  Observable
*/
  declare export function pluck<T, R>(
    ...properties: string[]
  ): OperatorFunction<T, R>;
}
declare module "rxjs/operators/internal/operators/publish" {
  declare export function publish<T>(): UnaryFunction<
    Observable<T>,
    ConnectableObservable<T>
  >;
}
declare module "rxjs/operators/internal/operators/publishBehavior" {
  /**
   *
   * @param value
   * @return
   * @method  publishBehavior
   * @owner  Observable
   */
  declare export function publishBehavior<T>(
    value: T
  ): UnaryFunction<Observable<T>, ConnectableObservable<T>>;
}
declare module "rxjs/operators/internal/operators/publishLast" {
  /**
 * Returns a connectable observable sequence that shares a single subscription to the
 * underlying sequence containing only the last notification.

![](publishLast.png)

Similar to {@link publish}, but it waits until the source observable completes and stores
the last emitted value.
Similarly to {@link publishReplay} and {@link publishBehavior}, this keeps storing the last
value even if it has no more subscribers. If subsequent subscriptions happen, they will
immediately get that last stored value and complete.

## Example

```js
const connectable =
   interval(1000)
     .pipe(
       tap(x => console.log("side effect", x)),
       take(3),
       publishLast());

connectable.subscribe(
   x => console.log(  "Sub. A", x),
   err => console.log("Sub. A Error", err),
   () => console.log( "Sub. A Complete"));

connectable.subscribe(
   x => console.log(  "Sub. B", x),
   err => console.log("Sub. B Error", err),
   () => console.log( "Sub. B Complete"));

connectable.connect();

// Results:
//    "side effect 0"
//    "side effect 1"
//    "side effect 2"
//    "Sub. A 2"
//    "Sub. B 2"
//    "Sub. A Complete"
//    "Sub. B Complete"
```
 * @see  {
 * @link  ConnectableObservable}
 * @see  {
 * @link  publish}
 * @see  {
 * @link  publishReplay}
 * @see  {
 * @link  publishBehavior}
 * @return  An observable sequence that contains the elements of a
sequence produced by multicasting the source sequence.
 * @method  publishLast
 * @owner  Observable
*/
  declare export function publishLast<T>(): UnaryFunction<
    Observable<T>,
    ConnectableObservable<T>
  >;
}
declare module "rxjs/operators/internal/operators/publishReplay" {
  declare export function publishReplay<T>(
    bufferSize?: number,
    windowTime?: number,
    scheduler?: SchedulerLike
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/race" {
  /**
   *
   * @deprecated  Deprecated in favor of static race.
   */
  declare export function race<T>(
    observables: Array<Observable<T>>
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/reduce" {
  declare export function reduce<T>(
    accumulator: (acc: T, value: T, index: number) => T,
    seed?: T
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/repeat" {
  /**
 * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times.
 * 
![](repeat.png)
 * @param  The number of times the source Observable items are repeated, a count of 0 will yield
an empty Observable.
 * @return  An Observable that repeats the stream of items emitted by the source Observable at most
count times.
 * @method  repeat
 * @owner  Observable
*/
  declare export function repeat<T>(
    count?: number
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/repeatWhen" {
  /**
 * Returns an Observable that mirrors the source Observable with the exception of a `complete`. If the source
 * Observable calls `complete`, this method will emit to the Observable returned from `notifier`. If that Observable
calls `complete` or `error`, then this method will call `complete` or `error` on the child subscription. Otherwise
this method will resubscribe to the source Observable.

![](repeatWhen.png)
 * @param  ): Observable} notifier - Receives an Observable of notifications with
which a user can `complete` or `error`, aborting the repetition.
 * @return  The source Observable modified with repeat logic.
 * @method  repeatWhen
 * @owner  Observable
*/
  declare export function repeatWhen<T>(
    notifier: (notifications: Observable<any>) => Observable<any>
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/retry" {
  /**
 * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
 * calls `error`, this method will resubscribe to the source Observable for a maximum of `count` resubscriptions (given
as a number parameter) rather than propagating the `error` call.

![](retry.png)

Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
 * @param  - Number of retry attempts before failing.
 * @return  The source Observable modified with the retry logic.
 * @method  retry
 * @owner  Observable
*/
  declare export function retry<T>(count?: number): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/retryWhen" {
  /**
 * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
 * calls `error`, this method will emit the Throwable that caused the error to the Observable returned from `notifier`.
If that Observable calls `complete` or `error` then this method will call `complete` or `error` on the child
subscription. Otherwise this method will resubscribe to the source Observable.

![](retryWhen.png)
 * @param  ): Observable} notifier - Receives an Observable of notifications with which a
user can `complete` or `error`, aborting the retry.
 * @return  The source Observable modified with retry logic.
 * @method  retryWhen
 * @owner  Observable
*/
  declare export function retryWhen<T>(
    notifier: (errors: Observable<any>) => Observable<any>
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/refCount" {
  declare export function refCount<T>(): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/sample" {
  /**
 * Emits the most recently emitted value from the source Observable whenever
 * another Observable, the `notifier`, emits.

<span class="informal">It's like {@link sampleTime}, but samples whenever
the `notifier` Observable emits something.</span>

![](sample.png)

Whenever the `notifier` Observable emits a value or completes, `sample`
looks at the source Observable and emits whichever value it has most recently
emitted since the previous sampling, unless the source has not emitted
anything since the previous sampling. The `notifier` is subscribed to as soon
as the output Observable is subscribed.

## Example
On every click, sample the most recent "seconds" timer
```javascript
const seconds = interval(1000);
const clicks = fromEvent(document, 'click');
const result = seconds.pipe(sample(clicks));
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  audit}
 * @see  {
 * @link  debounce}
 * @see  {
 * @link  sampleTime}
 * @see  {
 * @link  throttle}
 * @param  The Observable to use for sampling the
source Observable.
 * @return  An Observable that emits the results of sampling the
values emitted by the source Observable whenever the notifier Observable
emits value or completes.
 * @method  sample
 * @owner  Observable
*/
  declare export function sample<T>(
    notifier: Observable<any>
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/sampleTime" {
  /**
 * Emits the most recently emitted value from the source Observable within
 * periodic time intervals.

<span class="informal">Samples the source Observable at periodic time
intervals, emitting what it samples.</span>

![](sampleTime.png)

`sampleTime` periodically looks at the source Observable and emits whichever
value it has most recently emitted since the previous sampling, unless the
source has not emitted anything since the previous sampling. The sampling
happens periodically in time every `period` milliseconds (or the time unit
defined by the optional `scheduler` argument). The sampling starts as soon as
the output Observable is subscribed.

## Example
Every second, emit the most recent click at most once
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(sampleTime(1000));
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  auditTime}
 * @see  {
 * @link  debounceTime}
 * @see  {
 * @link  delay}
 * @see  {
 * @link  sample}
 * @see  {
 * @link  throttleTime}
 * @param  The sampling period expressed in milliseconds or the
time unit determined internally by the optional `scheduler`.
 * @param  The {
 * @link  SchedulerLike} to use for
managing the timers that handle the sampling.
 * @return  An Observable that emits the results of sampling the
values emitted by the source Observable at the specified time interval.
 * @method  sampleTime
 * @owner  Observable
*/
  declare export function sampleTime<T>(
    period: number,
    scheduler?: SchedulerLike
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/scan" {
  declare export function scan<T>(
    accumulator: (acc: T, value: T, index: number) => T,
    seed?: T
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/sequenceEqual" {
  /**
 * Compares all values of two observables in sequence using an optional comparor function
 * and returns an observable of a single boolean value representing whether or not the two sequences
are equal.

<span class="informal">Checks to see of all values emitted by both observables are equal, in order.</span>

![](sequenceEqual.png)

`sequenceEqual` subscribes to two observables and buffers incoming values from each observable. Whenever either
observable emits a value, the value is buffered and the buffers are shifted and compared from the bottom
up; If any value pair doesn't match, the returned observable will emit `false` and complete. If one of the
observables completes, the operator will wait for the other observable to complete; If the other
observable emits before completing, the returned observable will emit `false` and complete. If one observable never
completes or emits after the other complets, the returned observable will never complete.

## Example
figure out if the Konami code matches
```javascript
const codes = from([
   'ArrowUp',
   'ArrowUp',
   'ArrowDown',
   'ArrowDown',
   'ArrowLeft',
   'ArrowRight',
   'ArrowLeft',
   'ArrowRight',
   'KeyB',
   'KeyA',
   'Enter', // no start key, clearly.
]);

const keys = fromEvent(document, 'keyup').pipe(map(e => e.code));
const matches = keys.pipe(
   bufferCount(11, 1),
   mergeMap(
     last11 => from(last11).pipe(sequenceEqual(codes)),
   ),
);
matches.subscribe(matched => console.log('Successful cheat at Contra? ', matched));
```
 * @see  {
 * @link  combineLatest}
 * @see  {
 * @link  zip}
 * @see  {
 * @link  withLatestFrom}
 * @param  The observable sequence to compare the source sequence to.
 * @param  An optional function to compare each value pair
 * @return  An Observable of a single boolean value representing whether or not
the values emitted by both observables were equal in sequence.
 * @method  sequenceEqual
 * @owner  Observable
*/
  declare export function sequenceEqual<T>(
    compareTo: Observable<T>,
    comparor?: (a: T, b: T) => boolean
  ): OperatorFunction<T, boolean>;

  declare export class SequenceEqualOperator<T> mixins Operator<T, boolean> {
    constructor(
      compareTo: Observable<T>,
      comparor: (a: T, b: T) => boolean
    ): this;
    call(subscriber: Subscriber<boolean>, source: any): any;
  }

  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class SequenceEqualSubscriber<T, R> mixins Subscriber<T> {
    constructor(
      destination: Observer<R>,
      compareTo: Observable<T>,
      comparor: (a: T, b: T) => boolean
    ): this;
    _next(value: T): void;
    _complete(): void;
    checkValues(): void;
    emit(value: boolean): void;
    nextB(value: T): void;
    completeB(): void;
  }
}
declare module "rxjs/operators/internal/operators/share" {
  /**
 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
This is an alias for `multicast(() => new Subject()), refCount()`.

![](share.png)
 * @return  An Observable that upon connection causes the source Observable to emit items to its Observers.
 * @method  share
 * @owner  Observable
*/
  declare export function share<T>(): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/shareReplay" {
  /**
 * Share source and replay specified number of emissions on subscription.
 * 
This operator is a specialization of `replay` that connects to a source observable
and multicasts through a `ReplaySubject` constructed with the specified arguments.
A successfully completed source will stay cached in the `shareReplayed observable` forever,
but an errored source can be retried.

## Why use shareReplay?
You generally want to use `shareReplay` when you have side-effects or taxing computations
that you do not wish to be executed amongst multiple subscribers.
It may also be valuable in situations where you know you will have late subscribers to
a stream that need access to previously emitted values.
This ability to replay values on subscription is what differentiates {@link share} and `shareReplay`.

![](shareReplay.png)

## Example
```javascript
const obs$ = interval(1000);
const subscription = obs$.pipe(
   take(4),
   shareReplay(3)
);
subscription.subscribe(x => console.log('source A: ', x));
subscription.subscribe(y => console.log('source B: ', y));

```
 * @see  {
 * @link  publish}
 * @see  {
 * @link  share}
 * @see  {
 * @link  publishReplay}
 * @param  Maximum element count of the replay buffer.
 * @param  Maximum time length of the replay buffer in milliseconds.
 * @param  Scheduler where connected observers within the selector function
will be invoked on.
 * @return  An observable sequence that contains the elements of a sequence produced
by multicasting the source sequence within a selector function.
 * @method  shareReplay
 * @owner  Observable
*/
  declare export function shareReplay<T>(
    bufferSize?: number,
    windowTime?: number,
    scheduler?: SchedulerLike
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/single" {
  /**
 * Returns an Observable that emits the single item emitted by the source Observable that matches a specified
 * predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no
items, notify of an IllegalArgumentException or NoSuchElementException respectively. If the source Observable
emits items but none match the specified predicate then `undefined` is emiited.

![](single.png)
 * @throws  {EmptyError} Delivers an EmptyError to the Observer's `error`
callback if the Observable completes before any `next` notification was sent.
 * @param  - A predicate function to evaluate items emitted by the source Observable.
 * @return  An Observable that emits the single item emitted by the source Observable that matches
the predicate or `undefined` when no items match.
 * @method  single
 * @owner  Observable
*/
  declare export function single<T>(
    predicate?: (value: T, index: number, source: Observable<T>) => boolean
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/skip" {
  /**
 * Returns an Observable that skips the first `count` items emitted by the source Observable.
 * 
![](skip.png)
 * @param  - The number of times, items emitted by source Observable should be skipped.
 * @return  An Observable that skips values emitted by the source Observable.
 * @method  skip
 * @owner  Observable
*/
  declare export function skip<T>(count: number): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/skipLast" {
  /**
 * Skip the last `count` values emitted by the source Observable.
 * 
![](skipLast.png)

`skipLast` returns an Observable that accumulates a queue with a length
enough to store the first `count` values. As more values are received,
values are taken from the front of the queue and produced on the result
sequence. This causes values to be delayed.

## Example
Skip the last 2 values of an Observable with many values
```javascript
const many = range(1, 5);
const skipLastTwo = many.pipe(skipLast(2));
skipLastTwo.subscribe(x => console.log(x));

// Results in:
// 1 2 3
```
 * @see  {
 * @link  skip}
 * @see  {
 * @link  skipUntil}
 * @see  {
 * @link  skipWhile}
 * @see  {
 * @link  take}
 * @throws  {ArgumentOutOfRangeError} When using `skipLast(i)`, it throws
ArgumentOutOrRangeError if `i < 0`.
 * @param  Number of elements to skip from the end of the source Observable.
 * @returns  An Observable that skips the last count values
emitted by the source Observable.
 * @method  skipLast
 * @owner  Observable
*/
  declare export function skipLast<T>(
    count: number
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/skipUntil" {
  /**
 * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
 * 
![](skipUntil.png)
 * @param  - The second Observable that has to emit an item before the source Observable's elements begin to
be mirrored by the resulting Observable.
 * @return  An Observable that skips items from the source Observable until the second Observable emits
an item, then emits the remaining items.
 * @method  skipUntil
 * @owner  Observable
*/
  declare export function skipUntil<T>(
    notifier: Observable<any>
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/skipWhile" {
  /**
 * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
 * true, but emits all further source items as soon as the condition becomes false.

![](skipWhile.png)
 * @param  - A function to test each item emitted from the source Observable.
 * @return  An Observable that begins emitting items emitted by the source Observable when the
specified predicate becomes false.
 * @method  skipWhile
 * @owner  Observable
*/
  declare export function skipWhile<T>(
    predicate: (value: T, index: number) => boolean
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/startWith" {
  declare export function startWith<T>(
    scheduler?: SchedulerLike
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/subscribeOn" {
  /**
 * Asynchronously subscribes Observers to this Observable on the specified {@link SchedulerLike}.
 * 
![](subscribeOn.png)
 * @param  - The {
 * @link  SchedulerLike} to perform subscription actions on.
 * @return  The source Observable modified so that its subscriptions happen on the specified {
 * @link  SchedulerLike}.
.
 * @method  subscribeOn
 * @owner  Observable
*/
  declare export function subscribeOn<T>(
    scheduler: SchedulerLike,
    delay?: number
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/switchAll" {
  declare export function switchAll<T>(): OperatorFunction<
    ObservableInput<T>,
    T
  >;
}
declare module "rxjs/operators/internal/operators/switchMap" {
  declare export function switchMap<T, R>(
    project: (value: T, index: number) => ObservableInput<R>
  ): OperatorFunction<T, R>;
}
declare module "rxjs/operators/internal/operators/switchMapTo" {
  declare export function switchMapTo<R>(
    observable: ObservableInput<R>
  ): OperatorFunction<any, R>;
}
declare module "rxjs/operators/internal/operators/take" {
  /**
 * Emits only the first `count` values emitted by the source Observable.
 * 
<span class="informal">Takes the first `count` values from the source, then
completes.</span>

![](take.png)

`take` returns an Observable that emits only the first `count` values emitted
by the source Observable. If the source emits fewer than `count` values then
all of its values are emitted. After that, it completes, regardless if the
source completes.

## Example
Take the first 5 seconds of an infinite 1-second interval Observable
```javascript
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const intervalCount = interval(1000);
const takeFive = intervalCount.pipe(take(5));
takeFive.subscribe(x => console.log(x));

// Logs:
// 0
// 1
// 2
// 3
// 4
```
 * @see  {
 * @link  takeLast}
 * @see  {
 * @link  takeUntil}
 * @see  {
 * @link  takeWhile}
 * @see  {
 * @link  skip}
 * @throws  {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 * @param  The maximum number of `next` values to emit.
 * @return  An Observable that emits only the first `count`
values emitted by the source Observable, or all of the values from the source
if the source emits fewer than `count` values.
 * @method  take
 * @owner  Observable
*/
  declare export function take<T>(count: number): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/takeLast" {
  /**
 * Emits only the last `count` values emitted by the source Observable.
 * 
<span class="informal">Remembers the latest `count` values, then emits those
only when the source completes.</span>

![](takeLast.png)

`takeLast` returns an Observable that emits at most the last `count` values
emitted by the source Observable. If the source emits fewer than `count`
values then all of its values are emitted. This operator must wait until the
`complete` notification emission from the source in order to emit the `next`
values on the output Observable, because otherwise it is impossible to know
whether or not more values will be emitted on the source. For this reason,
all values are emitted synchronously, followed by the complete notification.

## Example
Take the last 3 values of an Observable with many values
```javascript
const many = range(1, 100);
const lastThree = many.pipe(takeLast(3));
lastThree.subscribe(x => console.log(x));
```
 * @see  {
 * @link  take}
 * @see  {
 * @link  takeUntil}
 * @see  {
 * @link  takeWhile}
 * @see  {
 * @link  skip}
 * @throws  {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 * @param  The maximum number of values to emit from the end of
the sequence of values emitted by the source Observable.
 * @return  An Observable that emits at most the last count
values emitted by the source Observable.
 * @method  takeLast
 * @owner  Observable
*/
  declare export function takeLast<T>(
    count: number
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/takeUntil" {
  /**
 * Emits the values emitted by the source Observable until a `notifier`
 * Observable emits a value.

<span class="informal">Lets values pass until a second Observable,
`notifier`, emits a value. Then, it completes.</span>

![](takeUntil.png)

`takeUntil` subscribes and begins mirroring the source Observable. It also
monitors a second Observable, `notifier` that you provide. If the `notifier`
emits a value, the output Observable stops mirroring the source Observable
and completes. If the `notifier` doesn't emit any value and completes
then `takeUntil` will pass all values.

## Example
Tick every second until the first click happens
```javascript
const interval = interval(1000);
const clicks = fromEvent(document, 'click');
const result = interval.pipe(takeUntil(clicks));
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  take}
 * @see  {
 * @link  takeLast}
 * @see  {
 * @link  takeWhile}
 * @see  {
 * @link  skip}
 * @param  The Observable whose first emitted value will
cause the output Observable of `takeUntil` to stop emitting values from the
source Observable.
 * @return  An Observable that emits the values from the source
Observable until such time as `notifier` emits its first value.
 * @method  takeUntil
 * @owner  Observable
*/
  declare export function takeUntil<T>(
    notifier: Observable<any>
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/takeWhile" {
  declare export function takeWhile<T, S>(
    predicate: (value: T, index: number) => S
  ): OperatorFunction<T, S>;
}
declare module "rxjs/operators/internal/operators/tap" {
  declare export function tap<T>(
    next?: (x: T) => void,
    error?: (e: any) => void,
    complete?: () => void
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/throttle" {
  declare export interface ThrottleConfig {
    leading?: boolean;
    trailing?: boolean;
  }
  declare export var defaultThrottleConfig: ThrottleConfig;

  /**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for a duration determined by another Observable, then repeats this
process.

<span class="informal">It's like {@link throttleTime}, but the silencing
duration is determined by a second Observable.</span>

![](throttle.png)

`throttle` emits the source Observable values on the output Observable
when its internal timer is disabled, and ignores source values when the timer
is enabled. Initially, the timer is disabled. As soon as the first source
value arrives, it is forwarded to the output Observable, and then the timer
is enabled by calling the `durationSelector` function with the source value,
which returns the "duration" Observable. When the duration Observable emits a
value or completes, the timer is disabled, and this process repeats for the
next source value.

## Example
Emit clicks at a rate of at most one click per second
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(throttle(ev => interval(1000)));
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  audit}
 * @see  {
 * @link  debounce}
 * @see  {
 * @link  delayWhen}
 * @see  {
 * @link  sample}
 * @see  {
 * @link  throttleTime}
 * @param  ): SubscribableOrPromise} durationSelector A function
that receives a value from the source Observable, for computing the silencing
duration for each source value, returned as an Observable or a Promise.
 * @param  a configuration object to define `leading` and `trailing` behavior. Defaults
to `{ leading: true, trailing: false }`.
 * @return  An Observable that performs the throttle operation to
limit the rate of emissions from the source.
 * @method  throttle
 * @owner  Observable
*/
  declare export function throttle<T>(
    durationSelector: (value: T) => SubscribableOrPromise<any>,
    config?: ThrottleConfig
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/throttleTime" {
  /**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for `duration` milliseconds, then repeats this process.

<span class="informal">Lets a value pass, then ignores source values for the
next `duration` milliseconds.</span>

![](throttleTime.png)

`throttleTime` emits the source Observable values on the output Observable
when its internal timer is disabled, and ignores source values when the timer
is enabled. Initially, the timer is disabled. As soon as the first source
value arrives, it is forwarded to the output Observable, and then the timer
is enabled. After `duration` milliseconds (or the time unit determined
internally by the optional `scheduler`) has passed, the timer is disabled,
and this process repeats for the next source value. Optionally takes a
{@link SchedulerLike} for managing timers.

## Example
Emit clicks at a rate of at most one click per second
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(throttleTime(1000));
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  auditTime}
 * @see  {
 * @link  debounceTime}
 * @see  {
 * @link  delay}
 * @see  {
 * @link  sampleTime}
 * @see  {
 * @link  throttle}
 * @param  Time to wait before emitting another value after
emitting the last value, measured in milliseconds or the time unit determined
internally by the optional `scheduler`.
 * @param  The {
 * @link  SchedulerLike} to use for
managing the timers that handle the throttling.
 * @param  a configuration object to define `leading` and
`trailing` behavior. Defaults to `{ leading: true, trailing: false }`.
 * @return  An Observable that performs the throttle operation to
limit the rate of emissions from the source.
 * @method  throttleTime
 * @owner  Observable
*/
  declare export function throttleTime<T>(
    duration: number,
    scheduler?: SchedulerLike,
    config?: ThrottleConfig
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/throwIfEmpty" {
  declare export var throwIfEmpty: <T>(
    errorFactory?: () => any
  ) => MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/timeInterval" {
  declare export function timeInterval<T>(
    scheduler?: SchedulerLike
  ): OperatorFunction<T, TimeInterval<T>>;

  declare export class TimeInterval<T> {
    value: T;
    interval: number;
    constructor(value: T, interval: number): this;
  }
}
declare module "rxjs/operators/internal/operators/timeout" {
  /**
 * Errors if Observable does not emit a value in given time span.
 * 
<span class="informal">Timeouts on Observable that doesn't emit values fast enough.</span>

![](timeout.png)

`timeout` operator accepts as an argument either a number or a Date.

If number was provided, it returns an Observable that behaves like a source
Observable, unless there is a period of time where there is no value emitted.
So if you provide `100` as argument and first value comes after 50ms from
the moment of subscription, this value will be simply re-emitted by the resulting
Observable. If however after that 100ms passes without a second value being emitted,
stream will end with an error and source Observable will be unsubscribed.
These checks are performed throughout whole lifecycle of Observable - from the moment
it was subscribed to, until it completes or errors itself. Thus every value must be
emitted within specified period since previous value.

If provided argument was Date, returned Observable behaves differently. It throws
if Observable did not complete before provided Date. This means that periods between
emission of particular values do not matter in this case. If Observable did not complete
before provided Date, source Observable will be unsubscribed. Other than that, resulting
stream behaves just as source Observable.

`timeout` accepts also a Scheduler as a second parameter. It is used to schedule moment (or moments)
when returned Observable will check if source stream emitted value or completed.

## Examples
Check if ticks are emitted within certain timespan
```javascript
const seconds = interval(1000);

seconds.pipe(timeout(1100))      // Let's use bigger timespan to be safe,
                                  // since `interval` might fire a bit later then scheduled.
.subscribe(
     value => console.log(value), // Will emit numbers just as regular `interval` would.
     err => console.log(err),     // Will never be called.
);

seconds.pipe(timeout(900))
.subscribe(
     value => console.log(value), // Will never be called.
     err => console.log(err),     // Will emit error before even first value is emitted,
                                  // since it did not arrive within 900ms period.
);
```

Use Date to check if Observable completed
```javascript
const seconds = interval(1000);

seconds.pipe(
   timeout(new Date("December 17, 2020 03:24:00")),
)
.subscribe(
     value => console.log(value), // Will emit values as regular `interval` would
                                  // until December 17, 2020 at 03:24:00.
     err => console.log(err)      // On December 17, 2020 at 03:24:00 it will emit an error,
                                  // since Observable did not complete by then.
);
```
 * @see  {
 * @link  timeoutWith}
 * @param  Number specifying period within which Observable must emit values
or Date specifying before when Observable should complete
 * @param  Scheduler controlling when timeout checks occur.
 * @return  Observable that mirrors behaviour of source, unless timeout checks fail.
 * @method  timeout
 * @owner  Observable
*/
  declare export function timeout<T>(
    due: number | Date,
    scheduler?: SchedulerLike
  ): MonoTypeOperatorFunction<T>;
}
declare module "rxjs/operators/internal/operators/timeoutWith" {
  declare export function timeoutWith<T, R>(
    due: number | Date,
    withObservable: ObservableInput<R>,
    scheduler?: SchedulerLike
  ): OperatorFunction<T, T | R>;
}
declare module "rxjs/operators/internal/operators/timestamp" {
  /**
   *
   * @param scheduler
   * @return
   * @method  timestamp
   * @owner  Observable
   */
  declare export function timestamp<T>(
    scheduler?: SchedulerLike
  ): OperatorFunction<T, Timestamp<T>>;

  declare export class Timestamp<T> mixins TimestampInterface<T> {
    value: T;
    timestamp: number;
    constructor(value: T, timestamp: number): this;
  }
}
declare module "rxjs/operators/internal/operators/toArray" {
  declare export function toArray<T>(): OperatorFunction<T, T[]>;
}
declare module "rxjs/operators/internal/operators/window" {
  /**
 * Branch out the source Observable values as a nested Observable whenever
 * `windowBoundaries` emits.

<span class="informal">It's like {@link buffer}, but emits a nested Observable
instead of an array.</span>

![](window.png)

Returns an Observable that emits windows of items it collects from the source
Observable. The output Observable emits connected, non-overlapping
windows. It emits the current window and opens a new one whenever the
Observable `windowBoundaries` emits an item. Because each window is an
Observable, the output is a higher-order Observable.

## Example
In every window of 1 second each, emit at most 2 click events
```javascript
const clicks = fromEvent(document, 'click');
const interval = interval(1000);
const result = clicks.pipe(
   window(interval),
   map(win => win.take(2)), // each window has at most 2 emissions
   mergeAll(),              // flatten the Observable-of-Observables
);
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  windowCount}
 * @see  {
 * @link  windowTime}
 * @see  {
 * @link  windowToggle}
 * @see  {
 * @link  windowWhen}
 * @see  {
 * @link  buffer}
 * @param  An Observable that completes the
previous window and starts a new window.
 * @return  An Observable of windows, which are
Observables emitting values of the source Observable.
 * @method  window
 * @owner  Observable
*/
  declare export function window<T>(
    windowBoundaries: Observable<any>
  ): OperatorFunction<T, Observable<T>>;
}
declare module "rxjs/operators/internal/operators/windowCount" {
  /**
 * Branch out the source Observable values as a nested Observable with each
 * nested Observable emitting at most `windowSize` values.

<span class="informal">It's like {@link bufferCount}, but emits a nested
Observable instead of an array.</span>

![](windowCount.png)

Returns an Observable that emits windows of items it collects from the source
Observable. The output Observable emits windows every `startWindowEvery`
items, each containing no more than `windowSize` items. When the source
Observable completes or encounters an error, the output Observable emits
the current window and propagates the notification from the source
Observable. If `startWindowEvery` is not provided, then new windows are
started immediately at the start of the source and when each window completes
with size `windowSize`.

## Examples
Ignore every 3rd click event, starting from the first one
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
   windowCount(3)),
   map(win => win.skip(1)), // skip first of every 3 clicks
   mergeAll(),              // flatten the Observable-of-Observables
);
result.subscribe(x => console.log(x));
```

Ignore every 3rd click event, starting from the third one
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
   windowCount(2, 3),
   mergeAll(),              // flatten the Observable-of-Observables
);
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  window}
 * @see  {
 * @link  windowTime}
 * @see  {
 * @link  windowToggle}
 * @see  {
 * @link  windowWhen}
 * @see  {
 * @link  bufferCount}
 * @param  The maximum number of values emitted by each
window.
 * @param  Interval at which to start a new window.
For example if `startWindowEvery` is `2`, then a new window will be started
on every other value from the source. A new window is started at the
beginning of the source by default.
 * @return  An Observable of windows, which in turn
are Observable of values.
 * @method  windowCount
 * @owner  Observable
*/
  declare export function windowCount<T>(
    windowSize: number,
    startWindowEvery?: number
  ): OperatorFunction<T, Observable<T>>;
}
declare module "rxjs/operators/internal/operators/windowTime" {
  /**
 * Branch out the source Observable values as a nested Observable periodically
 * in time.

<span class="informal">It's like {@link bufferTime}, but emits a nested
Observable instead of an array.</span>

![](windowTime.png)

Returns an Observable that emits windows of items it collects from the source
Observable. The output Observable starts a new window periodically, as
determined by the `windowCreationInterval` argument. It emits each window
after a fixed timespan, specified by the `windowTimeSpan` argument. When the
source Observable completes or encounters an error, the output Observable
emits the current window and propagates the notification from the source
Observable. If `windowCreationInterval` is not provided, the output
Observable starts a new window when the previous window of duration
`windowTimeSpan` completes. If `maxWindowCount` is provided, each window
will emit at most fixed number of values. Window will complete immediately
after emitting last value and next one still will open as specified by
`windowTimeSpan` and `windowCreationInterval` arguments.

## Examples
In every window of 1 second each, emit at most 2 click events
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
   windowTime(1000),
   map(win => win.take(2)),   // each window has at most 2 emissions
   mergeAll(),                // flatten the Observable-of-Observables
);
result.subscribe(x => console.log(x));
```

Every 5 seconds start a window 1 second long, and emit at most 2 click events per window
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
   windowTime(1000, 5000),
   map(win => win.take(2)),   // each window has at most 2 emissions
   mergeAll(),                // flatten the Observable-of-Observables
);
result.subscribe(x => console.log(x));
```

Same as example above but with maxWindowCount instead of take
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
   windowTime(1000, 5000, 2), // each window has still at most 2 emissions
   mergeAll(),                // flatten the Observable-of-Observables
);
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  window}
 * @see  {
 * @link  windowCount}
 * @see  {
 * @link  windowToggle}
 * @see  {
 * @link  windowWhen}
 * @see  {
 * @link  bufferTime}
 * @param  The amount of time to fill each window.
 * @param  The interval at which to start new
windows.
 * @param  Max number of
values each window can emit before completion.
 * @param  The scheduler on which to schedule the
intervals that determine window boundaries.
 * @return  An observable of windows, which in turn
are Observables.
 * @method  windowTime
 * @owner  Observable
*/
  declare export function windowTime<T>(
    windowTimeSpan: number,
    scheduler?: SchedulerLike
  ): OperatorFunction<T, Observable<T>>;
}
declare module "rxjs/operators/internal/operators/windowToggle" {
  /**
 * Branch out the source Observable values as a nested Observable starting from
 * an emission from `openings` and ending when the output of `closingSelector`
emits.

<span class="informal">It's like {@link bufferToggle}, but emits a nested
Observable instead of an array.</span>

![](windowToggle.png)

Returns an Observable that emits windows of items it collects from the source
Observable. The output Observable emits windows that contain those items
emitted by the source Observable between the time when the `openings`
Observable emits an item and when the Observable returned by
`closingSelector` emits an item.

## Example
Every other second, emit the click events from the next 500ms
```javascript
const clicks = fromEvent(document, 'click');
const openings = interval(1000);
const result = clicks.pipe(
   windowToggle(openings, i => i % 2 ? interval(500) : empty()),
   mergeAll(),
);
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  window}
 * @see  {
 * @link  windowCount}
 * @see  {
 * @link  windowTime}
 * @see  {
 * @link  windowWhen}
 * @see  {
 * @link  bufferToggle}
 * @param  An observable of notifications to start new
windows.
 * @param  ): Observable} closingSelector A function that takes
the value emitted by the `openings` observable and returns an Observable,
which, when it emits (either `next` or `complete`), signals that the
associated window should complete.
 * @return  An observable of windows, which in turn
are Observables.
 * @method  windowToggle
 * @owner  Observable
*/
  declare export function windowToggle<T, O>(
    openings: Observable<O>,
    closingSelector: (openValue: O) => Observable<any>
  ): OperatorFunction<T, Observable<T>>;
}
declare module "rxjs/operators/internal/operators/windowWhen" {
  /**
 * Branch out the source Observable values as a nested Observable using a
 * factory function of closing Observables to determine when to start a new
window.

<span class="informal">It's like {@link bufferWhen}, but emits a nested
Observable instead of an array.</span>

![](windowWhen.png)

Returns an Observable that emits windows of items it collects from the source
Observable. The output Observable emits connected, non-overlapping windows.
It emits the current window and opens a new one whenever the Observable
produced by the specified `closingSelector` function emits an item. The first
window is opened immediately when subscribing to the output Observable.

## Example
Emit only the first two clicks events in every window of [1-5] random seconds
```javascript
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
   windowWhen(() => interval(1000 + Math.random() * 4000)),
   map(win => win.pipe(take(2))),     // each window has at most 2 emissions
   mergeAll(),                        // flatten the Observable-of-Observables
);
result.subscribe(x => console.log(x));
```
 * @see  {
 * @link  window}
 * @see  {
 * @link  windowCount}
 * @see  {
 * @link  windowTime}
 * @see  {
 * @link  windowToggle}
 * @see  {
 * @link  bufferWhen}
 * @param  A function that takes no
arguments and returns an Observable that signals (on either `next` or
`complete`) when to close the previous window and start a new one.
 * @return  An observable of windows, which in turn
are Observables.
 * @method  windowWhen
 * @owner  Observable
*/
  declare export function windowWhen<T>(
    closingSelector: () => Observable<any>
  ): OperatorFunction<T, Observable<T>>;
}
declare module "rxjs/operators/internal/operators/withLatestFrom" {
  declare export function withLatestFrom<T, R>(
    project: (v1: T) => R
  ): OperatorFunction<T, R>;
}
declare module "rxjs/operators/internal/operators/zip" {
  /**
   *
   * @deprecated  Deprecated in favor of static zip.
   */
  declare export function zip<T, R>(
    project: (v1: T) => R
  ): OperatorFunction<T, R>;
}
declare module "rxjs/operators/internal/operators/zipAll" {
  declare export function zipAll<T>(): OperatorFunction<
    ObservableInput<T>,
    T[]
  >;
}
declare module "rxjs/operators/internal/types" {
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
declare module "rxjs/operators/internal/Observable" {
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
declare module "rxjs/operators/internal/Notification" {
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
declare module "rxjs/operators/internal/Subscriber" {
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
declare module "rxjs/operators/internal/OuterSubscriber" {
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class OuterSubscriber<T, R> mixins Subscriber<T> {
    notifyNext(
      outerValue: T,
      innerValue: R,
      outerIndex: number,
      innerIndex: number,
      innerSub: InnerSubscriber<T, R>
    ): void;
    notifyError(error: any, innerSub: InnerSubscriber<T, R>): void;
    notifyComplete(innerSub: InnerSubscriber<T, R>): void;
  }
}
declare module "rxjs/operators/internal/InnerSubscriber" {
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends  {Ignored}
   */
  declare export class InnerSubscriber<T, R> mixins Subscriber<R> {
    outerValue: T;
    outerIndex: number;
    constructor(
      parent: OuterSubscriber<T, R>,
      outerValue: T,
      outerIndex: number
    ): this;
    _next(value: R): void;
    _error(error: any): void;
    _complete(): void;
  }
}
declare module "rxjs/operators/internal/Operator" {
  declare export interface Operator<T, R> {
    call(subscriber: Subscriber<R>, source: any): TeardownLogic;
  }
}
declare module "rxjs/operators/internal/Subscription" {
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
declare module "rxjs/operators/internal/Subject" {
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
declare module "rxjs/operators/internal/observable/ConnectableObservable" {
  /**
   *
   * @class  ConnectableObservable<T>
   */
  declare export class ConnectableObservable<T> mixins Observable<T> {
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
  declare export var connectableObservableDescriptor: PropertyDescriptorMap;
}
declare module "rxjs/operators/internal/observable/iif" {
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
declare module "rxjs/operators/internal/observable/throwError" {
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
