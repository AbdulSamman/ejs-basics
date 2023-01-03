import express from "express";
import path from "path";
import fetch from "node-fetch";

// node-fetch statt axios
const port = 3112;
const app = express();
const __dirname = path.resolve(path.dirname(""));

// html, css und javascript (abo app not dynamic)
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./public/views"));

const url = "http://edwardtanguay.vercel.app/share/techBooks.json";
const books: any = await (await fetch(url)).json();

const siteData = {
  appTitle: "Tech Book Club",
  pages: [
    { title: "Home", path: "/" },
    {
      title: "Info",
      path: "/info",
    },
  ],
  books,
};

app.get("/", (req: express.Request, res: express.Response) => {
  res.render("index", { siteData, currentPath: "/", idCode: null });
});

app.get("/info", (req: express.Request, res: express.Response) => {
  res.render("info", { siteData, currentPath: "/info", idCode: null });
});

app.get("/info/:idCode", (req: express.Request, res: express.Response) => {
  const idCode = req.params.idCode;
  res.render("info", {
    siteData,
    currentPath: "/info",
    idCode,
    book: books.find((m: any) => m.idCode === idCode),
  });
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
