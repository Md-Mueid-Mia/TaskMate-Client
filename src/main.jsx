// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./Pages/Home.jsx";
// import Login from "./Pages/Login.jsx";
// import { TaskProvider } from "./Context/TaskContext.jsx";
// import AuthProvider from "./Context/AuthProvider.jsx";
// import PrivateRoute from "./Routes/PrivateRoute.jsx";
// import { Toaster } from "react-hot-toast";
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// // const queryClient = new QueryClient();
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5, // 5 minutes
//       retry: 1,
//     },
//   },
// });
// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/",
//     element: (
//       <PrivateRoute>
//         <Home />
//       </PrivateRoute>
//     ),
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       <TaskProvider>
//       <QueryClientProvider client={queryClient}>
//         <RouterProvider router={router} />
//         <Toaster />
//         </QueryClientProvider>
//       </TaskProvider>
//     </AuthProvider>
//   </StrictMode>
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import { TaskProvider } from "./Context/TaskContext.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";

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
        <TaskProvider>
          <RouterProvider router={router} />
          {/* <ReactQueryDevtools initialIsOpen={false} /> Optional: Adds devtools */}
        </TaskProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);