import express from "express";
import axios from "axios";
console.clear();
const app = express();
const PORT = 4005;
app.use(express.json());
app.post("/events", (req, res) => {
  const event = req.body;
  console.log(event);
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log("Post", err);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log("Comment", err);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log("Query", err);
  });
  res.send({ status: "OK" });
});

app.listen(PORT, () => {
  console.log("EVENT-BUS listening on " + PORT);
});
