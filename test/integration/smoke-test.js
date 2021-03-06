import { test } from "tap";
import { mock } from "simple-mock";

test("@octokit/webhooks", (t) => {
  const emitWarningMock = mock(process, "emitWarning");
  const { Webhooks } = require("../../pkg");
  const api = new Webhooks({
    secret: "mysecret",
  });

  t.type(api.sign, "function");
  t.type(api.verify, "function");
  t.type(api.on, "function");
  t.type(api.removeListener, "function");
  t.type(api.receive, "function");
  t.type(api.middleware, "function");
  t.type(api.verifyAndReceive, "function");
  t.false(emitWarningMock.called);

  t.end();
});

test('require("@octokit/webhooks").sign', (t) => {
  const emitWarningMock = mock(process, "emitWarning");

  t.doesNotThrow(() => {
    const { sign } = require("../../pkg/dist-src");
    sign("1234", {});
  });
  t.false(emitWarningMock.called);

  t.false(emitWarningMock.called);

  t.end();
});

test('require("@octokit/webhooks").verify', (t) => {
  const emitWarningMock = mock(process, "emitWarning");

  t.doesNotThrow(() => {
    const { verify } = require("../../pkg/dist-src/");
    verify("1234", {}, "randomSignature");
  });
  t.false(emitWarningMock.called);

  t.false(emitWarningMock.called);

  t.end();
});

test('require("@octokit/webhooks").createEventHandler', (t) => {
  const emitWarningMock = mock(process, "emitWarning");

  t.doesNotThrow(() => {
    const { createEventHandler } = require("../../pkg/dist-src");
    createEventHandler();
  });
  t.false(emitWarningMock.called);

  t.false(emitWarningMock.called);

  t.end();
});

test('require("@octokit/webhooks").createMiddleware', (t) => {
  const emitWarningMock = mock(process, "emitWarning");

  t.doesNotThrow(() => {
    const { createMiddleware } = require("../../pkg/dist-src");
    createMiddleware({ secret: "1234" });
  });
  t.false(emitWarningMock.called);

  t.false(emitWarningMock.called);

  t.end();
});
