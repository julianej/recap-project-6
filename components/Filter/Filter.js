import styled from "styled-components";
import { useState } from "react";

const FilterWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
  overflow: scroll;
    /* Hide scrollbar — Firefox */
  scrollbar-width: none;

  /* Hide scrollbar — Chrome, Safari, Edge */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterLabel = styled.span`
  margin-right: 4px;
  font-size: 14px;
  font-weight: 600;
`;

const FilterButton = styled.button`
  padding: 8px 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background: ${({ $active }) =>
    $active ? "black" : "transparent"};
  color: ${({ $active }) =>
    $active ? "white" : "black"};

  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

export default function Filter({
  transactions = [],
  selectedYear,
  setSelectedYear,
  selectedType,
  setSelectedType,
}) {

const [showAllYears, setShowAllYears] = useState(false);

// map NEW array for YEARS
// more advanced to delete the HARDCODED PATTERN
// years → data from database

  const years = [
    ...new 
    Set(transactions
      .map((transaction) =>
      //"2026-09-17T10:30:00.000Z"
        new Date(transaction.date).getFullYear().toString()
      )
      // 2026
    ),
    ].sort((a, b) => Number(b) - Number(a));
  ;

  return (
    <FilterWrapper>

      <FilterGroup>
        <FilterLabel>Year</FilterLabel>
      
      {/* ALL */}
      <FilterButton
        $active={selectedYear === "all"}
        onClick={() => setSelectedYear("all")}
      >
        All
      </FilterButton>

       {/* FIRST 2x YEARS */}
      {years
        .slice(0, 2)
        .map((year) => (
          <FilterButton
            key={year}
            $active={selectedYear === year}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </FilterButton>
        ))}

       {/* REMAINING YEARS */}
        {showAllYears &&
          years.slice(2).map((year) => (
            <FilterButton
              key={year}
              $active={selectedYear === year}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </FilterButton>
          ))}

      {/* ... EXTENDED YEARS */}
        {years.length > 2 &&
          (!showAllYears ? (
            <FilterButton onClick={() => setShowAllYears(true)}>
              ...
            </FilterButton>
          ) : (
            <FilterButton onClick={() => setShowAllYears(false)}>
              −
            </FilterButton>
          ))}
       </FilterGroup>

        <FilterGroup>
            <FilterLabel>Type</FilterLabel>

            <FilterButton
            $active={selectedType === "all"}
            onClick={() => setSelectedType("all")}
            >
            All
            </FilterButton>

            <FilterButton
            $active={selectedType === "income"}
            onClick={() => setSelectedType("income")}
            >
            Income
            </FilterButton>

            <FilterButton
            $active={selectedType === "expense"}
            onClick={() => setSelectedType("expense")}
            >
            Expense
            </FilterButton>
        </FilterGroup>
    </FilterWrapper>
  );
}