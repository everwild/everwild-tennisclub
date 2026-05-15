import Link from "next/link";

export default function RootPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-[#fff8e7] px-6 py-24 text-center">
      <p className="m-0 text-sm text-[#1a2e28]/70">Redirecting…</p>
      <Link href="/zh/" className="text-sm font-semibold text-[#0b3d2e] underline-offset-4 hover:underline">
        Continue in Chinese (中文)
      </Link>
      <script dangerouslySetInnerHTML={{ __html: "window.location.replace('/zh/');" }} />
    </main>
  );
}
