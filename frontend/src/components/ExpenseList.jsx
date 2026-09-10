const formatCurrency = (value) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value || 0);

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

function ExpenseList({ expenses, onDelete }) {
  if (!expenses.length) {
    return (
      <div className="empty-state">
        <div className="mark">Nothing logged yet</div>
        <p>Add your first expense using the form to the left.</p>
      </div>
    );
  }

  return (
    <div className="ledger">
      <div className="ledger-row head">
        <span>Date</span>
        <span>Title</span>
        <span>Category</span>
        <span style={{ textAlign: 'right' }}>Amount</span>
        <span></span>
      </div>
      {expenses.map((expense) => (
        <div className="ledger-row" key={expense._id}>
          <span className="date-col">{formatDate(expense.date)}</span>
          <span className="title-col">
            <div className="title">{expense.title}</div>
            {expense.notes && <div className="notes">{expense.notes}</div>}
          </span>
          <span className="tag">{expense.category}</span>
          <span className="amount-col">{formatCurrency(expense.amount)}</span>
          <span className="del-col">
            <button
              type="button"
              className="btn danger"
              onClick={() => onDelete(expense._id)}
              aria-label={`Delete ${expense.title}`}
              title="Delete"
            >
              ✕
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
