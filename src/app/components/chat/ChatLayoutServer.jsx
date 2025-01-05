import { cookies } from "next/headers";
import ChatLayout from "./ChatLayout";

export default async function ChatLayoutServer({ className = "" }) {
  const cookieStore = await cookies();
  const layout = await cookieStore.get("react-resizable-panels:layout");

  let defaultLayout;
  if (layout) {
    defaultLayout = JSON.parse(layout.value);
  }

  return <ChatLayout className={className} defaultLayout={defaultLayout} />;
}
