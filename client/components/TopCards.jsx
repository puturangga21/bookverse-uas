import { Card, CardHeader, Image } from '@nextui-org/react';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TopCards() {
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    getTotalBook();
  });

  const getTotalBook = async () => {
    const res = await axios.get(
      `https://bookverse-uas-api.vercel.app/api/book`,
    );
    setTotalBooks(res.data.length);
    console.log(res.data.length);
  };

  return (
    <>
      <div className="grid p-4">
        <div className="col-span-1 flex w-full justify-between rounded-lg border bg-white p-4 lg:col-span-2">
          <div className="flex w-full flex-col pb-4">
            <p className="text-2xl font-bold">{totalBooks} Buku</p>
            <p className="w-[140px] text-sm text-gray-600 md:w-full md:text-base">
              Terdapat total {totalBooks} buku yang ada dalam BookVerse
            </p>
          </div>
          <p className="flex items-center justify-center rounded-lg bg-green-200 p-2">
            <span className="text-lg text-green-700">+21%</span>
          </p>
        </div>
      </div>

      <div className="grid max-w-full px-4">
        <Card className="col-span-12 h-[180px] sm:col-span-4 lg:h-[300px]">
          <Link href="/dashboard-buku">
            <CardHeader className="absolute top-1 z-10 flex-col !items-start">
              <p className="text-tiny font-bold uppercase text-white/60">
                Buku
              </p>
              <h4 className="text-large font-medium text-white">
                Klik disini untuk melihat halaman buku
              </h4>
            </CardHeader>
            <Image
              isZoomed
              removeWrapper
              alt="Card background"
              className="object-fit z-0 h-full w-full"
              src="/buku-cover.jpg"
            />
          </Link>
        </Card>
      </div>
    </>
  );
}
