"use client";
import { useEffect, useRef } from "react";

export default function ChatMessages({ children, className = "", ...props }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [children]);

  return (
    <div ref={containerRef} className={`overflow-y-auto flex flex-col ${className}`} {...props}>
      <div className="flex-1" /> {/* This pushes content to bottom */}
      <div className="flex flex-col">{children}</div>
      <div ref={messagesEndRef} /> {/* Scroll anchor at the end */}
    </div>
  );
}
