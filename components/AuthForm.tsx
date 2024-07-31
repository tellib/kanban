'use client';

import { signUp, signInWithPassword } from '@/lib/db';
import { Button } from './Button';
import { Input } from './Input';
import { useRef, useState } from 'react';
import { Center } from './Center';
import { IconLoader2 } from '@tabler/icons-react';
import { Container } from './Container';

export function AuthForm() {
  const [loading, setLoading] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;
    const confirmPassword = confirmPasswordRef.current?.value as string;

    const valid = validate(email, password, confirmPassword);
    if (!valid) {
      setError(valid);
      setLoading(false);
      return;
    }

    try {
      if (registering) {
        await signUp(email, password).then((session) => {
          if (!session) setError('Error registering');
        });
      } else {
        await signInWithPassword(email, password).then((session) => {
          if (!session) setError('Invalid email or password');
        });
      }
    } catch (error) {
      console.log(error);
      setError('There was an error');
    } finally {
      setLoading(false);
    }
  };

  function validate(email: string, password: string, confirmPassword: string) {
    if (!email || !password) return 'Email and password are required';
    if (registering) {
      if (!confirmPassword) return 'Please confirm your password';
      if (password !== confirmPassword) return 'Passwords do not match';
    }
    if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email';
    if (password.length < 6)
      return 'Password should include at least 6 characters';
    return true;
  }

  return (
    <Container size={'md'} padding={'lg'}>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <h1 className='mb-2 text-center text-xl font-bold dark:text-white'>
          {registering ? 'Register' : 'Login'}
        </h1>
        <Input
          type='email'
          label='Email'
          id='email'
          autoFocus
          required
          ref={emailRef}
          autoComplete='email'
        />
        <Input
          type='password'
          label='Password'
          id='password'
          required
          ref={passwordRef}
        />
        {registering && (
          <Input
            type='password'
            label='Confirm Password'
            id='confirmPassword'
            required
            ref={confirmPasswordRef}
          />
        )}
        <Button
          type='submit'
          value='Submit'
          disabled={loading}
          className='mt-6'
        >
          {registering ? 'Register' : 'Login'}
        </Button>
        {error && (
          <div className='mt-4 text-center font-medium text-red-500'>
            {error}
          </div>
        )}
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
        <button
          type='button'
          className='mt-4 underline-offset-4 hover:underline'
          onClick={() => {
            setRegistering(!registering);
            emailRef.current?.focus();
          }}
        >
          {registering
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </button>
      </form>
    </Container>
  );
}
