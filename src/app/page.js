import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ChatLayoutServer from "./components/chat/ChatLayoutServer.jsx";

import { getServerSession } from "next-auth";
import LoginPage from "./auth/login/page.js";
import Logout from "./components/Logout.jsx";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-around bg-background">
      <Header></Header>
      <main className="h-[80dvh] flex justify-center p-4">
        <ChatLayoutServer />
      </main>
      <Footer />
    </div>
  );
}
