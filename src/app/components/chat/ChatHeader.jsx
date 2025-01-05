import Button from "../Button";

export default function ChatHeader({ children, className = "", ...props }) {
  return (
    <div
      className={`flex items-center justify-around border-b-2 border-border_color h-16
           ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
