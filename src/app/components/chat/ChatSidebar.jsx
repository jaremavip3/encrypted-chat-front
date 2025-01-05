import Avatar from "../Avatar";

export default function ChatSidebar({ children, className = "", ...props }) {
  return (
    <div
      className={`
             ${className}`}
      {...props}
    >
      <div className=" flex flex-col items-center justify-center gap-3">
        {children}
        <Avatar /> John Doe
        <Avatar />
        John Doe
        <Avatar />
        John Doe
        <Avatar />
        John Doe
        <Avatar />
        John Doe
      </div>
    </div>
  );
}
