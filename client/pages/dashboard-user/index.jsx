import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MemberPage() {
  const list = [
    {
      bookName: 'The Cruel Prince',
      imgUrl: 'https://covers.openlibrary.org/b/id/8361789-M.jpg',
      category: '2018',
    },
  ];

  const [dataBook, setDataBook] = useState([]);

  const getBooks = async () => {
    const res = await axios.get(
      `https://bookverse-uas-api.vercel.app/api/book`,
    );
    setDataBook(res.data);
  };

  useEffect(() => {
    getBooks();
  });

  return (
    <section className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-7 ">
          {dataBook.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => console.log('item pressed')}>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.bookTitle}
                  className="aspect-[3/4] w-full object-cover"
                  src={item.imgUrl}
                />
              </CardBody>
              <CardFooter className="justify-between text-small">
                <b className="text-sky-700">{item.bookTitle}</b>
                <p className="text-default-500">{item.category}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

MemberPage.getLayout = function getLayout(page) {
  return (
    <>
      <Sidebar>{page}</Sidebar>
    </>
  );
};
