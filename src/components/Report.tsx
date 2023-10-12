import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import Image from 'next/image';
import type { ApiResponse } from '@/types/CrimeTypes';

ChartJS.register(
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

// Reusable HR Line
const HRLine = () => (
  <hr
    className='h-[3px] border-none my-4 w-[100%]'
    style={{
      background: 'linear-gradient(90.22deg, #005DFF 0%, #00A3FF 44.27%, #21DDFF 100%)'
    }}
  />
)

interface ReportProps{
  crimeData: ApiResponse | null;
};

// Months Array & Date
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();

const Report: React.FC<ReportProps> = ({ crimeData }) => {
  // Ensure that the crime data is present
  if (!crimeData) return;

  return (
    <div>
      {/* Header */}
      <div className='mx-6'>
        <div className='flex items-center justify-between py-3'>
          <div className='flex items-center'>
            <Image src={'/assets/pdf/logo.svg'} alt="logo" width={35} height={35} className='my-2' />
            <h2 className='text-[15px] md:text-lg ml-2'>RealAssist.AI</h2>
          </div>
          <div>
            <h4 className='text-[9px] md:text-lg font-[900] font-poppins'>123 Main Street, Dover, NH 03820-4667</h4>
          </div>


        </div>
        <HRLine />
      </div>

      {/* Dummy Placeholder Blocks to Make Reports more Beautiful */}
      <div className='bg-[#E8EEFB] mx-6 pt-4 rounded-[13px] my-4'>
        <h5 className='font-poppins text-md text-[#1463FF] mx-8 mb-2'>&nbsp;&nbsp;</h5>
        <div className='bg-[#F2F4F5] w-full pr-8 pb-4 pt-3 rounded-b-[13px]'>
          <div className='flex items-center w-full justify-start'>
            <p className='-rotate-90 opacity-0'>Arrests</p>
            <div className='w-full h-[150px] bg-[#fff] px-2 py-4 my-3 rounded-[13px] drop-shadow-sm'>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-[#E8EEFB] mx-6 pt-4 rounded-[13px] my-4'>
        <h5 className='font-poppins text-md text-[#1463FF] mx-8 mb-2'>&nbsp;&nbsp;</h5>
        <div className='bg-[#F2F4F5] w-full pr-8 pb-4 pt-3 rounded-b-[13px]'>
          <div className='flex items-center w-full justify-start'>
            <p className='-rotate-90 opacity-0'>Arrests</p>
            <div className='w-full h-[150px] bg-[#fff] px-2 py-4 my-3 rounded-[13px] drop-shadow-sm'>
            </div>
          </div>
        </div>
      </div>

      {/* Crime Title Break */}
      <div className='flex mx-6 items-center'>
        <div className='flex items-center mr-3'>
          <Image src={'/assets/pdf/location.svg'} alt="location" width={35} height={35} className='my-2' />
          <h5 className='font-poppins ml-2 text-md'>Crime</h5>
        </div>
        <HRLine />
      </div>

      {/* Line Chart Component */}
      <div className='bg-[#E8EEFB] mx-6 pt-4 rounded-[13px] my-4'>
        <h5 className='font-poppins text-md text-[#1463FF] mx-8 mb-2'>Burglary</h5>
        <div className='bg-[#F2F4F5] w-full pr-8 pb-4 pt-3 rounded-b-[13px]'>
          <div className='flex items-center w-full justify-start'>
            <p className='-rotate-90'>Arrests</p>
            <div className='w-full h-[150px] bg-[#fff] px-2 py-4 my-3 rounded-[13px] drop-shadow-sm'>
              <Line
                data={{
                  labels: crimeData.data.map((i) => i.data_year),
                  datasets: [
                    {
                      label: 'No. of Burglary',
                      data: crimeData.data.map((i) => i.Burglary),
                      backgroundColor: [
                        '#1463FF',
                      ],
                      borderColor: [
                        '#1463FF',
                      ],
                      borderWidth: 2,
                    },
                  ],
                }}
                width={'100%'}
                options={{
                  // Disable animations
                  animation: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      }
                    },
                  },
                  // Disable the legend, tooltip, and maintain aspect ratio
                  elements: {
                    point: {
                      radius: 0,
                    }
                  },
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: false
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className='mx-6 mt-6'>
        <HRLine />
        <div className='flex items-center justify-between py-3'>
          <div>
            <h2 className='text-[9px] md:text-sm font-[800] font-poppins text-[#1463FF]'>Report Generated on {month[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</h2>
          </div>
          <div>
            <h4 className='text-[9px] md:text-sm font-[800] font-poppins'>RealAssist Property Report | Page 1 <span className='text-[#626E99]'>of 25</span></h4>
          </div>


        </div>
      </div>

    </div>
  );
};

export default Report;
