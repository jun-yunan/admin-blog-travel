'use client';

import React from 'react';
import DataTableBlogs from './data-table';
import { DialogCreateBlog } from './_components/dialog-create-blog';

type Props = {};

const BlogsPage = (props: Props) => {
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <div>
        <DialogCreateBlog />
      </div>
      <DataTableBlogs />
    </div>
  );
};

export default BlogsPage;
