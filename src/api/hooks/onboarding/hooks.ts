import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { OnboardingQueryEnum } from './key';
import { TOnboardingSchema } from './schema';

export const useGetOnboardingDetails = () => {
  return useQuery({
    queryKey: [OnboardingQueryEnum.GetDetails],
    queryFn: async () => {
      const res = await axiosInstance.get<TOnboardingSchema['IOnboardingDetailsRes']>(
        endpoints.onboarding.getDetails,
      );
      return res?.data;
    },
  });
};

export const useUpdateOnboarding = () => {
  return useMutation({
    mutationKey: [OnboardingQueryEnum.Update],
    mutationFn: async (payload: TOnboardingSchema['IUpdateOnboardingReq']) => {
      const res = await axiosInstance.patch<TOnboardingSchema['IOnboardingDetailsRes']>(
        endpoints.onboarding.update,
        payload,
      );
      return res?.data;
    },
  });
};

export const useGetCuisines = () => {
  return useQuery({
    queryKey: ['getCuisines'],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.cuisines.all);
      return res?.data;
    },
  });
};
