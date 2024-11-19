import React from 'react';
import FormSignUp from '../_components/form-sign-up';

type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <FormSignUp />
    </div>
  );
};

export default SignUpPage;
