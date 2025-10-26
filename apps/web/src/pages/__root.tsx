import { QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient } from "@tanstack/react-query";
import { SocketGateway } from "@/websocket";
import { Toaster } from "@/components/ui/sonner";
import { NotFound } from "./-not_found.index";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const Route = createRootRouteWithContext<{}>()({
  component: RootComponent,
  notFoundComponent: NotFound,
});

export default function RootComponent() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HeadContent />
        <SocketGateway />
        <TanStackRouterDevtools position="bottom-right" />
        <Toaster expand />
        <Outlet />
      </QueryClientProvider>
    </>
  );
}
