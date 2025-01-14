import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ChatLayoutServer from "./components/chat/ChatLayoutServer.jsx";
import { cookies } from "next/headers";
import { decrypt } from "../../utils/sessions.js";
import { getServerSession } from "next-auth";
import LoginPage from "./auth/login/page.js";
import Logout from "./components/Logout.jsx";
import { unstable_cache } from "next/cache";

export default async function Home() {
  const coockieStore = await cookies();
  const cookie = coockieStore.get("session")?.value;
  let userId = null;
  if (cookie) {
    try {
      const session = await decrypt(cookie);
      userId = session?.userId;
    } catch (error) {
      console.error("Failed to retrive session information: ", error.message);
    }
  }

  if (userId) {
    const response = await fetch(`http://localhost:3000/api/user?action=get_byId&id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    userId = result.data;
  }
  return (
    <div className="min-h-screen flex flex-col justify-around bg-background">
      <Header userId={userId}></Header>
      <main className="h-[80dvh] flex justify-center p-4">
        <ChatLayoutServer />
      </main>
      <Footer />
    </div>
  );
}
