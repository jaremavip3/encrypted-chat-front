import Image from "next/image";

export const avatarsArray = [
  {
    id: "bear",
    name: "Bear",
    image: "/images/avatars/bear.png",
  },
  {
    id: "cat",
    name: "Cat",
    image: "/images/avatars/cat.png",
  },
  {
    id: "chicken",
    name: "Chicken",
    image: "/images/avatars/chicken.png",
  },
  {
    id: "dog",
    name: "Dog",
    image: "/images/avatars/dog.png",
  },
  {
    id: "dog2",
    name: "Dog 2",
    image: "/images/avatars/dog2.png",
  },
  {
    id: "duck",
    name: "Duck",
    image: "/images/avatars/duck.png",
  },
  {
    id: "gorilla",
    name: "Gorilla",
    image: "/images/avatars/gorilla.png",
  },
  {
    id: "koala",
    name: "Koala",
    image: "/images/avatars/koala.png",
  },
  {
    id: "macaw",
    name: "Macaw",
    image: "/images/avatars/macaw.png",
  },
  {
    id: "meerkat",
    name: "Meerkat",
    image: "/images/avatars/meerkat.png",
  },
  {
    id: "panda",
    name: "Panda",
    image: "/images/avatars/panda.png",
  },
  {
    id: "parrot",
    name: "Parrot",
    image: "/images/avatars/parrot.png",
  },
  {
    id: "pelican",
    name: "Pelican",
    image: "/images/avatars/pelican.png",
  },
  {
    id: "rabbit",
    name: "Rabbit",
    image: "/images/avatars/rabbit.png",
  },
  {
    id: "sea-lion",
    name: "Sea Lion",
    image: "/images/avatars/sea-lion.png",
  },
];

export default function Avatar({
  src = "/images/avatars/placeholder.png",
  alt = "Avatar placeholder",
  className = "",
  ...props
}) {
  return (
    <div
      className={`
         ${className}`}
      {...props}
    >
      <Image width={512} height={512} className="w-10 h-10 rounded-full min-w-[40px]" src={src} alt={alt} />
    </div>
  );
}
