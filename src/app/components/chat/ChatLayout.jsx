"use client";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatMessage from "./ChatMessage";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Button from "../Button";
import Input from "../Input";
import { useEffect, useRef, useState } from "react";
import { ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import Avatar from "../Avatar";
import socket from "../../../../utils/socket";

export default function ChatLayout({ userData, className = "", defaultLayout = [15, 85], ...props }) {
  const [isCollapsed, setIsCollapsed] = useState(false); // For sidebar collapse
  const [message, setMessage] = useState(""); // For message input
  const [currentUser, setCurrentUser] = useState(null); //  For user identification

  // Layout handlers
  function onLayout(sizes) {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  }
  function onCollapse() {
    setIsCollapsed(true);
  }
  function onExpand() {
    setIsCollapsed(false);
  }

  // Send message function
  const sendMessage = () => {
    if (!message.trim()) return;

    const messageData = {
      userId: userData.user_id,
      content: message,
      // created_at: new Date().toISOString(),
    };

    socket.emit("send-message", messageData);
    setMessage("");
  };
  const [activeUsers, setActiveUsers] = useState([]);
  useEffect(() => {
    if (userData) {
      console.log("Connecting with userData:", userData);
      socket.emit("user-connected", userData);
    }

    socket.on("users-update", (users) => {
      console.log("Received users update:", users);
      setActiveUsers(users);
    });
    return () => {
      socket.off("users-update");
    };
  }, [userData]);
  return (
    <div
      className={`flex  text-text border-2 border-border_color rounded-2xl min-w-0 sm:w-6/12${className}`}
      {...props}
    >
      <PanelGroup autoSaveId="chat-layout" direction="horizontal" onLayout={onLayout}>
        <Panel
          id="sidebar-panel"
          defaultSize={defaultLayout[0]}
          collapsible={true}
          minSize={20}
          collapsedSize={15}
          onCollapse={onCollapse}
          onExpand={onExpand}
          maxSize={40}
        >
          {isCollapsed ? (
            <div className="flex flex-col space-y-4 items-center py-4">
              {activeUsers.map((user) => {
                return <Avatar key={user.socketId} src={user.profile_picture_url} alt={user.display_name}></Avatar>;
              })}
            </div>
          ) : (
            <ChatSidebar userData={userData}></ChatSidebar>
          )}
        </Panel>

        <PanelResizeHandle
          id="resize-handle"
          className="w-0 border-l-2 border-border_color  hover:bg-gray-300 transition-colors "
        >
          <button
            className=" relative right-[11px] top-1/2 bg-border_color rounded-lg hover:bg-slate-600 active:bg-slate-200 cursor-col-resize

"
          >
            <svg
              className="fill-svg_color active:fill-slate-950"
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#5f6368"
            >
              <path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z" />
            </svg>
          </button>
        </PanelResizeHandle>
        {/* container for TOP, MIDDLE and BOTTOM */}
        <Panel defaultSize={defaultLayout[1]}>
          <div id="chat-container" className="flex flex-col h-full">
            <ChatHeader>
              {userData.display_name}
              <Button>
                <svg
                  className="fill-svg_color"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="M420-360h120l-23-129q20-10 31.5-29t11.5-42q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 23 11.5 42t31.5 29l-23 129Zm60 280q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" />
                </svg>
              </Button>
            </ChatHeader>

            <ChatMessages
              userData={userData}
              className="flex-1 overflow-hidden"
              isSidebarCollapsed={isCollapsed}
            ></ChatMessages>

            <ChatInput>
              <Input
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="w-full"
                placeholder="Type a message..."
              ></Input>
              <Button onClick={sendMessage}>
                <svg
                  className="fill-svg_color"
                  xmlns="http://www.w3.org/2000/svg"
                  height="28px"
                  viewBox="0 -960 960 960"
                  width="28px"
                  fill="#5f6368"
                >
                  <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                </svg>
              </Button>
            </ChatInput>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
