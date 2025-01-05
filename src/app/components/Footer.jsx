export default function Footer({ children, className = "", ...props }) {
  return (
    <footer
      className={`text-text
             ${className}`}
      {...props}
    >
      Footer
      {children}
    </footer>
  );
}
