import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextTopLoader from 'nextjs-toploader';
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <NextTopLoader />
      <Toaster position="top-right" />
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </QueryClientProvider>
    </>,
  );
}
