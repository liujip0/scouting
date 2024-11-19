import type { AppRouter } from "@isa2025/api/src/router.ts";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
