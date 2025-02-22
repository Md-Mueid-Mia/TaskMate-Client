
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import { TaskProvider } from "./Context/TaskContext.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <ThemeProvider>
        <TaskProvider>
          <RouterProvider router={router} />
        </TaskProvider>
      </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);