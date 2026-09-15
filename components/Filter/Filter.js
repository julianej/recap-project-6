import styled from "styled-components";

const FilterWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 24px;
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
  background: ${({ $active }) => ($active ? "#000" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

export default function Filter({
  selectedYear,
  setSelectedYear,
  selectedType,
  setSelectedType,
}) {

  return (
    <FilterWrapper>
        <FilterGroup>
            <FilterLabel>Year</FilterLabel>

            <FilterButton
            $active={selectedYear === "all"}
            onClick={function () { setSelectedYear("all");}}
            //* onClick={() => { setSelectedYear("all") }} */
            >
            All
            </FilterButton>

            <FilterButton
            $active={selectedYear === "2026"}
            onClick={() => setSelectedYear("2026")}
            >
            2026
            </FilterButton>

            <FilterButton
            $active={selectedYear === "2025"}
            onClick={() => setSelectedYear("2025")}
            >
            2025
            </FilterButton>

            <FilterButton
            $active={selectedYear === "2024"}
            onClick={() => setSelectedYear("2024")}
            >
            2024
            </FilterButton>
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