"use client";
import Logout from "./Logout";
export default function Header({ children, className = "", ...props }) {
  return (
    <>
      {/* font styles */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Honk&family=swap");

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
        <Logout className="">
          <svg
            className="fill-svg_color"
            xmlns="http://www.w3.org/2000/svg"
            height="28px"
            viewBox="0 -960 960 960"
            width="28px"
            fill="#5f6368"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
        </Logout>
        {children}
      </header>
    </>
  );
}
