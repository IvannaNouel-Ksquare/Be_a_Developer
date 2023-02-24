import "dotenv/config";
import express from "express";
import routes from "./routes";
import database from "./database";
import * as admin from 'firebase-admin'; 

admin.initializeApp();

database.connect();
const app = express();
app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is up and running", PORT);
});
