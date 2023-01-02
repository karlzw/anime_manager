import { useState, useRef, useEffect } from "react";
import AddAnime from "./components/AddAnime";
import AnimeList from "./components/AnimeList";
import EditAnime from "./components/EditAnime";
import { XMarkIcon } from "@heroicons/react/24/solid";
import "./App.css";

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState("");
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [sort, setSort] = useState("id");
  const [status, setStatus] = useState("All Anime");
  const [anime, setAnime] = useState({
    id: Date.now(),
    title: "",
    year: "",
    rating: "",
    status: "",
  });
  const searchValue = useRef("");

  useEffect(() => {
    getAnime();
  }, []);

  useEffect(() => {
    getAnime();
  }, [addMode, editMode]);

  const filteredAndSearchedAnime = animeList.filter((anime) => {
    const searchStatus = anime.title
      .toLowerCase()
      .startsWith(search.toLowerCase());

    if (status === "All Anime") {
      return anime.status !== "" && searchStatus;
    }
    return anime.status === status && searchStatus;
  });

  filteredAndSearchedAnime.sort((a, b) => {
    if (sort === "year") {
      return a.year > b.year ? -1 : 1;
    }

    if (sort === "rating") {
      return a.rating > b.rating ? -1 : 1;
    }

    if (sort === "title") {
      return a.title > b.title ? 1 : -1;
    }

    return a.id > b.id ? -1 : 1;
  });

  const getAnime = async () => {
    const response = await fetch("http://127.0.0.1:8000/anime", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setAnimeList(data);
  };

  const deleteAnime = async (anime) => {
    const response = await fetch(`http://127.0.01:8000/anime/${anime.id}`, {
      method: "DELETE",
    });
    toggleMessage.current.value = `${anime.title} deleted successfully`;
    setToggleModal("deleted");
  };

  const addAnime = async (anime) => {
    const response = await fetch(`http://127.0.01:8000/anime`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(anime),
    });
  };

  const updateAnime = async (anime) => {
    const response = await fetch(`http://127.0.01:8000/anime/${anime.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(anime),
    });
  };

  const handleAddForm = (e) => {
    e.preventDefault();
    addAnime(anime);
    setAnimeList([...animeList, anime]);
    setAddMode(false);
    setAnime([]);
  };

  const handleAddChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAnime({ ...anime, [name]: value });
  };

  const handleEdit = (anime) => {
    setEditMode((prevState) => !prevState);
    setAnime(anime);
  };

  const handleDelete = (anime) => {
    setAnimeList(
      animeList.filter((item) => {
        return item.id !== anime.id;
      })
    );
    deleteAnime(anime);
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    updateAnime(anime);
    setAnime([]);
    setEditMode((prevState) => !prevState);
  };

  const handleEditChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAnime({ ...anime, [name]: value });
  };

  const handleCloseForm = () => {
    setAddMode(false);
    setEditMode(false);
  };

  return (
    <div className="relative mt-10  px-24 flex-col justify-center items-center text-center transition-all">
      <div
        className="bg-white  z-10 top-0 w-full place-items-center
      fixed h-24 right-1/2 translate-x-1/2 mb-8 "
      >
        <h1 className="font-bold  mt-9 text-center clear-both text-6xl ">
          AnimeList
        </h1>
      </div>

      <div className="flex fixed bg-white z-10 w-full h-24 top-24 right-1/2 translate-x-1/2 items-center  flex-row justify-center mb-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="items-center flex relative transition-all delay-1000"
        >
          <input
            className="border-2 w-72 h-10 placeholder:text-xl border-black border-solid rounded-md px-2"
            type="text"
            ref={searchValue}
            placeholder="Search Anime"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              searchValue.current.value = "";
              setSearch("");
            }}
            className={`${
              search === "" && "hidden"
            } transition-all delay-1000 -right-2 absolute  rounded-l-none border-2 px-1 rounded-md border-black border-solid mx-2 bg-gray-400 text-white`}
          >
            <XMarkIcon className="w-8 h-9" />
          </button>
        </form>
        <div className="flex place-items-center">
          <button
            className="bg-white transition-all h-8 mr-0 border-2 rounded-r-none border-r-0 px-1 rounded-md border-black border-solid mx-2 "
            onClick={() => setAddMode((prevState) => !prevState)}
          >
            Add
          </button>
          <select
            className="transition-all cursor-pointer text-white bg-gray-400 ml-0 h-8 rounded-l-none border-2 px-1 rounded-md border-black border-solid mx-2"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All Anime</option>
            <option>To Watch</option>
            <option>Watched</option>
            <option>To Download</option>
          </select>
          <label className="transition-all border-r-0 ml-0 mr-0 h-8 rounded-r-none border-2 px-1 rounded-md border-black border-solid mx-2">
            Sort By:
          </label>
          <select
            name="sort"
            defaultValue={"date"}
            onChange={(e) => setSort(e.target.value)}
            className="bg-gray-400 cursor-pointer transition-all text-white ml-0 h-8 rounded-l-none border-2 px-1 rounded-md border-black border-solid mx-2"
          >
            <option value="date">date</option>
            <option value="title">title</option>
            <option value="year">year</option>
            <option value="rating"> rating</option>
          </select>
        </div>
      </div>

      <div
        className={`${"hidden"} transition-all delay-1000  flex flex-row fixed top-20 z-20 bg-green-500 rounded-sm p-2 opacity-80`}
      >
        <p className="text-green-900  mr-1 font-medium  opacity-75 italic">
          Anime deleted Successfully
        </p>
        <button onClick={() => setToggleModal("")}>
          <XMarkIcon className="h-6 w-6 text-green-900 opacity-75 font-medium" />
        </button>
      </div>

      <div className="relative grid mt-48 mb-28 overflow-y-auto xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2 place-items-center">
        <AnimeList
          animeList={filteredAndSearchedAnime}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <div className="fixed z-40 lg:top-20 lg:left-[38vw] top-10 left-48">
          {addMode && (
            <AddAnime
              handleAddForm={handleAddForm}
              handleAddChange={handleAddChange}
              handleCloseForm={handleCloseForm}
            />
          )}
          {editMode && (
            <EditAnime
              anime={anime}
              handleCloseForm={handleCloseForm}
              handleEditForm={handleEditForm}
              handleEditChange={handleEditChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
