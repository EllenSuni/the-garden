import cors from "cors";
import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { Client } from "pg";

import { IPlant, IAddPlant } from "../frontend/src/interfaces";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();

app.use(cors());
app.use(express.json());

//. get all plants
app.get("/get-plants", async (_request: Request, response: Response) => {
  const { rows }: { rows: IPlant[] } = await client.query(
    "SELECT * FROM plant"
  );
  response.send(rows);
});

//. add plant
app.post("/add-plant", async (request: Request, response: Response) => {
  const { name, scientific_name, planted }: IAddPlant = request.body;

  try {
    await client.query(
      "INSERT INTO plant (name, scientific_name, planted) VALUES ($1, $2, $3)",
      [name, scientific_name, planted]
    );
    response.status(201).send(`${name} is added`);
  } catch (error) {
    response.status(400).send(error);
  }
});

//. delete plant
app.delete("/delete-plant", async (request: Request, response: Response) => {
  const { name }: { name: string } = request.body;

  try {
    const { rows }: { rows: IPlant[] } = await client.query(
      "DELETE FROM plant WHERE name=$1 RETURNING *",
      [name]
    );

    if (rows.length === 1) {
      response.status(200).send(`${name} was deleted`);
    } else {
      response.status(400).send(`Couldn't delete ${name}`);
    }
  } catch (error) {
    response.send(error);
  }
});

//. edit plant
app.put("/edit-plant", async (request: Request, response: Response) => {
  try {
    const { id, name, scientific_name, planted }: IPlant = request.body;

    const getPlant: { rows: IPlant[] } = await client.query(
      "SELECT * FROM plant WHERE id=$1",
      [id]
    );

    const plant = getPlant.rows[0];

    let nameUpdate = name ? name : plant.name,
      scientific_nameUpdate = scientific_name
        ? scientific_name
        : plant.scientific_name,
      plantedUpdate = planted ? planted : plant.planted;

    const { rows } = await client.query(
      "UPDATE plant SET name=$1, scientific_name=$2, planted=$3 WHERE id=$4 RETURNING *",
      [nameUpdate, scientific_nameUpdate, plantedUpdate, id]
    );
    response.send(rows);
  } catch (error) {
    response.send(error);
  }
});

app.listen(3000);

//*
let query = [],
  queryValues = [];
// if (name) {
//   query.push(`name=$${query.length + 1}`);
//   queryValues.push(`${name}`);
// }
// if (scientific_name) {
//   query.push(`scientific_name=$${query.length + 1}`);
//   queryValues.push(`${scientific_name}`);
// }
// if (planted) {
//   query.push(`planted=$${query.length + 1}`);
//   queryValues.push(`${planted}`);
// }

// const queryValuesS = queryValues.join(", ") + `, ${id}`;

// const queryS = query.join(", ") + ` WHERE id=$${queryValues.length + 1}`;
// `UPDATE plant SET ${queryS} RETURNING *`,
// [queryValuesS]
//*
