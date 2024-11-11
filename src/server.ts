import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import path from "path";

interface ContentPayload {
  message: string;
  anotherMessage: string;
  somethingStatic: string;
}

const app = express();
app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "dist/views");

const port = 3000;

const serveHome = (_req: Request, res: Response) => {
  console.log("root");
  res.sendFile(path.join(__dirname, "index.html"));
};

app.get("/", serveHome);
app.get("/home", serveHome);
app.post("/content", (req: Request<{}, {}, ContentPayload>, res: Response) => {
  const payload = req.body;
  if (payload) console.log("payload", payload);
  console.log("fetching content for hx-swap");
  res.render("content", payload);
});

app.get("*", function (_req, res: Response) {
  res.status(404).send("Not found");
});

app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`);
});