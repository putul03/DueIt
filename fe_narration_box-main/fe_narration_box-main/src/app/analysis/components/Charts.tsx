'use client';

import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Todotype } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
);


const TaskCharts = ({ tasks }: { tasks: Todotype }) => {
  const timeEstimates = tasks.reduce((acc, task) => {
    acc[task.time_estimate] = (acc[task.time_estimate] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)

  const barData = {
    labels: Object.keys(timeEstimates),
    datasets: [
      {
        label: 'Tasks per Time Estimate',
        data: Object.values(timeEstimates),
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
      },
    ],
  }

  const completedTasks = tasks.filter((task) => task.completed).length;
  const notCompletedTasks = tasks.length - completedTasks

  const pieData = {
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        data: [completedTasks, notCompletedTasks],
        backgroundColor: ['#4BC0C0', '#FF6384'],
      },
    ],
  }

  const taskCreationDates = tasks.reduce((acc, task) => {
    const date = new Date(task.created_at).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const lineData = {
    labels: Object.keys(taskCreationDates),
    datasets: [
      {
        label: 'Tasks Created Per Day',
        data: Object.values(taskCreationDates),
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  }

  return (
    <div className='flex flex-col gap-5 text-white'>
      <div className='w-5/6 mx-auto bg-white/80 backdrop-blur text-black p-5 rounded-2xl'>
        <h1 style={{ textAlign: 'center' }}>Tasks by Time Estimate</h1>
        <Bar data={barData} />
      </div>
      <div className='w-5/6 mx-auto bg-white/80 backdrop-blur text-black p-5 rounded-2xl'>
        <h1 style={{ textAlign: 'center' }}>Task Completion Status</h1>
        <Pie data={pieData} />
      </div>
      <div className='w-5/6 mx-auto bg-white/80 backdrop-blur text-black p-5 rounded-2xl'>
        <h1 style={{ textAlign: 'center' }}>Tasks Created Over Time</h1>
        <Line data={lineData} />
      </div>
    </div>
  )
}

export default TaskCharts;
