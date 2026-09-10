const mongoose = require('mongoose');

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Health & Fitness',
  'Shopping',
  'Education',
  'Travel',
  'Other',
];

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A title is required'],
      trim: true,
      maxlength: [80, 'Title cannot exceed 80 characters'],
    },
    amount: {
      type: Number,
      required: [true, 'An amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    category: {
      type: String,
      required: true,
      enum: CATEGORIES,
      default: 'Other',
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [280, 'Notes cannot exceed 280 characters'],
      default: '',
    },
  },
  { timestamps: true }
);

expenseSchema.index({ date: -1 });
expenseSchema.index({ category: 1 });

module.exports = mongoose.model('Expense', expenseSchema);
module.exports.CATEGORIES = CATEGORIES;
