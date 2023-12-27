import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const useFetchBook = () => {
  // const [dataBuku, setDataBuku] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // const fetchBooks = async () => {
  //   setIsLoading(true);
  //   try {
  //     const booksResponse = await axiosInstance.get('/api/book');
  //     setDataBuku(booksResponse.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchBooks();
  // }, []);

  // return {
  //   dataBuku,
  //   isLoading,
  // };

  return useQuery({
    queryFn: async () => {
      const dataResponse = await axiosInstance.get('/api/book');
      console.log(dataResponse);
      return dataResponse;
    },
    queryKey: ['fetch.book'],
  });
};
