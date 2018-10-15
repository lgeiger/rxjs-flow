declare module "rxjs/webSocket" {
}
declare module "rxjs/webSocket/internal/observable/dom/webSocket" {
  /**
 * Wrapper around the w3c-compatible WebSocket object provided by the browser.
 * 
<span class="informal">{@link Subject} that communicates with a server via WebSocket</span>

`webSocket` is a factory function that produces a `WebSocketSubject`,
which can be used to make WebSocket connection with an arbitrary endpoint.
`webSocket` accepts as an argument either a string with url of WebSocket endpoint, or an
{@link WebSocketSubjectConfig} object for providing additional configuration, as
well as Observers for tracking lifecycle of WebSocket connection.

When `WebSocketSubject` is subscribed, it attempts to make a socket connection,
unless there is one made already. This means that many subscribers will always listen
on the same socket, thus saving resources. If however, two instances are made of `WebSocketSubject`,
even if these two were provided with the same url, they will attempt to make separate
connections. When consumer of a `WebSocketSubject` unsubscribes, socket connection is closed,
only if there are no more subscribers still listening. If after some time a consumer starts
subscribing again, connection is reestablished.

Once connection is made, whenever a new message comes from the server, `WebSocketSubject` will emit that
message as a value in the stream. By default, a message from the socket is parsed via `JSON.parse`. If you
want to customize how deserialization is handled (if at all), you can provide custom `resultSelector`
function in {@link WebSocketSubject}. When connection closes, stream will complete, provided it happened without
any errors. If at any point (starting, maintaining or closing a connection) there is an error,
stream will also error with whatever WebSocket API has thrown.

By virtue of being a {@link Subject}, `WebSocketSubject` allows for receiving and sending messages from the server. In order
to communicate with a connected endpoint, use `next`, `error` and `complete` methods. `next` sends a value to the server, so bear in mind
that this value will not be serialized beforehand. Because of This, `JSON.stringify` will have to be called on a value by hand,
before calling `next` with a result. Note also that if at the moment of nexting value
there is no socket connection (for example no one is subscribing), those values will be buffered, and sent when connection
is finally established. `complete` method closes socket connection. `error` does the same,
as well as notifying the server that something went wrong via status code and string with details of what happened.
Since status code is required in WebSocket API, `WebSocketSubject` does not allow, like regular `Subject`,
arbitrary values being passed to the `error` method. It needs to be called with an object that has `code`
property with status code number and optional `reason` property with string describing details
of an error.

Calling `next` does not affect subscribers of `WebSocketSubject` - they have no
information that something was sent to the server (unless of course the server
responds somehow to a message). On the other hand, since calling `complete` triggers
an attempt to close socket connection. If that connection is closed without any errors, stream will
complete, thus notifying all subscribers. And since calling `error` closes
socket connection as well, just with a different status code for the server, if closing itself proceeds
without errors, subscribed Observable will not error, as one might expect, but complete as usual. In both cases
(calling `complete` or `error`), if process of closing socket connection results in some errors, *then* stream
will error.

**Multiplexing**

`WebSocketSubject` has an additional operator, not found in other Subjects. It is called `multiplex` and it is
used to simulate opening several socket connections, while in reality maintaining only one.
For example, an application has both chat panel and real-time notifications about sport news. Since these are two distinct functions,
it would make sense to have two separate connections for each. Perhaps there could even be two separate services with WebSocket
endpoints, running on separate machines with only GUI combining them together. Having a socket connection
for each functionality could become too resource expensive. It is a common pattern to have single
WebSocket endpoint that acts as a gateway for the other services (in this case chat and sport news services).
Even though there is a single connection in a client app, having the ability to manipulate streams as if it
were two separate sockets is desirable. This eliminates manually registering and unregistering in a gateway for
given service and filter out messages of interest. This is exactly what `multiplex` method is for.

Method accepts three parameters. First two are functions returning subscription and unsubscription messages
respectively. These are messages that will be sent to the server, whenever consumer of resulting Observable
subscribes and unsubscribes. Server can use them to verify that some kind of messages should start or stop
being forwarded to the client. In case of the above example application, after getting subscription message with proper identifier,
gateway server can decide that it should connect to real sport news service and start forwarding messages from it.
Note that both messages will be sent as returned by the functions, meaning they will have to be serialized manually, just
as messages pushed via `next`. Also bear in mind that these messages will be sent on *every* subscription and
unsubscription. This is potentially dangerous, because one consumer of an Observable may unsubscribe and the server
might stop sending messages, since it got unsubscription message. This needs to be handled
on the server or using {@link publish} on a Observable returned from 'multiplex'.

Last argument to `multiplex` is a `messageFilter` function which filters out messages
sent by the server to only those that belong to simulated WebSocket stream. For example, server might mark these
messages with some kind of string identifier on a message object and `messageFilter` would return `true`
if there is such identifier on an object emitted by the socket.

Return value of `multiplex` is an Observable with messages incoming from emulated socket connection. Note that this
is not a `WebSocketSubject`, so calling `next` or `multiplex` again will fail. For pushing values to the
server, use root `WebSocketSubject`.

### Examples
#### Listening for messages from the server
const subject = Rx.Observable.webSocket('ws://localhost:8081');

subject.subscribe(
    (msg) => console.log('message received: ' + msg), // Called whenever there is a message from the server.
    (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
    () => console.log('complete') // Called when connection is closed (for whatever reason).
  );


#### Pushing messages to the server
const subject = Rx.Observable.webSocket('ws://localhost:8081');

subject.subscribe(); // Note that at least one consumer has to subscribe to
                      // the created subject - otherwise "nexted" values will be just
                      // buffered and not sent, since no connection was established!

subject.next(JSON.stringify({message: 'some message'})); // This will send a message to the server
                                                          // once a connection is made.
                                                          // Remember to serialize sent value first!

subject.complete(); // Closes the connection.


subject.error({code: 4000, reason: 'I think our app just broke!'}); // Also closes the connection,
                                                                     // but let's the server know that
                                                                     // this closing is caused by some error.


#### Multiplexing WebSocket
const subject = Rx.Observable.webSocket('ws://localhost:8081');

const observableA = subject.multiplex(
   () => JSON.stringify({subscribe: 'A'}), // When server gets this message, it will start sending messages for 'A'...
   () => JSON.stringify({unsubscribe: 'A'}), // ...and when gets this one, it will stop.
   message => message.type === 'A' // Server will tag all messages for 'A' with type property.
);

const observableB = subject.multiplex( // And the same goes for 'B'.
   () => JSON.stringify({subscribe: 'B'}),
   () => JSON.stringify({unsubscribe: 'B'}),
   message => message.type === 'B'
);

const subA = observableA.subscribe(messageForA => console.log(messageForA));
// At this moment WebSocket connection
// is established. Server gets '{"subscribe": "A"}'
// message and starts sending messages for 'A',
// which we log here.

const subB = observableB.subscribe(messageForB => console.log(messageForB));
// Since we already have a connection,
// we just send '{"subscribe": "B"}' message
// to the server. It starts sending
// messages for 'B', which we log here.

subB.unsubscribe();
// Message '{"unsubscribe": "B"}' is sent to the
// server, which stops sending 'B' messages.

subA.unubscribe();
// Message '{"unsubscribe": "A"}' makes the server
// stop sending messages for 'A'. Since there is
// no more subscribers to root Subject, socket
// connection closes.
 * @param  The WebSocket endpoint as an url or an object with
configuration and additional Observers.
 * @return  Subject which allows to both send and receive messages via WebSocket connection.
*/
  declare export function webSocket<T>(
    urlConfigOrSource: string | WebSocketSubjectConfig<T>
  ): WebSocketSubject<T>;
}
declare module "rxjs/webSocket/internal/observable/dom/WebSocketSubject" {
  declare export interface WebSocketSubjectConfig<T> {
    /**
     * The url of the socket server to connect to
     */
    url: string;

