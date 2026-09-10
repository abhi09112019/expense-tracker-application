const formatCurrency = (value) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value || 0);

function Summary({ total, count, topCategory, thisMonthTotal }) {
  return (
    <section className="summary-strip">
      <div className="summary-cell">
        <div className="label">Total spent</div>
        <div className="value total">{formatCurrency(total)}</div>
      </div>
      <div className="summary-cell">
        <div className="label">This month</div>
        <div className="value">{formatCurrency(thisMonthTotal)}</div>
      </div>
      <div className="summary-cell">
        <div className="label">Entries logged</div>
        <div className="value">{count}</div>
      </div>
      <div className="summary-cell">
        <div className="label">Top category</div>
        <div className="value" style={{ fontSize: '1.05rem' }}>
          {topCategory || '—'}
        </div>
      </div>
    </section>
  );
}

export default Summary;
