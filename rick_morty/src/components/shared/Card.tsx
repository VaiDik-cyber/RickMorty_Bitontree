interface CardProps {
  item: {
    image: string;
    name: string;
    status?: string;
    species: string;
    episode: Array<string>;

    location: {
      name: string;
    };
    origin: {
      name: string;
    };
    type: string;
  };
}

function Card({ item }: CardProps) {
  const statusColor = item?.status === "Dead" ? "red" : "yellow";

  const spanStyle: React.CSSProperties = {
    color: statusColor,
    fontFamily: "serif",
    fontWeight: "bolder",
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 text-center text-white rounded-md shadow-md h-96 w-72 bg-gradient-to-br from-slate-600 via-slate-400 to-slate-600 ">
      <div style={{ height: "60%" }}>
        <img
          src={item.image}
          alt=""
          className="object-cover w-56 h-56 rounded-md"
        />
      </div>
      <div style={{ height: "33%" }}>
        <ul className="mt-4 info">
          <li>
            <h2 className="font-serif font-semibold text-black">
              {item?.name}
            </h2>
            {/* <h4> */}
            <span style={spanStyle}>{item?.status}</span>-
            <span>{item?.species} </span>
            {/* </h4> */}
          </li>
          <li>
            <span>Total episode:</span>
            <span>{item?.episode.length}</span>
          </li>
          <li>
            <span>location:</span>
            <span>{item?.location.name}</span>
          </li>
          {/* <li>
          <span>First seen in:</span>
          <span>{item.origin.name}</span>
        </li> */}
          {/* <li>
          <span>Character Type:</span>
          <span>{item.type}</span>
        </li> */}
        </ul>
      </div>
    </div>
  );
}

export default Card;
