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
const port = process.env.MYSQLPORT;
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://demo-prayers-reservation.netlify.app/"
  ); // Replace with your domain
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//Add reservation
app.post("/", async (req, res) => {
  const data = { ...req.body.data };
  const add = await AddReservation(data);
  res.json(add);
});
//Get list
app.get("/admin/scheduled-prayers", async (req, res) => {
  const list = await GetList();
  res.json(list);
});
//Get Count of Donation
app.get("/admin", async (req, res) => {
  const count = await GetTotalCountOfDonations();
  res.json(count);
});

app.get("/admin", async (req, res) => {
  const count = await GetTotalCountOfRows();
  res.json(count);
});

//Get data based on reservation date
app.get("/admin/list/:date/:time", async (req, res) => {
  const { date, time } = req.params;
  const getDataFromReservationDate = await GetListBaseOnReservationDate(
    date,
    time
  );
  res.json(getDataFromReservationDate);
});

//Delete rows
app.delete("/admin/scheduled-prayers/:id", async (req, res) => {
  const { id } = req.params;
  const deleteRow = DeleteRow(id);
  res.json(deleteRow);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
