---
title: Dataset
---

# A brief history of space exploration

```js
import { FileAttachment } from "npm:@observablehq/stdlib";
import { SQLiteDatabaseClient } from "npm:@observablehq/sqlite";

const file = await FileAttachment("./data/activitymap.sqlite");
const db = await SQLiteDatabaseClient.open(file);
```

```js
const constructorResults = await db.sql`
SELECT *
FROM activitymap
ORDER BY objectid
LIMIT 10`;
```

## Debug

```js
display(file);
display(db);
display(constructorResults);
display(await db.queryRow(`SELECT sqlite_version()`));
```

## Display table

```js
display(Inputs.table(constructorResults));
```

## Display stacked bars

```js
import * as Plot from "npm:@observablehq/plot";

const aggregate1 = await db.sql`
SELECT daytype, posture, COUNT(*) AS total_count
FROM activitymap
GROUP BY daytype, posture
ORDER BY daytype, posture;`;

// Assuming 'constructorResults' is already filled with the data from your SQL query
// Example structure: [{ daytype: "WE", posture: "Sitting", total_count: 10 }, ...]

// Correct setup for creating the chart
// Convert SQL results to a format suitable for plotting
const plotData = aggregate1.map((d) => ({
  daytype: d.daytype,
  posture: d.posture,
  total_count: d.total_count,
}));

// Define the chart
const chart = Plot.plot({
  x: {
    label: "Posture", // X-axis label
  },
  y: {
    label: "Total Count", // Y-axis label
  },
  marks: [
    Plot.barY(plotData, {
      x: "posture",
      y: "total_count",
      fill: "daytype",
      title: (d) => `${d.daytype}: ${d.total_count}`,
    }),
  ],
  color: {
    legend: true, // Display legend to distinguish day types
  },
});

display(chart);
// Assuming you have an HTML element with id 'plot' where you want to display the chart
// document.getElementById("plot").appendChild(chart);
```

```js
const chart3 = Plot.plot({
  x: { axis: null },
  y: { label: null, grid: true },
  color: { scheme: "spectral", legend: true },
  marks: [
    Plot.barY(aggregate1, {
      x: "daytype",
      y: "total_count",
      fill: "daytype",
      fx: "posture",
      sort: { x: null, fx: { value: "-y", reduce: "sum" } },
    }),
  Plot.ruleY([0])
    Plot.text(aggregate1, {
      text: (d) => `${d.total_count}`,
      y: "total_count",
      x: "daytype",
      textAnchor: "middle",
      dy: -7,
      fill: "black",
    }),
  ],
});
// Display the chart
// This line assumes you're working within an Observable notebook.
// If you're not in Observable, you might append the chart to a DOM element as shown previously.
display(chart3);
display(aggregate1);
```

```js
// Assuming 'constructorResults' directly comes from your SQL query
// And assuming an environment where you're using Observable Plot (such as in an Observable notebook)

// Create the chart
const chart2 = Plot.plot({
  x: { axis: null },
  y: { tickFormat: "s", grid: true },
  color: { scheme: "spectral", legend: true },
  marks: [
    Plot.barY(aggregate1, {
      x: "daytype",
      y: "total_count",
      fill: "daytype",
      fx: "posture",
      sort: { x: null, color: null, fx: { value: "-y", reduce: "sum" } },
    }),

    Plot.text(aggregate1, {
      text: (d) => `${d.total_count}`,
      y: "total_count",
      x: "daytype",
      textAnchor: "end",
      dy: -3,
      fill: "black",
    }),
  ],
});
// Display the chart
// This line assumes you're working within an Observable notebook.
// If you're not in Observable, you might append the chart to a DOM element as shown previously.
display(chart2);
display(aggregate1);
```
