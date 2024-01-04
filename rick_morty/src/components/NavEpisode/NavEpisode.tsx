import { useState, useEffect } from "react";
import useFetch from "../../Api/UseFetch";
import { useParams } from "react-router-dom";
import { dataAction } from "../../redux/DataSlice";
import { useDispatch } from "react-redux";
import Pages from "../shared/Pages";
import Navbar from "../Navigation/Navbar";

function NavEpisode() {
  const params = useParams();
  const dispatch = useDispatch();
  const [characterData, setCharacterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEpisode, setEpisode] = useState(params?.id ? params?.id : 1);

  const formattedDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const episodeIds = Array.from({ length: 51 }, (_, i) => i + 1);
  const episodeApi = `https://rickandmortyapi.com/api/episode/${selectedEpisode}`;
  const { data: episode } = useFetch("", episodeApi);

  const characterUrls = episode?.characters;
  const fetchDataForEpisodes = async () => {
    try {
      const charactersData = await Promise.all(
        characterUrls?.map(async (characterUrl) => {
          const response = await fetch(characterUrl);
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          const data = await response.json();
          return data;
        })
      );

      setCharacterData(charactersData);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataForEpisodes();
  }, [characterUrls]);

  dispatch(
    dataAction.storeFilterdata(
      error
        ? { result: [], Totalpage: 1 }
        : {
            result: characterData,
            Totalpage: Math.ceil((characterData?.length || 1) / 20),
          }
    )
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-36 md:mt-14">
        <div className="fixed flex items-center justify-around w-full h-16 bg-gray-700">
          <h2 className="text-lg text-green-500">
            Search Character By Episode
          </h2>
          <select
            onChange={(e) => setEpisode(e.target.value)}
            className="h-8 p-1 bg-gray-200 rounded"
          >
            {episodeIds.map((value, i) => (
              <option key={i} value={value}>
                Episode {value}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-16 text-center">
          <h1 className="text-slate-900">
            Location: <span className="text-green-500">{episode?.name}</span>
          </h1>
          <h2 className="text-slate-900">
            Air Date:{" "}
            <span className="text-green-500">
              {formattedDate(episode?.created || "")}
            </span>
          </h2>
        </div>
      </div>
      <Pages check="episode" />
    </>
  );
}

export default NavEpisode;
