import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full overflow-hidden bg-slate-400">
      <ul className="flex flex-col justify-end gap-4 p-3 mr-5 overflow-hidden list-none lg:gap-8 md:flex-row">
        <li className="text-lg text-white">
          <Link to="/characters">Characters</Link>
        </li>
        <li className="text-lg text-white">
          <Link to="/locations">Locations</Link>
        </li>
        <li className="text-lg text-white">
          <Link to="/episode/1">Episodes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
