import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SnackbarProvider } from "notistack";
import { queryClient } from "cache";
import { CAM } from "./cam";

export const CAMSOLO = () => (
  <QueryClientProvider client={queryClient}>
    <SnackbarProvider>
      <CAM />
    </SnackbarProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
