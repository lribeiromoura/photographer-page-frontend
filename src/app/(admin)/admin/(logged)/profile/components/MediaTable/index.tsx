'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Copy } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import NotFound from '@/components/NotFound';

interface DataTableProps<TData, TValue> {
  loading?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  loading,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {!loading &&
            data.length > 0 &&
            table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
        </TableHeader>
        <TableBody>
          {!loading &&
            data.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) =>
                  cell.column.id === 'url' ? (
                    <TableCell
                      key={cell.id}
                      className="pointer-events-auto cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          cell.row.renderValue(cell.column.id),
                        );
                      }}
                    >
                      <Copy />
                    </TableCell>
                  ) : (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
          {loading &&
            Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 7 }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-[20px] w-[100px] rounded-full bg-white" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={7}>
                <NotFound
                  title="Perfil não encontrado"
                  subtitle="Utilize o botão cadastrar para adicionar um novo perfil."
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
