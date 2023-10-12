import React, { useState, useEffect } from 'react';

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
  // Show the alert for 8 seconds
  const [show, setShow] = useState(true);

  // Hide the alert after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 8000);

    // Cleanup
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {show && (
        <div className="bg-green-200 text-green-800 px-6 py-4 border-green-600 border rounded fixed top-5 left-2 w-2/3 lg:w-1/3" role="alert">
          <strong className="font-bold">{message}</strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3 text-sm lg:text-lg" onClick={() => setShow(false)}>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" role="button" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

          </span>
        </div>
      )}
    </>
  );
};

export default Alert;
