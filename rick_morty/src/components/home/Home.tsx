import Filters from "../filters/Filters";
import Pages from "../shared/Pages";

function Home() {
  return (
    <div className="mx-auto p-8 ">
      <Filters />
      <Pages />
    </div>
  );
}

export default Home;
