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

const defaultData: Record[] = [
  {
    title: '@fakeuser info interview',
    description: 'dmed founder @fakeuser and asked for an informational interview. link: https://twitter.com/blahblah what happens if the text is super long',
    expiry: 32341234, // timestamp
    created: 12341234, // timestamp
    status: 'open',
    tags: "saas, interview, twitter",
    outcome: "",
  },
  {
    title: 'salary raise',
    description: 'asked boss for a 15% raise',
    expiry: 45674567,
    created: 12345678,
    status: 'rejected',
    tags: "job, career, finances",
    outcome: "gave a 5% raise!",
  },
  {
    title: 'improve table css bounty',
    description: 'Asked on twitter for anyone who wants to contribute to this site if they could improve the CSS of this table. Linked a rough design spec as well with the needed features. Link: https://twitter.com/blahblah',
    expiry: 67896789,
    created: 12346789,
    status: 'accepted',
    tags: "delegated, twitter, saas",
    outcome: "@bojanglesfake followed the spec, made a pr, merged, sent bounty via venmo"
  },
]

const columnHelper = createColumnHelper<Record>()

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
  columnHelper.accessor('outcome', {
    header: 'outcome',
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
          
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  )
}
