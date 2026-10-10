// Contact route regression checks. Run: pnpm test
// Only exercises paths that return before any email is sent.
import { test } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../src/app/api/send-email/route.ts";

let ip = 0;
const post = (body: unknown, headers: Record<string, string> = {}) =>
  POST(
    new Request("https://portfolio.test/api/send-email", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": `10.0.0.${++ip}`,
        ...headers,
      },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );

const valid = { name: "Ada", email: "ada@example.com", subject: "Hi", message: "Hello" };

test("rejects malformed JSON", async () => {
  assert.equal((await post("{nope")).status, 400);
});

test("rejects missing fields", async () => {
  const res = await post({ ...valid, message: "  " });
  assert.equal(res.status, 400);
  assert.match((await res.json()).error, /every field/);
});

test("rejects invalid email", async () => {
  assert.equal((await post({ ...valid, email: "ada@example" })).status, 400);
});

test("rejects over-length message", async () => {
  assert.equal((await post({ ...valid, message: "x".repeat(5001) })).status, 400);
});

test("honeypot gets fake success without sending", async () => {
  assert.equal((await post({ ...valid, website: "spam.example" })).status, 200);
});

test("rejects cross-site origin", async () => {
  assert.equal((await post(valid, { origin: "https://evil.example" })).status, 403);
});

test("rate limits the sixth request from one IP", async () => {
  const send = () =>
    POST(
      new Request("https://portfolio.test/api/send-email", {
        method: "POST",
        headers: { "x-forwarded-for": "10.9.9.9" },
        body: "{}",
      }),
    );
  for (let i = 0; i < 5; i++) assert.equal((await send()).status, 400);
  const limited = await send();
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "600");
});

test("missing SMTP env returns a generic 500", async () => {
  delete process.env.EMAIL_USER;
  const res = await post(valid);
  assert.equal(res.status, 500);
  assert.doesNotMatch((await res.json()).error, /EMAIL|SMTP|env/i);
});
