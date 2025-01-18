import ChatMessage from "./ChatMessage";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import formatTimestamp from "../../../../utils/helper_functions.js/formatData";
import socket from "../../../../utils/socket";

export default function ChatMessages({ userData, onLoadMore, isCollapsed, children, messages, className = "" }) {
  const [allMessages, setAllMessages] = useState([]);
  const [lastElementTimestamp, setLastElementTimestamp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAllMessagesLoaded, setIsAllMessagesLoaded] = useState(false);
  const limitOfMessages = 10;

  const {
    ref: myRef,
    inView: isLastElementVisible,
    entry,
  } = useInView({
    threshold: 0.95,
    delay: 500,
  });
  useEffect(() => {
    if (!isLastElementVisible || loading) {
      return;
    }
    //API TO BE UPDATED_________________________________https://encrypted-chat-front.vercel.app/
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://encrypted-chat-front.vercel.app/api/message?limit=${limitOfMessages}&lastTimestamp=${
            lastElementTimestamp ? lastElementTimestamp : ""
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch messages: ${response.status}`);
        }
        const data = await response.json();
        if (response.ok && data.data.length === 0) {
          // console.log("All messages loaded");
          setIsAllMessagesLoaded(true);
          return;
        }
        setAllMessages((prevMessages) => [...prevMessages, ...data.data]);
        const lastFetchedTimestamp = data.data[data.data.length - 1]?.created_at;
        setLastElementTimestamp(lastFetchedTimestamp ? formatTimestamp(lastFetchedTimestamp) : null);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages(); // Fetch messages once when the component mounts
  }, [isLastElementVisible]);

  function handleDelete(userId, messageId) {
    if (userData.user_id !== userId) return;
    const previousMessages = [...allMessages];
    console.log(userData);
    const messageToDeleteData = {
      user_id: userData.user_id,
      message_id: messageId,
    };
    setAllMessages((prevMessages) => prevMessages.filter((message) => message.message_id !== messageId));
    socket.emit("delete-message", messageToDeleteData);

    socket.once("message-error", (error) => {
      console.error("Failed to delete message:", error);
      // Rollback to previous state
      setAllMessages(previousMessages);
    });
  }

  useEffect(() => {
    socket.on("receive-message", (newMessage) => {
      console.log("newMessage send back from server: ", newMessage);
      setAllMessages((prevMessages) => [newMessage, ...prevMessages]);
    });
    socket.on("message-error", (error) => {
      console.error("Socket error:", error);
    });
    socket.on("message-deleted", (deletedMessage) => {
      console.log("deletedMessage: ", deletedMessage);
    });
    return () => {
      socket.off("receive-message");
      socket.off("message-deleted");
      socket.off("message-error");
    };
  }, []);

  return (
    <div className={`overflow-y-auto flex-1 flex flex-col-reverse `}>
      {allMessages.map((message) => {
        const date = new Date(message.created_at);
        const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")} ${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`;
        const displayName = message?.users?.display_name || "Unknown User";
        // console.log("3. message id: " + message.message_id);
        return (
          <ChatMessage
            isMine={userData.display_name === displayName ? true : false}
            key={message.message_id}
            displayName={displayName}
            timeProp={formattedTime}
            isEdited={message.is_edited}
            logo={message.users?.profile_picture_url ? message.users.profile_picture_url : undefined}
            onDelete={handleDelete}
            messageId={message.message_id}
            userId={message.user_id}
          >
            {message.content}
          </ChatMessage>
        );
      })}
      <div ref={myRef} className="h-20 w-full  flex justify-center items-center shrink-0">
        {isAllMessagesLoaded ? (
          <div className="text-gray-400">All messages loaded</div>
        ) : (
          <div className="w-8 h-8">
            <svg
              className={`w-full h-full ${isLastElementVisible ? "animate-spin	" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 -960 960 960"
              width="32px"
              fill="#a1a1aa"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="purple" />
                  <stop offset="100%" stopColor="yellow" />
                </linearGradient>
              </defs>
              <path
                d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"
                fill="url(#gradient)"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
