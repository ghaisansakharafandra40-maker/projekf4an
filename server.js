const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const {
  justtrymamzz, DelaySange,
  alertFlood, alertNested, alertGroup, alertUnicode
} = require("./bugwa");
const { startWA } = require("./wa");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const SECRET = "xvoid-secret";
const users = [];
const banners = [];
const popups = [];
const globalChat = [];
const bugLogs = [];

const BUGS = {
  justtrymamzz, delaysange: DelaySange,
  alertflood: alertFlood, alertnested: alertNested,
  alertgroup: alertGroup, alertunicode: alertUnicode
};

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username))
    return res.json({ ok: false, msg: "user udah ada" });
  const hash = await bcrypt.hash(password, 10);
  users.push({ id: Date.now(), username, password: hash });
  res.json({ ok: true });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.json({ ok: false, msg: "salah" });
  const token = jwt.sign({ id: user.id, username }, SECRET);
  res.json({ ok: true, token });
});

function auth(req, res, next) {
  try {
    req.user = jwt.verify(req.headers.authorization, SECRET);
    next();
  } catch {
    res.json({ ok: false, msg: "token invalid" });
  }
}

app.post("/bug", auth, async (req, res) => {
  const { target, type } = req.body;
  const sock = req.app.get("sock");
  const fn = BUGS[type];
  if (!fn) return res.json({ ok: false, msg: "jenis bug nggak ada" });
  const result = await fn(sock, target);
  bugLogs.push({ user: req.user.username, type, target, result, time: new Date() });
  res.json(result);
});

app.get("/bug/log", auth, (req, res) => {
  res.json(bugLogs.filter(l => l.user === req.user.username));
});

app.get("/global", auth, (req, res) => res.json(globalChat));
app.post("/global", auth, (req, res) => {
  const msg = { user: req.user.username, text: req.body.text, time: new Date() };
  globalChat.push(msg);
  res.json({ ok: true, msg });
});

app.post("/ai", auth, async (req, res) => {
  res.json({ reply: "AI jawab: " + req.body.text });
});

app.get("/banner", (req, res) => res.json(banners.filter(b => b.active)));
app.post("/banner", auth, (req, res) => {
  const { type, url, link, start, end } = req.body;
  const b = { id: Date.now(), type, url, link, start, end, active: true };
  banners.push(b);
  res.json(b);
});
app.delete("/banner/:id", auth, (req, res) => {
  const i = banners.findIndex(b => b.id == req.params.id);
  if (i > -1) banners.splice(i, 1);
  res.json({ ok: true });
});

app.get("/popup", (req, res) => res.json(popups.filter(p => p.active)));
app.post("/popup", auth, (req, res) => {
  const { title, message, button } = req.body;
  const p = { id: Date.now(), title, message, button, active: true };
  popups.push(p);
  res.json(p);
});
app.delete("/popup/:id", auth, (req, res) => {
  const i = popups.findIndex(p => p.id == req.params.id);
  if (i > -1) popups.splice(i, 1);
  res.json({ ok: true });
});

startWA(app);
app.listen(3000, () => console.log("server jalan di 3000"));