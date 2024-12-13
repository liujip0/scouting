import { SxProps, Table, TableCell, Typography } from "@mui/material";
import React from "react";

type BorderedTableProps = {
  stickyHeader?: boolean;
  children?: React.ReactNode;
};
export function BorderedTable({ stickyHeader, children }: BorderedTableProps) {
  return (
    <Table
      stickyHeader={stickyHeader}
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
  sx?: SxProps;
  children?: React.ReactNode;
};
export function Th({ thickRightBorder = false, sx, children }: ThProps) {
  return (
    <TableCell
      sx={{
        ...sx,
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
