import React from 'react';
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

// This component is designed for mobile devices only
const BarGraphResponsive = () => {
  // Custom tooltip for mobile: more compact, touch-friendly
  const renderTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tw-bg-white tw-p-2 tw-shadow-md tw-rounded-md tw-border tw-border-gray-200 tw-text-xs">
          <div className="tw-font-bold tw-mb-1">{label}</div>
          {payload.map((entry, index) => {
            let unitLabel = '';
            if (entry.dataKey === 't1dPrevalence') {
              unitLabel = '%';
            } else if (entry.dataKey === 't1dCases') {
              unitLabel = 'M';
            } else if (entry.dataKey === 'diabetesCosts') {
              unitLabel = '×$100B';
            }
            return (
              <div
                key={`item-${index}`}
                style={{ color: entry.color }}
                className="tw-flex tw-justify-between tw-gap-2"
              >
                <span>{entry.name}:</span>
                <span className="tw-font-medium">{entry.value} {unitLabel}</span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="tw-bg-white tw-shadow tw-rounded-lg tw-p-3 tw-border tw-border-gray-200 tw-w-full tw-max-w-xs tw-mx-auto md:tw-hidden">
      <h3 className="tw-text-base tw-font-bold tw-text-gray-800 tw-mb-2 tw-text-center">
        Global T1D Impact by Region
      </h3>
      <div className="tw-h-64 tw-w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={globalDiabetesData}
            margin={{ top: 10, right: 8, left: 0, bottom: 40 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
            <XAxis
              dataKey="region"
              angle={-30}
              textAnchor="end"
              height={50}
              tick={{ fontSize: 10 }}
              interval={0}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={renderTooltip} />
            <Legend
              verticalAlign="top"
              align="center"
              iconSize={12}
              wrapperStyle={{ fontSize: 10, paddingBottom: 4 }}
            />
            <Bar dataKey="t1dPrevalence" name="Prevalence" fill="#8884d8" radius={[3, 3, 0, 0]} maxBarSize={18} />
            <Bar dataKey="t1dCases" name="Cases" fill="#82ca9d" radius={[3, 3, 0, 0]} maxBarSize={18} />
            <Bar dataKey="diabetesCosts" name="Costs" fill="#ffc658" radius={[3, 3, 0, 0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="tw-mt-2 tw-text-gray-600 tw-text-xs tw-flex tw-flex-col tw-gap-1 tw-text-center">
        <span>Distribution of T1D prevalence, cases, and costs by region.</span>
        <span className="tw-italic">Prevalence: %, Cases: millions, Costs: ×$100B USD.</span>
      </div>
    </div>
  );
};

export default BarGraphResponsive;
