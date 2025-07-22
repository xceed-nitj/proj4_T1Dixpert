import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { format, eachDayOfInterval } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FiActivity,
  FiBarChart2,
  FiCalendar,
  FiClock,
  FiDroplet,
  FiPieChart,
  FiPlus,
  FiZap,
} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DailyDosageForm from '../DailyDosageForm';
import { getCurrentPatient } from '../../api/patientApi';
import {
  getPatientDailyDosageByDate,
  getPatientDailyDosageByRange,
} from '../../api/dailyDosageApi';
import { use } from 'react';
import DailyEntryStatusBar from './DailyEntryStatusBar';
import MilestoneProgressBar from './Milestone'; 
// import MilestoneProgressBar from './Milestone'; 

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, ChartTooltip, ChartLegend);

export default function PatientDashboard() {
  const [patient, setPatient] = useState(null);
  const [todaysReadings, setTodaysReadings] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState('bloodSugar');
  const [selectedRange, setSelectedRange] = useState(14);

  // Add these configuration arrays
  const contentOptions = [
    { value: 'bloodSugar', label: 'Blood Sugar', color: '#5BA9B3', unit: 'mg/dL' },
    { value: 'carboLevel', label: 'Carbohydrates', color: '#3B5998', unit: 'g' },
    { value: 'insulin', label: 'Insulin', color: '#06402B', unit: 'units' },
    { value: 'longLastingInsulin', label: 'Long Lasting Insulin', color: '#805AD5', unit: 'units' },
  ];

  const rangeOptions = [
    { value: 3, label: '3 Days' },
    { value: 7, label: '1 Week' },
    { value: 14, label: '2 Weeks' },
    { value: 30, label: '1 Month' },
  ];
  // Get current patient info
  const fetchPatientData = async () => {
    try {
      const data = await getCurrentPatient();
      setPatient(data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  // Get today's readings
  const fetchTodaysReadings = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const data = await getPatientDailyDosageByDate(today);
      // Extract the data from the nested structure
      const readings = data.map((reading) => reading.data);
      setTodaysReadings(readings || []);
    } catch (error) {
      console.error("Error fetching today's readings:", error);
    }
  };
const fetchWeekData = async () => {
  try {
    console.log('Fetching week data for range:', selectedRange);
    
    // Fix date calculation - ensure we get full days
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999); // End of today
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (selectedRange - 1));
    startDate.setHours(0, 0, 0, 0); // Start of the day
    
    console.log('Date Range:', {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      startFormatted: startDate.toLocaleDateString(),
      endFormatted: endDate.toLocaleDateString()
    });
    
    const data = await getPatientDailyDosageByRange(
      startDate.toISOString(),
      endDate.toISOString()
    );
    
    console.log('API returned data:', data);
    console.log('Data length:', data?.length);
    
    if (data && data.length > 0) {
      // Flatten the data arrays from all items
      const allReadings = data.flatMap((item) => {
        console.log('Processing item:', item);
        console.log('Item data length:', item.data?.length);
        return item.data || [];
      });
      
      console.log('All flattened readings:', allReadings);
      console.log('Total readings count:', allReadings.length);
      setWeekData(allReadings);
    } else {
      setWeekData([]);
    }
  } catch (error) {
    console.error('Error fetching week data:', error);
    setWeekData([]);
  } finally {
    setLoading(false);
  }
};

const generateCompleteDataset = useMemo(() => {
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (selectedRange - 1));
  startDate.setHours(0, 0, 0, 0);
  
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });
  
  const completeDataset = [];
  
  allDays.forEach(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    
    const dayEntries = weekData.filter(entry => {
      const entryDate = format(new Date(entry.date), 'yyyy-MM-dd');
      return entryDate === dayStr;
    });
    
    if (dayEntries.length > 0) {
      // Add all entries for this day
      dayEntries.forEach(entry => {
        completeDataset.push({
          ...entry,
          dateTimeDisplay: `${format(day, 'MMM dd')} ${entry.time || ''}`,
          dayOnly: format(day, 'MMM dd'),
          sortKey: `${dayStr} ${entry.time || '00:00'}`,
          hasData: true
        });
      });
    } else {
      completeDataset.push({
        date: dayStr,
        time: '12:00', 
        dateTimeDisplay: `${format(day, 'MMM dd')} (No data)`,
        dayOnly: format(day, 'MMM dd'),
        sortKey: `${dayStr} 12:00`,
        [selectedContent]: null, 
        bloodSugar: null,
        carboLevel: null,
        insulin: null,
        longLastingInsulin: null,
        hasData: false // Mark as no data
      });
    }
  });
  
  // Sort by date and time
  const sortedDataset = completeDataset.sort((a, b) => 
    new Date(a.sortKey.replace(' ', 'T')).getTime() - new Date(b.sortKey.replace(' ', 'T')).getTime()
  );
  
  console.log('Complete dataset:', sortedDataset);
  return sortedDataset;
}, [weekData, selectedRange, selectedContent]);

