const express = require("express");
const app = express();
const cors = require("cors");
const Pool = require("pg").Pool;

const PORT = 8000;
const pool = new Pool({
  user: "postgres",
  password: "password123",
  host: "localhost",
  port: 5432,
  database: "AnimeManager",
});

app.use(cors());
app.use(express.json());

app.get("/anime", async (req, res) => {
  try {
    const all_anime = await pool.query("SELECT * FROM anime");
    res.json(all_anime.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/anime/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const anime = await pool.query("SELECT * FROM anime WHERE id = $1", [id]);
    res.json(anime.rows);
  } catch (err) {
    err.message;
  }
});

app.post("/anime/", async (req, res) => {
  try {
    const { title, rating, year, status } = req.body;
    const anime = await pool.query(
      "INSERT INTO anime (title, rating, year, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, rating, year, status]
    );

    res.json(anime.rows);
    console.log(anime);
    console.log([title, rating, year, status, id]);
  } catch (err) {
    err.message;
  }
});

app.put("/anime/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, rating, year, status } = req.body;
    const anime = await pool.query(
      "UPDATE anime SET title = $1, rating = $2, year = $3, status = $4 WHERE id = $5 RETURNING * ",
      [title, rating, year, status, id]
    );
    res.json(anime.rows);
  } catch (err) {
    err.message;
  }
});

app.delete("/anime/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const anime = await pool.query("DELETE FROM anime WHERE id = $1", [id]);
    res.json(anime.rows);
  } catch (err) {
    err.message;
  }
});

app.listen(PORT, () => console.log(`server has started on port ${PORT}`));
