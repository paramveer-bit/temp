'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Thumbnail from '../common/thumbnail';
import Status from '../common/status';
import Action from '../common/action';

export const tvColumns: ColumnDef<import('@/types/product').IProduct>[] = [
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
    id: 'channel',
    header: () => 'Channel Name',
    cell: ({ row }) => {
      return <p>{row.original.properties.channel}</p>;
    },
  },
  {
    id: 'viewership',
    header: () => 'Viewership',
    cell: ({ row }) => {
      return <p>{row.original.properties.viewership}</p>;
    },
  },

  {
    id: 'units',
    header: () => 'Ad Units',
    cell: ({ row }) => {
      return <p>{row.original.properties?.adUnit.join(', ')}</p>;
    },
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
    cell: ({ row }) => <Action row={row} href="/dashboard/product/tv" />,
  },
];
