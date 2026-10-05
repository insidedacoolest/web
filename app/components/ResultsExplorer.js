"use client";

import { useState } from "react";
import { CountryFlag } from "../lib/flags";

function posClass(pos) {
  if (pos === 1) return "pos p1";
  if (pos === 2) return "pos p2";
  if (pos === 3) return "pos p3";
  return "pos";
}

function parseRows(rowsJson) {
  try {
    const rows = JSON.parse(rowsJson || "[]");
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function rankByTotal(rows) {
  const withTotal = rows.map((r) => ({
    ...r,
    points: Array.isArray(r.points) ? r.points : [],
    total: (Array.isArray(r.points) ? r.points : []).reduce((a, b) => a + (Number(b) || 0), 0),
  }));
  withTotal.sort((a, b) => b.total - a.total);

  let pos = 0, lastTotal = null, rank = 0;
  return withTotal.map((r) => {
    pos++;
    if (r.total !== lastTotal) { rank = pos; lastTotal = r.total; }
    return { ...r, pos: rank };
  });
}

function ChampionshipRounds({ group }) {
  const [tableId, setTableId] = useState(group.rounds[0]?.id);
  const table = group.rounds.find((r) => r.id === tableId) || group.rounds[0];
  if (!table) return null;

  const ranked = rankByTotal(parseRows(table.rowsJson));
  const roundCols = Array.from({ length: table.rounds }, (_, i) => i + 1);
  const showFlags = table.col3Label === "País";

  return (
    <div style={{ marginBottom: "2.6rem" }}>
      {group.rounds.length > 1 && (
        <div className="filter-row" style={{ marginBottom: "1rem" }}>
          {group.rounds.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`filter-pill${r.id === table.id ? " active" : ""}`}
              onClick={() => setTableId(r.id)}
            >
              {r.eyebrow}
            </button>
          ))}
        </div>
      )}

      <div className="section-head" style={{ marginBottom: "1.2rem" }}>
        <div>
          <span className={`eyebrow${table.eyebrowPink ? " pink" : ""}`}>{table.eyebrow}</span>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Piloto</th>
              <th>{table.col3Label}</th>
              <th>Carro</th>
              {roundCols.map((n) => <th key={n} className="num">R{n}</th>)}
              <th className="num">Pontos</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((row, i) => (
              <tr key={i}>
                <td className={posClass(row.pos)}>{row.pos}</td>
                <td>{row.name}</td>
                <td>
                  {showFlags && (
                    <span style={{ display: "inline-flex", marginRight: ".5rem", verticalAlign: "middle" }}>
                      <CountryFlag country={row.country} />
                    </span>
                  )}
                  {row.country || "—"}
                </td>
                <td>{row.car || "—"}</td>
                {roundCols.map((n) => <td key={n} className="num">{row.points[n - 1] ?? 0}</td>)}
                <td className="num"><strong>{row.total}</strong></td>
              </tr>
            ))}
            {ranked.length === 0 && (
              <tr><td colSpan={5 + roundCols.length}>Ainda não há pilotos nesta tabela.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ResultsExplorer({ groups }) {
  const champPills = [{ value: "all", label: "Todas" }, ...groups.map((g) => ({ value: g.code.toLowerCase(), label: g.code }))];
  const [champ, setChamp] = useState("all");
  const activeGroups = champ === "all" ? groups : groups.filter((g) => g.code.toLowerCase() === champ);

  return (
    <>
      <div className="filter-row">
        {champPills.map((p) => (
          <button
            key={p.value}
            type="button"
            className={`filter-pill${champ === p.value ? " active" : ""}`}
            onClick={() => setChamp(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>
      {activeGroups.map((g) => (
        <ChampionshipRounds key={g.code} group={g} />
      ))}
    </>
  );
}
