import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataAction } from "../../redux/DataSlice";
import useFetch from "../../Api/UseFetch";

function Filters() {
  const [characterName, setCharacterName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");
  const [toggle, setToggle] = useState(false);
  //   const data = useSelector((state: any) => state.data.data);
  const dispatch = useDispatch();
  const page = useSelector((state: any) => state.data.pageNumber);

  const api2 = `https://rickandmortyapi.com/api/character/?page=${encodeURIComponent(
    page
  )}&name=${encodeURIComponent(characterName)}&status=${encodeURIComponent(
    status
  )}&gender=${encodeURIComponent(gender)}&species=${encodeURIComponent(
    species
  )}&type=${encodeURIComponent(type)}`;
  const { data: result, error } = useFetch("", api2);

  useEffect(() => {
    dispatch(
      dataAction.storeFilterdata(
        error
          ? { result: [], Totalpage: 1 }
          : { result: result?.results, Totalpage: result?.info?.pages }
      )
    );
  }, [dispatch, result, error]);

  return (
    <>
      <div className="items-center justify-center hidden gap-4  lg:flex md:flex md:flex-col md:mt-10 md:mb-4">
        <div className="flex gap-2">
          <div>
            <input
              type="text"
              placeholder="Search by Name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="p-1 text-center border rounded shadow border-slate-400"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by Species"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="p-1 text-center border rounded shadow border-slate-400"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by Character Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-1 text-center border rounded shadow border-slate-400"
            />
          </div>
        </div>
        <div className="flex">
          <div>
            <span className="p-3 text-lg text-white">Status</span>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="p-1 text-center border rounded shadow border-slate-400"
            >
              <option value="">All</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div>
            <span className="p-3 text-lg text-white">Gender</span>
            <select
              onChange={(e) => setGender(e.target.value)}
              className="p-1 text-center border rounded shadow border-slate-400"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-end -mr-3 mt-28 md:mt-5 md:hidden">
        {toggle ? (
          <button
            onClick={() => setToggle(!toggle)}
            className="p-2 text-white bg-green-500 rounded "
          >
            Close
          </button>
        ) : (
          <button
            onClick={() => setToggle(!toggle)}
            className="p-2 text-white bg-green-500 rounded"
          >
            Filter
          </button>
        )}
      </div>

      <div
        className={`flex flex-col gap-4 p-2 bg-gray-800 fixed top-5 ${
          toggle ? "left-0" : "-left-full"
        } transition-all duration-1000 h-full`}
      >
        <div>
          <input
            type="text"
            placeholder="Search by Name"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="p-1 text-center rounded shadow"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by Species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="p-1 text-center rounded shadow"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by Character Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-1 text-center rounded shadow"
          />
        </div>
        <div>
          <span className="p-3 text-lg text-white">Status</span>
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="p-1 text-center rounded shadow"
          >
            <option value="">All</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div>
          <span className="p-3 text-lg text-white">Gender</span>
          <select
            onChange={(e) => setGender(e.target.value)}
            className="p-1 text-center rounded shadow"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Filters;
