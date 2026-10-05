// Shared icon shape recipes, keyed by name, so products/news can reference
// an icon by a simple key (stored in the DB) instead of raw SVG markup.
// Format per icon: shapes separated by ";;". Each shape is
//   "path:<d>"  |  "circle:cx,cy,r[@dash]"  |  "rect:x,y,w,h,rx[@dash]"

export const PRODUCT_ICONS = {
  shirt: "path:M20 12l12 6 12-6 6 10-8 4v26H22V26l-8-4z",
  cap: "path:M10 40a22 6 0 0044 0;;circle:32,30,14",
  stickers: "rect:14,20,36,24,4;;circle:32,32,7",
  miniature: "rect:10,24,44,18,4;;circle:20,44,6;;circle:44,44,6",
  notebook: "rect:16,10,32,44,4;;path:M24 20h16M24 28h16M24 36h10",
  patch: "path:M32 8l6 14 15 2-11 10 3 15-13-7-13 7 3-15-11-10 15-2z",
};

export const PRODUCT_ICON_KEYS = Object.keys(PRODUCT_ICONS);

export const NEWS_ICONS = {
  target: "circle:32,32,26;;circle:32,32,10",
  wildcards: "path:M10 44 L32 14 L54 44;;path:M18 44 L32 26 L46 44",
  gear: "circle:32,32,20;;path:M32 12v8M32 44v8M12 32h8M44 32h8",
  flag: "rect:14,14,36,36,6;;path:M14 32h36M32 14v36",
  wave: "path:M12 44c8-20 32-20 40 0;;circle:32,20,6",
  globe: "path:M32 8v48M8 32h48;;circle:32,32,18",
  triangle: "path:M14 44 L32 16 L50 44Z",
  dart: "circle:32,32,14;;circle:32,32,24@dash",
  bars: "path:M10 20h44M10 32h44M10 44h30",
};

export const NEWS_ICON_KEYS = Object.keys(NEWS_ICONS);

export function parseIcon(recipe) {
  if (!recipe) return [];
  return recipe.split(";;").map((shape, i) => {
    const [type, rest] = shape.split(":");
    const dash = rest.endsWith("@dash");
    const params = (dash ? rest.slice(0, -5) : rest).split(",");
    return { key: i, type, dash, params };
  });
}
