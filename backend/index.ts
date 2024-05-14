import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (_request, response) => {
  const { rows } = await client.query("SELECT * FROM plants");
  response.send(rows);
});

app.post("/add-plant", async (request, response) => {
  console.log(request.body);
  await client.query(
    "INSERT INTO plants (plant_name, garden_area) VALUES ($1, $2)",
    [request.body.plantName, request.body.gardenArea]
  );
  response.status(201).send();
});

app.listen(3000);
