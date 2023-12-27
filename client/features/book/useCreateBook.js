import { axiosInstance } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const useCreateBook = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const bookResponse = await axiosInstance.post('/api/book', body);

      return bookResponse;
    },
    onSuccess,
  });
};
