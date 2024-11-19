import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import FormSignIn from '../_components/form-sign-in';

type Props = {};

const SignInPage = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <FormSignIn />
    </div>
  );
};

export default SignInPage;
