'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Đặt trạng thái là đã mount
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Chỉ chuyển hướng khi đã mount
    if (isMounted && pathname === '/') {
      router.push('/dashboard');
    }
  }, [isMounted, pathname, router]);

  return null;
}
