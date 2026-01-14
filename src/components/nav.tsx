import { Link } from "react-router-dom";
import { ModeToggle } from "./dark-mode-toggle";

export function Nav() {
  return (
    <nav className="flex gap-4 text-sm">
      <ModeToggle />
      <Link to="/">Torneios</Link>
      <Link to="/ranking">Ranking</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}
