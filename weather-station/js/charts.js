/**
 * charts.js — Load CSV data and render charts using Chart.js
 * Loaded on data pages only.
 */

// Shared chart color palette
const CHART_COLORS = {
  blue:   "#2e5f8a",
  green:  "#5a8a4a",
  amber:  "#b87c2e",
  red:    "#b85a2e",
  muted:  "#c8b89a",
};

/**
 * Parse a simple CSV string into an array of objects.
 * Assumes first row is headers.
 */
function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const vals = line.split(",").map((v) => v.trim());
    const obj = {};
    headers.forEach((h, i) => (obj[h] = vals[i] ?? ""));
    return obj;
  });
}

/**
 * Fetch a CSV file and return parsed rows.
 */
async function loadCSV(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Not found");
    const text = await res.text();
    return parseCSV(text);
  } catch (e) {
    console.warn("Could not load", path, e);
    return [];
  }
}

/**
 * Render a line chart into a canvas element.
 */
function renderLineChart(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: datasets.map((ds) => ({
        label: ds.label,
        data: ds.data,
        borderColor: ds.color || CHART_COLORS.blue,
        backgroundColor: (ds.color || CHART_COLORS.blue) + "22",
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
        fill: true,
      })),
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top", labels: { font: { family: "'Source Code Pro', monospace", size: 11 } } },
      },
      scales: {
        x: { ticks: { font: { family: "'Source Code Pro', monospace", size: 10 }, maxRotation: 45 } },
        y: { ticks: { font: { family: "'Source Code Pro', monospace", size: 10 } } },
      },
    },
  });
}

/**
 * Render a bar chart into a canvas element.
 */
function renderBarChart(canvasId, labels, dataset) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: dataset.label,
        data: dataset.data,
        backgroundColor: CHART_COLORS.blue + "99",
        borderColor: CHART_COLORS.blue,
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { font: { family: "'Source Code Pro', monospace", size: 10 }, maxRotation: 45 } },
        y: { beginAtZero: true, ticks: { font: { family: "'Source Code Pro', monospace", size: 10 } } },
      },
    },
  });
}

/**
 * Populate a table element with parsed CSV rows.
 */
function populateTable(tableId, rows) {
  const table = document.getElementById(tableId);
  if (!table || rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const thead = table.querySelector("thead") || table.createTHead();
  const tbody = table.querySelector("tbody") || table.createTBody();
  thead.innerHTML = "<tr>" + headers.map((h) => `<th>${h}</th>`).join("") + "</tr>";
  tbody.innerHTML = rows
    .slice()
    .reverse() // newest first
    .map(
      (row) =>
        "<tr>" + headers.map((h) => `<td>${row[h]}</td>`).join("") + "</tr>"
    )
    .join("");
}

/**
 * Update a "latest reading" card from the last row of a dataset.
 */
function updateCard(cardId, row, field, unit) {
  const card = document.getElementById(cardId);
  if (!card || !row) return;
  const valEl = card.querySelector(".value");
  const timeEl = card.querySelector(".time");
  if (valEl) valEl.textContent = row[field] ?? "—";
  if (timeEl) timeEl.textContent = (row.date ?? "") + " " + (row.time ?? "");
  const unitEl = card.querySelector(".unit");
  if (unitEl) unitEl.textContent = unit;
}
