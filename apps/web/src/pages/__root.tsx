import {
  Outlet,
  createRootRouteWithContext,
  // useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Spinner } from '../components/Spinner'
// import type { QueryClient } from "@tanstack/react-query";
// import type { Auth } from "../utils/auth";

// function RouterSpinner() {
//   const isLoading = useRouterState({ select: (s) => s.status === "pending" });
//   return <div className={`${isLoading ? "" : "hidden"}`}>Carregando</div>;
// }

export const Route = createRootRouteWithContext<{
  //   auth: Auth;
  //   queryClient: QueryClient
}>()({
  component: RootComponent,
});

export default function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
