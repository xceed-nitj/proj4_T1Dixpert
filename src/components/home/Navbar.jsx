import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import getEnvironment from '../../getenvironment';
import DMNavbar from '../../diabeticsModule/components/DMNavbar';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = getEnvironment();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/getuser/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        await response.json();
        setIsAuthenticated(true);
      } catch (error) {
        // Handle silently
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [apiUrl]);

  const publicPaths = [
    '/forgot-password',
    '/nirf',
    '/login',
    '/classrooms',
    '/timetable',
    '/tt/masterdata',
    '/tt/commonslot',
    '/prm/register',
    '/prm/emailverification',
    '/404',
  ];

  useEffect(() => {
    const isPublicPath =
      publicPaths.includes(location.pathname) ||
      location.pathname.startsWith('/services/') ||
      location.pathname.startsWith('/cm/c/');

    if (!isLoading && !isAuthenticated && !isPublicPath) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate, location.pathname]);

  const excludedRoutes = ['/login', '/cm/c'];
  const isExcluded = excludedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  if (isLoading || isExcluded) {
    return null;
  }

  return (
    <>
      <DMNavbar />
    </>
  );
}
