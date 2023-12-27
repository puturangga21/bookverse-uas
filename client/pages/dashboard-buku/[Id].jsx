import Header from '@/components/Header';
import { useCreateBook } from '@/features/book/useCreateBook';
import { useFetchBook } from '@/features/book/useFetchBook';
import { axiosInstance } from '@/lib/axios';
import { Input, Button, Link } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function InputLayout() {
  const router = useRouter();
  // const { refetch: refetchBook } = useFetchBook();

  const formik = useFormik({
    initialValues: {
      _id: '',
      authorName: '',
      imgUrl: '',
      category: '',
      bookDescription: '',
      bookTitle: '',
      bookPdfUrl: '',
    },
    onSubmit: () => {
      const {
        _id,
        authorName,
        imgUrl,
        category,
        bookDescription,
        bookTitle,
        bookPdfUrl,
      } = formik.values;

      if (_id) {
        editBook({
          _id,
          authorName,
          imgUrl,
          category,
          bookDescription,
          bookTitle,
          bookPdfUrl,
        });

        formik.setFieldValue();
        toast.success('Anda berhasil mengedit buku');
        router.push('/dashboard-buku');
      } else {
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
      }
    },
  });

  const { mutate: editBook, isLoading: editBookIsLoading } = useMutation({
    mutationFn: async (body) => {
      const bookResponse = await axiosInstance.put(
        `/api/book/${body._id}`,
        body,
      );

      return bookResponse;
    },
    onSuccess: () => {
      refetchBook();
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
                label="ID"
                placeholder="ID"
                name="_id"
                onChange={handleFormInput}
                value={formik.values._id}
              />
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
              {editBookIsLoading ? (
                <Button color="primary" isLoading>
                  Loading
                </Button>
              ) : (
                <Button color="primary" type="submit">
                  Edit Data
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
