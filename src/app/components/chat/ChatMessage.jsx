import Avatar from "../Avatar";
import { useState } from "react";

export default function ChatMessage({
  children,
  className = "",
  isSidebarCollapsed,
  isMine = false,
  timeProp = "",
  ...props
}) {
  return (
    <div
      className={` flex ${isMine ? "justify-end" : "justify-start"} }
           ${className}`}
      {...props}
    >
      <div className={`flex flex-1 align-middle py-4 px-4  gap-2   min-w-0 ${isSidebarCollapsed ? "max-w-[90%]" : ""}`}>
        {isMine ? (
          <button className="group ">
            <svg
              className=" fill-none group-hover:fill-svg_color "
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
            </svg>
          </button>
        ) : (
          <Avatar className="self-end min-w-10"></Avatar>
        )}
        <div
          className={`flex flex-col  gap-1  p-3 flex-1 break-words ${
            isMine
              ? "rounded-l-2xl rounded-tr-2xl bg-my_text_background"
              : "rounded-r-2xl rounded-tl-2xl bg-text_background "
          }`}
        >
          <div className="flex flex-wrap justify-between align-top gap-2 ">
            <div className="font-extrabold text-yellow-600 ">Pavlo Vilkhovui</div>
            <div className={`${isMine ? "text-my_text" : "text-text"}`}>{timeProp}</div>
          </div>
          <div className={` py-2.5 break-all whitespace-pre-wrap  ${isMine ? "text-my_text" : "text-text "}`}>
            {children}
          </div>
          <div className={` text-sm ${isMine ? "text-my_text_secondary" : "text-text_secondary"}`}>delivered</div>
        </div>
        {isMine ? (
          <>
            <Avatar className="self-end min-w-10"></Avatar>
          </>
        ) : (
          <button className="group ">
            <svg
              className=" fill-none group-hover:fill-svg_color "
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
