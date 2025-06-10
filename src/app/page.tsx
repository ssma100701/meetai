'use client';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const Home = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data: session } = authClient.useSession();

  if (session) {
    return (
      <div className='flex flex-col p-4 gap-y-4'>
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }

  const onSubmit = () =>
    authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          window.alert('Success');
        },
        onError: (ctx) => {
          // display the error message
          window.alert('Something went wrong');
        },
      }
    );

  const onLogin = () =>
    authClient.signIn.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          window.alert('Success');
        },
        onError: (ctx) => {
          // display the error message
          window.alert('Something went wrong');
        },
      }
    );

  return (
    <div>
      <div className='p-4 flex flex-col gap-y-4'>
        <Input
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>Create user</Button>
      </div>
      <div className='p-4 flex flex-col gap-y-4'>
        <Input
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
};

export default Home;
