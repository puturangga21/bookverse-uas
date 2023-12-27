import { axiosInstance } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const useDeleteBook = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (id) => {
      const bookResponse = await axiosInstance.delete(`/api/book/${id}`);

      return bookResponse;
    },
    onSuccess,
  });
};
