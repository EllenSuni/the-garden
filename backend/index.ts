import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

app.get("/", (_request, response) => {
  response.send("Hello World!");
});

app.listen(3000);
