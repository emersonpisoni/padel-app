import { Outlet, Link } from "react-router-dom";
import { Nav } from "./nav";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold">Padel Tour</Link>
          <Nav />
        </div>
      </header>
      <main className="mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
