"use client";
import { useActionState, startTransition, useEffect } from "react";
import { logout } from "../../../utils/actions";
import { useRouter } from "next/navigation";

export default function Logout({ children, className = "", ...props }) {
  const router = useRouter();
  const [message, logoutAction, isPending] = useActionState(logout, null);

  useEffect(() => {
    if (message?.success) {
      router.push("/auth/login");
    }
  }, [message, router]);

  return (
    <button
      onClick={() => {
        startTransition(() => {
          logoutAction(null); // or dispatch({})
        });
      }}
      disabled={isPending}
      className={`p-2 text-svg_color rounded-2xl hover:bg-button_hover flex flex-col justify-center items-center
         ${className}`}
      {...props}
    >
      {isPending ? "Logging out..." : "Logout"}
      {children}
    </button>
  );
}
