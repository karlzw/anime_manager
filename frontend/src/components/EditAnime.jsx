import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const EditAnime = ({
  anime,
  handleEditForm,
  handleEditChange,
  handleCloseForm,
}) => {
  return (
    <form
      draggable
      className="justify-around gap-1 absolute top-40 bg-white px-4 py-2 w-80 flex flex-col items-end bg-gray border-2 border-solid  border-black mt-4 rounded-2xl"
      onSubmit={handleEditForm}
    >
      <h1 className="flex font-bold italic text-gray-500 justify-center w-full">
        Edit Form
      </h1>
      <div className="flex w-full flex-row justify-between my-1  pt-2">
        <label htmlFor="title">Anime Title</label>
        <input
          className="border-2 border-solid border-black rounded-md w-48 text-center"
          type="text"
          name="title"
          value={anime.title}
          onChange={handleEditChange}
        />
      </div>
      <div className="flex w-full flex-row justify-between my-1">
        <label htmlFor="year">Release Year</label>
        <input
          className="border-2 border-solid border-black rounded-md  w-36 text-center"
          type="number"
          min="1990"
          max="2099"
          step="1"
          name="year"
          value={anime.year}
          onChange={handleEditChange}
        />
      </div>
      <div className="flex w-full flex-row justify-between my-2">
        <label htmlFor="rating">IMDb Rating</label>
        <input
          className="border-2 border-solid border-black rounded-md w-24 text-center"
          type="number"
          name="rating"
          step="0.1"
          max="10"
          min="0"
          value={anime.rating}
          onChange={handleEditChange}
        />
      </div>
      <div className="flex w-full flex-row justify-between my-2">
        <label htmlFor="status">Status</label>
        <select
          defaultValue={anime.rating}
          name="status"
          onChange={handleEditChange}
          className="border-2 border-solid border-black rounded-md w-36 text-center"
        >
          <option value="Default" disabled>
            --Select Status--
          </option>
          <option value="Watched">Watched</option>
          <option value="To Download">To Download</option>
          <option value="To Watch">To Watch</option>
        </select>
      </div>
      <div className="flex flex-row justify-center w-full my-1">
        <button type="submit">
          <CheckIcon className="rounded-l-md border-2 border-gray-400 h-6 w-8 text-gray-400" />
        </button>
        <button onClick={()=> {handleCloseForm }}>
          <XMarkIcon className="h-6 w-8 text-white bg-gray-400 border-r rounded-r-md" />
        </button>
      </div>
    </form>
  );
};

export default EditAnime;
