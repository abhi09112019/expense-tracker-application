import { useState } from 'react';
import { CATEGORIES } from '../api/expenseApi';

const emptyForm = {
  title: '',
  amount: '',
  category: 'Food & Dining',
  date: new Date().toISOString().slice(0, 10),
  notes: '',
};

function ExpenseForm({ onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) {
      setError('Give the expense a short title.');
      return;
    }
    const amountNum = Number(form.amount);
    if (!amountNum || amountNum <= 0) {
      setError('Amount must be a number greater than 0.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ ...form, amount: amountNum });
      setForm(emptyForm);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save this expense. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Coffee with Priya"
          value={form.title}
          onChange={handleChange}
          maxLength={80}
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="date">Date</label>
          <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Anything worth remembering about this one"
          value={form.notes}
          onChange={handleChange}
          maxLength={280}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="btn" disabled={submitting} style={{ marginTop: '0.4rem' }}>
        {submitting ? 'Saving…' : 'Add expense'}
      </button>
    </form>
  );
}

export default ExpenseForm;
