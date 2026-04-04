import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TCommonSchema } from '@/types/common/common.schema';

import { fetchUserDetails } from '@/api/hooks/profile/hooks';
import { TAuthModel } from '@/api/hooks/auth/schema';

export const useGetUserData = () => {
  return useQuery({
    queryKey: ['user-details'],
    queryFn: fetchUserDetails,
  });
};

export const useOnboardingUpdate = () => {
  const queryClient = useQueryClient();
  
  return useMutation<TCommonSchema['BaseApiResponse'], Error, any>({
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.post<TCommonSchema['BaseApiResponse']>(
        endpoints.user.fontend.update, // Assuming this is the correct endpoint for profile/onboarding update
        payload
      );
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-details'] });
    },
  });
};
