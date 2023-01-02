from turtle import up
from xml.etree.ElementPath import find
from fastapi import FastAPI, status
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi.middleware.cors import CORSMiddleware
# establishing the connection
try:
    conn = psycopg2.connect(
        database="AnimeManager",
        user="postgres",
        password="password123",
        host="127.0.0.1",
        port="5432",
        cursor_factory=RealDictCursor
    )
    print("Database connected successfully")
except Exception as error:
    print("Database NOT connected")
    print(error)


# Creating a cursor object using the cursor() method
cursor = conn.cursor()

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Anime(BaseModel):
    title: str
    rating: float
    year: int
    status: str


def find_item(id, data):
    for item in data:
        if data['id'] == id:
            return item
    return "item is not in database"


def find_index(id, data):
    for index, item in enumerate(data):
        if item['id'] == id:
            return index


@app.get("/")
def test():
    return "Hello Carlos"


@app.get("/anime")
def get_all_anime():
    cursor.execute("""SELECT * FROM anime """)
    all_anime = cursor.fetchall()
    return all_anime


@app.get("/anime/{id}")
def get_one_anime(id: int):
    cursor.execute("""SELECT * FROM anime WHERE id = %s""", (str(id),))
    anime = cursor.fetchone()
    print(anime)
    return anime


@app.post("/anime", status_code=status.HTTP_201_CREATED)
def add_anime(anime: Anime):
    cursor.execute("""INSERT INTO anime (title,rating,year,status)
                        VALUES (%s,%s, %s,%s) RETURNING id""", (anime.title, anime.rating, anime.year, anime.status))
    added_id = cursor.fetchone()
    conn.commit()
    return "anime added successfully"


@app.put("/anime/{id}", status_code=status.HTTP_204_NO_CONTENT)
def update_anime(id: int, anime: Anime):
    cursor.execute("""UPDATE anime
                   SET title = %s,rating = %s, year = %s, status = %s 
                   WHERE id = %s 
                   RETURNING * """, (anime.title, anime.rating, anime.year, anime.status, str(id),))
    updated_anime = cursor.fetchone()
    conn.commit()
    return updated_anime


@app.delete("/anime/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_anime(id: int):
    cursor.execute(
        """DELETE FROM anime WHERE id = %s RETURNING id""", (str(id),))
    deleted_id = cursor.fetchone()
    conn.commit()
    return {"message": f'anime with id: {deleted_id} deleted successfully'}
