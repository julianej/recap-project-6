import Welcome from "@/components/Welcome/Welcome";
import MenuProfile from "@/components/MenuProfile/MenuProfile";
import AsciiBackground from "@/components/AsciiBackground/AsciiBackground";

import { useState } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  function handleLogout() {
    // logout logic later
    console.log("Logout");
  }
  return (
    <main>
      <Welcome />
      <AsciiBackground />
      
        <MenuProfile
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isLoggedIn={isLoggedIn}
          onLogin={handleShowLoginForm}
        />
    </main>
  );
}