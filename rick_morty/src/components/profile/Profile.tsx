import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dataAction } from "../../redux/DataSlice";
import EpisodeList from "../episode/EpisodeList";
import useFetch from "../../Api/UseFetch";

function Profile() {
  const params = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`character/${params.id}`);

  const obj = data.location;

  const locationData = useFetch("", obj?.url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  if (data) {
    dispatch(dataAction.episodesdata(data?.episode));
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 p-20 mt-20 bg-gray-800 md:mt-5 md:flex-row md:gap-5">
        <div className="flex-1 text-center">
          <img
            src={data.image}
            alt={data.name}
            className="border border-white rounded shadow shadow-gray-300 md:w-80 lg:w-96 w-60"
          />
        </div>
        <div className="p-5 border border-gray-300 rounded flex-2 lg:px-10 md:px-10 xl:px-40 bg-slate-400 ">
          <h2 className="mb-10 text-2xl">{data.name}</h2>
          <p className="mb-5">
            <span className="mr-2 font-bold text-black">Status:</span>{" "}
            {data.status}
          </p>
          <p className="mb-5">
            <span className="mr-2 font-bold text-black">Species:</span>{" "}
            {data.species}
          </p>
          <p className="mb-5">
            <span className="mr-2 font-bold text-black">Gender:</span>{" "}
            {data.gender}
          </p>
          <p className="mb-5">
            <span className="mr-2 font-bold text-black">Location:</span>{" "}
            {data.location.name}
          </p>
          <p className="mb-5">
            <span className="mr-2 font-bold text-black">Origin:</span>{" "}
            {data.origin.name}
          </p>
          <p className="mb-5">
            <span className="mr-2 font-bold text-black">Type(location):</span>{" "}
            {locationData?.data?.type}
          </p>
          <p className="mb-5">
            <span className="mr-2 font-bold text-black">Dimension:</span>{" "}
            {locationData?.data?.dimension}
          </p>
          <p className="mb-5">
            <span className="mr-2 font-bold text-black">Residents:</span>{" "}
            {locationData?.data?.residents?.length}
          </p>
          <p className="mb-5">
            <span className="mr-2 font-bold text-black">Created:</span>{" "}
            {new Date(data.created).toLocaleString()}
          </p>
        </div>
      </div>

      <EpisodeList></EpisodeList>
    </>
  );
}

export default Profile;
