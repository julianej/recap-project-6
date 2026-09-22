import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  iban: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: "EUR",
  },
  lastSyncedAt: {
    type: Date,
    default: null,
  },
});

// existing model || create new model

// let Accounts;

// if (mongoose.models.Accounts) {
//   Accounts = mongoose.models.Accounts;
// } else {
//   Accounts = mongoose.model("Accounts", accountSchema);
// }

const BankAccounts =
  mongoose.models.BankAccounts ||
  mongoose.model("BankAccounts", accountSchema);

export default BankAccounts;