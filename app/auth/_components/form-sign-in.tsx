'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
type Props = {};

const authSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(255),
});

const FormSignIn = (props: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    await axios
      .post('http://localhost:8080/api/auth/sign-in', values, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Sign in successful!');
          router.push('/dashboard');
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
    <Card className="lg:w-[500px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Please enter your login information!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your private password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Sign In</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-center mx-auto">
          <p className="text-sm text-gray-500">Don&apos;t have an account? </p>
          <a href="/auth/sign-up" className="text-blue-500">
            Sign Up
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormSignIn;
