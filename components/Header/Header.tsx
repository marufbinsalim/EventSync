import Logo from "@/components/Header/Logo";
import useProfile from "@/hooks/useProfile";

export default function Header() {
  const { data, isLoading, isError } = useProfile();

  return (
    <div className="flex justify-between w-full px-4 text-white md:items-center md:p-4 bg-slate-900">
      <Logo />

      {/* scaffold */}
      {isLoading && (
        <div className="flex gap-2 pt-2 md:items-center">
          <div className="w-[80px] h-[30px] bg-slate-800 rounded-2xl" />
          <div className="w-8 h-8 rounded-full bg-slate-600 md:w-12 md:h-12"></div>
        </div>
      )}

      {/* data */}
      {data?.user && !isLoading && (
        <div className="flex gap-2 pt-2 md:items-center">
          <a href="/profile">
            <p className="text-lg font-thin text-slate-300">
              {data.user.username || ""}
            </p>
          </a>
          <a href="/profile">
            <img
              src={data.user.profile_picture_url || "/avatar.png"}
              alt="Avatar"
              height={32}
              width={32}
              className="w-8 h-8 rounded-full md:w-12 md:h-12"
            />
          </a>
        </div>
      )}
    </div>
  );
}
