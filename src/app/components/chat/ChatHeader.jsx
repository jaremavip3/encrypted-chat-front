import Button from "../Button";
import Logout from "../Logout";

export default function ChatHeader({ children, displayName, className = "", ...props }) {
  return (
    <div
      className={`flex items-center justify-around border-b-2 border-border_color min-h-16 flex-wrap
           ${className}`}
      {...props}
    >
      {children}
      <div className="text-wrap break-words ">{displayName}</div>
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
    </div>
  );
}
