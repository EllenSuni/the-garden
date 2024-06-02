import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { Client } from "pg";
import path from "path";

import { IFullPlant, IArea, IEvent } from "./interfaces";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// const stuff: string[] = (await..query..).rows

//. get all plants
app.get("/api/get-plants", async (_request, response) => {
  try {
    const plants: {
      rows: {
        id: number;
        name: string;
        scientific_name: string;
        text: string;
      }[];
    } = await client.query(
      "SELECT plant.*, note.text FROM plant LEFT JOIN note ON plant.id = note.plant_id"
    );

    Promise.all(
      plants.rows.map(async (plant) => {
        const plant_areas: {
          rows: { plant_id: number; name: string; area: string }[];
        } = await client.query(
          "SELECT plant.id AS plant_id, plant.name, area.name AS area FROM plant JOIN plant_area ON plant.id = plant_area.plant_id JOIN area ON area.id = plant_area.area_id WHERE plant.id=$1",
          [plant.id]
        );

        let areas: string[] = [];

        plant_areas.rows.forEach((area) => {
          areas.push(area.area);
        });

        const events: { rows: IEvent[] } = await client.query(
          "SELECT type, month FROM event WHERE plant_id=$1",
          [plant.id]
        );

        let plantItem: IFullPlant = {
          id: plant.id,
          name: plant.name,
          scientific_name: plant.scientific_name,
          text: plant.text,
          area: areas,
          event: events.rows,
        };

        return plantItem;
      })
    ).then((plantItem) => response.send(plantItem));
  } catch (error) {
    response.status(400).send(error);
  }
});

//. add plant
app.post("/api/add-plant", async (request, response) => {
  try {
    const addPlant: { rows: { id: number }[] } = await client.query(
      "INSERT INTO plant (name, scientific_name) VALUES ($1, $2) RETURNING id",
      [request.body.name, request.body.scientific_name]
    );

    if (request.body.text) {
      await client.query("INSERT INTO note (plant_id, text) VALUES ($1, $2)", [
        addPlant.rows[0].id,
        request.body.text,
      ]);
    }

    request.body.event.forEach(
      async (event: { type: string; month: number }) => {
        await client.query(
          "INSERT INTO event (type, month, plant_id) VALUES ($1, $2, $3)",
          [event.type, event.month, addPlant.rows[0].id]
        );
      }
    );

    request.body.area.forEach(async (area: number) => {
      await client.query("INSERT INTO plant_area VALUES ($1, $2)", [
        addPlant.rows[0].id,
        area,
      ]);
    });

    if (addPlant.rows.length === 1) {
      response.status(201).send(request.body);
    } else {
      response.status(400).send();
    }
  } catch (error) {
    response.status(400).send(error);
  }
});

//. delete plant
app.delete("/api/delete-plant", async (request, response) => {
  const { id }: { id: number } = request.body;
  console.log(id);

  try {
    await client.query("SELECT * FROM plant WHERE id=$1", [id]);

    await client.query(
      "DELETE FROM event WHERE plant_id=$1 RETURNING plant_id",
      [id]
    );

    await client.query(
      "DELETE FROM plant_area WHERE plant_id=$1 RETURNING plant_id",
      [id]
    );

    //   console.log(plantArea.rows);

    await client.query(
      "DELETE FROM note WHERE plant_id=$1 RETURNING plant_id",
      [id]
    );

    const { rows }: { rows: { plant_id: number }[] } = await client.query(
      "DELETE FROM plant WHERE id=$1 RETURNING id",
      [id]
    );

    if (rows.length === 1) {
      response.status(201).send();
    } else {
      response.status(400).send(`Couldn't delete plant`);
    }
    // console.log(rows.length);
    // response.send(rows);
  } catch (error) {
    response.status(400).send(error);
  }
});

app.get("/api/area", async (_request, response) => {
  try {
    const { rows }: { rows: IArea[] } = await client.query(
      "SELECT * FROM area"
    );

    response.send(rows);
  } catch (error) {
    response.status(400).send(error);
  }
});

app.post("/api/area", async (request, response) => {
  try {
    const { rows }: { rows: IArea[] } = await client.query(
      "INSERT INTO area (name) VALUES ($1) RETURNING *",
      [request.body.name]
    );
    response.status(201).send(rows);
  } catch (error) {
    response.status(400).send(error);
  }
});

app.delete("/api/area", async (request, response) => {
  try {
    const { rows }: { rows: IArea[] } = await client.query(
      "DELETE FROM area WHERE id=$1 RETURNING *",
      [request.body.id]
    );
    if (rows.length === 1) {
      response.status(201).send();
    }
  } catch (error) {
    response.status(400).send(error);
  }
});

app.get("/api/event", async (request, response) => {
  const month = request.query.month;

  const { rows }: { rows: IEvent[] } = await client.query(
    "SELECT event.*, plant.name FROM event LEFT JOIN plant ON event.plant_id = plant.id WHERE month=$1",
    [month]
  );

  response.send(rows);
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(port);
