import type { Metadata } from "next";
import Link from "next/link";
import { DOCUMENT_TITLE } from "@/lib/metadata";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-[#fff8e7] px-6 py-24 text-center">
      <h1 className="m-0 text-2xl font-bold text-[#0b3d2e]">404</h1>
      <p className="m-0 max-w-md text-[#1a2e28]/70">This page does not exist.</p>
      <Link href="/zh/" className="font-semibold text-[#0b3d2e] hover:underline">
        Go to home (中文)
      </Link>
    </main>
  );
}
