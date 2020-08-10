import { verify } from "../verify/index";
import { State, WebhookEvent } from "../types";

export function verifyAndReceive(
  state: State,
  event: WebhookEvent & { signature: string }
): any {
  const matchesSignature = verify(state.secret, event.payload, event.signature);

  if (!matchesSignature) {
    const error = new Error(
      "signature does not match event payload and secret"
    );

    return state.eventHandler.receive(
      Object.assign(error, { event, status: 400 })
    );
  }

  const payload =
    typeof event.payload === "string"
      ? JSON.parse(event.payload)
      : event.payload;
  return state.eventHandler.receive({
    id: event.id,
    name: event.name,
    payload: payload,
  });
}
