import React, { useState, useEffect, useMemo } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  Stat,
  StatNumber,
  StatHelpText,
  StatLabel,
  Badge,
  Divider,
  Icon,
  useColorModeValue,
  Spinner,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  useToast,
  Button,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
} from '@chakra-ui/react';
import { axiosInstance } from '../../api/config';
import {
  FiArrowLeft,
  FiCalendar,
  FiDroplet,
  FiPieChart,
  FiZap,
  FiBarChart2,
} from 'react-icons/fi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

const PatientDetailView = ({ patientId }) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readings, setReadings] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('bloodSugar');
  const [selectedRange, setSelectedRange] = useState('2 weeks');
  const toast = useToast();
  const navigate = useNavigate();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const statBg = useColorModeValue('blue.50', 'blue.900');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axiosInstance.get(
          `/diabeticsModule/patient/${patientId}`
        );
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient:', error);
        toast({
          title: 'Error',
          description: 'Failed to load patient details',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId, toast]);

  // Fetch patient readings
  const fetchReadings = async () => {
    try {
      const res = await axiosInstance.get(
        `/diabeticsModule/dailyDosage/all/${patientId}`
      );
      setReadings(res.data || []);
      processChartData(res.data || []);
    } catch (error) {
      console.error('Error fetching readings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load patient readings',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchReadings();
  }, [patientId]);

  // Process data for charts
 const processChartData = (data) => {
  if (!data || data.length === 0) return;
  console.log('Processing chart data:', data);


  const formattedData = data.map((reading, index) => {
    const { date, time, bloodSugar, carboLevel, insulin, session } = reading.data;

    // Create a proper datetime string and parse it
    const dateStr = date.split('T')[0];
    const fullDateTimeStr = `${dateStr}T${time}:00`;
    const parsedDate = new Date(fullDateTimeStr);

    return {
      // Keep timestamp for filtering purposes
      timestamp: parsedDate.getTime(),
      // Keep the original date object for formatting
      parsedDate,
      // Format for display purposes
      displayDateTime: format(parsedDate, 'MMM dd, hh:mm a'),
      bloodSugar,
      carboLevel,
      insulin,
      session,
    };
  });

  // Sort by timestamp to ensure proper order
  formattedData.sort((a, b) => a.timestamp - b.timestamp);
  
  setChartData(formattedData);
  console.log('Chart data:', formattedData);
};

// Add this helper function to create evenly spaced data:

const getEvenlySpacedData = (data) => {
  if (!data || data.length === 0) return [];
  
  // Add sequential index to filtered data for even spacing
  return data.map((item, index) => ({
    ...item,
    index: index
  }));
};
  // Calculate start date from current date (today)
// Replace your current getStartDate function with this improved version

// Replace your current getStartDate function with this corrected version

const getStartDate = (range) => {
  const now = new Date();
  // Set to start of today to include all of today's data
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (range) {
    case '3 days': 
      return new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);
    case '1 week': 
      return new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    case '2 weeks': 
      return new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
    case '1 month': 
      // FIXED: Use proper month calculation instead of 30-day approximation
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return oneMonthAgo;
    case 'all': 
      return new Date(0); // Show all data
    default: 
      return new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
  }
};

// Alternative debugging version to help troubleshoot
const getStartDateWithDebug = (range) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  let startDate;
  
  switch (range) {
    case '3 days': 
      startDate = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);
      break;
    case '1 week': 
      startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '2 weeks': 
      startDate = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
      break;
    case '1 month': 
      // FIXED: Proper month calculation
      startDate = new Date(today);
      startDate.setMonth(startDate.getMonth() - 1);
      // Handle edge case where current day doesn't exist in previous month
      if (startDate.getMonth() === today.getMonth()) {
        startDate.setDate(0); // Go to last day of previous month
      }
      break;
    case 'all': 
      startDate = new Date(0);
      break;
    default: 
      startDate = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
  }
  
  // Debug logging
  console.log(`Date range calculation for "${range}":`);
  console.log('Today:', today.toLocaleDateString());
  console.log('Start date:', startDate.toLocaleDateString());
  console.log('Days difference:', Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)));
  
  return startDate;
};

