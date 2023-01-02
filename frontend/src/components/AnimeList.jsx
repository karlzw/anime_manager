import Anime from "./Anime";

const AnimeList = ({ animeList, handleDelete, handleEdit }) => {
  return (
    <>
      {animeList.map((anime) => (
        <Anime
          key={Math.random()}
          anime={anime}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </>
  );
};

export default AnimeList;
