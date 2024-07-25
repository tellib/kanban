'use client';

import { Center } from '@/components/Center';
import { useEffect, useState } from 'react';
import { getStatus } from '@/lib/db';

export default function Page() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatus().then((data) => {
      const { status } = data;
      if (status) {
        setStatus(status);
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <Center>Loading...</Center>;

  return <Center>{status}</Center>;
}
