
import { Menu, X, User, LogIn } from "lucide-react";
import styled from "styled-components";

export default function MenuProfile({
  isMenuOpen,
  setIsMenuOpen,
  isLoggedIn,
  onLogin,
  listItems = [],
}) {
  return (
    <MenuProfileWrapper>
      {/* Homepage menu */}
      {!isLoggedIn && (
        <MenuButton
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MenuButton>
      )}

      {/* Login on homepage */}
      {!isLoggedIn && (
        <LoginButton
          type="button"
          onClick={onLogin}
          aria-label="Login"
          title="Login"
        >
          <LogIn size={22} />
        </LoginButton>
      )}

      {/* Profile on dashboard */}
      {isLoggedIn && (
      <ProfileButton
        type="button"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label="Profile"
        title="Profile"
      >
        <User size={22} />
      </ProfileButton>
    )}

      {/* Menu / profile list */}
      {isMenuOpen && listItems.length > 0 && (
        <ProfileMenu>
          {listItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </ProfileMenu>
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

  @media (min-width: 740px) {
    top: 3rem;
    right: 5rem;
    }
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

  background: black;
  color: #fff;

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