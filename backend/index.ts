import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

app.get("/", (_request, response) => {
  const age: number = 12;
  const name: string = "Amanda";
  response.send(JSON.stringify({ name }));
});

app.listen(3000);
