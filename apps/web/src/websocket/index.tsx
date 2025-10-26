import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";

export const SocketGateway = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate({
    from: "/app/tasks",
  });

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_WEBSOCKET_URL!}`, {
      withCredentials: true,
    });

    socket.on("desconnect", (reason) => {
      console.log(reason);
    });

    socket.on("task:created", (response) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.info(response.title, {
        description: response.body,
        action: {
          label: "Acessar",
          onClick: () =>
            navigate({
              params: {
                taskId: response.taskId,
              },
              search: {
                page: 1,
                size: 10,
              },
              to: "/app/tasks/$taskId",
            }),
        },
      });
    });
    socket.on("task:updated", (response) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", response.taskId] });
      toast.info(response.title, {
        description: response.body,
        action: {
          label: "Acessar",
          onClick: () =>
            navigate({
              params: {
                taskId: response.taskId,
              },
              search: {
                page: 1,
                size: 10,
              },
              to: "/app/tasks/$taskId",
            }),
        },
      });
    });
    socket.on("comment:new", (response) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", response.taskId],
      });
      toast.info(response.title, {
        description: response.body,
        action: {
          label: "Acessar",
          onClick: () =>
            navigate({
              params: {
                taskId: response.taskId,
              },
              search: {
                page: 1,
                size: 10,
              },
              to: "/app/tasks/$taskId",
            }),
        },
      });
    });

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("comment:new");
      socket.disconnect();
    };
  }, []);
  return <></>;
};
