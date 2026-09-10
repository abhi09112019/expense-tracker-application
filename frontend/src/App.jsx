import { useEffect, useMemo, useState, useCallback } from 'react';
import Header from './components/Header';
import Summary from './components/Summary';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Filters from './components/Filters';
import CategoryChart from './components/CategoryChart';
import { fetchExpenses, createExpense, deleteExpense } from './api/expenseApi';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (err) {
      setLoadError(
        'Could not reach the API. Make sure the backend server is running and VITE_API_URL is set correctly.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleCreate = async (payload) => {
    const created = await createExpense(payload);
    setExpenses((prev) => [created, ...prev]);
    setToast('Expense added');
  };

  const handleDelete = async (id) => {
    const prev = expenses;
    setExpenses((current) => current.filter((e) => e._id !== id));
    try {
      await deleteExpense(id);
      setToast('Expense removed');
    } catch (err) {
      setExpenses(prev);
      setToast('Could not delete — try again');
    }
  };

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchesCategory = category === 'All' || e.category === category;
      const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [expenses, category, search]);

  const total = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);

  const thisMonthTotal = useMemo(() => {
    const now = new Date();
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const byCategory = useMemo(() => {
    const totals = {};
    expenses.forEach((e) => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    });
    return Object.entries(totals)
      .map(([cat, tot]) => ({ category: cat, total: tot }))
      .sort((a, b) => b.total - a.total);
  }, [expenses]);

  const topCategory = byCategory[0]?.category;

  return (
    <div className="app-shell">
      <Header />

      <Summary
        total={total}
        count={expenses.length}
        topCategory={topCategory}
        thisMonthTotal={thisMonthTotal}
      />

      {loadError && <p className="error-text" style={{ marginBottom: '1.5rem' }}>{loadError}</p>}

      <div className="workspace">
        <div className="panel">
          <div className="panel-header">
            <h2>New entry</h2>
          </div>
          <div className="panel-body">
            <ExpenseForm onSubmit={handleCreate} />
          </div>
        </div>

        <div>
          <Filters
            category={category}
            onCategoryChange={setCategory}
            search={search}
            onSearchChange={setSearch}
          />

          {loading ? (
            <div className="empty-state">Loading your ledger…</div>
          ) : (
            <ExpenseList expenses={filtered} onDelete={handleDelete} />
          )}

          <CategoryChart data={byCategory} />
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;
