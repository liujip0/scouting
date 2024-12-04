import { Table, TableCell, Typography } from "@mui/material";
import React from "react";

type BorderedTableProps = {
  children?: React.ReactNode;
};
export function BorderedTable({ children }: BorderedTableProps) {
  return (
    <Table
      sx={{
        borderColor: "primary.main",
        borderWidth: 3,
      }}>
      {children}
    </Table>
  );
}

type ThProps = {
  thickRightBorder?: boolean;
  children?: React.ReactNode;
};
export function Th({ thickRightBorder = false, children }: ThProps) {
  return (
    <TableCell
      sx={{
        borderColor: "primary.main",
        borderRightWidth: thickRightBorder ? 5 : 1,
      }}>
      <Typography
        sx={{
          fontWeight: "bold",
        }}>
        {children}
      </Typography>
    </TableCell>
  );
}

type TdProps = {
  thickRightBorder?: boolean;
  children?: React.ReactNode;
};
export function Td({ thickRightBorder = false, children }: TdProps) {
  return (
    <TableCell
      sx={{
        borderColor: "primary.main",
        borderRightWidth: thickRightBorder ? 5 : 1,
        borderTopWidth: 2,
      }}>
      {children}
    </TableCell>
  );
}
