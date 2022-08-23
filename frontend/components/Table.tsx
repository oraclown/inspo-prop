import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Person = {
  title: string
  description: string
  expiry: number
  created: number
  status: string
  tags: string
}

const defaultData: Person[] = [
  {
    title: 'tanner',
    description: 'linsley',
    expiry: 24,
    created: 100,
    status: 'open',
    tags: "50",
  },
  {
    title: 'tandy',
    description: 'miller',
    expiry: 40,
    created: 40,
    status: 'rejected',
    tags: "80",
  },
  {
    title: 'joe',
    description: 'dirte',
    expiry: 45,
    created: 20,
    status: 'accepted',
    tags: "10",
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('status', {
    header: 'status',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('title', {
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
    header: () => 'expiry',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('created', {
    header: () => <span>created</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('tags', {
    header: 'tags',
    footer: info => info.column.id,
  }),
]

export default function Table() {
  const [data, setData] = React.useState(() => [...defaultData])
  const rerender = React.useReducer(() => ({}), {})[1]

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
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  )
}
