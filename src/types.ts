import { RequestError } from "@octokit/request-error";

import { EventNames } from "./generated/event-names";
export interface WebhookEvent<T = any> {
  id: string;
  name: EventNames.StringNames;
  payload: T;
}

export interface Options<T extends WebhookEvent> {
  path?: string;
  secret?: string;
  transform?: TransformMethod<T>;
}

type TransformMethod<T extends WebhookEvent> = (
  event: WebhookEvent
) => T | PromiseLike<T>;

type Hooks = {
  [key: string]: Function[];
};

export interface State extends Options<any> {
  eventHandler?: any;
  hooks: Hooks;
}

/**
 * Error object with optional poperties coming from `octokit.request` errors
 */
export type OctokitError = Error &
  Partial<RequestError> & {
    /**
     * @deprecated `error.event` is deprecated. Use the `.event` property on the aggregated error instance
     */
    event: WebhookEvent;
  };

export interface WebhookEventHandlerError extends AggregateError<OctokitError> {
  event: WebhookEvent;

  /**
   * @deprecated `error.errors` is deprecated. Use `Array.from(error)`. See https://npm.im/aggregate-error
   */
  errors: OctokitError[];
}

// temporary using a custom AggregateError type.
// Replace with `import AggregateError from "aggregate-error"` once
// https://github.com/gr2m/aggregate-error/pull/1 is merged or resolved

/**
Create an error from multiple errors.
*/
declare class AggregateError<T extends Error = Error> extends Error
  implements Iterable<T> {
  readonly name: "AggregateError";
  constructor(errors: ReadonlyArray<T | { [key: string]: any } | string>);

  [Symbol.iterator](): IterableIterator<T>;
}
