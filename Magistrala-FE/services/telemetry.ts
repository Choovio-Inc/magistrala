import { api } from '@/lib/api';
import { TelemetryMessage } from '@/types';

export const telemetryService = {
  getMessages: async (channelId: string, limit = 100): Promise<TelemetryMessage[]> => {
    const response = await api<{ messages: TelemetryMessage[] }>(`/channels/${channelId}/messages?limit=${limit}`);
    return response.messages || [];
  },

  getLatestMessage: async (channelId: string): Promise<TelemetryMessage | null> => {
    const messages = await telemetryService.getMessages(channelId, 1);
    return messages.length > 0 ? messages[0] : null;
  },

  getTemperatureData: async (channelId: string, hours = 24): Promise<TelemetryMessage[]> => {
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - hours * 60 * 60 * 1000);
    
    const response = await api<{ messages: TelemetryMessage[] }>(
      `/channels/${channelId}/messages?start=${startTime.toISOString()}&end=${endTime.toISOString()}`
    );
    return response.messages || [];
  },
};