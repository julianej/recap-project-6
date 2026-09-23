import Welcome from "@/components/Welcome/Welcome";
import MenuProfile from "@/components/MenuProfile/MenuProfile";
import AsciiBackground from "@/components/AsciiBackground/AsciiBackground";

import { useState } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false); // HERE SET LOGIN-FORM
 
  // NOT LOGGED IN by default
  const isLoggedIn = false;

  function onLogIn() {
    setIsLoginFormOpen(true);
  }

  function handleLogout() {
    // logout logic later
  }
  return (
    <main>
      <Welcome />
      <AsciiBackground />
      
        <MenuProfile
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isLoggedIn={isLoggedIn} 
          onLogIn={setIsLogInFormOpen} // LOGIN FORM PROPS
        />

         {isLoginFormOpen && (
          <div>
            {/* Login form goes here */}
          </div>
         )}
    </main>
  )};