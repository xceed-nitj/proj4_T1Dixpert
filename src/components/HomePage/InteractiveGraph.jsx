import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ReferenceLine,
} from 'recharts';

// Global diabetes statistics data by year
const globalDiabetesData = [
  { year: '2010', prevalence: 5.2, newCases: 1.2, funding: 24.0, awareness: 45 },
  { year: '2011', prevalence: 5.5, newCases: 1.3, funding: 25.2, awareness: 47 },
  { year: '2012', prevalence: 5.9, newCases: 1.4, funding: 26.5, awareness: 48 },
  { year: '2013', prevalence: 6.2, newCases: 1.5, funding: 27.1, awareness: 50 },
  { year: '2014', prevalence: 6.6, newCases: 1.6, funding: 28.4, awareness: 52 },
  { year: '2015', prevalence: 7.0, newCases: 1.7, funding: 30.2, awareness: 54 },
  { year: '2016', prevalence: 7.5, newCases: 1.8, funding: 31.5, awareness: 57 },
  { year: '2017', prevalence: 8.0, newCases: 1.9, funding: 32.7, awareness: 60 },
  { year: '2018', prevalence: 8.4, newCases: 2.0, funding: 34.0, awareness: 63 },
  { year: '2019', prevalence: 8.9, newCases: 2.1, funding: 35.5, awareness: 66 },
  { year: '2020', prevalence: 9.3, newCases: 2.3, funding: 37.2, awareness: 68 },
  { year: '2021', prevalence: 9.8, newCases: 2.4, funding: 39.0, awareness: 71 },
  { year: '2022', prevalence: 10.2, newCases: 2.5, funding: 41.5, awareness: 74 },
  { year: '2023', prevalence: 10.5, newCases: 2.6, funding: 43.2, awareness: 77 },
  { year: '2024', prevalence: 10.7, newCases: 2.7, funding: 45.0, awareness: 80 },
];

const GRAPH_TYPES = {
  AREA: 'area',
  LINE: 'line',
  BAR: 'bar',
};

const METRICS = {
  PREVALENCE: 'prevalence',
  NEW_CASES: 'newCases',
  FUNDING: 'funding',
  AWARENESS: 'awareness',
};

