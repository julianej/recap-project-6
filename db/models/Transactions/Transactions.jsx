import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    match: /^[A-Za-zÄÖÜäöüß ]+$/,
  },

  amount: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
});

const Transactions =
  mongoose.models.Transactions ||
  mongoose.model("Transactions", transactionSchema);

export default Transactions;

// const transactionSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     minlength: 3,
//     match: /^[A-Za-zÄÖÜäöüß ]+$/,
//   },

//   amount: {
//     type: Number,
//     required: true,
//   },

//   category: {
//     type: String,
//     required: true,
//   },

//   type: {
//     type: String,
//     enum: ["income", "expense"],
//     required: true,
//   },

//   date: {
//     type: Date,
//     required: true,
//   },
// });

// export function getTransactionsModel(db) {
//   return (
//   mongoose.models.Transactions ||
//   mongoose.model("Transactions", transactionSchema)
//   );
// }
// export default Transactions;