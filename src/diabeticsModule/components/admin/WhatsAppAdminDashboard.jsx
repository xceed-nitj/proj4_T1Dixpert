
import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
  VStack,
  Icon,
} from '@chakra-ui/react';
import {
  UsersIcon,
  ChartBarIcon,
  UserPlusIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { axiosInstance } from '../../api/config';
import React, { useEffect, useState } from 'react';
import StatCard from '../common/StatCard';
import {
  FiUsers,
  FiSettings,
  FiMessageSquare,
  FiPieChart,
  FiSend,
  FiClock,
  FiGrid,
} from 'react-icons/fi';

const Sidebar = ({ onSelect }) => {
  const menuItems = [
    { label: 'Home', icon: FiGrid },
    { label: 'Chats', icon: FiMessageSquare },
    { label: 'Broadcast List', icon: FiSend },
    { label: 'Templates', icon: FiPieChart },
    // { label: 'Scheduled Broadcasts', icon: FiClock },
    { label: 'Customers', icon: FiUsers },
    { label: 'Analytics', icon: FiPieChart },
    // { label: 'Settings', icon: FiSettings },
  ];

  return (
    <VStack align="start" spacing={4} bg="gray.100" p={4} h="100vh" minW="240px">
      <Heading size="md">Menu</Heading>
      {menuItems.map((item, idx) => (
        <Button
          key={idx}
          leftIcon={<Icon as={item.icon} />}
          variant="ghost"
          justifyContent="start"
          width="100%"
          onClick={() => onSelect(item.label)}
        >
          {item.label}
        </Button>
      ))}
    </VStack>
  );
};

const SectionContent = ({ section, stats, contacts, templates, messages }) => {
  const components = {
    Home: (
      <>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={8}>
          <StatCard icon={UsersIcon} title="Active Users" value={stats.usersCount} description="Unique users messaged" color="cyan.400" />
          <StatCard icon={ChartBarIcon} title="Templates Sent" value={stats.templatesCount} description="Approved template usage" color="blue.400" />
          <StatCard icon={UserPlusIcon} title="Conversations Today" value={stats.conversationsToday} description="All inbound/outbound" color="teal.400" />
          <StatCard icon={BuildingOfficeIcon} title="Messages Sent" value={stats.messagesSent} description="Sent via Cloud API" color="cyan.600" />
        </SimpleGrid>
      </>
    ),
    Chats: <Text>Chat component coming soon...</Text>,
    'Broadcast List': <Text>Broadcast List component placeholder</Text>,
    Templates: (
      <DataList
        items={templates}
        fields={['name', 'status', 'category']}
        headers={['Name', 'Status', 'Category']}
        emptyText="No templates available"
      />
    ),
    'Scheduled Broadcasts': <Text>Scheduled Broadcasts component placeholder</Text>,
    Customers: (
      <DataList
        items={contacts}
        fields={['name', 'number']}
        headers={['Name', 'Phone Number']}
        emptyText="No contacts yet"
      />
    ),
    Analytics: (
      <DataList
        items={messages}
        fields={['from', 'to', 'timestamp', 'content']}
        headers={['From', 'To', 'Time', 'Message']}
        emptyText="No messages logged"
      />
    ),
    Settings: <Text>Settings component placeholder</Text>,
  };

  return components[section] || <Text>Select a section</Text>;
};

const WhatsAppAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('Home');
  const [stats, setStats] = useState({
    usersCount: 0,
    templatesCount: 0,
    conversationsToday: 0,
    messagesSent: 0,
  });
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [messages, setMessages] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchMockData = async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 500));
      const res = await axiosInstance.get('/diabeticsModule/chat/stats');
      console.log("API response:", res.data);
      setStats(res.data);

      setContacts([
        { _id: '1', name: 'Alice', number: '+919876543210' },
        { _id: '2', name: 'Bob', number: '+919123456789' },
      ]);
      setTemplates([
        { _id: 't1', name: 'order_update', status: 'approved', category: 'transactional' },
        { _id: 't2', name: 'promo_offer', status: 'pending', category: 'marketing' },
      ]);
      setMessages([
        { _id: 'm1', from: 'Alice', to: 'YourBiz', timestamp: '10:30 AM', content: 'Hi!' },
        { _id: 'm2', from: 'YourBiz', to: 'Bob', timestamp: '10:32 AM', content: 'Your order is confirmed.' },
      ]);
      setLoading(false);
    };
    fetchMockData();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex>
      <Sidebar onSelect={setActiveSection} />
      <Box flex={1} p={6}>
        <Heading mb={6}>WhatsApp Cloud API Admin Dashboard</Heading>
        <SectionContent
          section={activeSection}
          stats={stats}
          contacts={contacts}
          templates={templates}
          messages={messages}
        />
      </Box>
    </Flex>
  );
};

const DataList = ({ items, fields, headers, emptyText }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (!items || items.length === 0) {
    return (
      <Text p={4} color="gray.500" textAlign="center">
        {emptyText}
      </Text>
    );
  }

  return (
    <Box overflowX="auto">
      <chakra.table w="full" border="1px solid #CBD5E0" borderCollapse="collapse">
        <chakra.thead>
          <chakra.tr>
            {headers.map((header, i) => (
              <chakra.th
                key={i}
                px={4}
                py={2}
                borderBottom="1px"
                borderColor={borderColor}
                textAlign="left"
                fontSize="sm"
                fontWeight="semibold"
              >
                {header}
              </chakra.th>
            ))}
          </chakra.tr>
        </chakra.thead>
        <chakra.tbody>
          {items.map((item, i) => (
            <chakra.tr key={i}>
              {fields.map((field, j) => (
                <chakra.td
                  key={`${i}-${j}`}
                  px={4}
                  py={3}
                  borderBottom="1px"
                  borderColor={borderColor}
                  fontSize="sm"
                >
                  {item[field]}
                </chakra.td>
              ))}
            </chakra.tr>
          ))}
        </chakra.tbody>
      </chakra.table>
    </Box>
  );
};

export default WhatsAppAdminDashboard;
