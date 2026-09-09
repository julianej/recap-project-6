import { useState } from "react";
import useSWR, { mutate } from "swr"; 
import styled from "styled-components";

const fetcher = async (url) => {
  const response = await fetch(url);

  // // SWR fetcher handles HTTP errors
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};

export default function TransactionForm() {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [date, setDate] = useState(() => {
  const now = new Date();

  // Without padStart, we'd get month: 2026-9-09, but we want 2026-09-09
  // `${year}-${month}-${day}`
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2,"0"
    )}-${String(now.getDate()).padStart(2, "0")}`;
  });

  const { data: categories, error, isLoading } =
    useSWR("/api/categories", fetcher);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    const now = new Date();

    const [year, month, day] = date.split("-").map(Number);

    const transactionDate = new Date(
      year,
      month - 1,
      day,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );

  try {
    const response = await fetch("/api/transactions", {
      method: "POST",
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
    });

    const data = await response.json();

    if (!response.ok) {
      setSubmitError(data.error || "Failed to create transaction.");
      return;
    }

    await mutate("/api/transactions");
  } catch (error) {
    setSubmitError("Something went wrong. Please try again.");
  }
}

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Failed to load categories.</p>;
  }

  return (
  <Form onSubmit={handleSubmit}>
    <Heading>Add Transaction</Heading>
    {submitError && <p>{submitError}</p>}

    <Field>
      <Label htmlFor="title">
        Transaction Title
      </Label>

      <Input
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
    </Field>

    <Field>
      <Label htmlFor="amount">
        Transaction Amount
      </Label>

      <Input
        id="amount"
        type="number"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        required
      />
    </Field>

    <Fieldset>
      <Label htmlFor="category">
        Transaction Category
      </Label>

      <Select
        id="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        required
      >
        <option value="">
          Please select a category
        </option>

        {categories.map((category) => (
          <option key={category._id} value={category.category}>
            {category.category}
          </option>
        ))}
      </Select>
    </Fieldset>

    <Fieldset>
      <Label>Transaction Type</Label>

      <RadioGroup>
        <RadioLabel>
          <input
            type="radio"
            name="type"
            value="income"
            checked={type === "income"}
            onChange={(event) => setType(event.target.value)}
            required
          />
          Income
        </RadioLabel>

        <RadioLabel>
          <input
            type="radio"
            name="type"
            value="expense"
            checked={type === "expense"}
            onChange={(event) => setType(event.target.value)}
          />
          Expense
        </RadioLabel>
      </RadioGroup>
    </Fieldset>

    <Field>
      <Label htmlFor="date">
        Transaction Date
      </Label>

      <Input
        id="date"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        required
      />
    </Field>

    <Button type="submit">
      Add transaction
    </Button>
  </Form>
);
}



const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  background: #ffffff;
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