export default function Logo() {
  return (
    <div className="w-[max-content] flex p-4 gap-2 items-center">
      <img
        src="/logo.png"
        alt="Logo"
        width={48}
        height={48}
        className="w-[24px] h-[24px] md:w-[48px] md:h-[48px]"
      />
      <h1 className="text-xl md:text-2xl">Eventsync</h1>
    </div>
  );
}