    /**
     * The protocol to use to connect
     */
    protocol?: string | Array<string>;

    /**
     *
     * @deprecated  use {
     * @link  deserializer}
     */
    resultSelector?: (e: MessageEvent) => T;

    /**
     * A serializer used to create messages from passed values before the
     * messages are sent to the server. Defaults to JSON.stringify.
     */
    serializer?: (value: T) => WebSocketMessage;

    /**
     * A deserializer used for messages arriving on the socket from the
     * server. Defaults to JSON.parse.
     */
    deserializer?: (e: MessageEvent) => T;

    /**
     * An Observer that watches when open events occur on the underlying web socket.
     */
    openObserver?: NextObserver<Event>;

    /**
     * An Observer than watches when close events occur on the underlying webSocket
     */
    closeObserver?: NextObserver<CloseEvent>;

    /**
     * An Observer that watches when a close is about to occur due to
     * unsubscription.
     */
    closingObserver?: NextObserver<void>;

    /**
 * A WebSocket constructor to use. This is useful for situations like using a
 * WebSocket impl in Node (WebSocket is a DOM API), or for mocking a WebSocket
for testing purposes
*/
    WebSocketCtor?: {
      new(url: string, protocols?: string | string[]): WebSocket
    };

    /**
     * Sets the `binaryType` property of the underlying WebSocket.
     */
    binaryType?: "blob" | "arraybuffer";
  }
  declare export type WebSocketMessage =
    | string
    | ArrayBuffer
    | Blob
    | ArrayBufferView;

  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @extends  {Ignored}
   * @hide  true
   */
  declare export class WebSocketSubject<T> mixins AnonymousSubject<T> {
    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _output: Subject<T>;
    constructor(
      urlConfigOrSource: string | WebSocketSubjectConfig<T> | Observable<T>,
      destination?: Observer<T>
    ): this;
    lift<R>(operator: Operator<T, R>): WebSocketSubject<R>;

