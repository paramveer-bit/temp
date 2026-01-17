'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Thumbnail from '../common/thumbnail';
import Status from '../common/status';
import Action from '../common/action';

export const magazineColumns: ColumnDef<import('@/types/product').IProduct>[] = [
  {
    id: 'Image',
    cell: ({ row }) => <Thumbnail row={row} />,
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    id: 'type',
    header: () => 'Type',
    cell: ({ row }) => {
      return <Badge variant="normal">{row.original.subCategory}</Badge>;
    },
  },
  {
    id: 'status',
    header: () => 'Status',
    cell: ({ row }) => <Status row={row} />,
  },
  {
    id: 'language',
    header: () => 'Language',
    cell: ({ row }) => <p>{row.original.properties.language}</p>,
  },
  {
    id: 'type',
    header: () => 'Type',
    cell: ({ row }) => <p>{row.original.properties.adType}</p>,
  },
  {
    id: 'section',
    header: () => 'Section',
    cell: ({ row }) => <p>{row.original.properties.section}</p>,
  },
  {
    id: 'Created At',
    header: () => 'Create At',
    cell: ({ row }) => {
      return <p>{format(new Date(row.original.createdAt), "PPP 'at' HH:mm")}</p>;
    },
  },
  {
    id: 'Action',
    header: () => '',
    cell: ({ row }) => <Action row={row} href="/dashboard/product/magazine" />,
  },
];
