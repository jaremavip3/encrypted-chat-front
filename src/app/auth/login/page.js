"use client";
import { useFormState, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "../../../../utils/actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  //to get some server action to be used in the client
  //this hook takes the server action and gives back the actual action property and then some state that will be updated as action will run
  const [message, loginAction, isPending] = useActionState(login, null);

  useEffect(() => {
    if (message?.status === "success") {
      router.push("/");
    }
  }, [message, router]);

  return (
    <main className="flex flex-col gap-4 items-center justify-center h-screen bg-bg_dark">
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-bold text-3xl text-text ">Ex umbra in solem</h2>
        <p className="text-gray-400 italic">from the shadow into the light </p>
      </div>
      <form
        action={loginAction}
        className="flex flex-col gap-6 bg-bg_surface_dark p-8 rounded-2xl border-2 border-solid border-border_color"
      >
        <div className="flex flex-col gap-2 ">
          <label htmlFor="email" className="text-gray-300 pl-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={isPending}
            placeholder="Enter your email"
            className="p-4 h-12 text-text rounded-3xl bg-background border-2 border-border_color focus:border-my_text_background focus:outline-none"
          ></input>
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="password" className="text-gray-300 pl-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            disabled={isPending}
            placeholder="Enter your password"
            className="p-4 h-12 text-text rounded-3xl bg-background border-2 border-solid border-border_color focus:border-my_text_background focus:outline-none"
          ></input>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center w-full bg-white text-background hover:bg-gray-300 rounded-full p-4 h-12 border-2 border-solid border-border_color"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-400">Don&apos;t have an account?</p>
        <button onClick={() => router.push("/auth/register")} className="text-blue-500 hover:underline">
          Sign up
        </button>
      </div>
      {!isPending && message?.status === "error" && (
        <div className="text-red-500 text-sm m-4 p-4 rounded-3xl bg-background border-2 border-red-500">
          {message.message}
        </div>
      )}
    </main>
  );
}