const InteractiveGraph = () => {
  const [graphType, setGraphType] = useState(GRAPH_TYPES.AREA);
  const [selectedMetrics, setSelectedMetrics] = useState([METRICS.PREVALENCE, METRICS.NEW_CASES]);
  const [hovered, setHovered] = useState(null);

  const toggleMetric = (metric) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  const renderColorfulTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tw-bg-white tw-shadow-lg tw-rounded-md tw-p-4 tw-border tw-border-gray-200">
          <p className="tw-text-gray-600 tw-font-semibold">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`metric-${index}`} style={{ color: entry.color }} className="tw-flex tw-justify-between">
              <span className="tw-font-medium tw-mr-4">{entry.name}:</span>
              <span className="tw-font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Colors for each metric
  // Slightly darker, modern color palette for the metrics
  const colors = {
    [METRICS.PREVALENCE]: '#312e81',   // deep indigo
    [METRICS.NEW_CASES]: '#14532d',    // dark green
    [METRICS.FUNDING]: '#1e293b',      // dark slate
    [METRICS.AWARENESS]: '#7c2d12',    // deep burnt orange
  };

  // Labels for metrics
  const metricLabels = {
    [METRICS.PREVALENCE]: 'Global T1D Prevalence (%)',
    [METRICS.NEW_CASES]: 'New Cases (millions)',
    [METRICS.FUNDING]: 'Research Funding (billion $)',
    [METRICS.AWARENESS]: 'Public Awareness (%)',
  };

  const renderGraph = () => {
    const commonProps = {
      data: globalDiabetesData,
      margin: { top: 20, right: 30, left: 20, bottom: 10 },
      onMouseMove: (data) => setHovered(data),
      onMouseLeave: () => setHovered(null),
    };

    switch(graphType) {
      case GRAPH_TYPES.AREA:
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip content={renderColorfulTooltip} />
            <Legend onClick={(e) => toggleMetric(e.dataKey)} />
            {selectedMetrics.includes(METRICS.PREVALENCE) && (
              <Area 
                type="monotone" 
                dataKey={METRICS.PREVALENCE} 
                stroke={colors[METRICS.PREVALENCE]} 
                fill={`${colors[METRICS.PREVALENCE]}50`}
                activeDot={{ r: 8 }}
                name={metricLabels[METRICS.PREVALENCE]}
              />
            )}
            {selectedMetrics.includes(METRICS.NEW_CASES) && (
              <Area 
                type="monotone" 
                dataKey={METRICS.NEW_CASES} 
                stroke={colors[METRICS.NEW_CASES]} 
                fill={`${colors[METRICS.NEW_CASES]}50`}
                activeDot={{ r: 8 }}
                name={metricLabels[METRICS.NEW_CASES]}
              />
            )}
            {selectedMetrics.includes(METRICS.FUNDING) && (
              <Area 
                type="monotone" 
                dataKey={METRICS.FUNDING} 
                stroke={colors[METRICS.FUNDING]} 
                fill={`${colors[METRICS.FUNDING]}50`}
                activeDot={{ r: 8 }}
                name={metricLabels[METRICS.FUNDING]}
              />
            )}
            {selectedMetrics.includes(METRICS.AWARENESS) && (
              <Area 
                type="monotone" 
                dataKey={METRICS.AWARENESS} 
                stroke={colors[METRICS.AWARENESS]} 
                fill={`${colors[METRICS.AWARENESS]}50`}
                activeDot={{ r: 8 }}
                name={metricLabels[METRICS.AWARENESS]}
              />
            )}
            <Brush dataKey="year" height={30} stroke="#8884d8" />
          </AreaChart>
        );

      case GRAPH_TYPES.LINE:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip content={renderColorfulTooltip} />
            <Legend onClick={(e) => toggleMetric(e.dataKey)} />
            {selectedMetrics.includes(METRICS.PREVALENCE) && (
              <Line 
                type="monotone" 
                dataKey={METRICS.PREVALENCE} 
                stroke={colors[METRICS.PREVALENCE]} 
                activeDot={{ r: 8 }}
                name={metricLabels[METRICS.PREVALENCE]}
              />
            )}
            {selectedMetrics.includes(METRICS.NEW_CASES) && (
              <Line 
                type="monotone" 
                dataKey={METRICS.NEW_CASES} 
                stroke={colors[METRICS.NEW_CASES]} 
                activeDot={{ r: 8 }}
                name={metricLabels[METRICS.NEW_CASES]}
              />
            )}
            {selectedMetrics.includes(METRICS.FUNDING) && (
              <Line 
                type="monotone" 
                dataKey={METRICS.FUNDING} 
                stroke={colors[METRICS.FUNDING]} 
                activeDot={{ r: 8 }}
                name={metricLabels[METRICS.FUNDING]}
              />
            )}
            {selectedMetrics.includes(METRICS.AWARENESS) && (
              <Line 
                type="monotone" 
                dataKey={METRICS.AWARENESS} 
                stroke={colors[METRICS.AWARENESS]} 
                activeDot={{ r: 8 }}
                name={metricLabels[METRICS.AWARENESS]}
              />
            )}
            <Brush dataKey="year" height={30} stroke="#8884d8" />
          </LineChart>
        );

      case GRAPH_TYPES.BAR:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip content={renderColorfulTooltip} />
            <Legend onClick={(e) => toggleMetric(e.dataKey)} />
            {selectedMetrics.includes(METRICS.PREVALENCE) && (
              <Bar 
                dataKey={METRICS.PREVALENCE} 
                fill={colors[METRICS.PREVALENCE]}
                name={metricLabels[METRICS.PREVALENCE]}
              />
            )}
            {selectedMetrics.includes(METRICS.NEW_CASES) && (
              <Bar 
                dataKey={METRICS.NEW_CASES} 
                fill={colors[METRICS.NEW_CASES]}
                name={metricLabels[METRICS.NEW_CASES]}
              />
            )}
            {selectedMetrics.includes(METRICS.FUNDING) && (
              <Bar 
                dataKey={METRICS.FUNDING} 
                fill={colors[METRICS.FUNDING]}
                name={metricLabels[METRICS.FUNDING]}
              />
            )}
            {selectedMetrics.includes(METRICS.AWARENESS) && (
              <Bar 
                dataKey={METRICS.AWARENESS} 
                fill={colors[METRICS.AWARENESS]}
                name={metricLabels[METRICS.AWARENESS]}
              />
            )}
            <Brush dataKey="year" height={30} stroke="#8884d8" />
          </BarChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-4 tw-border tw-border-gray-200">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <h3 className="tw-text-xl tw-font-bold tw-text-gray-800">Global Type 1 Diabetes Trends</h3>
        <div className="tw-flex tw-space-x-2">
          {Object.values(GRAPH_TYPES).map((type) => (
            <button
              key={type}
              onClick={() => setGraphType(type)}
              className={`tw-px-3 tw-py-1 tw-rounded ${
                graphType === type
                  ? 'tw-bg-blue-500 tw-text-white'
                  : 'tw-bg-gray-100 tw-text-gray-700 hover:tw-bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="tw-h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderGraph()}
        </ResponsiveContainer>
      </div>

      <div className="tw-mt-4 tw-flex tw-flex-wrap tw-gap-2">
        {Object.values(METRICS).map((metric) => (
          <button
            key={metric}
            onClick={() => toggleMetric(metric)}
            className={`tw-flex tw-items-center tw-px-3 tw-py-1 tw-rounded tw-border ${
              selectedMetrics.includes(metric)
                ? 'tw-bg-blue-50 tw-border-blue-500 tw-text-blue-700'
                : 'tw-bg-white tw-border-gray-300 tw-text-gray-700'
            }`}
          >
            <span
              className="tw-w-3 tw-h-3 tw-rounded-full tw-mr-2"
              style={{ backgroundColor: colors[metric] }}
            ></span>
            {metric === 'prevalence' ? 'Prevalence' : 
             metric === 'newCases' ? 'New Cases' : 
             metric === 'funding' ? 'Funding' : 'Awareness'}
          </button>
        ))}
      </div>

      <div className="tw-mt-4 tw-text-gray-600 tw-text-sm">
        <p>Explore global T1D trends from 2010-2022. Click on metrics in the legend or buttons below to toggle visibility.</p>
      </div>
    </div>
  );
};

export default InteractiveGraph; 