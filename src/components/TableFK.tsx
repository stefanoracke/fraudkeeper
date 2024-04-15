"use client"
import React from "react";
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
  actions: ActionI[]
}

function RenderActions({ actions, item, rows }: { actions: ActionI[], item: any, rows: any }) {
  return (
    <div className="relative flex items-center gap-2">
      {
        actions.map((action, index) => (
          <Tooltip content={action.tooltipText} key={action.tooltipText + index + "accion"} color={action.colorClass}>
            <span className={`text-lg text-${action.colorClass} cursor-pointer active:opacity-50`} onClick={() => { action.action(item,rows) }}>
              {action.icon}
            </span>
          </Tooltip>
        ))
      }
    </div>
  )

}

export default function TableFK(params: TableFKI) {
  const { columns, rows, actions } = params
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
                <RenderActions actions={actions} item={item} rows={rows}/>
                :
                getKeyValue(item, columnKey)

            }</TableCell>}

          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
