import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const path = router.pathname;
  const isTermsOfService = path === "/terms-of-service";
  return (
    <div className="flex items-center justify-center gap-2 p-4 py-8 text-white bg-slate-900">
      {!isTermsOfService && (
        <a href="/terms-of-service" className="text-blue-500 underline">
          Terms of Service
        </a>
      )}
      <p>Copyright © 2024</p>
    </div>
  );
}
