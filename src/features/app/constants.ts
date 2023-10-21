import { toolsConfig } from "@/features/tools/constants";
import { canvasConfig } from "@/features/canvas/constants";
import { historyConfig } from "@/features/history/constants";
import { pointerConfig } from "@/features/pointer/constants";

export const config = {
  canvasConfig,
  historyConfig,
  toolsConfig,
  pointerConfig,
} as const;
