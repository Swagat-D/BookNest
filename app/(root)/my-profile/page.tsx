import { sampleBooks } from '@/app/constants';
import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/Button';
import React from 'react'


const page = () => {
  return <>
  <form action={async() => {
    'use server';

    await signOut();
  }}
    className='mb-10'
  >
    <Button>
      LogOut
    </Button>
  </form>

    <BookList title='Borrowed Books' books={sampleBooks} />
  </>
}

export default page
