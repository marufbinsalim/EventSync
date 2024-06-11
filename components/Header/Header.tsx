import Logo from "@/components/Header/Logo";
import useProfile from "@/hooks/useProfile";

export default function Header() {
  const { data, isLoading, isError } = useProfile();

  return (
    <div className="flex items-center justify-between w-full px-4 text-white md:p-4 bg-slate-900">
      <Logo />
      {data?.user && (
        <div className="flex items-center gap-2">
          <a href="/profile">
            <p>{data.user.username || ""}</p>
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
