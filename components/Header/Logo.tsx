import { useRouter } from "next/router";

export default function Logo() {
  const router = useRouter();
  let showBreadcrumb = ["/profile", "/add-event", "/terms-of-service"].includes(
    router.pathname
  );
  return (
    <a href="/dashboard">
      <div className="w-[max-content] flex gap-2 py-2 md:py-0 md:items-center">
        <img
          src="/logo.png"
          alt="Logo"
          width={48}
          height={48}
          className="w-[24px] h-[24px] md:w-[48px] md:h-[48px]"
        />
        <h1 className="flex flex-col gap-2 text-xl md:items-center md:flex-row md:text-2xl">
          <p>Eventsync</p>
          <span className="hidden text-sm text-gray-500 md:block">
            {showBreadcrumb && router.pathname}
          </span>
        </h1>
      </div>

      {showBreadcrumb && (
        <div className="flex gap-2 text-sm text-gray-500 md:hidden">
          {router.pathname}
        </div>
      )}
    </a>
  );
}
