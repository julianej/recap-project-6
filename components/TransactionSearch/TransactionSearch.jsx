
import styled from "styled-components";
import { useState } from "react";

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


export default function TransactionSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit() {
    event.preventDefault();
    console.log("A new search term was submitted:", searchTerm);
  }

  return (
    <SearchContainer>
    <form onSubmit={handleSubmit}>
      <label htmlFor="searchTerm">Search</label>
      <input
        name="searchTerm"
        id="searchTerm"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button>Search for {searchTerm}</button>
    </form>
    </SearchContainer>
  )};