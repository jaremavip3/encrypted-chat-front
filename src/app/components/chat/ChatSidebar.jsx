import Avatar from "../Avatar";
import socket from "../../../../utils/socket";
import { useEffect, useState } from "react";

export default function ChatSidebar({ children, userData, activeUsers, className = "", ...props }) {
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
              <Avatar src={user.profile_picture_url} alt={user.display_name} className="w-10 h-10" />
              <div>{user.display_name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
