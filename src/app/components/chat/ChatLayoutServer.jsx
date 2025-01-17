import { cookies } from "next/headers";
import ChatLayout from "./ChatLayout";

export default async function ChatLayoutServer({ userData, className = "" }) {
  const cookieStore = await cookies();
  const layout = await cookieStore.get("react-resizable-panels:layout");

  let defaultLayout;
  if (layout) {
    defaultLayout = JSON.parse(layout.value);
  }

  return <ChatLayout userData={userData} className={className} defaultLayout={defaultLayout} />;
}
