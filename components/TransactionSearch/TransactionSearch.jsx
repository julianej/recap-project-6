
import styled from "styled-components";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

// ====================
// STYLES
// ====================

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 2px solid black;
  border-radius: 16px;
  padding: 1rem;
  background-color: #f0f0f0;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const SearchButton = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  text-transform: uppercase;
  border-radius: 0.5rem;
  background: #000;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 42px;
  padding: 0 2rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background: transparent;
  color: #000;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`;


export default function TransactionSearch({onSubmit, onReset, hasSearch}) {
  const [searchTerm, setSearchTerm] = useState("");
  
  function handleSubmit(event) {
    event.preventDefault();
    // console.log("A new search term was submitted:", searchTerm);

    if (!searchTerm.trim()) {
    return;
  }

    onSubmit(searchTerm.trim());

    // Clear the input after submitting
    setSearchTerm("");
  }

  function handleReset() {
    setSearchTerm("");
    onReset();
  }

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
      <label className="hidden" htmlFor="searchTerm">
        Search transactions
      </label>
      <SearchInput
        name="searchTerm"
        id="searchTerm"
        placeholder="Search for transaction Titel..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        required
      />
      <SearchButton type="submit">Search {searchTerm}</SearchButton>
      {/*RESET BUTTON */}
      {hasSearch ? (
        <ResetButton type="button" onClick={handleReset}>
          <RotateCcw size={16} />
          Reset
        </ResetButton>
      ) : null}

    </SearchForm>
    </SearchContainer>
  )};