export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`p-2 text-svg_color rounded-2xl hover:bg-button_hover
       ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
