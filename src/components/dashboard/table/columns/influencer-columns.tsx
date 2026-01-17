'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

import Status from '../common/status';
import Thumbnail from '../common/thumbnail';
import Action from '../common/action';

export const influencerColumns: ColumnDef<import('@/types/product').IProduct>[] = [
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
    id: 'gender',
    header: () => 'Gender',
    cell: ({ row }) => {
      return <p>{row.original.properties.gender}</p>;
    },
  },
  {
    id: 'location',
    header: () => 'Location',
    cell: ({ row }) => {
      return <p>{row.original.properties.location}</p>;
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
    cell: ({ row }) => <Action row={row} href="/dashboard/product/influencer" />,
  },
];
