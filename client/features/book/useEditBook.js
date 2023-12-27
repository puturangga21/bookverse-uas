import { axiosInstance } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const useEditBook = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const bookResponse = await axiosInstance.put('/api/book', body);

      return bookResponse;
    },
    onSuccess,
  });
};
