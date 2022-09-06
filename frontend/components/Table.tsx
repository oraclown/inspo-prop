import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Record = {
  title: string
  description: string
  expiry: number
  created: number
  status: string
  tags: string
  outcome: string
}

const columnHelper = createColumnHelper<Record>()

const columns = [
  columnHelper.accessor('status', {
    id: 'status',
    header: 'status',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('title', {
    id: 'title',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.description, {
    id: 'description',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>description</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('expiry', {
    id: 'expiry',
    header: () => 'expiry',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('created', {
    id: 'created',
    header: () => <span>created</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('outcome', {
    id: 'outcome',
    header: 'outcome',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('tags', {
    id: 'tags',
    header: 'tags',
    footer: info => info.column.id,
  }),
]

export default function Table ({ data }) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td className="p-4 border border-pink-400" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            
          </tfoot>
        </table>
        <div className="h-4" />
     
    </div>
  )
}
