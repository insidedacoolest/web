"use client";

import { Fragment, useState } from "react";

export default function FilterGroup({ pills, items, gridClass = "grid grid-3" }) {
  const [active, setActive] = useState("all");
  const visible = items.filter(
    (item) => active === "all" || item.cats.includes(active)
  );

  return (
    <>
      <div className="filter-row">
        {pills.map((pill) => (
          <button
            key={pill.value}
            className={`filter-pill${active === pill.value ? " active" : ""}`}
            onClick={() => setActive(pill.value)}
            type="button"
          >
            {pill.label}
          </button>
        ))}
      </div>
      <div className={gridClass}>
        {visible.map((item) => (
          <Fragment key={item.key}>{item.content}</Fragment>
        ))}
      </div>
    </>
  );
}
