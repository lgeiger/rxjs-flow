// @flow

import { of } from "rxjs";
import { find } from "rxjs/operators";

it("should support a user-defined type guard", () => {
  const o = of("foo").pipe(find((s: "foo") => true)); // $ExpectType Observable<"foo" | undefined>
});

it("should support a user-defined type guard that takes an index", () => {
  const o = of("foo").pipe(find((s: "foo", index) => true)); // $ExpectType Observable<"foo" | undefined>
});

it("should support a user-defined type guard that takes an index and the source", () => {
  const o = of("foo").pipe(find((s: "foo", index, source) => true)); // $ExpectType Observable<"foo" | undefined>
});

it("should support a predicate", () => {
  const o = of("foo").pipe(find(s => true)); // $ExpectType Observable<string | undefined>
});

it("should support a predicate that takes an index", () => {
  const o = of("foo").pipe(find((s, index) => true)); // $ExpectType Observable<string | undefined>
});

it("should support a predicate that takes an index and the source", () => {
  const o = of("foo").pipe(find((s, index, source) => true)); // $ExpectType Observable<string | undefined>
});
