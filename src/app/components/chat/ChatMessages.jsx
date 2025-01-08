"use client";
import { useEffect, useRef } from "react";
import socket from "../../../../utils/socket";
import ChatMessage from "./ChatMessage";

export default function ChatMessages({ onLoadMore, isCollapsed, messages, children, className = "" }) {
  // const loadingRef = useRef(false);
  // const messagesEndRef = useRef(null);
  // const observerRef = useRef(null);

  // const handleScroll = (e) => {
  //   const div = e.target;
  //   if (div.scrollTop === 0 && !loadingRef.current) {
  //     loadingRef.current = true;
  //     onLoadMore();
  //     // Reset loading state after a delay
  //     setTimeout(() => {
  //       loadingRef.current = false;
  //     }, 1000);
  //   }
  // };
  // // Scroll to bottom when new messages arrive
  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages.length]);

  return (
    <div
      //  onScroll={handleScroll}
      className={`overflow-y-auto flex-1 flex flex-col-reverse ${className} `}
    >
      <div
        // ref={messagesEndRef}
        className="h-4"
      />

      {/* {messages.map((message, index) => (
        <ChatMessage
          key={message.messageId || index}
          content={message.content}
          timeProp={
            message.created_at
              ? new Date(message.created_at).toLocaleDateString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                })
              : "Just now"
          }

          displayName={message.users?.display_name}
          isSidebarCollapsed={isCollapsed}
          isMine={message.senderId === socket.id}
        >
          {message.content}
        </ChatMessage>
      ))} */}
      {/* {messages.map((message, index) => console.log(message))} */}
    </div>
  );
}
