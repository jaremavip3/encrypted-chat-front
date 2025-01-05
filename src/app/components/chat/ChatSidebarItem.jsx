export default function ChatSidebarItem({ children, className = "", ...props }) {
  return (
    <div
      className={`
             ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
