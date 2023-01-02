import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const AddAnime = ({ handleAddForm, handleAddChange, handleCloseForm }) => {
  return (
    <form
      draggable
      className="absolute top-40 gap-1 justify-around bg-white px-4 py-2 w-80 flex flex-col items-end bg-gray border-2 border-solid  border-black mt-4 rounded-3xl"
      onSubmit={handleAddForm}
    >
      <h1 className="flex w-full font-bold justify-center italic text-gray-500">
        Add Form
      </h1>

      <div className="flex pt-2 w-full flex-row justify-between my-1">
        <label htmlFor="title">Anime Title</label>
        <input
          className="border-2 border-solid border-black rounded-md w-48 text-center"
          type="text"
          name="title"
          onChange={handleAddChange}
          required
        />
      </div>
      <div className="flex w-full flex-row justify-between my-1">
        <label htmlFor="year">Release Year</label>
        <input
          className="border-2 border-solid border-black rounded-md  w-36 text-center"
          type="number"
          min="1990"
          max="2030"
          step="1"
          name="year"
          onChange={handleAddChange}
          required
          autoComplete="off"
        />
      </div>
      <div className="flex w-full flex-row justify-between my-2">
        <label htmlFor="rating">IMDb Rating</label>
        <input
          className="border-2 border-solid border-black rounded-md w-24 text-center"
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="rating"
          onChange={handleAddChange}
          required
        />
      </div>
      <div className="flex w-full flex-row justify-between my-2">
        <label htmlFor="status">Status</label>
        <select
          defaultValue={"Default"}
          name="status"
          onChange={handleAddChange}
          className="border-2 border-solid border-black rounded-md w-36 text-center"
          required
        >
          <option value="Default" disabled>
            --Select Status--
          </option>
          <option value="Watched">Watched</option>
          <option value="To Download">To Download</option>
          <option value="To Watch">To Watch</option>
        </select>
      </div>
      <div className="justify-center flex flex-row w-full my-1">
        <button type="submit">
          <CheckIcon className="rounded-l-md border-2 border-gray-400 h-6 w-8 text-gray-400" />
        </button>
        <button onClick={handleCloseForm}>
          <XMarkIcon className="h-6 w-8 text-white bg-gray-400 border-r rounded-r-md" />
        </button>
      </div>
    </form>
  );
};

export default AddAnime;
