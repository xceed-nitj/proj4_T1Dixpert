import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Global diabetes statistics by region - with normalized cost values
const globalDiabetesData = [
  { region: 'North America', t1dPrevalence: 4.7, t1dCases: 1.4, diabetesCosts: 3.2 },
  { region: 'Europe', t1dPrevalence: 3.5, t1dCases: 1.2, diabetesCosts: 2.5 },
  { region: 'Asia', t1dPrevalence: 2.1, t1dCases: 2.3, diabetesCosts: 1.8 },
  { region: 'South America', t1dPrevalence: 2.8, t1dCases: 0.7, diabetesCosts: 1.1 },
  { region: 'Africa', t1dPrevalence: 1.9, t1dCases: 0.6, diabetesCosts: 0.7 },
  { region: 'Oceania', t1dPrevalence: 3.6, t1dCases: 0.2, diabetesCosts: 0.9 },
];

const BarGraph = () => {
  const [dataType, setDataType] = useState('all');
  
  // Custom tooltip that adds correct units and explains the cost normalization
  const renderTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tw-bg-white tw-p-3 tw-shadow-md tw-rounded-md tw-border tw-border-gray-200">
          <p className="tw-font-bold tw-mb-1">{label}</p>
          {payload.map((entry, index) => {
            let valueDisplay = entry.value;
            let unitLabel = '';
            
            if (entry.dataKey === 't1dPrevalence') {
              unitLabel = '% of population';
            } else if (entry.dataKey === 't1dCases') {
              unitLabel = 'million people';
            } else if (entry.dataKey === 'diabetesCosts') {
              unitLabel = '× $100 billion';
            }
            
            return (
              <p 
                key={`item-${index}`} 
                style={{ color: entry.color }}
                className="tw-flex tw-justify-between tw-gap-4"
              >
                <span>{entry.name}:</span>
                <span className="tw-font-medium">{valueDisplay} {unitLabel}</span>
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-4 tw-border tw-border-gray-200">
      <h3 className="tw-text-xl tw-font-bold tw-text-gray-800 tw-mb-4">Global T1D Impact by Region</h3>
      
      <div className="tw-h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={globalDiabetesData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="region" 
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis />
            <Tooltip content={renderTooltip} />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Bar dataKey="t1dPrevalence" name="T1D Prevalence" fill="#8884d8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="t1dCases" name="T1D Cases" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            <Bar dataKey="diabetesCosts" name="Healthcare Costs" fill="#ffc658" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="tw-mt-4 tw-text-gray-600 tw-text-sm tw-flex tw-flex-col tw-gap-2">
        <p>Global distribution of Type 1 Diabetes prevalence, cases, and healthcare costs by region.</p>
        <p className="tw-italic">Note: Prevalence shown as percentage, cases in millions, healthcare costs in hundreds of billions (USD).</p>
      </div>
    </div>
  );
};

export default BarGraph;
