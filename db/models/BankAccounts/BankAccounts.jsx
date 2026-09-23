import mongoose from "mongoose";

const { Schema } = mongoose;

const bankAccountSchema = new Schema(
  {
    bank: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    iban: {
      type: String,
      trim: true,
    },

    bic: {
      type: String,
      trim: true,
      uppercase: true,
      match: /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/,

    },

    balance: {
      type: Number,
      default: 0,
    },

    lastSyncedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BankAccounts ||
  mongoose.model("BankAccounts", bankAccountSchema);

// existing model || create new model

// let Accounts;

// if (mongoose.models.Accounts) {
//   Accounts = mongoose.models.Accounts;
// } else {
//   Accounts = mongoose.model("Accounts", accountSchema);
// }

// const BankAccounts =
//   mongoose.models.BankAccounts ||
//   mongoose.model("BankAccounts", accountSchema);

// export default BankAccounts;