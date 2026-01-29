import { readFile, writeFile } from "node:fs/promises";

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
if (!webhookUrl) {
  console.error("Missing DISCORD_WEBHOOK_URL env var");
  process.exit(1);
}

const messagesRaw = await readFile(new URL("./messages.json", import.meta.url), "utf8");
const messages = JSON.parse(messagesRaw);
if (!Array.isArray(messages) || messages.length === 0) {
  console.error("messages.json is empty or invalid");
  process.exit(1);
}

const historyUrl = new URL("./history.json", import.meta.url);
let used = [];
try {
  const historyRaw = await readFile(historyUrl, "utf8");
  const history = JSON.parse(historyRaw);
  if (Array.isArray(history.used)) used = history.used;
} catch {
  // If history file is missing or invalid, start fresh.
  used = [];
}

let available = messages.map((_, i) => i).filter((i) => !used.includes(i));
if (available.length === 0) {
  used = [];
  available = messages.map((_, i) => i);
}

const pickedIndex = available[Math.floor(Math.random() * available.length)];
const pick = messages[pickedIndex];
used.push(pickedIndex);
await writeFile(historyUrl, JSON.stringify({ used }, null, 2));
const content = `${pick.p1}\n\n${pick.p2}\n\n${pick.p3}`;

const res = await fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content })
});

if (!res.ok) {
  const body = await res.text();
  console.error(`Discord webhook failed: ${res.status} ${res.statusText}`);
  console.error(body);
  process.exit(1);
}

console.log("Message sent");