// Calculate Y-axis domain
const yAxisDomain = useMemo(() => {
  if (generateCompleteDataset.length === 0) return [0, 100];

  const values = generateCompleteDataset
    .filter(item => item.hasData) 
    .map(item => item[selectedContent])
    .filter(val => val != null && val !== '' && !isNaN(val));

  console.log('Values for Y-axis:', values);

  if (values.length === 0) return [0, 100];
  const max = Math.max(...values);
  const tolerance = (max - 0) * 0.2; // 20% padding

  const domain = [
    0,
    Math.ceil(max + tolerance)
  ];
  
  console.log('Y-axis domain:', domain);
  return domain;
}, [generateCompleteDataset, selectedContent]);

//   
const processedChartData = useMemo(() => {
  if (generateCompleteDataset.length === 0) return [];

  const dataCopy = generateCompleteDataset.map((point) => {
    const value = point.hasData ? point[selectedContent] : null;

    return {
      ...point,
      [selectedContent]: value,
      redLineValue: value, // Start with actual values for data points
      originalValue: value,
    };
  });

  console.log('Before interpolation:', dataCopy.map(p => ({ date: p.dayOnly, hasData: p.hasData, value: p[selectedContent] })));

  // Forward pass: fill gaps using previous values
  for (let i = 1; i < dataCopy.length; i++) {
    const currentPoint = dataCopy[i];
    const prevPoint = dataCopy[i - 1];

    if (!currentPoint.hasData && prevPoint.redLineValue !== null) {
      currentPoint.redLineValue = prevPoint.redLineValue;
    }
  }

  // Backward pass: fill remaining gaps using next values
  for (let i = dataCopy.length - 2; i >= 0; i--) {
    const currentPoint = dataCopy[i];
    const nextPoint = dataCopy[i + 1];

    if (!currentPoint.hasData && currentPoint.redLineValue === null && nextPoint.redLineValue !== null) {
      currentPoint.redLineValue = nextPoint.redLineValue;
    }
  }

  // Linear interpolation for gaps between two data points
  for (let i = 0; i < dataCopy.length; i++) {
    const point = dataCopy[i];

    if (point.hasData) continue; // Skip actual data points

    // Find previous and next data points (not just any points)
    let prev = i - 1;
    while (prev >= 0 && !dataCopy[prev].hasData) {
      prev--;
    }

    let next = i + 1;
    while (next < dataCopy.length && !dataCopy[next].hasData) {
      next++;
    }

    // If we have both previous and next data points, interpolate
    if (prev >= 0 && next < dataCopy.length) {
      const steps = next - prev;
      const currentStep = i - prev;
      const prevValue = dataCopy[prev][selectedContent];
      const nextValue = dataCopy[next][selectedContent];
      
      if (prevValue !== null && nextValue !== null) {
        point.redLineValue = prevValue + ((nextValue - prevValue) * currentStep / steps);
      }
    }
  }

  console.log('After interpolation:', dataCopy.map(p => ({ date: p.dayOnly, hasData: p.hasData, redLineValue: p.redLineValue })));

  return dataCopy;
}, [generateCompleteDataset, selectedContent]);

// Initial data fetching
useEffect(() => {
  fetchPatientData();
  fetchTodaysReadings();
  fetchWeekData();
}, []);

