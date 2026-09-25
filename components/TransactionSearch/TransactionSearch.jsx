
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


export default function TransactionSearch({onSubmit, onReset}) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("A new search term was submitted:", searchTerm);

    onSubmit(searchTerm);

    // Clear the input after submitting
    setSearchTerm("");
  }

  function handleReset() {
    setSearchTerm("");
    onReset();
  }

  // function handleSubmit() {
  //   event.preventDefault();
  //   console.log("A new search term was submitted:", searchTerm);
  // }

  return (
    <SearchContainer>
      <form onSubmit={handleSubmit}>
      <label className="hidden" htmlFor="searchTerm">
        Search transactions
      </label>
      <input
        name="searchTerm"
        id="searchTerm"
        placeholder="Search for transaction Titel..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
 {/* Reset button just available after Search enter*/}
      <button type="button" >Search for {searchTerm}</button>
      {/*Reset Button*/}
     <button type="button" onClick={handleReset}>Reset</button> 

    </form>
    </SearchContainer>
  )};