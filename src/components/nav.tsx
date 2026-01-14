import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav className="flex gap-4 text-sm">
      <Link to="/">Torneios</Link>
      <Link to="/ranking">Ranking</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}
