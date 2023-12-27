import Header from '@/components/Header';
import { useCreateBook } from '@/features/book/useCreateBook';
import { useFetchBook } from '@/features/book/useFetchBook';
import { Input, Button, Link } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function InputLayout() {
  const router = useRouter();
  const { refetch: refetchBook } = useFetchBook();

  const formik = useFormik({
    initialValues: {
      authorName: '',
      imgUrl: '',
      category: '',
      bookDescription: '',
      bookTitle: '',
      bookPdfUrl: '',
    },
    onSubmit: async () => {
      const {
        authorName,
        imgUrl,
        category,
        bookDescription,
        bookTitle,
        bookPdfUrl,
      } = formik.values;
      // melakukan POST method
      mutate({
        authorName,
        imgUrl,
        category,
        bookDescription,
        bookTitle,
        bookPdfUrl,
      });
      formik.setFieldValue();
      toast.success('Anda berhasil menambahkan buku');
      router.push('/dashboard-buku');
    },
  });

  const { mutate, isLoading: createBookIsLoading } = useCreateBook({
    onSuccess: () => {
      refetchBook();
    },
  });

  const handleFormInput = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <section className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="rounded-lg border-[1px] bg-white">
            <div className="flex flex-wrap gap-3 p-4 lg:flex-nowrap">
              <Input
                type="text"
                label="Author Name"
                placeholder="Author Name"
                name="authorName"
                onChange={handleFormInput}
              />
              <Input
                type="text"
                label="Cover Buku"
                placeholder="Input cover buku (berupa link url)"
                name="imgUrl"
                onChange={handleFormInput}
                value={formik.values.imgUrl}
              />
            </div>

            <div className="flex flex-wrap gap-3 px-4 lg:flex-nowrap">
              <Input
                type="text"
                label="Category"
                placeholder="Category"
                name="category"
                onChange={handleFormInput}
              />
              <Input
                type="text"
                label="Book Description"
                placeholder="Book Description"
                name="bookDescription"
                onChange={handleFormInput}
              />
              <Input
                type="text"
                label="Book Title"
                placeholder="Book Title"
                name="bookTitle"
                onChange={handleFormInput}
              />
            </div>

            <div className="flex flex-wrap gap-3 p-4 lg:flex-nowrap">
              <Input
                type="text"
                label="Book PDF Url"
                placeholder="Input Book PDF Url buku"
                name="bookPdfUrl"
                onChange={handleFormInput}
              />
            </div>

            <div className="flex justify-start gap-2 p-4 lg:justify-end">
              <Button color="warning" href="/dashboard-buku" as={Link}>
                Kembali
              </Button>
              {createBookIsLoading ? (
                <Button color="primary" isLoading>
                  Loading
                </Button>
              ) : (
                <Button color="primary" type="submit">
                  Tambah Data
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
