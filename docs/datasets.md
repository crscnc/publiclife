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
