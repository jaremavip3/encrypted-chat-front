export default function ChatInput({ children, className = "", ...props }) {
  return (
    <div
      className={`flex align-middle py-4 px-2 gap-1 
           ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
