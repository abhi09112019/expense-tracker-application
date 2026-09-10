const asyncHandler = require('express-async-handler');
const Expense = require('../models/Expense');

/**
 * @desc    Get all expenses (optionally filtered by category, month, or search text)
 * @route   GET /api/expenses
 * @access  Public
 */
const getExpenses = asyncHandler(async (req, res) => {
  const { category, month, search } = req.query;
  const filter = {};

  if (category && category !== 'All') {
    filter.category = category;
  }

  if (month) {
    // month format: YYYY-MM
    const [year, mon] = month.split('-').map(Number);
    const start = new Date(year, mon - 1, 1);
    const end = new Date(year, mon, 1);
    filter.date = { $gte: start, $lt: end };
  }

  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  const expenses = await Expense.find(filter).sort({ date: -1, createdAt: -1 });
  res.json(expenses);
});

/**
 * @desc    Get a single expense by id
 * @route   GET /api/expenses/:id
 * @access  Public
 */
const getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }
  res.json(expense);
});

/**
 * @desc    Create a new expense
 * @route   POST /api/expenses
 * @access  Public
 */
const createExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, date, notes } = req.body;
  const expense = await Expense.create({ title, amount, category, date, notes });
  res.status(201).json(expense);
});

/**
 * @desc    Update an existing expense
 * @route   PUT /api/expenses/:id
 * @access  Public
 */
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }

  const { title, amount, category, date, notes } = req.body;
  expense.title = title ?? expense.title;
  expense.amount = amount ?? expense.amount;
  expense.category = category ?? expense.category;
  expense.date = date ?? expense.date;
  expense.notes = notes ?? expense.notes;

  const updated = await expense.save();
  res.json(updated);
});

/**
 * @desc    Delete an expense
 * @route   DELETE /api/expenses/:id
 * @access  Public
 */
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }
  await expense.deleteOne();
  res.json({ id: req.params.id, message: 'Expense removed' });
});

/**
 * @desc    Get aggregate summary: total spend, spend by category, spend by month
 * @route   GET /api/expenses/summary
 * @access  Public
 */
const getSummary = asyncHandler(async (req, res) => {
  const [totalAgg] = await Expense.aggregate([
    { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
  ]);

  const byCategory = await Expense.aggregate([
    { $group: { _id: '$category', total: { $sum: '$amount' } } },
    { $sort: { total: -1 } },
  ]);

  const byMonth = await Expense.aggregate([
    {
      $group: {
        _id: { year: { $year: '$date' }, month: { $month: '$date' } },
        total: { $sum: '$amount' },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  res.json({
    total: totalAgg?.total || 0,
    count: totalAgg?.count || 0,
    byCategory: byCategory.map((c) => ({ category: c._id, total: c.total })),
    byMonth: byMonth.map((m) => ({
      month: `${m._id.year}-${String(m._id.month).padStart(2, '0')}`,
      total: m.total,
    })),
  });
});

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
};
