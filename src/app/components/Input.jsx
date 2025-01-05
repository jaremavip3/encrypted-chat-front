"use client";
import { useState, useRef, useEffect } from "react";

export default function Input({ value, onChange, children, className = "", ...props }) {
  const [messageInput, setMessageInput] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = "40px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [value]);

  function handleChange(event) {
    setMessageInput(event.target.value);
  }

  return (
    <textarea
      type="text"
      ref={textareaRef}
      value={value}
      onChange={onChange}
      className={`p-3 h-12 max-h-36 no-scrollbar overflow-y-auto resize-none text-text rounded-3xl bg-background border-2 border-solid border-border_color focus:border-my_text_background focus:outline-none
         ${className}`}
      {...props}
    >
      {children}
    </textarea>
  );
}
