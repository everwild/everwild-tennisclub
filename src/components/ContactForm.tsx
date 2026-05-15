"use client";

import { useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/site";

type Props = {
  labels: {
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
    formNote: string;
    formSent: string;
    formFailed: string;
  };
};

export function ContactForm({ labels }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  if (!FORMSPREE_ENDPOINT) {
    return <p className="m-0 text-sm text-[#3d5249]">{labels.formNote}</p>;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });
      if (!res.ok) {
        throw new Error("bad status");
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <label className="grid gap-1 text-sm font-medium text-[#1a2e28]">
        {labels.formName}
        <input
          required
          name="name"
          type="text"
          autoComplete="name"
          className="rounded-lg border border-[#6d8f81] bg-[#fff8e7] px-3 py-2 text-[#1a2e28] outline-none focus:border-[#0b3d2e] focus:ring-2 focus:ring-[#1a6b52]"
        />
      </label>
      <label className="grid gap-1 text-sm font-medium text-[#1a2e28]">
        {labels.formEmail}
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className="rounded-lg border border-[#6d8f81] bg-[#fff8e7] px-3 py-2 text-[#1a2e28] outline-none focus:border-[#0b3d2e] focus:ring-2 focus:ring-[#1a6b52]"
        />
      </label>
      <label className="grid gap-1 text-sm font-medium text-[#1a2e28]">
        {labels.formMessage}
        <textarea
          required
          name="message"
          rows={5}
          className="resize-y rounded-lg border border-[#6d8f81] bg-[#fff8e7] px-3 py-2 text-[#1a2e28] outline-none focus:border-[#0b3d2e] focus:ring-2 focus:ring-[#1a6b52]"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-fit items-center justify-center rounded-full border border-[#0b3d2e] bg-[#0b3d2e] px-5 py-2.5 text-sm font-bold text-[#fff8e7] transition hover:bg-[#1a6b52] disabled:opacity-60"
      >
        {status === "sending" ? "…" : labels.formSubmit}
      </button>
      {status === "ok" ? <p className="m-0 text-sm text-emerald-300">{labels.formSent}</p> : null}
      {status === "error" ? <p className="m-0 text-sm text-rose-300">{labels.formFailed}</p> : null}
      <p className="m-0 text-xs text-[#1a2e28]/55">{labels.formNote}</p>
    </form>
  );
}
