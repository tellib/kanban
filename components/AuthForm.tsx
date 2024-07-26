'use client';

import { signUp, signInWithPassword } from '@/lib/db';
import { Button } from './Button';
import { Input } from './Input';
import { useEffect, useState } from 'react';
import { useSession } from '@/hooks/useSession';
import { Notification } from './Notification';
import { useRouter } from 'next/navigation';

export function AuthForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [registering, setRegistering] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [router, session]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormData({ ...formData });
    setLoading(true);

    const { email, password } = formData;
    if (registering) {
      signUp(email, password);
    } else {
      signInWithPassword(email, password);
    }
  };

  const validate = (email: string, password: string) => {
    if (registering) {
      return 'Passwords do not match';
    }
    if (password.length < 6) {
      return 'Password should include at least 6 characters';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email';
    }
    return true;
  };

  return (
    <form
      className='flex w-96 flex-col rounded-xl bg-white/80 p-8 shadow-sm ring-1 ring-inset ring-gray-300 dark:bg-black/80 dark:bg-slate-700'
      onSubmit={handleSubmit}
    >
      <h1 className='mb-2 text-center text-xl font-bold dark:text-white'>
        {registering ? 'Register' : 'Login'}
      </h1>
      <Input
        type='email'
        label='Email'
        id='email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        autoFocus
        required
      />
      <Input
        type='password'
        label='Password'
        id='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button
        variant={'primary'}
        type='submit'
        value='Submit'
        disabled={loading}
        className='mt-8'
      >
        {registering ? 'Register' : 'Login'}
      </Button>
      {loading && (
        <div style={{ marginTop: 5, fontWeight: 'bold' }}>Loading...</div>
      )}
      <Button
        variant={'unstyled'}
        type='button'
        className='mx-auto mt-4 underline-offset-8 hover:underline'
        onClick={() => setRegistering(!registering)}
      >
        {registering
          ? 'Already have an account? Login'
          : "Don't have an account? Register"}
      </Button>
    </form>
  );
}
