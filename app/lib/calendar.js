// Derives an event's status purely from its dates, so admins never have to
// remember to flip a "status" field by hand as events start/finish.
export function eventStatus(e, now = new Date()) {
  const start = new Date(e.fullDate);
  const end = new Date(e.endDate || e.fullDate);
  end.setHours(23, 59, 59, 999);
  if (now > end) return "done";
  if (now >= start) return "live";
  return "scheduled";
}

// Picks the event to feature as "next": the earliest one that hasn't fully
// ended yet (covers events currently in progress too), else the last one.
export function pickNextEvent(events, now = new Date()) {
  return (
    events.find((e) => {
      const end = new Date(e.endDate || e.fullDate);
      end.setHours(23, 59, 59, 999);
      return now <= end;
    }) || events[events.length - 1]
  );
}
