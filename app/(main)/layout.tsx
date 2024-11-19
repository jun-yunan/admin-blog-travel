import React from 'react';
import { Nav } from './_components/nav';
import Header from './_components/header';

type Props = { children: React.ReactNode };

const MainLayout = ({ children }: Props) => {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
