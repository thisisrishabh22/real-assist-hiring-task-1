'use client'

import Alert from '@/components/Alert';
import Image from 'next/image'
import { useEffect } from 'react';

interface HomeProps {
  params: any;
  searchParams: {
    downloaded?: boolean;
    [key: string]: any;
  };
}

export default function Home(props: HomeProps) {

  useEffect(() => {
    // clear the params from the URL
    window.history.replaceState({}, '', '/');
  }, []);

  // Function to try to download the PDF which will open /pdf
  const tryToDownload = () => {
    window.opener = null;
    window.open('/pdf', '_self');
  };

  return (
    <>
      {
        props.searchParams.downloaded && (
          <Alert message='Your PDF has been downloaded!' />
        )
      }
      <main className="flex min-h-screen items-center justify-center p-24">
        <button className='btn-primary' onClick={tryToDownload}>
          <Image className='ml-3.5' src="/assets/home/printer.svg" width={24} height={24} alt="Printer" />
          <span className='mr-3.5'>Print</span>
        </button>
      </main>
    </>
  )
}
