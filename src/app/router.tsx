import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout";
import { TournamentsListPage } from "../features/tournaments/pages/tournament-list";
import { TournamentDetailPage } from "../features/tournaments/pages/tournament-detail";
import { RankingPage } from "../features/ranking/pages/ranking";
import { AdminDashboardPage } from "../features/admin/pages/admin-dashboard";
import { AdminTournamentCreatePage } from "../features/admin/pages/admin-tournament-create";
import { ProtectedRoute } from "../components/protected-route";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <TournamentsListPage /> },
      { path: "/tournaments/:id", element: <TournamentDetailPage /> },
      { path: "/ranking", element: <RankingPage /> },

      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/tournaments/new",
        element: (
          <ProtectedRoute>
            <AdminTournamentCreatePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
