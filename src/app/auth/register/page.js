"use client";
import { useFormState, useEffect, useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { register } from "../../../../utils/actions";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  function handlePasswordChange1(value) {
    setPassword1(value);
  }
  function handlePasswordChange2(value) {
    setPassword2(value);
  }
  useEffect(() => {
    if (password1 && password2) {
      setIsMatch(password1 === password2);
    }
  }, [password1, password2]);
  function handleSubmit(event) {
    if (password1 !== password2) {
      event.preventDefault();
      setIsMatch(false);
      return;
    }
    setIsMatch(true);
  }
  const router = useRouter();
  //to get some server action to be used in the client
  //this hook takes the server action and gives back the actual action property and then some state that will be updated as action will run
  const [message, registerAction, isPending] = useActionState(register, null);

  useEffect(() => {
    if (message?.status === "success") {
      router.push("/auth/login");
    }
  }, [message, router]);

  return (
    <main className="flex flex-col gap-4 items-center justify-center h-screen bg-bg_dark">
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-bold text-3xl text-text ">Ex umbra in solem</h2>
        <p className="text-gray-400 italic">from the shadow into the light </p>
      </div>
      <form
        action={registerAction}
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
          <label htmlFor="name" className="text-gray-300 pl-2">
            Dispay Name
          </label>
          <input
            id="name"
            name="name"
            type="name"
            required
            disabled={isPending}
            placeholder="Enter your username"
            className="p-4 h-12 text-text rounded-3xl bg-background border-2 border-border_color focus:border-my_text_background focus:outline-none"
          ></input>
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="password1" className="text-gray-300 pl-2">
            Password
          </label>
          <input
            id="password1"
            onChange={(e) => handlePasswordChange1(e.target.value)}
            name="password1"
            type="password"
            required
            disabled={isPending}
            placeholder="Enter your password"
            className="p-4 h-12 text-text rounded-3xl bg-background border-2 border-solid border-border_color focus:border-my_text_background focus:outline-none"
          ></input>
          <input
            id="password1"
            onChange={(e) => handlePasswordChange2(e.target.value)}
            name="password1"
            type="password"
            required
            disabled={isPending}
            placeholder="Confirm your password"
            className="p-4 h-12 text-text rounded-3xl bg-background border-2 border-solid border-border_color focus:border-my_text_background focus:outline-none"
          ></input>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isPending}
          className="flex items-center justify-center w-full bg-white text-background hover:bg-gray-300 rounded-full p-4 h-12 border-2 border-solid border-border_color"
        >
          {isPending ? "Signing up..." : "Sign up"}
        </button>
      </form>
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-400">Already have an account?</p>
        <button onClick={() => router.push("/auth/login")} className="text-blue-500 hover:underline">
          Log in
        </button>
      </div>
      {!isPending && message?.status === "error" && (
        <div className="text-red-500 text-sm m-4 p-4 rounded-3xl bg-background border-2 border-red-500">
          {message.message}
        </div>
      )}
      {!isMatch && (
        <div className="text-red-500 text-sm m-4 p-4 rounded-3xl bg-background border-2 border-red-500">
          Passwords do not match
        </div>
      )}
    </main>
  );
}
