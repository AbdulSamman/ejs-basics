import express from "express";
import path from "path";

const port = 3112;
const app = express();
const __dirname = path.resolve(path.dirname(""));

// html, css und javascript (abo app not dynamic)
app.use(express.static(__dirname + "/public"));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "./public/views"));

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
