import { useQuery } from '@tanstack/react-query';
import { telemetryService } from '@/services/telemetry';

export const useTemperatureData = (channelId: string, hours = 24) => {
  return useQuery({
    queryKey: ['temperature-data', channelId, hours],
    queryFn: () => telemetryService.getTemperatureData(channelId, hours),
    enabled: !!channelId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useLatestMessage = (channelId: string) => {
  return useQuery({
    queryKey: ['latest-message', channelId],
    queryFn: () => telemetryService.getLatestMessage(channelId),
    enabled: !!channelId,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time data
  });
};