import { Menu, X, User, LogIn } from "lucide-react";
import styled from "styled-components";


export default function MenuProfile({
  isMenuOpen,
  setIsMenuOpen,
  isLoggedIn,
  handleShowLoginForm,
  onProfile,
}) {
  return (
      <MenuProfileWrapper>
        <MenuButton
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MenuButton>

        {!isLoggedIn && (
          <LoginButton
            type="button"
            onClick={handleShowLoginForm}
            aria-label="Login"
            title="Login"
          >
            <LogIn size={22} />
          </LoginButton>
        )}

        {isLoggedIn && (
          <ProfileButton
            type="button"
            onClick={onProfile}
            aria-label="Profile"
            title="Profile"
          >
            <User size={22} />
          </ProfileButton>
        )}
      </MenuProfileWrapper>
  );
}

const MenuProfileWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;

  z-index: 1000;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  padding: 0;

  border: 2px solid #000;
  border-radius: 50%;

  background: #fff;
  color: #000;

  cursor: pointer;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  padding: 0;

  border: 2px solid #000;
  border-radius: 50%;

  background: #000;
  color: #fff;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: #fff;
    color: #000;
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 4px;
  }
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  padding: 0;

  border: 2px solid #000;
  border-radius: 50%;

  background: #fff;
  color: #000;

  cursor: pointer;
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 56px;
  right: 0;

  display: flex;
  flex-direction: column;

  min-width: 160px;

  padding: 0.5rem;

  background: #fff;
  border: 2px solid #000;
  border-radius: 0.75rem;

  button {
    padding: 0.75rem 1rem;

    border: 0;
    background: transparent;

    text-align: left;
    cursor: pointer;

    &:hover {
      background: #f2f2f2;
    }
  }
`;