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
  },

  bic: {
    type: String,
  },

  lastSyncedAt: {
    type: Date,
    default: null,
  },
});