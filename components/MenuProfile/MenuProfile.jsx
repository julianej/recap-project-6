
import { Menu, X, User, LogIn } from "lucide-react";
import styled from "styled-components";

export default function MenuProfile({
  isMenuOpen,
  setIsMenuOpen,
  isLoggedIn,
  onLogin,
  listItems = [],
}) {
  function toggleMenu() {
    setIsMenuOpen((open) => !open);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <MenuProfileWrapper>
      {!isLoggedIn && (
        <>
          {/* MENU BUTTON */}
          <MenuButton
            type="button"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MenuButton>

          {/* LOGIN BUTTON */}
          <LoginButton
            type="button"
            onClick={onLogin}
            aria-label="Login"
            title="Login"
          >
            <LogIn size={22} />
          </LoginButton>
        </>
      )}

      {isLoggedIn && (
        <ProfileButton
          type="button"
          onClick={toggleMenu}
          aria-label="Profile"
          aria-expanded={isMenuOpen}
          title="Profile"
        >
          <User size={22} />
        </ProfileButton>
      )}

      {/* MENU ITEMS */}
      {isMenuOpen && listItems.length > 0 && (
        <ProfileMenu>
          {listItems.map((item) => {
            if (item.href) {
              return (
                <MenuLink
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </MenuLink>
              );
            }

            return (
              <MenuItem
                key={item.label}
                type="button"
                onClick={() => {
                  item.onClick?.();
                  closeMenu();
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </MenuItem>
            );
          })}
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

  background: #000;
  color: #fff;

  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 4px;
  }
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

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 4px;
  }
`;

const ProfileMenu = styled.div`
    position: absolute;
    top: -3px;
    right: 0rem;
    display: flex;
    flex-direction: column;
    min-width: 480px;
    padding: 0.5rem;
    background: #fff;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    z-index: -777;
`;

const MenuLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  width: 100%;
  padding: 0.75rem 1rem;

  color: #000;
  text-decoration: none;

  border-radius: 0.5rem;

  &:hover {
    background: #f2f2f2;
  }
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  width: 100%;
  padding: 0.75rem 1rem;

  border: 0;
  border-radius: 0.5rem;

  background: transparent;
  color: #000;

  font: inherit;
  text-align: left;

  cursor: pointer;

  &:hover {
    background: #f2f2f2;
  }
`;

