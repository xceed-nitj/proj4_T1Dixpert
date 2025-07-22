import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    Badge,
    Progress,
    HStack,
    VStack,
    Icon,
    Tooltip,
    useColorModeValue,
    Center,
    Spinner, 
    Alert, 
    AlertIcon
} from '@chakra-ui/react';
import { FiAward, FiTarget, FiTrendingUp, FiStar, FiHeart, FiShield } from 'react-icons/fi';
import { format, subDays, isToday, addDays, differenceInDays } from 'date-fns';
import { getPatientDailyDosageByRange } from '../../api/dailyDosageApi.js';

const MilestoneProgressBar = ({ patient }) => {
    const cardBg = useColorModeValue('white', 'gray.800');
    const progressBg = useColorModeValue('gray.100', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const accentColor = useColorModeValue('blue.500', 'blue.300');
    const scrollContainerRef = useRef(null);
    const [dosageData, setDosageData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Define time slots for daily readings
    const timeSlots = [
        { id: 'pre-breakfast', label: 'Pre-Breakfast', time: '8:00 AM' },
        { id: 'pre-lunch', label: 'Pre-Lunch', time: '2:00 PM' },
        { id: 'pre-dinner', label: 'Pre-Dinner', time: '7:00 PM' },
        { id: 'night', label: 'Night', time: '10:00 PM' },
    ];

    // Milestone definitions
    const milestones = [
        { days: 7, label: '1 Week', icon: FiTarget, color: 'green', reward: 'Consistency Starter' },
        { days: 15, label: '15 Days', icon: FiTrendingUp, color: 'blue', reward: 'Habit Builder' },
        { days: 30, label: '1 Month', icon: FiHeart, color: 'purple', reward: 'Health Champion' },
        { days: 45, label: '45 Days', icon: FiShield, color: 'orange', reward: 'Wellness Warrior' },
        { days: 60, label: '2 Months', icon: FiStar, color: 'teal', reward: 'Dosage Master' },
        { days: 90, label: '3 Months', icon: FiAward, color: 'red', reward: 'Health Hero' },
        { days: 180, label: '6 Months', icon: FiStar, color: 'cyan', reward: 'Lifestyle Expert' },
        { days: 365, label: '1 Year', icon: FiAward, color: 'gold', reward: 'Health Legend' },
    ];

    useEffect(() => {
        const fetchDosageData = async () => {
            try {
                setLoading(true);
                setError(null);

                const endDate = new Date();
                const startDate = subDays(endDate, 60); // Get data for last 60 days

                const response = await getPatientDailyDosageByRange(
                    format(startDate, 'yyyy-MM-dd'), 
                    format(endDate, 'yyyy-MM-dd')
                );

                console.log('Raw API Response:', response); // Debug log

                // Handle different response structures
                let data = [];
                if (Array.isArray(response)) {
                    data = response;
                } else if (response?.data) {
                    if (Array.isArray(response.data)) {
                        data = response.data;
                    } else if (Array.isArray(response.data.dosages)) {
                        data = response.data.dosages;
                    }
                }

                if (!Array.isArray(data)) {
                    throw new Error('Invalid data format received from API');
                }

                console.log('Processed Data:', data); // Debug log

                // Transform data to ensure consistent structure
                const transformedData = data.map(item => {
                    // Extract date from different possible fields
                    const dateValue = item.data?.date;
                    let session = item.data?.session;

                    if (!dateValue) {
                        console.warn('Entry missing date:', item);
                        return null;
                    }

                    return {
                        ...item,
                        date: new Date(dateValue),
                        timeSlot: session?.toLowerCase() || 'pre-breakfast' // Default if can't determine
                    };  
                }).filter(item => item !== null); // Remove invalid entries

                setDosageData(transformedData);
            } catch (err) {
                console.error('Error fetching dosage data:', err);
                setError(err.message || 'Failed to fetch dosage data');
            } finally {
                setLoading(false);
            }
        };

        // Helper function to determine time slot from various fields
        const determineTimeSlot = (entry) => {
            // Check explicit time slot fields first
            if (entry.timeSlot) return entry.timeSlot;
            if (entry.slot) return entry.slot;
            if (entry.time) return entry.time;

            // Try to determine from time string
            if (entry.timeString) { 
                const timeStr = entry.timeString.toLowerCase();
                if (timeStr.includes('morning') || timeStr.includes('breakfast')) return 'pre-breakfast';
                if (timeStr.includes('lunch')) return 'pre-lunch';
                if (timeStr.includes('dinner')) return 'pre-dinner';
                if (timeStr.includes('night') || timeStr.includes('bedtime')) return 'night';
            }

            // Try to determine from hour
            if (entry.hour !== undefined) {
                const hour = parseInt(entry.hour);
                if (hour >= 6 && hour < 12) return 'pre-breakfast';
                if (hour >= 12 && hour < 17) return 'pre-lunch';
                if (hour >= 17 && hour < 22) return 'pre-dinner';
                return 'night';
            }

            // Try to determine from timestamp
            if (entry.timestamp) {
                const date = new Date(entry.timestamp);
                const hour = date.getHours();
                if (hour >= 6 && hour < 12) return 'pre-breakfast';
                if (hour >= 12 && hour < 17) return 'pre-lunch';
                if (hour >= 17 && hour < 22) return 'pre-dinner';
                return 'night';
            }

            return null;
        };

        fetchDosageData();
    }, [patient]);

    // Calculate current streak
    const currentStreak = useMemo(() => {
        if (!dosageData || dosageData.length === 0) return 0;

        // Group entries by date
        const entriesByDate = {};
        dosageData.forEach(entry => {
            try {
                const dateKey = format(entry.date, 'yyyy-MM-dd');
                if (!entriesByDate[dateKey]) {
                    entriesByDate[dateKey] = [];
                }
                entriesByDate[dateKey].push(entry);
            } catch (e) {
                console.warn('Invalid date in entry:', entry, e);
            }
        });

        // Calculate streak starting from today
        let streak = 0;
        let currentDate = new Date();
        
        while (streak < 1000) { // Safety limit
            const dateKey = format(currentDate, 'yyyy-MM-dd');
            if (entriesByDate[dateKey]?.length ==4) {
                streak++;
                currentDate = subDays(currentDate, 1);
            } else {
                break;
            }
        }

        return streak;
    }, [dosageData]);

    // Find current and next milestones
    const currentMilestone = milestones.findLast(milestone => currentStreak >= milestone.days);
    const nextMilestone = milestones.find(milestone => currentStreak < milestone.days);

    // Calculate progress to next milestone
    const progressToNext = useMemo(() => {
        if (!nextMilestone) return 100;
        
        const prevMilestone = milestones.findLast(milestone => milestone.days < nextMilestone.days);
        const basePoint = prevMilestone ? prevMilestone.days : 0;
        const range = nextMilestone.days - basePoint;
        const progress = currentStreak - basePoint;
        
        return Math.min((progress / 90) * 100, 100);
    }, [currentStreak, nextMilestone]);

    // Create grid data for visualization
    const overallReadings = useMemo(() => {
        const today = new Date();
        const startDate = subDays(today, 30); // Show last 30 days
        const endDate = addDays(today, 30); // Show next 30 days
        const totalDays = differenceInDays(endDate, startDate) + 1;

        // Group entries by date
        const entriesByDate = {};
        dosageData.forEach(entry => {
            try {
                const dateKey = format(entry.date, 'yyyy-MM-dd');
                if (!entriesByDate[dateKey]) {
                    entriesByDate[dateKey] = [];
                }
                entriesByDate[dateKey].push(entry);
            } catch (e) {
                console.warn('Invalid date in entry:', entry, e);
            }
        });

        // Create grid data
        return Array.from({ length: totalDays }).map((_, i) => {
            const currentDate = addDays(startDate, i);
            const dateKey = format(currentDate, 'yyyy-MM-dd');
            const dayEntries = entriesByDate[dateKey] || [];

            return {
                date: currentDate,
                dateKey,
                isPast: currentDate < today && !isToday(currentDate),
                isToday: isToday(currentDate),
                isFuture: currentDate > today,
                timeSlots: timeSlots.map(slot => ({
                    ...slot,
                    hasReading: dayEntries.some(entry => entry.timeSlot === slot.id),
                    readingCount: dayEntries.filter(entry => entry.timeSlot === slot.id).length
                }))
            };
        });
    }, [dosageData]);

    // Calculate completion percentage
    const completionPercentage = useMemo(() => {
        const pastDays = overallReadings.filter(day => !day.isFuture);
        if (pastDays.length === 0) return 0;
        
        const totalPossibleReadings = pastDays.length * timeSlots.length;
        const completedReadings = pastDays.reduce((total, day) => 
            total + day.timeSlots.filter(slot => slot.hasReading).length, 0
        );
        
        return Math.round((completedReadings / totalPossibleReadings) * 100);
    }, [overallReadings]);

    const hasEntry = (dateObj, slot) => {
    const targetDate = format(dateObj.toDate(), 'yyyy-MM-dd');

    return weekData.some(entry => {
        const entryDate = format(new Date(entry.date), 'yyyy-MM-dd');
        const isMatch = entryDate === targetDate && entry.timeSlot === slot;

        return isMatch;
    });
    };

    const isDayFullyFilled = (dateObj) => {
    const targetDate = format(dateObj.toDate(), 'yyyy-MM-dd');

    return timeSlots.every(slot =>
        weekData.some(entry =>
        format(new Date(entry.date), 'yyyy-MM-dd') === targetDate &&
        entry.timeSlot === slot
        )
    );
    };

    if (loading) {
        return (
            <Box p={6} borderRadius="lg" borderWidth="1px" bg={cardBg} boxShadow="md" mb={6}>
                <Center>
                    <VStack spacing={4}>
                        <Spinner size="lg" color={accentColor} />
                        <Text color={textColor}>Loading dosage data...</Text>
                    </VStack>
                </Center>
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={6} borderRadius="lg" borderWidth="1px" bg={cardBg} boxShadow="md" mb={6}>
                <Alert status="error">
                    <AlertIcon />
                    <Text>Failed to load dosage data: {error}</Text>
                </Alert>
            </Box>
        );
    }

    return (
        <Box p={6} borderRadius="lg" borderWidth="1px" bg={cardBg} boxShadow="md" mb={6}>
            <VStack align="stretch" spacing={6}>
                {/* Progress Bar Section */}
                <Box>
                    <Flex justify="space-between" align="center" mb={4}>
                        <VStack align="start" spacing={1}>
                            <Text fontSize="lg" fontWeight="bold" color={accentColor}>
                                Daily Dosage Streak
                            </Text>
                            <Text fontSize="sm" color={textColor}>
                                Track your daily medication consistency
                            </Text>
                        </VStack>
                        
                        <VStack align="end" spacing={1}>
                            <Text fontSize="3xl" fontWeight="bold" color={accentColor}>
                                {currentStreak}
                            </Text>
                            <Text fontSize="sm" color={textColor}>
                                {currentStreak === 1 ? 'day' : 'days'}
                            </Text>
                        </VStack>
                    </Flex>

                    {/* Current Status */}
                    <Flex justify="space-between" align="center" mb={4}>
                        <HStack>
                            {currentMilestone && (
                                <Badge colorScheme={currentMilestone.color} variant="solid" px={3} py={1} borderRadius="full">
                                    <HStack spacing={1}>
                                        <Icon as={currentMilestone.icon} size="sm" />
                                        <Text fontSize="xs">{currentMilestone.reward}</Text>
                                    </HStack>
                                </Badge>
                            )}
                        </HStack>
                        
                        {nextMilestone && (
                            <Text fontSize="sm" color={textColor}>
                                {nextMilestone.days - currentStreak} days to {nextMilestone.label}
                            </Text>
                        )}
                    </Flex>

                    {/* Progress Bar */}
                    <Box mb={4} position="relative">
                        <Progress
                            value={progressToNext}
                            colorScheme={nextMilestone?.color || 'blue'}
                            size="lg"
                            borderRadius="full"
                            bg={progressBg}
                            height="20px"
                        />
                        
                        {/* Milestone markers */}
                        <Flex position="absolute" top="0" left="0" right="0" bottom="0" align="center" justify="space-between" px={2} pointerEvents="none">
                            {milestones.slice(0, 6).map((milestone) => {
                                const isAchieved = currentStreak >= milestone.days;
                                const isCurrent = nextMilestone && nextMilestone.days === milestone.days;
                                const maxDays = milestones[5]?.days || 180;
                                const position = (milestone.days / maxDays) * 100;
                                
                                return (
                                    <Box key={milestone.days} position="absolute" left={`${Math.min(position, 95)}%`} transform="translateX(-50%)" pointerEvents="auto">
                                        <Tooltip label={`${milestone.reward} - ${milestone.days} days`} placement="top">
                                            <Center
                                                w="24px"
                                                h="24px"
                                                borderRadius="full"
                                                bg={isAchieved ? `${milestone.color}.500` : 'white'}
                                                border="2px solid"
                                                borderColor={isCurrent ? `${milestone.color}.600` : isAchieved ? `${milestone.color}.300` : 'gray.300'}
                                                boxShadow="md"
                                                cursor="pointer"
                                                transition="all 0.2s"
                                                _hover={{ transform: 'translateX(-50%) scale(1.1)' }}
                                            >
                                                <Icon as={milestone.icon} boxSize="4" color={isAchieved ? 'white' : 'gray.400'} />
                                            </Center>
                                        </Tooltip>
                                    </Box>
                                );
                            })}
                        </Flex>
                    </Box>
                </Box>

                {/* Reading Grid Section */}
                <Box>
                    <Flex justify="space-between" align="center" mb={4}>
                        <VStack align="start" spacing={1}>
                            <Text fontSize="lg" fontWeight="bold" color={accentColor}>
                                Daily Progress
                            </Text>
                            <Text fontSize="sm" color={textColor}>
                                {format(subDays(new Date(), 30), 'MMM d')} - {format(addDays(new Date(), 7), 'MMM d')}
                            </Text>
                        </VStack>
                        
                        <VStack align="end" spacing={1}>
                            <Text fontSize="md" fontWeight="bold" color={accentColor}>
                                {dosageData.length}
                            </Text>
                            <Text fontSize="sm" color={textColor}>
                                total readings
                            </Text>
                        </VStack>
                    </Flex>
                    
                    {/* Grid Visualization */}
                    <Box>
                        <Flex>
                            {/* Time Slot Labels */}
                            <Box minW="100px" flexShrink={0}>
                                <VStack spacing={1} align="stretch">
                                    {timeSlots.map((slot) => (
                                        <Box key={slot.id} h="20px" display="flex" alignItems="center">
                                            <Text fontSize="sm" color={textColor} fontWeight="medium">
                                                {slot.label}
                                            </Text>
                                        </Box>
                                    ))}
                                    <Box h="20px" mt={2} />
                                </VStack>
                            </Box>
                            
                            {/* Scrollable Grid */}
                            <Box ref={scrollContainerRef} flex="1" overflowX="auto" maxH="200px">
                                <VStack spacing={1} align="stretch">
                                    {timeSlots.map((slot) => (
                                        <HStack key={slot.id} spacing={1} h="20px">
                                            {overallReadings.map((day) => {
                                                const slotData = day.timeSlots.find(s => s.id === slot.id);
                                                const cellColor = slotData?.hasReading 
                                                    ? 'green.500' 
                                                    : day.isFuture 
                                                    ? 'gray.200' 
                                                    : 'red.500';
                                                
                                                return (
                                                    <Tooltip
                                                        key={`${day.dateKey}-${slot.id}`}
                                                        label={`${format(day.date, 'MMM d')} - ${slot.label}: ${slotData?.hasReading ? '✓ Completed' : day.isFuture ? 'Scheduled' : '✗ Missed'}`}
                                                        placement="top"
                                                        hasArrow
                                                    >
                                                        <Box
                                                            w="15px"
                                                            h="15px"
                                                            borderRadius="sm"
                                                            bg={cellColor}
                                                            border={day.isToday ? "2px solid" : "1px solid"}
                                                            borderColor={day.isToday ? "blue.500" : "gray.300"}
                                                            cursor="pointer"
                                                            transition="all 0.2s"
                                                            _hover={{ transform: 'scale(1.3)', boxShadow: 'lg', zIndex: 10 }}
                                                            flexShrink={0}
                                                        />
                                                    </Tooltip>
                                                );
                                            })}
                                        </HStack>
                                    ))}
                                    
                                    {/* Date Labels */}
                                    <HStack spacing={1} mt={2} h="20px">
                                        {overallReadings.map((day) => (
                                            <Text
                                                key={day.dateKey}
                                                fontSize="xs"
                                                color={day.isToday ? 'blue.600' : day.isFuture ? 'gray.400' : 'gray.500'}
                                                fontWeight={day.isToday ? 'bold' : 'normal'}
                                                minW="15px"
                                                textAlign="center"
                                                flexShrink={0}
                                            >
                                                {format(day.date, 'd')}
                                            </Text>
                                        ))}
                                    </HStack>
                                </VStack>
                            </Box>
                        </Flex>
                    </Box>
                    
                    {/* Legend and Stats */}
                    <Flex justify="space-between" align="center" mt={4} gap={4}>
                        <Box p={3} bg="gray.50" borderRadius="md" flex="1">
                            <Text fontSize="xs" fontWeight="medium" color={textColor} mb={2}>
                                Legend
                            </Text>
                            <HStack spacing={4}>
                                <HStack spacing={1}>
                                    <Box w="12px" h="12px" bg="green.500" borderRadius="sm" />
                                    <Text fontSize="xs" color="green.600">Completed</Text>
                                </HStack>
                                <HStack spacing={1}>
                                    <Box w="12px" h="12px" bg="red.500" borderRadius="sm" />
                                    <Text fontSize="xs" color="red.600">Missed</Text>
                                </HStack>
                                <HStack spacing={1}>
                                    <Box w="12px" h="12px" bg="gray.200" borderRadius="sm" />
                                    <Text fontSize="xs" color="gray.600">Future</Text>
                                </HStack>
                            </HStack>
                        </Box>
                        
                        <Box p={3} bg="blue.50" borderRadius="md" flex="1">
                            <Text fontSize="sm" textAlign="center" color="blue.700" fontWeight="medium">
                                {completionPercentage}% Complete
                            </Text>
                            <Text fontSize="xs" textAlign="center" color="blue.600" mt={1}>
                                Past 30 days
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                
                {/* Motivational Message */}
                <Box mt={4} p={3} bg={`${nextMilestone?.color || 'blue'}.50`} borderRadius="md">
                    <Text fontSize="sm" textAlign="center" color={`${nextMilestone?.color || 'blue'}.700`}>
                        {currentStreak === 0 
                            ? "Start your daily dosage tracking today!" 
                            : nextMilestone
                            ? `Keep going to unlock "${nextMilestone.reward}" in ${nextMilestone.days - currentStreak} days!`
                            : "You've reached all milestones! Amazing work!"
                        }
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
};

export default MilestoneProgressBar;