"use client";
import Logout from "./Logout";
export default function Header({ children, userData, className = "", ...props }) {
  return (
    <>
      {/* Preload the font */}
      <link rel="preload" href="https://fonts.googleapis.com/css2?family=Honk&display=swap" as="style" />
      <link
        href="https://fonts.googleapis.com/css2?family=Honk&display=swap"
        rel="stylesheet"
        type="text/css"
        media="all"
      />

      {/* Inline critical styles */}
      <style jsx>{`
        /* Honk style */
        .honk-text {
          font-family: "Honk", serif;
          font-optical-sizing: auto;
          font-weight: 400;
          font-style: normal;
          font-variation-settings: "MORE" 15, "SHLN" 50;
        }
      `}</style>
      <header
        className={`text-text flex justify-between items-center py-4 px-8 
           ${className}`}
        {...props}
      >
        <h1 className="honk-text text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl">Encrypted Chat</h1>
        {/* <p> {userData.email}</p> */}
        {/*{user_id, email, display_name, google_id, profile_picture_url, created_at, last_login}) */}

        {children}
      </header>
    </>
  );
}
