import express from "express";
import cors from "cors";
import {
  AddReservation,
  GetList,
  GetListBaseOnReservationDate,
  GetTotalCountOfDonations,
  GetTotalCountOfRows,
  DeleteRow,
} from "./database.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "https://prayers-reservation-server-production.up.railway.app",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);
//Add reservation
app.post("/add-reservation", async (req, res) => {
  const data = { ...req.body.data };
  const add = await AddReservation(data);
  res.json(add);
});
//Get list
app.get("/reservation-list", async (req, res) => {
  const list = await GetList();
  res.json(list);
});
//Get Count of Donation
app.get("/dashboard-donations", async (req, res) => {
  const count = await GetTotalCountOfDonations();
  res.json(count);
});

app.get("/dashboard-reservations", async (req, res) => {
  const count = await GetTotalCountOfRows();
  res.json(count);
});

//Get data based on reservation date
app.get("/reservation-list/:date/:time", async (req, res) => {
  const { date, time } = req.params;
  const getDataFromReservationDate = await GetListBaseOnReservationDate(
    date,
    time
  );
  res.json(getDataFromReservationDate);
});

//Delete rows
app.delete("/delete-row/:id", async (req, res) => {
  const { id } = req.params;
  const deleteRow = DeleteRow(id);
  res.json(deleteRow);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
