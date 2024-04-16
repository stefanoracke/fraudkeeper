"use client"
import React, { useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Tooltip } from "@nextui-org/react";

interface ColumnsI {
  key: string,
  label: string
}

export interface ActionI {
  icon: React.ReactNode,
  tooltipText: string,
  colorClass: "default" | "foreground" | "primary" | "secondary" | "success" | "warning" | "danger",
  action: Function
}

interface TableFKI {
  columns: ColumnsI[],
  rows: any[],
  Actions: any
}



export default function TableFK(params: TableFKI) {
  const { columns, rows, Actions } = params

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{
              columnKey == "actions" ?
                <Actions item={item}/>
                :
                getKeyValue(item, columnKey)

            }</TableCell>}

          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
