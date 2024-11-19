'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useStore from '@/hooks/useStore';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Pen } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  author: z.string().email(),
  content: z
    .string()
    .min(3, { message: 'Content must be at least 3 characters.' }),
});

export function DialogCreateBlog() {
  const { setReloaded } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      author: '',
      content: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof blogSchema>) => {
    await axios
      .post('http://localhost:8080/api/blogs/create-blog', values, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          console.log('Blog created!');
          setIsOpen(false);
          toast.success('Blog created!');
          setReloaded();
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data + ' ' + error.response?.status, {
            style: {
              color: 'red',
            },
          });
        }
        console.log(error);
      });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <p>Write Blog</p>
          <Pen size={4} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write Blog</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Example Title" {...field} type="text" />
                  </FormControl>
                  <FormDescription>
                    Enter a title for your blog post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormDescription>
                    Phase enter your email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write..."
                      {...field}
                      className="h-32"
                    />
                  </FormControl>
                  {/* <FormDescription>Write...</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Blog</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
