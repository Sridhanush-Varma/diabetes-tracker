import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { GlucoseRecord } from '@/utils/supabase';
import { prepareChartData } from '@/utils/statsCalculator';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type GlucoseChartProps = {
  records: GlucoseRecord[];
  title?: string;
};

export default function GlucoseChart({ records, title = 'Glucose Levels Over Time' }: GlucoseChartProps) {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (records.length > 0) {
      setChartData(prepareChartData(records));
    }
  }, [records]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          padding: 20,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13,
        },
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Glucose: ${context.parsed.y} mg/dL`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11,
          },
          color: '#6b7280',
          padding: 8,
        },
        title: {
          display: true,
          text: 'Glucose Level (mg/dL)',
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: 500,
          },
          color: '#4b5563',
          padding: {
            bottom: 10,
          }
        },
      },
      x: {
        grid: {
          display: false,
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11,
          },
          color: '#6b7280',
          padding: 8,
        },
      }
    },
    elements: {
      line: {
        tension: 0.3,
        borderWidth: 2,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        backgroundColor: 'white',
      }
    },
  };

  if (!chartData || records.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50/30 rounded-lg p-6 border border-primary-100">
        <div className="bg-white/80 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-sm">
          <svg className="w-10 h-10 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-neutral-800 mb-2">No Chart Data</h3>
        <p className="text-neutral-500 text-center">No data available to display chart</p>
        <p className="text-neutral-400 text-sm text-center mt-1">Add glucose readings to see your trends over time</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold gradient-text">{title}</h3>
        <div className="flex items-center text-sm text-neutral-500 mt-1">
          <svg className="w-4 h-4 mr-1 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>Track your glucose levels over time</span>
        </div>
      </div>
      <div className="h-72 md:h-80 bg-white p-4 rounded-lg border border-neutral-100 shadow-sm">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}
