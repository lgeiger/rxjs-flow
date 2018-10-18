// @flow

import { of, Observable } from "rxjs";
import { count, buffer } from "rxjs/operators";

it("should always infer number", () => {
  const o = of(1, 2, 3).pipe(count(x => x > 1));
  const j = of("a", "b", "c").pipe(count(x => x === "a"));
});

it("should accept empty parameter", () => {
  const o = of(1, 2, 3).pipe(count());
});

it("should infer source observable type in parameter", () => {
  // $ExpectError
  const o = of(1, 2, 3).pipe(
    count((x, i, source: Observable<string>) => x === 3)
  );
});

it("should enforce value type of source type", () => {
  const o = of(1, 2, 3).pipe(count((x, i, source) => x === "3")); // $ExpectError
});

it("should enforce index type of number", () => {
  const o = of(1, 2, 3).pipe(count((x, i, source) => i === "3")); // $ExpectError
});

it("should expect function parameter", () => {
  const o = of(1, 2, 3).pipe(count(9)); // $ExpectError
});

it("should enforce source type", () => {
  const o = of(1, 2, 3).pipe(count(x => x === "")); // $ExpectError
});
