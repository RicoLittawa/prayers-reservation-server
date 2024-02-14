import { pool } from "./config.js";

//Get
export const GetList = async () => {
  const [rows] = await pool.query("select * from reservation_list");
  return rows;
};

export const GetTotalCountOfDonations = async () => {
  const count = await pool.query(
    "select sum(donation) as countOfDonations from reservation_list"
  );
  return count[0];
};

export const GetTotalCountOfRows = async () => {
  const count = await pool.query(
    "select count(*) as totalReservations from reservation_list"
  );
  return count[0];
};
export const GetListBaseOnReservationDate = async (reservationDate, time) => {
  const [rows] = await pool.query(
    "select id,typeOfPrayer,prayersFor from reservation_list where reservationDate=? and timeOfMass=?",
    [reservationDate, time]
  );
  return rows;
};
//Post
export const AddReservation = async (data) => {
  const [
    fullname,
    email,
    date,
    typeOfPrayer,
    prayersFor,
    timeOfMass,
    donation,
  ] = Object.values(data);
  const result = await pool.query(
    `insert into reservation_list (fullname,email,typeOfPrayer,prayersFor,reservationDate,timeOfMass,donation) values (?,?,?,?,?,?,?)`,
    [fullname, email, typeOfPrayer, prayersFor, date, timeOfMass, donation]
  );
  return result;
};

export const DeleteRow = async (id) => {
  const result = await pool.query("delete from reservation_list where id=?", [
    id,
  ]);
  return result;
};