// Additional helper function to check if your April dates fall within range
const testDateRange = () => {
  const today = new Date(); // Current date (June 18, 2025)
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 1); // Should be May 18, 2025
  
  const april26 = new Date('2025-04-26');
  const april28 = new Date('2025-04-28');
  
  console.log('Testing date ranges:');
  console.log('Today:', today.toLocaleDateString());
  console.log('One month ago (start date):', startDate.toLocaleDateString());
  console.log('April 26 in range:', april26 >= startDate && april26 <= today);
  console.log('April 28 in range:', april28 >= startDate && april28 <= today);
};

// Call this function to test your date ranges
// testDateRange();
  // Filter data from current date backwards
  const filteredData = useMemo(() => {
  if (!chartData || chartData.length === 0) return [];
  
  let filtered;
  
  if (selectedRange === 'all') {
    console.log('Showing all data, total entries:', chartData.length);
    filtered = chartData;
  } else {
    const startDate = getStartDate(selectedRange);
    const now = new Date();
    
    // Debug: Log filtering parameters
    console.log('Filtering with:');
    console.log('Selected range:', selectedRange);
    console.log('Start date:', startDate.toLocaleString());
    console.log('Current date:', now.toLocaleString());
    console.log('Total data entries:', chartData.length);
    
    filtered = chartData.filter(entry => {
      const entryDate = entry.parsedDate || new Date(entry.date);
      const isInRange = entryDate >= startDate && entryDate <= now;
      
      // Debug: Log filtering for first few entries
      if (chartData.indexOf(entry) < 5) {
        console.log(`Entry ${chartData.indexOf(entry)}:`, 
          entryDate.toLocaleString(), 
          'In range:', isInRange);
      }
      
      return isInRange;
    });
    
    console.log('Filtered entries:', filtered.length);
    console.log("filteredData:", filtered);
  }
  
  // Apply even spacing to the filtered data
  return getEvenlySpacedData(filtered);
}, [chartData, selectedRange]);

  // Use filteredData for maxY calculation
  const maxY = useMemo(() => {
    if (!filteredData || filteredData.length === 0) return 100;
    
    if (selectedMetric === 'All') {
      const allValues = filteredData.flatMap(entry => [
        entry.bloodSugar,
        entry.carboLevel,
        entry.insulin
      ]).filter(v => typeof v === 'number' && !isNaN(v));
      const max = Math.max(...allValues, 0);
      return Math.ceil(max * 1.2);
    } else {
      const values = filteredData.map(entry => entry[selectedMetric]).filter(v => typeof v === 'number' && !isNaN(v));
      const max = Math.max(...values, 0);
      return Math.ceil(max * 1.2);
    }
  }, [filteredData, selectedMetric]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!patient) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Patient not found</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Button
        onClick={() => navigate(-1)}
        leftIcon={<FiArrowLeft />}
        mb={6}
        variant="outline"
      >
        Back to Dashboard
      </Button>

      <Card
        bg={cardBg}
        boxShadow="md"
        mb={6}
        borderColor={borderColor}
        borderWidth="1px"
      >
        <CardHeader>
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <Avatar size="xl" name={patient.name} mr={4} />
              <Box>
                <Heading size="lg">{patient.name}</Heading>
                <HStack spacing={4} mt={2}>
                  <Badge colorScheme="blue">
                    Hospital: {patient?.hospital?.name}
                  </Badge>
                  <Badge colorScheme="green">Age: {patient.age}</Badge>
                  <Badge colorScheme="purple">Gender: {patient.gender}</Badge>
                </HStack>
              </Box>
            </Flex>
            <Button
              as={RouterLink}
              to={`/dm/patient/${patientId}/history`}
              colorScheme="teal"
              leftIcon={<FiCalendar />}
            >
              View History
            </Button>
          </Flex>
        </CardHeader>

        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
            <Stat bg={statBg} p={4} borderRadius="md" boxShadow="sm">
              <StatLabel>Latest Blood Sugar</StatLabel>
              <Flex align="center">
                <Icon as={FiDroplet} color="blue.500" mr={2} />
                <StatNumber>
                  {readings.length > 0
                    ? readings[readings.length - 1].data.bloodSugar
                    : 'N/A'}
                </StatNumber>
              </Flex>
              <StatHelpText>mg/dL</StatHelpText>
            </Stat>
            <Stat bg={statBg} p={4} borderRadius="md" boxShadow="sm">
              <StatLabel>Latest Carbs</StatLabel>
              <Flex align="center">
                <Icon as={FiPieChart} color="blue.500" mr={2} />
                <StatNumber>
                  {readings.length > 0
                    ? readings[readings.length - 1].data.carboLevel
                    : 'N/A'}
                </StatNumber>
              </Flex>
              <StatHelpText>grams</StatHelpText>
            </Stat>
            <Stat bg={statBg} p={4} borderRadius="md" boxShadow="sm">
              <StatLabel>Latest Insulin</StatLabel>
              <Flex align="center">
                <Icon as={FiZap} color="blue.500" mr={2} />
                <StatNumber>
                  {readings.length > 0
                    ? readings[readings.length - 1].data.insulin
                    : 'N/A'}
                </StatNumber>
              </Flex>
              <StatHelpText>units</StatHelpText>
            </Stat>
          </SimpleGrid>

          <Divider mb={6} />

          <Tabs variant="enclosed" colorScheme="cyan">
            <TabList>
              <Tab fontWeight="semibold">Health Trends</Tab>
              <Tab fontWeight="semibold">Patient Information</Tab>
              <Tab fontWeight="semibold">Medical Records</Tab>
            </TabList>

            <TabPanels>
               <TabPanel p={0} pt={4}>
                <Card variant="outline">
                  <CardHeader>
                    {/* <Heading size="md">
                      <Flex align="center">
                        <Icon as={FiBarChart2} mr={2} />
                        Health Trends
                      </Flex>
                    </Heading> */}
                    <Flex align="center" justify="space-between">
                        <Flex align="center">
                          <Icon as={FiBarChart2} mr={2} />
                          Health Trends
                        </Flex>
                        <Flex gap={4}>
                          <Select 
                            border={'1px solid gray.300'}
                            size="md" 
                            value={selectedMetric} 
                            onChange={(e) => setSelectedMetric(e.target.value)}
                            width="auto"
                             zIndex={10}

                          >
                            <option value="All">ALL</option>
                            <option value="bloodSugar">Blood Sugar</option>
                            <option value="carboLevel">Carbs</option>
                            <option value="insulin">Insulin</option>
                           
                          </Select>
                          <Select 
                            size="md" 
                            value={selectedRange} 
                            onChange={(e) => setSelectedRange(e.target.value)}
                            width="auto"
                            zIndex={10}
                          >
                            <option value="3 days">Past 3 Days</option>
                            <option value="1 week">Past 1 Week</option>
                            <option value="2 weeks">Past 2 Weeks</option>
                            <option value="1 month">Past 1 Month</option>
                            <option value="all">All Data</option>
                          </Select>
                        </Flex>
                      </Flex>
                  </CardHeader>
                  <CardBody>
                    {chartData.length > 0 ? (
                      <Box h="400px">
                        <ResponsiveContainer width="100%" height="100%">
                          {/* <LineChart
                            data={filteredData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="parsedDate"
                              tickFormatter={(parsedDate) =>
                                format(new Date(parsedDate), 'MMM dd')
                              }
                            />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip
                              labelFormatter={(parsedDate) =>
                                format(new Date(parsedDate), 'MMM dd, yyyy')
                              }
                            />
                            <Legend />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="bloodSugar"
                              name="Blood Sugar"
                              stroke="#5BA9B3"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="carboLevel"
                              name="Carbs"
                              stroke="#3B5998"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="insulin"
                              name="Insulin"
                              stroke="#FF8C00"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart> */}
                          <LineChart
  data={filteredData}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis
    dataKey="parsedDate"
    tickFormatter={(parsedDate) =>
      format(new Date(parsedDate), 'MMM dd')
    }
  />
  <YAxis yAxisId="left" />
  <YAxis yAxisId="right" orientation="right" />
  <Tooltip
    labelFormatter={(parsedDate) =>
      format(new Date(parsedDate), 'MMM dd, yyyy')
    }
  />
  <Legend />

  {selectedMetric === 'All' ? (
    <>
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="bloodSugar"
        name="Blood Sugar"
        stroke="#5BA9B3"
        strokeWidth={2}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="carboLevel"
        name="Carbs"
        stroke="#3B5998"
        strokeWidth={2}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="insulin"
        name="Insulin"
        stroke="#FF8C00"
        strokeWidth={2}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
    </>
  ) : (
    <Line
      yAxisId={selectedMetric === 'insulin' ? 'right' : 'left'}
      type="monotone"
      dataKey={selectedMetric}
      name={
        selectedMetric === 'bloodSugar'
          ? 'Blood Sugar'
          : selectedMetric === 'carboLevel'
          ? 'Carbs'
          : 'Insulin'
      }
      stroke={
        selectedMetric === 'bloodSugar'
          ? '#5BA9B3'
          : selectedMetric === 'carboLevel'
          ? '#3B5998'
          : '#FF8C00'
      }
      strokeWidth={2}
      dot={{ r: 4 }}
      activeDot={{ r: 6 }}
    />
  )}
</LineChart>

                        </ResponsiveContainer>
                      </Box>
                    ) : (
                      <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        h="400px"
                        bg="gray.50"
                        borderRadius="md"
                      >
                        <Text color="gray.500">No readings available</Text>
                      </Flex>
                    )}
                  </CardBody>
                </Card>
              </TabPanel>
              {/* <TabPanel p={0} pt={4}>
                <Card variant="outline">
                  <CardHeader>
                    
                      <Flex align="center" justify="space-between">
                        <Flex align="center">
                          <Icon as={FiBarChart2} mr={2} />
                          Health Trends
                        </Flex>
                        <Flex gap={4}>
                          <Select 
                            border={'1px solid gray.300'}
                            size="md" 
                            value={selectedMetric} 
                            onChange={(e) => setSelectedMetric(e.target.value)}
                            width="auto"
                             zIndex={10}

                          >
                            <option value="All">ALL</option>
                            <option value="bloodSugar">Blood Sugar</option>
                            <option value="carboLevel">Carbs</option>
                            <option value="insulin">Insulin</option>
                           
                          </Select>
                          <Select 
                            size="md" 
                            value={selectedRange} 
                            onChange={(e) => setSelectedRange(e.target.value)}
                            width="auto"
                            zIndex={10}
                          >
                            <option value="3 days">Past 3 Days</option>
                            <option value="1 week">Past 1 Week</option>
                            <option value="2 weeks">Past 2 Weeks</option>
                            <option value="1 month">Past 1 Month</option>
                            <option value="all">All Data</option>
                          </Select>
                        </Flex>
                      </Flex>
                    
                  </CardHeader>
                  
                  <CardBody>
                    {filteredData.length > 0 ? (
                      <Box h="400px">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={filteredData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="index"
                              type="number"
                              domain={[0, filteredData.length - 1]}
                              ticks={(() => {
                                if (filteredData.length === 0) return [];
                                
                                const maxTicks = 12;
                                const dataLength = filteredData.length;
                                
                                if (dataLength <= maxTicks) {
                                  // If we have 12 or fewer points, show all
                                  return filteredData.map(d => d.index);
                                } else {
                                  // Calculate evenly spaced indices
                                  const ticks = [];
                                  const step = (dataLength - 1) / (maxTicks - 1);
                                  
                                  for (let i = 0; i < maxTicks; i++) {
                                    const tickIndex = Math.round(i * step);
                                    ticks.push(tickIndex);
                                  }
                                  
                                  return ticks;
                                }
                              })()}
                              tickFormatter={(index) => {
                                const dataPoint = filteredData.find(d => d.index === index);
                                if (dataPoint) {
                                  return format(dataPoint.parsedDate, 'MMM dd\nhh:mm a');
                                }
                                return '';
                              }}
                              angle={-45}
                              textAnchor="end"
                              height={80}
                            />
                            <YAxis
                              domain={[0, maxY]}
                              label={{ value: selectedMetric === 'All' ? 'Values' : selectedMetric, angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                              labelFormatter={(index) => {
                                const dataPoint = filteredData.find(d => d.index === index);
                                if (dataPoint) {
                                  return format(dataPoint.parsedDate, 'MMMM dd, yyyy - hh:mm a');
                                }
                                return '';
                              }}
                              formatter={(value, name) => [value, name]}
                            />
                            <Legend />
                            {selectedMetric === 'All' ? (
                              <>
                                <Line
                                  type="monotone"
                                  dataKey="bloodSugar"
                                  name="Blood Sugar"
                                  stroke="#5BA9B3"
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 6 }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="carboLevel"
                                  name="Carbs"
                                  stroke="#3B5998"
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 6 }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="insulin"
                                  name="Insulin"
                                  stroke="#FF8C00"
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 6 }}
                                />
                              </>
                            ) : (
                              <Line
                                type="monotone"
                                dataKey={selectedMetric}
                                name={selectedMetric === 'bloodSugar' ? 'Blood Sugar' : selectedMetric === 'carboLevel' ? 'Carbs' : 'Insulin'}
                                stroke={selectedMetric === 'bloodSugar' ? '#5BA9B3' : selectedMetric === 'carboLevel' ? '#3B5998' : '#FF8C00'}
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                              />
                            )}
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    ) : (
                      <Flex direction="column" align="center" justify="center" h="400px" bg="gray.50" borderRadius="md">
                        <Text color="gray.500">No readings available for selected time range</Text>
                      </Flex>
                    )}
                  </CardBody>
                </Card>
              </TabPanel> */}
              <TabPanel p={0} pt={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Card variant="outline">
                    <CardHeader>
                      <Heading size="md">Personal Information</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack align="stretch" spacing={4}>
                        <Box>
                          <Text fontWeight="bold">Contact Information</Text>
                          <Text>Email: {patient.email}</Text>
                          <Text>Phone: {patient.contactNumber}</Text>
                          <Text>Address: {patient.address}</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Family Information</Text>
                          <Text>Father&apos;s Name: {patient.father_name}</Text>
                          <Text>Mother&apos;s Name: {patient.mother_name}</Text>
                          <Text>
                            Economic Status: {patient.economic_status}
                          </Text>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card variant="outline">
                    <CardHeader>
                      <Heading size="md">Medical Information</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack align="stretch" spacing={4}>
                        <Box>
                          <Text fontWeight="bold">Physical Details</Text>
                          <Text>Weight: {patient.weight} kg</Text>
                          <Text>Height: {patient.height} cm</Text>
                          <Text>
                            Date of Birth:{' '}
                            {new Date(patient.DOB).toLocaleDateString()}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Diabetes Information</Text>
                          <Text>
                            Type 1 Diabetes Diagnosis Date:{' '}
                            {new Date(patient.DOD_of_T1D).toLocaleDateString()}
                          </Text>
                          <Text>Family History: {patient.family_history}</Text>
                          <Text>
                            Referring Physician: {patient.referring_physician}
                          </Text>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </TabPanel>

              <TabPanel p={0} pt={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Card variant="outline">
                    <CardHeader>
                      <Heading size="md">Medical History</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack align="stretch" spacing={4}>
                        <Box>
                          <Text fontWeight="bold">Treatment History</Text>
                          <Text>
                            {patient.treatment_history ||
                              'No treatment history available'}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Immunization History</Text>
                          <Text>
                            {patient.immunization_history ||
                              'No immunization history available'}
                          </Text>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card variant="outline">
                    <CardHeader>
                      <Heading size="md">Hospital Information</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack align="stretch" spacing={4}>
                        <Box>
                          <Text fontWeight="bold">Hospital Details</Text>
                          <Text>Name: {patient.hospital.name}</Text>
                          <Text>Location: {patient.hospital.location}</Text>
                          <Text>Contact: {patient.hospital.phone}</Text>
                          <Text>
                            Registration Date:{' '}
                            {new Date(
                              patient.hospital.createdAt
                            ).toLocaleDateString()}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Assigned Doctors</Text>
                          {patient.doctors?.map((doctor) => (
                            <Box key={doctor._id} mb={2}>
                              <Text>
                                {doctor.name} -{' '}
                                {doctor.specialization || 'General'}
                              </Text>
                            </Box>
                          ))}
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Container>
  );
};

export default PatientDetailView;