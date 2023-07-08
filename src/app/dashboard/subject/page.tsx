"use client"
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Subject() {

    useEffect(() => {
        async function fetchData() {
          try {
            fetch(`/api/subject?page=${1}&limit=5`)
                .then((res) => res.json())
                .then(ress => console.log(ress))
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData();
      }, []);
    return (
    <div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-semibold tracking-tight'>Subject</h1>
            <Link href='/dashboard/subject/create' className={buttonVariants()}>Create Subject</Link>           
        </div>
    </div>
    )
}
  