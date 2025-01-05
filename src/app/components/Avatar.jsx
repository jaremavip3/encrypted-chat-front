import Image from "next/image";
export default function Avatar({ children, className = "", ...props }) {
  return (
    <div
      className={`
         ${className}`}
      {...props}
    >
      <Image
        width={512}
        height={512}
        className="w-10 h-10 rounded-full min-w-[40px]"
        src="/images/avatars/bear.png"
        alt="Rounded avatar"
      />

      {children}
    </div>
  );
}
