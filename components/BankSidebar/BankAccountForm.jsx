import { useState } from "react";
import styled from "styled-components";
import { X } from "lucide-react";
import {
  SubmitButton,
  CancelButton,
} from "@/styles/ButtonStyles";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 5rem;
  border: 2px solid #000;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);

  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 7777;

  @media (min-width: 740px) {
    width: 50%;
    left: 0%;
  }
`;

const FormTitle = styled.h1`
  margin: 0 0 1rem;
  font-size: 2.5rem;
  line-height: 1.1;
  font-weight: 600;
  text-transform: uppercase;
`;

const FormSubTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 1rem;
  line-height: 1.1;
  font-weight: 600;
  text-transform: uppercase;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  padding: 0;

  border: 0;
  background: transparent;
  cursor: pointer;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const ErrorMessage = styled.span`
  font-size: 0.85rem;
  color: #d00;
`;

export default function BankAccountForm({ onCancel }) {
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [iban, setIban] = useState("");
  const [balance, setBalance] = useState("");

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    // Account name
    if (!name.trim()) {
      newErrors.name = "Account name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name =
        "Account name must contain at least 2 characters.";
    }

    // Bank
    if (!bank.trim()) {
      newErrors.bank = "Bank is required.";
    }

    // IBAN
    if (!iban.trim()) {
      newErrors.iban = "IBAN is required.";
    } else {
      const cleanIBAN = iban
        .replace(/\s/g, "")
        .toUpperCase();

      if (
        !/^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/.test(
          cleanIBAN
        )
      ) {
        newErrors.iban = "Please enter a valid IBAN.";
      }
    }

    // Balance
    if (balance === "") {
      newErrors.balance = "Balance is required.";
    } else if (isNaN(Number(balance))) {
      newErrors.balance = "Balance must be a number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const response = await fetch("/api/bankaccounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        bank: bank.trim(),
        iban: iban
          .replace(/\s/g, "")
          .toUpperCase(),
        balance: Number(balance),
      }),
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <CloseButton
        type="button"
        onClick={onCancel}
        aria-label="Close"
      >
        <X size={20} />
      </CloseButton>

      <FormTitle>
        Add New Bank
        <br />
        Account Details
      </FormTitle>

    <FormSubTitle>Bank Account Info</FormSubTitle>
      <Field>
        <input
          type="text"
          placeholder="Account name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        {errors.name && (
          <ErrorMessage>
            {errors.name}
          </ErrorMessage>
        )}
      </Field>

      <Field>
        <input
          type="text"
          placeholder="Bank"
          value={bank}
          onChange={(event) =>
            setBank(event.target.value)
          }
        />

        {errors.bank && (
          <ErrorMessage>
            {errors.bank}
          </ErrorMessage>
        )}
      </Field>

      <Field>
        <input
          type="text"
          placeholder="IBAN"
          value={iban}
          onChange={(event) =>
            setIban(event.target.value)
          }
        />

        {errors.iban && (
          <ErrorMessage>
            {errors.iban}
          </ErrorMessage>
        )}
      </Field>

      <Field>
        <input
          type="number"
          placeholder="Balance"
          value={balance}
          onChange={(event) =>
            setBalance(event.target.value)
          }
        />

        {errors.balance && (
          <ErrorMessage>
            {errors.balance}
          </ErrorMessage>
        )}
      </Field>

      <SubmitButton type="submit">
        Add Bank Account
      </SubmitButton>

      <CancelButton
        type="button"
        onClick={onCancel}
      >
        Cancel
      </CancelButton>
    </Form>
  );
}