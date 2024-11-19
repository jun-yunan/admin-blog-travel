import React from 'react';
import HeaderAuth from './_components/header-auth';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <>
      {/* <HeaderAuth /> */}
      {children}
    </>
  );
};

export default AuthLayout;