    /**
 * Creates an {@link Observable}, that when subscribed to, sends a message,
 * defined by the `subMsg` function, to the server over the socket to begin a
subscription to data over that socket. Once data arrives, the
`messageFilter` argument will be used to select the appropriate data for
the resulting Observable. When teardown occurs, either due to
unsubscription, completion or error, a message defined by the `unsubMsg`
argument will be send to the server over the WebSocketSubject.
 * @param subMsg A function to generate the subscription message to be sent to
the server. This will still be processed by the serializer in the
WebSocketSubject's config. (Which defaults to JSON serialization)
 * @param unsubMsg A function to generate the unsubscription message to be
sent to the server at teardown. This will still be processed by the
serializer in the WebSocketSubject's config.
 * @param messageFilter A predicate for selecting the appropriate messages
from the server for the output stream.
*/
    multiplex(
      subMsg: () => any,
      unsubMsg: () => any,
      messageFilter: (value: T) => boolean
    ): Observable<any>;

    /**
     *
     * @deprecated  This is an internal implementation detail, do not use.
     */
    _subscribe(subscriber: Subscriber<T>): Subscription;
    unsubscribe(): void;
  }
}
declare module "rxjs/webSocket/internal/Subject" {
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
declare module "rxjs/webSocket/internal/Subscriber" {
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
declare module "rxjs/webSocket/internal/Observable" {
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
declare module "rxjs/webSocket/internal/Subscription" {
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
declare module "rxjs/webSocket/internal/Operator" {
  declare export interface Operator<T, R> {
    call(subscriber: Subscriber<R>, source: any): TeardownLogic;
  }
}
declare module "rxjs/webSocket/internal/types" {
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
declare module "rxjs/webSocket/internal/observable/iif" {
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
declare module "rxjs/webSocket/internal/observable/throwError" {
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
