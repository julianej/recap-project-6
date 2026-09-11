
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import styled from "styled-components";

// const fetcher = async (url) => {
//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return response.json();
// };


// ====================
// STYLES
// ====================

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 0  auto 2rem;
  padding: 2rem;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  background: #ffffff;
`;

const EditForm = styled(Form)`
  width: 95%;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 10px;

  ${({ $isSelected }) =>
    $isSelected &&
    `
      border: 2px solid black;
      background-color: #f0f0f0;
    `}
`;

const Heading = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  font: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border: none;
  padding: 0;
  margin: 0;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: #000;
  color: #fff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  background: #111;
  color: white;

  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width:100%;
  gap: 12px;
  justify-content: flex-end;
  align-items: center;
`;

const SaveButton = styled(Button)`
  background: black;
  width: 80%;
  color: white;
`;

const CancelButton = styled(Button)`
  background: transparent;
  width: 20%;
  color: black;
  border: 1px solid black;
`;

// Used ONLY by the edit form
const EditRow = styled.div`
  display: flex;
  gap: 1rem;

  > ${Field} {
    flex: 1;
  }
`;


// ====================
// COMPONENT
// ====================

export default function TransactionForm({ transaction, onCancel, onSave }) {

  // ====================
  // STATE
  // ====================

  const [submitError, setSubmitError] = useState("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");


  // ====================
  // POPULATE FORM
  // ====================

  useEffect(() => {
    if (transaction) {

      // Edit mode
      setTitle(transaction.title);
      setAmount(Math.abs(transaction.amount));
      setCategory(transaction.category);
      setType(transaction.type);

      const transactionDate = new Date(transaction.date);

      setDate(
        `${transactionDate.getFullYear()}-${String(
          transactionDate.getMonth() + 1
        ).padStart(2, "0")}-${String(
          transactionDate.getDate()
        ).padStart(2, "0")}`
      );

    } else {

      // Create mode
      setTitle("");
      setAmount("");
      setCategory("");
      setType("");

      const now = new Date();

      // date NOW
      setDate(
        `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, "0")}-${String(
          now.getDate()
        ).padStart(2, "0")}`
      );
    }
  }, [transaction]);


  // ====================
  // CATEGORIES FETCH
  // ====================

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR("/api/categories");


  // ====================
  // FORM SUBMIT
  // ====================

  async function handleSubmit(event) {
    event.preventDefault();

    // Current date and time
    const now = new Date();

    const [year, month, day] = date
      .split("-")
      .map(Number);

    // Create transaction date
    const transactionDate = new Date(
      year,
      month - 1,
      day,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );

    try {

      const isEditing = Boolean(transaction);

      const response = await fetch(
      isEditing
        ? `/api/transactions/${transaction._id}`
        : "/api/transactions",
      {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount:
            type === "expense"
              ? -Math.abs(Number(amount))
              : Math.abs(Number(amount)),
          category,
          type,
          date: transactionDate.toISOString(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setSubmitError(
        data.error || "Failed to save transaction."
      );
      return;
    }

  // ====================
  // TRANSACTION MUTATE
  // ====================

    await mutate("/api/transactions");

    // If editing, call onSave updates the TransactionCard
    if (isEditing) {
      onSave(transaction._id);
      return;
    }


      // ====================
      // RESET FORM
      // ====================

      setAmount("");
      setTitle("");
      setCategory("");
      setType("");

      setDate(
        `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, "0")}-${String(
          now.getDate()
        ).padStart(2, "0")}`
      );

    } catch (error) {

      setSubmitError(
        "Something went wrong. Please try again."
      );
    }
  }


  // ====================
  // LOADING / ERROR
  // ====================

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Failed to load categories.</p>;
  }


  // Select which form style to use
  const FormComponent = transaction
    ? EditForm
    : Form;


  // ====================
  // RENDER
  // ====================

 return (
  <FormComponent onSubmit={handleSubmit}>
    <Heading>
      {transaction ? "Edit Transaction" : "Add Transaction"}
    </Heading>

    {submitError && <p>{submitError}</p>}

    <Field>
      <Label htmlFor="title">Transaction Title</Label>
      <Input
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
    </Field>

    <Field>
      <Label htmlFor="amount">Transaction Amount</Label>
      <Input
        id="amount"
        type="number"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        required
      />
    </Field>

    <Field>
      <Label htmlFor="category">Transaction Category</Label>
      <Select
        id="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        required
      >
        <option value="">Please select a category</option>

        {categories.map((category) => (
          <option key={category._id} value={category.category}>
            {category.category}
          </option>
        ))}
      </Select>
    </Field>

    <Fieldset>
      <Label>Transaction Type</Label>

      <RadioGroup>
        {["income", "expense"].map((option) => (
          <RadioLabel key={option}>
            <input
              type="radio"
              name="type"
              value={option}
              checked={type === option}
              onChange={(event) => setType(event.target.value)}
              required={option === "income"}
            />
            {option === "income" ? "Income" : "Expense"}
          </RadioLabel>
        ))}
      </RadioGroup>
    </Fieldset>

    <Field>
      <Label htmlFor="date">Transaction Date</Label>
      <Input
        id="date"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        required
      />
    </Field>

    {transaction ? (
      <EditRow>
        <ButtonWrapper>
          <SaveButton type="submit">Save</SaveButton>
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
        </ButtonWrapper>
      </EditRow>
    ) : (
      <SubmitButton type="submit">
        Add transaction
      </SubmitButton>
    )}
  </FormComponent>
)};