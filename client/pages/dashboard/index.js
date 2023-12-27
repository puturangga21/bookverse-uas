import Head from 'next/head';

import Header from '@/components/Header';
import TopCards from '@/components/TopCards';
import Sidebar from '@/components/Sidebar';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BookVerse | Home</title>
      </Head>
      <main className="min-h-screen bg-gray-100">
        <Header />
        <TopCards />
      </main>
    </>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return (
    <>
      <Sidebar>{page}</Sidebar>
    </>
  );
};
