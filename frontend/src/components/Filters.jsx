import { CATEGORIES } from '../api/expenseApi';

function Filters({ category, onCategoryChange, search, onSearchChange }) {
  return (
    <div className="filters">
      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="All">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="search"
        placeholder="Search by title…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Filters;
