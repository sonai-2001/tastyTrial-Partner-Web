'use client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { getOAuthAppAccessToken, setOAuthAppAccessToken } from '@/api/axiosInstance';
import { TAuthModel } from '@/api/hooks/auth/schema';
import { fetchUserDetails } from '@/api/hooks/profile/hooks';
import { ROUTES } from '@/navigation/routes';
import { RBACProvider } from '@/rbac/context/RBACContext';

import { activeRestaurantType, AuthValuesType } from './types';

const defaultProvider: AuthValuesType = {
  user: null,
  isLoading: false,
  setUser: () => null,
  setHasToken: () => null,
  activeRestaurant : null,
  setActiveRestaurant : () => null,


  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<TAuthModel['IUserData'] | null>(null);

  const ACTIVE_RESTAURANT_KEY = 'activeRestaurant';

  const [activeRestaurant, setActiveRestaurantState] = useState<activeRestaurantType | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(ACTIVE_RESTAURANT_KEY);
      return stored ? (JSON.parse(stored) as activeRestaurantType) : null;
    } catch {
      return null;
    }
  });

  const setActiveRestaurant = (value: activeRestaurantType | null) => {
    setActiveRestaurantState(value);
    if (typeof window === 'undefined') return;
    if (value) {
      localStorage.setItem(ACTIVE_RESTAURANT_KEY, JSON.stringify(value));
    } else {
      localStorage.removeItem(ACTIVE_RESTAURANT_KEY);
    }
  };
  const storageTokenKeyName = process.env.NEXT_PUBLIC_TOKEN_NAME;
  const storageRefreshTokenKeyName = process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME;
  const storedToken = parseCookies(null, storageTokenKeyName);
  const [hasToken, setHasToken] = useState<string | null>(
    getOAuthAppAccessToken() || storedToken[storageTokenKeyName as string],
  );
  const handleLogout = () => {
    destroyCookie(undefined, storageTokenKeyName as string, {
      path: '/',
    });
    destroyCookie(undefined, storageRefreshTokenKeyName as string, {
      path: '/',
    });
    setOAuthAppAccessToken(null);
    setUser(null);
    localStorage.removeItem(ACTIVE_RESTAURANT_KEY);
    setHasToken(null);
    router.push(ROUTES.auth.login);
  };

  // console.info(hasToken, 'At authprovider');
  const { data, isLoading, error } = useQuery({
    queryKey: ['userDetails', hasToken],
    queryFn: fetchUserDetails,
    // enabled: !!hasToken,
    enabled:false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    
  });

  const router = useRouter();

  useEffect(() => {
    !!data?.data && setUser(data.data);
  }, [data?.data]);

  useEffect(() => {
    if (error) {
      setOAuthAppAccessToken(null);
      setUser(null);
      destroyCookie(undefined, storageTokenKeyName as string, {
        path: '/',
      });
      destroyCookie(undefined, storageRefreshTokenKeyName as string, {
        path: '/',
      });
      router.push(ROUTES.auth.login);
    }
  }, [error, router, storageTokenKeyName]);

  const values = {
    user,
    isLoading,
    setUser,
    logout: handleLogout,
    setHasToken: setHasToken,
    activeRestaurant,
    setActiveRestaurant
  };

  return (
    <AuthContext.Provider value={values}>
      <RBACProvider role={''}>{children}</RBACProvider>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
