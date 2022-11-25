import { useEffect, useState } from 'react';
import { createTable, getCoreRowModel, useTableInstance } from '@tanstack/react-table';

export type ErCpTimes = {
  checkPointName: string;
  pos1: string;
  pos2: string;
  pos3: string;
  pos4: string;
  pos5: string;
  pos6: string;
  pos7: string;
};

const table = createTable().setRowType<ErCpTimes>();

const defaultColumns = [
  table.createGroup({
    header: 'CP',
    //footer: props => props.column.id,
    columns: [table.createDataColumn('checkPointName', {})]
  }),
  table.createGroup({
    header: 'Times',
    //footer: props => props.column.id,
    columns: [
      table.createDataColumn('pos1', {}),
      table.createDataColumn('pos2', {}),
      table.createDataColumn('pos3', {}),
      table.createDataColumn('pos4', {}),
      table.createDataColumn('pos5', {}),
      table.createDataColumn('pos6', {}),
      table.createDataColumn('pos7', {})
    ]
  })
];

interface ERTableProps {
  cpTimes: ErCpTimes[];
}

export default function ERTable(props: ERTableProps) {
  const [data, setData] = useState(props.cpTimes);
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);

  useEffect(() => {
    setData(props.cpTimes);
  });

  const instance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <table>
      <thead>
        {instance
          .getHeaderGroups()
          .filter((i) => i.id === '0') // selecting first to have main header names
          .map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
      </thead>
      <tbody>
        {instance.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{cell.renderCell()}</td>
            ))}
          </tr>
        ))}
      </tbody>
      {/* <tfoot>
        {instance.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : header.renderFooter()}
              </th>
            ))}
          </tr>
        ))}
      </tfoot> */}
    </table>
  );
}
