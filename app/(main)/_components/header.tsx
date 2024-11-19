import React from 'react';
import { Nav } from './nav';
import { Button } from '@/components/ui/button';
import { Account } from './account';
import { Separator } from '@/components/ui/separator';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="w-full h-[60px] flex justify-around items-center  border-b-2 border-b-gray-300 shadow-lg">
      <div>
        <p className="text-lg font-bold">NAKIET</p>
      </div>
      <Nav />
      <Account />
    </div>
  );
};

export default Header;
