"use client";

import { useState } from "react";
import { AUTHOR_EMAIL } from "@/constants/seo";

type Status =
  | { state: "idle" | "sending" | "success" }
  | { state: "error"; message: string };

const FIELD =
  "w-full rounded-md border-2 border-ink bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus:shadow-hard-sm focus:outline-none";

async function send(form: HTMLFormElement): Promise<Status> {
  let res: Response;
  try {
    res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
  } catch {
    return { state: "error", message: "Couldn't reach the server. Check your connection and try again." };
  }
  if (res.ok) return { state: "success" };

  const serverMessage: string | undefined = await res
    .json()
    .then((d) => d.error)
    .catch(() => undefined);
  // 400 and 429 messages are written for visitors; anything else stays generic.
  if ((res.status === 400 || res.status === 429) && serverMessage) {
    return { state: "error", message: serverMessage };
  }
  return {
    state: "error",
    message: `Something went wrong on the server. Please try again later or email ${AUTHOR_EMAIL} directly.`,
  };
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    const result = await send(form);
    // Inputs are uncontrolled, so a failed attempt keeps everything the visitor typed.
    if (result.state === "success") form.reset();
    setStatus(result);
  }

  const sending = status.state === "sending";

  return (
    <form onSubmit={onSubmit} aria-busy={sending} className="card reveal grid gap-5 p-6 sm:p-8">
      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5 font-mono text-sm font-bold">
          Name
          <input name="name" required maxLength={100} autoComplete="name" className={FIELD} />
        </label>
        <label className="grid gap-1.5 font-mono text-sm font-bold">
          Email
          <input name="email" type="email" required maxLength={254} autoComplete="email" className={FIELD} />
        </label>
      </div>
      <label className="grid gap-1.5 font-mono text-sm font-bold">
        Subject
        <input name="subject" required maxLength={200} className={FIELD} />
      </label>
      <label className="grid gap-1.5 font-mono text-sm font-bold">
        Message
        <textarea name="message" required maxLength={5000} rows={5} className={`${FIELD} resize-y`} />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={sending} className="btn btn-primary disabled:cursor-wait disabled:opacity-70">
          {sending ? "Sending…" : "Send message"}
        </button>
        <p role="status" className="text-sm text-muted">
          {sending && "Sending your message…"}
          {status.state === "success" && (
            <span className="font-medium text-emerald">Thanks! Your message was sent. I&apos;ll reply by email.</span>
          )}
        </p>
      </div>

      {status.state === "error" && (
        <p role="alert" className="rounded-md border-2 border-danger bg-white px-4 py-3 text-sm font-medium text-danger">
          {status.message} Your message is still in the form, so you can try again.
        </p>
      )}
    </form>
  );
}
