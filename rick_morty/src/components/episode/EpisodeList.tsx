import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

function EpisodeList() {
  const episodes: string[] = useSelector((state: []) => state.data.episodes);
  const navigate = useNavigate();
  const [episodeData, setEpisodeData] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDataForEpisodes = async () => {
    try {
      const episodeData = await Promise.all(
        episodes.map(async (episodeUrl) => {
          const response = await fetch(episodeUrl);
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          const data: Episode = await response.json();
          return data;
        })
      );

      setEpisodeData(episodeData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataForEpisodes();
  }, [episodes]);

  return (
    <div className="flex flex-row flex-wrap justify-center items-center  bg-gray-800">
      {episodeData.map((episode, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-slate-400 via-slate-400 to-slate-600 rounded-lg p-4 m-4 text-slate-950 shadow-md w-72 h-60 cursor-pointer"
          onClick={(e) => navigate(`/episode/${episode.id}`)}
        >
          <h2 className="text-2xl">{episode.name}</h2>
          <p>Air Date: {episode.air_date}</p>
          <p>Episode: {episode.episode}</p>
          <div className="mt-4">
            <p
              onClick={(e) => navigate(`/episode/${episode.id}`)}
              style={{ color: "whitesmoke" }}
            >
              Click Here to see more Characters of this episode:
            </p>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <ul>{/* Render your characters here */}</ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EpisodeList;
