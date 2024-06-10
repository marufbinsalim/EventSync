import useAuthSubscription from "@/hooks/useAuthSubscription";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthSubscription({
    unprotectedRoutes: ["/unprotected"],
  });

  return <>{children}</>;
}
