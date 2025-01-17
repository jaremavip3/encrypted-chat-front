import Avatar from "../Avatar";
import socket from "../../../../utils/socket";
import { useEffect, useState } from "react";

export default function ChatSidebar({ children, userData, className = "", ...props }) {
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
      className={`
             ${className}`}
      {...props}
    >
      <div className=" flex flex-col items-center justify-center gap-3 pt-6">
        {children}
        {activeUsers.map((user) => {
          return (
            <div key={user.user_id} className="flex flex-col items-center gap-1">
              <Avatar src={user.profile_picture_url} alt={user.display_name} className="min-w-10" />
              <div>{user.display_name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
