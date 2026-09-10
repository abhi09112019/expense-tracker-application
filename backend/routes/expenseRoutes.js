const express = require('express');
const router = express.Router();
const {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
} = require('../controllers/expenseController');
const { expenseRules, validate } = require('../middleware/validateExpense');

// Order matters: /summary must be declared before the /:id route
router.get('/summary', getSummary);

router.route('/').get(getExpenses).post(expenseRules, validate, createExpense);

router
  .route('/:id')
  .get(getExpenseById)
  .put(expenseRules, validate, updateExpense)
  .delete(deleteExpense);

module.exports = router;
