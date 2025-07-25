import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Simplified data for better mobile viewing
const diabetesData = [
  { year: '2014', prevalence: 6.6, cases: 1.6 },
  { year: '2016', prevalence: 7.5, cases: 1.8 },
  { year: '2018', prevalence: 8.4, cases: 2.0 },
  { year: '2020', prevalence: 9.3, cases: 2.3 },
  { year: '2022', prevalence: 10.2, cases: 2.5 },
  { year: '2024', prevalence: 10.7, cases: 2.7 },
];

const ResponsiveGraph = ({ isMobile = false }) => {
  const [graphType, setGraphType] = useState('area');
  
  const renderTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tw-bg-white tw-shadow-lg tw-rounded-md tw-p-2 tw-border tw-border-gray-200">
          <p className="tw-text-gray-700 tw-font-medium tw-text-sm">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="tw-text-sm tw-flex tw-justify-between tw-gap-2" style={{ color: entry.color }}>
              <span>{entry.name === 'prevalence' ? 'Prevalence (%)' : 'Cases (M)'}: </span>
              <span className="tw-font-medium">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderGraph = () => {
    // Common props for both graph types
    const commonProps = {
      data: diabetesData,
      margin: isMobile 
        ? { top: 10, right: 10, left: 0, bottom: 5 }
        : { top: 20, right: 30, left: 0, bottom: 10 },
    };

    if (graphType === 'area') {
      return (
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: isMobile ? 10 : 12 }}
          />
          <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
          <Tooltip content={renderTooltip} />
          <Legend 
            wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
            iconSize={isMobile ? 8 : 10}
          />
          <Area 
            type="monotone" 
            dataKey="prevalence" 
            name="Prevalence" 
            stroke="#3b82f6" 
            fillOpacity={1}
            fill="url(#colorPrev)" 
          />
          <Area 
            type="monotone" 
            dataKey="cases" 
            name="Cases" 
            stroke="#10b981" 
            fillOpacity={1}
            fill="url(#colorCases)" 
          />
        </AreaChart>
      );
    } else {
      return (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: isMobile ? 10 : 12 }}
          />
          <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
          <Tooltip content={renderTooltip} />
          <Legend 
            wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} 
            iconSize={isMobile ? 8 : 10}
          />
          <Line 
            type="monotone" 
            dataKey="prevalence" 
            name="Prevalence" 
            stroke="#3b82f6" 
            dot={!isMobile}
            activeDot={{ r: isMobile ? 4 : 6 }}
            strokeWidth={isMobile ? 1 : 2}
          />
          <Line 
            type="monotone" 
            dataKey="cases" 
            name="Cases" 
            stroke="#10b981" 
            dot={!isMobile}
            activeDot={{ r: isMobile ? 4 : 6 }}
            strokeWidth={isMobile ? 1 : 2}
          />
        </LineChart>
      );
    }
  };

  return (
    <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-p-3 tw-border tw-border-gray-200">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
        <h3 className={`${isMobile ? 'tw-text-sm' : 'tw-text-lg'} tw-font-medium tw-text-gray-800`}>
          Global T1D Trends
        </h3>
        <div className="tw-flex tw-gap-1">
          <button
            onClick={() => setGraphType('area')}
            className={`tw-text-xs tw-px-2 tw-py-1 tw-rounded ${
              graphType === 'area'
                ? 'tw-bg-blue-500 tw-text-white'
                : 'tw-bg-gray-100 tw-text-gray-600'
            }`}
          >
            Area
          </button>
          <button
            onClick={() => setGraphType('line')}
            className={`tw-text-xs tw-px-2 tw-py-1 tw-rounded ${
              graphType === 'line'
                ? 'tw-bg-blue-500 tw-text-white'
                : 'tw-bg-gray-100 tw-text-gray-600'
            }`}
          >
            Line
          </button>
        </div>
      </div>

      <div className={`${isMobile ? 'tw-h-56' : 'tw-h-72'}`}>
        <ResponsiveContainer width="100%" height="100%">
          {renderGraph()}
        </ResponsiveContainer>
      </div>

      <div className={`tw-mt-2 tw-text-gray-600 ${isMobile ? 'tw-text-xs' : 'tw-text-sm'}`}>
        <p>Global Type 1 Diabetes prevalence (%) and cases (millions) from 2014-2024</p>
      </div>
    </div>
  );
};

export default ResponsiveGraph; 