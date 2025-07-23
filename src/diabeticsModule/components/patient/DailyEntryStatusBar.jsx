import React, { useMemo } from 'react';
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { format, eachDayOfInterval, startOfDay } from 'date-fns';

const DailyEntryStatusBar = ({ 
  weekData, 
  selectedRange, 
  selectedContent 
}) => {
  // Generate all days in the selected range
  const dateRange = useMemo(() => {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (selectedRange - 1));
    startDate.setHours(0, 0, 0, 0);
    
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [selectedRange]);

  // Define time segments for each day
  const timeSegments = [
    { label: 'Morning', time: '06:00-12:00', key: 'morning' },
    { label: 'Afternoon', time: '12:00-18:00', key: 'afternoon' },
    { label: 'Evening', time: '18:00-24:00', key: 'evening' },
    { label: 'Night', time: '00:00-06:00', key: 'night' }
  ];

  // Check which time segments have entries for each day
  const dailyStatus = useMemo(() => {
    return dateRange.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      
      // Check entries for each time segment
      const segments = timeSegments.map(segment => {
        const hasEntry = weekData.some(entry => {
          const entryDate = format(new Date(entry.date), 'yyyy-MM-dd');
          const hasValue = entry[selectedContent] != null && entry[selectedContent] !== '';
          
          if (entryDate === dateStr && hasValue && entry.time) {
            // Parse time and check if it falls in the segment
            const [hours] = entry.time.split(':').map(Number);
            
            switch (segment.key) {
              case 'morning': return hours >= 6 && hours < 12;
              case 'afternoon': return hours >= 12 && hours < 18;
              case 'evening': return hours >= 18 && hours < 24;
              case 'night': return hours >= 0 && hours < 6;
              default: return false;
            }
          }
          return false;
        });

        return {
          ...segment,
          hasEntry
        };
      });

      return {
        date: dateStr,
        displayDate: format(date, 'MMM dd'),
        dayOfWeek: format(date, 'EEE'),
        segments
      };
    });
  }, [dateRange, weekData, selectedContent]);

  return (
    <Box mb={4}>
      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
        Daily Entry Status by Time Period
      </Text>
      <Box
        bg="gray.50"
        p={3}
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
      >
        {/* Days row */}
        <Flex gap={2} mb={2}>
          {dailyStatus.map((day) => (
            <Box key={day.date} flex="1" textAlign="center">
              <Text 
                fontSize="xs" 
                fontWeight="medium" 
                color="gray.600" 
                mb={1}
              >
                {day.displayDate}
              </Text>
              <Text 
                fontSize="xs" 
                color="gray.500" 
              >
                {day.dayOfWeek}
              </Text>
            </Box>
          ))}
        </Flex>
        
        {/* Status bars in one continuous line */}
        <Flex gap={2} mb={3}>
          {dailyStatus.map((day, dayIndex) => (
            <Flex key={day.date} gap={1} flex="1">
              {day.segments.map((segment, segmentIndex) => (
                <Tooltip
                  key={`${day.date}-${segment.key}`}
                  label={`${day.displayDate} ${segment.label} (${segment.time}): ${
                    segment.hasEntry ? 'Entry recorded' : 'No entry'
                  }`}
                  placement="top"
                >
                  <Box
                    flex="1"
                    h="16px"
                    bg={segment.hasEntry ? 'green.400' : 'red.400'}
                    borderRadius="sm"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      transform: 'translateY(-1px)',
                      boxShadow: 'sm',
                      bg: segment.hasEntry ? 'green.500' : 'red.500'
                    }}
                    position="relative"
                  >
                    {/* Today indicator on current day */}
                    {format(new Date(), 'yyyy-MM-dd') === day.date && segmentIndex === 0 && (
                      <Box
                        position="absolute"
                        top="-4px"
                        left="-2px"
                        w="4px"
                        h="4px"
                        bg="blue.500"
                        borderRadius="full"
                        border="1px solid white"
                      />
                    )}
                  </Box>
                </Tooltip>
              ))}
            </Flex>
          ))}
        </Flex>
        
        {/* Time period labels */}
        <Flex justify="center" gap={4} pt={2} borderTop="1px solid" borderColor="gray.200">
          {timeSegments.map((segment) => (
            <Text key={segment.key} fontSize="xs" color="gray.500">
              {segment.label}
            </Text>
          ))}
        </Flex>
      </Box>
      
      {/* Legend */}
      <Flex justify="space-between" align="center" mt={2} fontSize="xs" color="gray.600">
        <Text>{format(dateRange[0], 'MMM dd')}</Text>
        <Flex align="center" gap={4}>
          <Flex align="center" gap={1}>
            <Box w="12px" h="12px" bg="green.400" borderRadius="sm" />
            <Text>Has Entry</Text>
          </Flex>
          <Flex align="center" gap={1}>
            <Box w="12px" h="12px" bg="red.400" borderRadius="sm" />
            <Text>No Entry</Text>
          </Flex>
        </Flex>
        <Text>{format(dateRange[dateRange.length - 1], 'MMM dd')}</Text>
      </Flex>
    </Box>
  );
};

export default DailyEntryStatusBar;