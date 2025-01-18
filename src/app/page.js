import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ChatLayoutServer from "./components/chat/ChatLayoutServer.jsx";
import { cookies } from "next/headers";
import { decrypt } from "../../utils/sessions.js";
import { getServerSession } from "next-auth";
import LoginPage from "./auth/login/page.js";
import Logout from "./components/Logout.jsx";

export default async function Home() {
  const coockieStore = await cookies();
  const cookie = coockieStore.get("session")?.value;

  let userId = null;
  let userData = null;
  let userDataToPass = {};
  if (cookie) {
    try {
      const session = await decrypt(cookie);
      userId = session?.userId;
    } catch (error) {
      console.error("Failed to retrive session information: ", error.message);
    }
  }
  //API TO BE UPDATED_________________________________https://encrypted-chat-front.vercel.app/
  if (userId) {
    const response = await fetch(`https://encrypted-chat-front.vercel.app/api/user?action=get_byId&id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch user data: ${response.status}`);
    } else {
      const result = await response.json();
      userData = result.data;
      const { created_at, last_login, ...rest } = userData;
      for (const key in rest) {
        if (rest[key] != null && rest[key] !== undefined) {
          userDataToPass[key] = rest[key];
        }
      }
    }
  }
  return (
    <div className="h-full	flex flex-col justify-around bg-background">
      <Header userData={userDataToPass}></Header>
      {/* flex flex-1 justify-center p-4 */}
      <main className="h-[90dvh] flex justify-center p-4 ">
        <ChatLayoutServer userData={userDataToPass} className="w-full md:w-3/6" />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
