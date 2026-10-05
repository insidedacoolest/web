import { parseIcon } from "../lib/icons";

export default function IconGlyph({ recipe, color = "currentColor" }) {
  const shapes = parseIcon(recipe);
  return (
    <svg viewBox="0 0 64 64" stroke={color} strokeWidth="2" fill="none">
      {shapes.map((s) => {
        const dashProps = s.dash ? { strokeDasharray: "3 6" } : {};
        if (s.type === "circle") {
          const [cx, cy, r] = s.params;
          return <circle key={s.key} cx={cx} cy={cy} r={r} {...dashProps} />;
        }
        if (s.type === "rect") {
          const [x, y, w, h, rx] = s.params;
          return <rect key={s.key} x={x} y={y} width={w} height={h} rx={rx} {...dashProps} />;
        }
        return <path key={s.key} d={s.params[0]} {...dashProps} />;
      })}
    </svg>
  );
}
