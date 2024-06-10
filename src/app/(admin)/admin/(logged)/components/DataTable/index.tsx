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

import { Skeleton } from '@/components/ui/skeleton';
import NotFound from '@/components/NotFound';

interface DataTableProps<TData, TValue> {
  loading?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  titleNotFound?: string;
  subtitleNotFound?: string;
}

export default function DataTable<TData, TValue>({
  loading,
  columns,
  data,
  titleNotFound = 'Dados não encontrado',
  subtitleNotFound = 'Não foi possível encontrar dados',
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
          {table.getHeaderGroups().map((headerGroup) => (
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
            table.getRowModel().rows?.length &&
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {loading &&
            Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-[20px] w-[100px] rounded-full bg-white" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={7}>
                <NotFound title={titleNotFound} subtitle={subtitleNotFound} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
