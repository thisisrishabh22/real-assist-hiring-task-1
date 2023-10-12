"use client"

import React, { useEffect, useState } from 'react';
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
  ChartData,
} from 'chart.js';
import Image from 'next/image';
import type { ApiResponse, OffenseData } from '@/types/CrimeTypes';

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

type Props = {
  crimeData: ApiResponse | null;
};

const Report = ({ crimeData }: Props) => {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);

  useEffect(() => {
    if (crimeData) {

      const burglaryData = crimeData.data.map((i) => i.Burglary);
      const yearsData = crimeData.data.map((i) => i.data_year);

      const data: ChartData<"line"> = {
        labels: yearsData,
        datasets: [
          {
            label: 'No. of Burglary',
            data: burglaryData,
            backgroundColor: [
              '#1463FF',
            ],
            borderColor: [
              '#1463FF',
            ],
            borderWidth: 2,
          },
        ],
      };

      setChartData(data);

    }
  }, [crimeData]);

  if (!chartData) return;

  return (
    <div>
      {/* Header */}
      <div className='mx-6'>
        <div className='flex items-center justify-between py-3'>
          <div className='flex items-center'>
            <Image src={'/assets/pdf/logo.svg'} alt="logo" width={35} height={35} className='my-2' />
            <h2 className='text-lg ml-2'>RealAssist.AI</h2>
          </div>
          <div>
            <h4 className='font-[900] font-poppins'>123 Main Street, Dover, NH 03820-4667</h4>
          </div>


        </div>
        <HRLine />
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
                data={chartData}
                width={'100%'}
                options={{
                  animation: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      }
                    },
                  },
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
            <h2 className='text-sm ml-2 font-[900] font-poppins text-[#1463FF]'>Report Genereted on September 26, 2023</h2>
          </div>
          <div>
            <h4 className='text-sm font-[900] font-poppins'>RealAssist Property Report | Page 1 <span className='text-[#626E99]'>of 25</span></h4>
          </div>


        </div>
      </div>

    </div>
  );
};

export default Report;
