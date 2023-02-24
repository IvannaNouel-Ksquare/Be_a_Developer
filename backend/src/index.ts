import "dotenv/config";
import express from "express";
import routes from "./routes";
import database from "./database";

const cors = require('cors');

database.connect();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", routes);

const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log("Server is up and running", PORT);
});
