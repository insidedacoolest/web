const WEEKDAYS = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// JS getDay(): 0=Sun..6=Sat → convert to Monday-first index: 0=Mon..6=Sun
function mondayIndex(date) {
  return (date.getDay() + 6) % 7;
}

export default function MonthCalendar({ year, month, events }) {
  const first = new Date(year, month, 1);
  const totalDays = daysInMonth(year, month);
  const leadingBlanks = mondayIndex(first);

  const monthEvents = events.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const byDay = new Map();
  monthEvents.forEach((e) => byDay.set(new Date(e.date).getDate(), e));

  const cells = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(null);
  for (let day = 1; day <= totalDays; day++) cells.push(day);

  return (
    <div className="month-cal">
      <div className="month-cal-head">
        {WEEKDAYS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div className="month-cal-grid">
        {cells.map((day, i) => {
          if (day === null) return <div className="month-cal-cell empty" key={`b${i}`} />;
          const ev = byDay.get(day);
          const styleClass = ev ? (ev.style === "outline" ? " outline" : " fill") : "";
          return (
            <div className={`month-cal-cell${styleClass}`} key={day}>
              <span className="month-cal-daynum">{day}</span>
            </div>
          );
        })}
      </div>
      {monthEvents.length > 0 ? (
        <div className="month-cal-legend">
          {monthEvents
            .slice()
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((e) => (
              <div className="month-cal-legend-item" key={e.id}>
                <span className={`month-cal-swatch${e.style === "outline" ? " outline" : " fill"}`} />
                <b>{String(new Date(e.date).getDate()).padStart(2, "0")}</b>
                <span className="month-cal-legend-label">{e.label}</span>
                <span>·</span>
                <span>{e.location}</span>
              </div>
            ))}
        </div>
      ) : (
        <p className="admin-hint" style={{ marginTop: "1.2rem" }}>Ainda não há sessões marcadas para este mês.</p>
      )}
    </div>
  );
}
