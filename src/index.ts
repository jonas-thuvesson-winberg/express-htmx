import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import path from "path";

const app = express();
app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "dist/views");

function handleRequest(req: Request, res: Response, next: any) {
  console.log("Request URL:", req.url);
  // if (req.url === "/" || req.url === "/home") {
  // req.url = "/home";
  // }

  next();
}

app.use(handleRequest);

// app.use(
//   "/index.html",
//   express.static(path.join(__dirname, "public", "index.html"))
// );
app;

const port = 3000;

const serveHome = (_req: Request, res: Response) => {
  console.log("root");
  res.sendFile(path.join(__dirname, "index.html"));
};

app.get("/", serveHome);
app.get("/home", serveHome);
app.post("/content", (req: Request, res: Response) => {
  const content = req.body;
  if (content) console.log("content", content);
  console.log("fetching content for hx-swap");
  // res.sendFile(path.join(__dirname, "content.html"));
  res.render("content", { ...content });
});

app.get("*", function (_req, res: Response) {
  res.status(404).send("Not found");
});

app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`);
});
