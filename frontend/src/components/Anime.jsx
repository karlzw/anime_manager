const Anime = ({ anime, handleDelete, handleEdit }) => {
  return (
    <>
      <div className="border-2 transition-all py-1 px-2 delay-75 hover:border-none  hover:bg-gray-200 border-solid border-black flex flex-row rounded-md w-[400px] justify-between items-start">
        <div className=" w-full mx-1">
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-bold text-md text-left text-ellipsis w-48 overflow-hidden whitespace-nowrap">
              {anime.title}
            </h2>
            <p className="font-bold">{anime.year}</p>
          </div>
          <p className="italic flex justify-around">
            <span>Rating: {anime.rating}</span>
            <span>Status: {anime.status}</span>
          </p>
        </div>
        <div className="flex  ml-1 flex-row my-auto items-center justify-center ">
          <button
            className="z-5 rounded-r-none transition-all border-r-0 mr-0 border-2 px-1 rounded-md border-black border-solid mx-2 bg-gray-400 text-white "
            onClick={() => handleEdit(anime)}
          >
            Edit
          </button>
          <button
            className="bg-white z-5 transition-all text-black rounded-l-none ml-0 border-2 px-1 rounded-md border-black border-solid mx-2"
            onClick={() => handleDelete(anime)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Anime;
