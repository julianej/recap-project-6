import styled from "styled-components";
import { Wallet, List, Plus } from "lucide-react";

const FloatingMenuWrapper = styled.nav`
  position: fixed;

    z-index: 1000;
    width: auto;
    /* text-align: center; */
    margin: 0 auto 2rem;
    bottom: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    padding: 0.5rem;
    background: #fff;
    border: 2px solid #000;
    border-radius: 999px;
    gap: 3rem;

  @media (min-width: 740px) {
    display: flex;
    flex-direction: row;
  }
`;

const MenuItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;

  width: 64px;
  height: 52px;

  padding: 0;

  border: 0;
  border-radius: 999px;

  background: transparent;
  color: #000;

  cursor: pointer;

  span {
    font-size: 1rem;
    line-height: 1;
  }

  ${({ $active }) =>
    $active &&
    `
      background: #000;
      color: #fff;
    `}
`;

export default function FloatingNavigation({
  activeSection,
  setActiveSection,
  onAddTransaction,
}) {
  return (
    <FloatingMenuWrapper>
      <MenuItem
        type="button"
        $active={activeSection === "accounts"}
        onClick={() => setActiveSection("accounts")}
      >
        <Wallet size={20} />
        <span>Home</span>
      </MenuItem>

       <MenuItem
        type="button"
        $active={activeSection === "transactions"}
        onClick={() => setActiveSection("transactions")}
      >
        <List size={20} />
        <span>Accounts</span>
      </MenuItem>

      <MenuItem
        type="button"
        $active={activeSection === "transactions"}
        onClick={() => setActiveSection("transactions")}
      >
        <List size={20} />
        <span>Transactions</span>
      </MenuItem>

      <MenuItem
        type="button"
        onClick={onAddTransaction}
      >
        <Plus size={22} />
        <span>Add</span>
      </MenuItem>
    </FloatingMenuWrapper>
  );
}