function Header() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="masthead">
      <div>
        <h1>Ledger</h1>
        <p className="tagline">Log, categorize, and keep an eye on where the money goes.</p>
      </div>
      <div className="date-stamp">{today}</div>
    </header>
  );
}

export default Header;
