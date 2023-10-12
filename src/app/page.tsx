'use client'

import Image from 'next/image'

export default function Home() {

  const tryToDownload = () => {
    window.opener = null;
    window.open('/pdf', '_self');
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <button className='btn-primary' onClick={tryToDownload}>
        <Image className='ml-3.5' src="/assets/home/printer.svg" width={24} height={24} alt="Printer" />
        <span className='mr-3.5'>Print</span>
      </button>
    </main>
  )
}
