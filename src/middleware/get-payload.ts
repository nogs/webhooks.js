import AggregateError from "aggregate-error";

import { IncomingMessage } from "http";

export function getPayload(request: IncomingMessage): Promise<any> {
  // If request.body already exists we can stop here
  // See https://github.com/octokit/webhooks.js/pull/23

  // @ts-ignore
  if (request.body) return Promise.resolve(request.body);

  return new Promise((resolve, reject) => {
    let data = "";

    request.on("error", (error) => reject(new AggregateError([error])));
    request.on("data", (chunk) => (data += chunk));
    request.on("end", () => resolve(data));
  });
}
