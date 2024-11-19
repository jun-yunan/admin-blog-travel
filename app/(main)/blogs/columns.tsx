'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronDown,
  Delete,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { format } from 'date-fns';
import useStore from '@/hooks/useStore';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export type Blog = {
  id: string;
  _id: string;
  title: string;
  author: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Blog>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'author',
    header: () => <div>Author</div>,
    cell: ({ row }) => {
      return <div className="lowercase">{row.getValue('author')}</div>;
    },
  },
  {
    accessorKey: 'content',
    header: () => <div>Content</div>,
    cell: ({ row }) => {
      return <div className="lowercase">{row.getValue('content')}</div>;
    },
  },
  {
    accessorKey: 'published',
    header: () => <div>Published</div>,
    cell: ({ row }) => {
      return (
        <div className="lowercase">
          {row.getValue('published') ? 'True' : 'False'}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <div>createdAt</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return (
        <div className="lowercase">{format(date, 'yyyy-MM-dd | HH:mm:ss')}</div>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div>updatedAt</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('updatedAt'));
      return (
        <div className="lowercase">{format(date, 'yyyy-MM-dd | HH:mm:ss')}</div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => CellDeleteComponent({ id: row.original._id }),
  },
];

const CellDeleteComponent = ({ id }: { id: string }) => {
  const { isOpenDialog, openDialog, setReloaded } = useStore();

  const router = useRouter();

  const handleDeleteBlog = async () => {
    // openDialog();
    console.log('Delete blog with id:', id);
    await axios
      .delete(`http://localhost:8080/api/blogs/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Blog deleted successfully.');
          openDialog();
          router.refresh();
          setReloaded();
        }
      })
      .catch((error) => {
        toast.error('Failed to delete blog.');
        openDialog();
      });
  };

  return (
    <>
      <Dialog onOpenChange={openDialog} open={isOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure delete blog?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => openDialog()}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBlog}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
            Copy payment ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View customer</DropdownMenuItem>
          <DropdownMenuItem>View blog details</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => openDialog()}>
            <div className="flex items-center justify-center text-rose-700 gap-x-2">
              <Trash2 className="h-[20px] w-[20px]" />
              <p className="text-sm font-semibold">Delete</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
