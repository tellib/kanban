'use client';

import { Center } from '@/components/Center';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/Table';
import axios from '@/lib/axios';
import { UserData } from '@/models/data';
import { useEffect, useState } from 'react';

export default function Page() {
  const [userList, setUserList] = useState<UserData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/user')
      .then((response) => {
        setUserList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Center>Loading...</Center>;
  }

  if (!userList || userList.length === 0) {
    return <Center>No users found</Center>;
  }

  const data = userList.map(
    ({ id, username, email, created_at, updated_at }) => (
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell>{username}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{created_at}</TableCell>
        <TableCell>{updated_at}</TableCell>
      </TableRow>
    )
  );

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>{data}</TableBody>
      </Table>
    </div>
  );
}
