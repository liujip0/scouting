import { User } from "@isa2025/api/src/utils/dbtypes.ts";
import { Stack } from "@mui/material";
import DataLayout from "./DataLayout.tsx";

type DataMenuProps = {
  setToken: (
    newToken: string,
    expiresAt: number,
    permLevel: User["permLevel"]
  ) => void;
};
export default function DataMenu({ setToken }: DataMenuProps) {
  return (
    <DataLayout
      setToken={setToken}
      level="menu">
      <Stack
        sx={{
          width: 1,
          height: 1,
        }}></Stack>
    </DataLayout>
  );
}
