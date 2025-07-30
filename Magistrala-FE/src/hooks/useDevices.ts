import { useQuery } from '@tanstack/react-query';
import { devicesService } from '@/services/devices';

export const useDevices = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: devicesService.getDevices,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useDevice = (id: string) => {
  return useQuery({
    queryKey: ['device', id],
    queryFn: () => devicesService.getDeviceById(id),
    enabled: !!id,
  });
};