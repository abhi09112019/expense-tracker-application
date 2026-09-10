const { body, validationResult } = require('express-validator');
const { CATEGORIES } = require('../models/Expense');

const expenseRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 80 }),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a number greater than 0'),
  body('category').optional().isIn(CATEGORIES).withMessage('Invalid category'),
  body('date').optional().isISO8601().withMessage('Date must be a valid date'),
  body('notes').optional().isLength({ max: 280 }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((e) => e.msg) });
  }
  next();
};

module.exports = { expenseRules, validate };