// Refetch when dropdowns change
useEffect(() => {
  // Always fetch week data when selectedRange or selectedContent changes
  fetchWeekData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedRange, selectedContent]);


  const cardBg = useColorModeValue('white', 'gray.800');

  // Define selectedContentConfig here
  const selectedContentConfig = contentOptions.find(option => option.value === selectedContent);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }
  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="xl">
          Welcome, {patient?.name || 'Patient'}
        </Heading>
        <Button
          as={RouterLink}
          to={`/dm/patient/${patient?._id}/history`}
          colorScheme="blue"
          leftIcon={<FiCalendar />}
        >
          View History
        </Button>
      </Flex>
      <MilestoneProgressBar patient={patient}/>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
        {/* Today's Status */}
        <Box
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          bg={cardBg}
          boxShadow="md"
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Heading as="h2" size="md">
              Today&apos;s Status
            </Heading>
            <HStack>
              <Icon as={FiClock} />
              <Text fontSize="sm">{format(new Date(), 'dd-MM-yyyy')}</Text>
            </HStack>
          </Flex>

          {todaysReadings.length > 0 ? (
            <VStack align="stretch" spacing={4}>
              {todaysReadings.map((reading, index) => (
                <Box key={index} p={3} borderWidth="1px" borderRadius="md">
                  <Flex justify="space-between" mb={2}>
                    <Badge colorScheme="blue">{reading.session}</Badge>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(
                        reading.createdAt || Date.now()
                      ).toLocaleTimeString('en-CA', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </Text>
                  </Flex>
                  <SimpleGrid columns={3} spacing={4}>
                    <ReadingStat
                      icon={FiDroplet}
                      label="Blood Sugar"
                      value={reading.bloodSugar}
                      unit="mg/dL"
                      status={
                        reading.bloodSugar > 180
                          ? 'danger'
                          : reading.bloodSugar < 70
                          ? 'warning'
                          : 'normal'
                      }
                    />
                    <ReadingStat
                      icon={FiPieChart}
                      label="Carbs"
                      value={reading.carboLevel}
                      unit="g"
                      status="normal"
                    />
                    <ReadingStat
                      icon={FiZap}
                      label="Insulin"
                      value={reading.insulin}
                      unit="units"
                      status="normal"
                    />
                  </SimpleGrid>
                </Box>
              ))}
            </VStack>
          ) : (
            <Flex
              direction="column"
              align="center"
              justify="center"
              h="200px"
              bg="gray.50"
              borderRadius="md"
            >
              <Text color="gray.500" mb={2}>
                No readings recorded for today
              </Text>
              <Button
                leftIcon={<FiPlus />}
                colorScheme="teal"
                variant="outline"
                size="sm"
                onClick={() => {
                  document.getElementById('new-reading-form').scrollIntoView({
                    behavior: 'smooth',
                  });
                }}
              >
                Add Your First Reading
              </Button>
            </Flex>
          )}
        </Box>

        {/* Quick Reading Entry */}
        <Box
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          bg={cardBg}
          boxShadow="md"
          id="new-reading-form"
        >
          <DailyDosageForm
            patientId={patient?._id}
            onSuccess={() => {
              fetchTodaysReadings();
              fetchWeekData();
            }}
          />
        </Box>
      </SimpleGrid>

      {/* 7-Day Trend */}
      <Box
        p={6}
        borderRadius="lg"
        borderWidth="1px"
        bg={cardBg}
        boxShadow="md"
        mb={8}
        w="100%"
      >
        <Heading as="h2" size="md" mb={4}>
          <Flex align="center">
            <Icon as={FiBarChart2} mr={2} />
            Health Trend  
          </Flex>
        </Heading>

        <Text mb={6} color="gray.600">
          History of your blood sugar, carbohydrate intake, and insulin dosage
          over the past week
        </Text>
        {/* dropdown controls */}
        <Grid templateColumns={['1fr' ,null,'repeat(2, 1fr)']} 
            gap={4} 
            mb={6}
            alignItems="end"
            >
          <GridItem>
            <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
              Select Content
            </Text>
            <Box
              as="select"
              value={selectedContent}
              onChange={(e) => setSelectedContent(e.target.value)}
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              px={3}
              py={2}
              w="100%"
              borderRadius="md"
              >
                {contentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Box>
              </GridItem>
              <GridItem>
                <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                  Select Timeframe
                </Text>
                <Box
                  as="select"
                  width="100%"
                  value={selectedRange}
                  onChange={(e) => setSelectedRange(e.target.value)}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.300"
                  px={3}
                  py={2}
                  borderRadius="md"
                >
                  {rangeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Box>
              </GridItem>
            </Grid>
            <DailyEntryStatusBar 
              weekData={weekData}
              selectedRange={selectedRange}
              selectedContent={selectedContent}
            />
            {generateCompleteDataset.length > 0 ? (
  <Box h="400px" w="100%">
    <Line
      data={{
        labels: processedChartData.map((point) => point.dateTimeDisplay),
        datasets: [
        {
  label: selectedContentConfig?.label || "Data",
  data: processedChartData.map((point) =>
    point.hasData ? point[selectedContent] : point.redLineValue ?? 0
  ),
  borderWidth: 3,
  tension: 0.5,
  pointRadius: 5,
  pointBackgroundColor: processedChartData.map((point) =>
              point.hasData ? (selectedContentConfig?.color || "#1E3A8A") : "rgba(243, 238, 238, 0)"
            ),
  pointBorderColor: "#fff",
  spanGaps: true,
  segment: {
    borderColor: ctx => {
      const index = ctx.p0DataIndex;
      const current = processedChartData[index];
      const next = processedChartData[index + 1];

      // if both current and next points have data, use green/blue color
      if (current?.hasData && next?.hasData) {
        return selectedContentConfig?.color || "#1E3A8A";
      }

      return "#DC2626"; // Red for gap/interpolation
    },
    borderWidth: 3,
    borderDash: () => [0,0],
  },
}
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            display: true, 
            labels: {
        color: "#1E3A8A",         // Label text color
        boxWidth: 20,             // Width of the legend box
        boxHeight: 12,            // Height of the legend box (Chart.js v4+)
        padding: 16,              // Space between entries
        usePointStyle: true,      // Makes box a circle/triangle if pointStyle is set
        font: {
          size: 13,
          weight: 'bold',
          family: 'Arial',
        }
      },
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.parsed.y;
                const dataPoint = processedChartData[context.dataIndex];
                
                if (!dataPoint.hasData) {
                  return null;
                }
                return `${context.dataset.label}: ${value ?? "No data"} ${selectedContentConfig?.unit}`;
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              font: { size: 10 },
              callback: function(value, index, ticks) {
                if (selectedRange <= 7) return this.getLabelForValue(value);
                if (selectedRange <= 14) return index % 2 === 0 ? this.getLabelForValue(value) : '';
                return index % 3 === 0 ? this.getLabelForValue(value) : '';
              }
            },
            title: {
              display: true,
              text: 'Date',
              font: { size: 14 }
            }
          },
          y: {
            beginAtZero: true,
            min: yAxisDomain[0],
            max: yAxisDomain[1],
            title: {
              display: true,
              text: `${selectedContentConfig?.label} (${selectedContentConfig?.unit})`,
              font: { size: 17 }
            }
          }
        }
      }}
    />
  </Box>
) : (
  <Flex
    direction="column"
    align="center"
    justify="center"
    h="300px"
    bg="gray.50"
    borderRadius="md"
  >
    <Text color="gray.500" fontSize="lg" mb={2}>
      No readings available
    </Text>
    <Text color="gray.400" fontSize="sm">
      for {selectedContentConfig?.label} in the selected time range
    </Text>
  </Flex>
)}
      </Box>

      <Box p={6} borderRadius="lg" borderWidth="1px" bg={cardBg} boxShadow="md">
        <Heading as="h2" size="md" mb={4}>
          Tips & Recommendations
        </Heading>

        <VStack align="stretch" spacing={4}>
          <Flex p={4} borderRadius="md" bg="cyan.50">
            <Icon as={FiActivity} boxSize={6} color="cyan.500" mr={4} />
            <Box>
              <Text fontWeight="bold" color="cyan.700">
                Stay Active
              </Text>
              <Text color="cyan.600">
                Regular physical activity can help maintain blood sugar levels.
              </Text>
            </Box>
          </Flex>

          <Flex p={4} borderRadius="md" bg="blue.50">
            <Icon as={FiPieChart} boxSize={6} color="blue.700" mr={4} />
            <Box>
              <Text fontWeight="bold" color="blue.700">
                Balance Your Diet
              </Text>
              <Text color="blue.600">
                Focus on a diet rich in vegetables, lean proteins, and complex
                carbohydrates.
              </Text>
            </Box>
          </Flex>

          <Flex p={4} borderRadius="md" bg="teal.50">
            <Icon as={FiClock} boxSize={6} color="teal.500" mr={4} />
            <Box>
              <Text fontWeight="bold" color="teal.700">
                Regular Monitoring
              </Text>
              <Text color="teal.600">
                Consistently monitor your blood sugar levels as recommended by
                your doctor.
              </Text>
            </Box>
          </Flex>
        </VStack>
      </Box>
    </Container>
  );
}

// Component for displaying a reading statistic
const ReadingStat = ({ icon, label, value, unit, status }) => {
  let statusColor;
  switch (status) {
    case 'danger':
      statusColor = 'red.500';
      break;
    case 'warning':
      statusColor = 'orange.500';
      break;
    default:
      statusColor = 'green.500';
  }

  return (
    <Stat>
      <StatLabel display="flex" alignItems="center">
        <Icon as={icon} mr={1} color={statusColor} />
        <Text>{label}</Text>
      </StatLabel>
      <StatNumber color={statusColor}>{value}</StatNumber>
      <StatHelpText>{unit}</StatHelpText>
    </Stat>
  );
};
