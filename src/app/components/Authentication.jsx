export default function Authentication({ children, className = "", ...props }) {
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
