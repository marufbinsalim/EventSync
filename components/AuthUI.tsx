import { supabase } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function AuthUI(props: any) {
  return (
    <div className="block w-[90%] md:w-[400px] min-w-[max-content] m-auto bg-slate-900 p-5 border border-gray-500 rounded-lg bg-slate-800">
      <Auth
        socialLayout="vertical"
        view="sign_in"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                inputText: "white",
                inputLabelText: "white",
                anchorTextColor: "white",
              },
            },
          },
        }}
        supabaseClient={supabase}
        providers={["google"]}
        providerScopes={{
          google: "email",
        }}
      />
    </div>
  );
}
