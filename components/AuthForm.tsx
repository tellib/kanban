'use client';

import { signUp, signInWithPassword } from '@/lib/db';
import { Button } from './Button';
import { Input } from './Input';
import { useState } from 'react';
import { useSession } from '@/hooks/useSession';
import { Center } from './Center';
import { IconLoader2 } from '@tabler/icons-react';

export function AuthForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Added for registration
  });
  const [loading, setLoading] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState('');
  const [session, setSession] = useState(useSession());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const { email, password, confirmPassword } = formData;
    const validationError = validate(email, password, confirmPassword);
    if (validationError !== true) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      if (registering) {
        await signUp(email, password).then((session) => {
          if (!session) {
            setError('Error registering');
          }
        });
      } else {
        await signInWithPassword(email, password).then((session) => {
          if (!session) {
            setError('Invalid email or password');
          }
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const validate = (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email';
    }
    if (password.length < 6) {
      return 'Password should include at least 6 characters';
    }
    if (registering && password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return true;
  };

  if (!session) {
    <></>;
  }

  return (
    <form
      className='flex w-96 flex-col rounded-xl bg-white/80 p-8 shadow-sm ring-1 ring-inset ring-white/90 dark:bg-black/80 dark:bg-blue-800 dark:ring-black/50'
      onSubmit={handleSubmit}
    >
      <h1 className='mb-2 text-center text-xl font-bold dark:text-white'>
        {registering ? 'Register' : 'Login'}
      </h1>
      {error && (
        <div className='mb-4 text-center font-medium text-red-500'>{error}</div>
      )}
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
      {registering && (
        <Input
          type='password'
          label='Confirm Password'
          id='confirmPassword'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      )}
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
        <Center>
          <IconLoader2
            className='animate-spin'
            size={60}
            strokeWidth={2}
            strokeLinecap='round'
          />
        </Center>
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
