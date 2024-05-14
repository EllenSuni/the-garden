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

app.get("/get-plants", async (_request, response) => {
  const { rows } = await client.query("SELECT * FROM plants");
  response.send(rows);
});

app.post("/add-plant", async (request, response) => {
  console.log(request.body);
  await client.query(
    "INSERT INTO plants (plantname, sciname, gardenarea, needsdressing, dressingtime, needsfertilizer, fertilizertime, needstrimming, trimmingtime, plantingmonth, plantingyear, bloomtime, harvesttime, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
    [
      request.body.plantname,
      request.body.sciname,
      request.body.gardenarea,
      request.body.needsdressing,
      request.body.dressingtime,
      request.body.needsfertilizer,
      request.body.fertilizertime,
      request.body.needstrimming,
      request.body.trimmingtime,
      request.body.plantingmonth,
      request.body.plantingyear,
      request.body.bloomtime,
      request.body.harvesttime,
      request.body.notes,
    ]
  );
  response.status(201).send();
});

app.listen(3000);
