import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  // useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Spinner } from '../components/Spinner'
import { QueryClient } from "@tanstack/react-query";
import { SocketGateway } from "@/websocket";
import { Toaster } from "@/components/ui/sonner";
// import type { Auth } from "../utils/auth";

// function RouterSpinner() {
//   const isLoading = useRouterState({ select: (s) => s.status === "pending" });
//   return <div className={`${isLoading ? "" : "hidden"}`}>Carregando</div>;
// }

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const Route = createRootRouteWithContext<{
  //   auth: Auth;
  //   queryClient: QueryClient
}>()({
  component: RootComponent,
});

export default function RootComponent() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SocketGateway />
        <Outlet />
        <TanStackRouterDevtools position="bottom-left" />
        <Toaster expand />
      </QueryClientProvider>
    </>
  );
}
