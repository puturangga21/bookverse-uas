import { kolomBuku } from '@/constant/data';
import { useCallback, useMemo, useState } from 'react';
import Header from '@/components/Header';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Button,
  Image,
  Pagination,
  Link,
  Spinner,
} from '@nextui-org/react';
import {
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineMagnifyingGlass,
} from 'react-icons/hi2';
import Sidebar from '@/components/Sidebar';
import { useFetchBook } from '@/features/book/useFetchBook';
import toast from 'react-hot-toast';
import { useDeleteBook } from '@/features/book/useDeleteBook';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

export default function BookPage() {
  // fetch API
  const { data, isLoading } = useFetchBook();
  const { refetch: refetchBook } = useFetchBook();
  const router = useRouter();

  // delete
  const { mutate: deleteBook } = useDeleteBook({
    onSuccess: () => {
      toast.success('Anda berhasil menghapus buku');
      refetchBook();
    },
  });

  // Kombinasi pada cell table
  const renderCell = useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case 'imgUrl':
          return (
            <Image
              radius="sm"
              width={50}
              height={40}
              alt="Book Cover"
              src={user.imgUrl}
            />
          );

        case 'bookDescription':
          return (
            <div className="max-w-sm truncate">
              <span className="">{user.bookDescription}</span>;
            </div>
          );

        case 'bookPdfUrl':
          return (
            <div className="max-w-xs truncate">
              <span className="">{user.bookPdfUrl}</span>;
            </div>
          );

        case 'aksi':
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit book">
                <span
                  onClick={() => router.push(`/dashboard-buku/${user._id}`)}
                  className="cursor-pointer text-lg text-default-400 active:opacity-50">
                  <HiOutlinePencilSquare />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete book">
                <span
                  onClick={() => deleteBook(user._id)}
                  className="cursor-pointer text-lg text-danger active:opacity-50">
                  <HiOutlineTrash />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [deleteBook, router],
  );

  // Top content dari table, berisi search bar dan button
  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between">
        <Input
          isClearable
          className="w-[3/4] sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<HiOutlineMagnifyingGlass />}
        />

        <Button
          color="primary"
          endContent={<HiOutlinePlus />}
          href="/dashboard-buku/input"
          as={Link}>
          Add New
        </Button>
      </div>
    );
  }, []);

  // Fungsi pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil((data?.data || []).length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return (data?.data || []).slice(start, end);
  }, [page, data?.data]);

  return (
    <section className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-4">
        <Table
          isStriped
          aria-label="Tabel buku"
          topContent={topContent}
          bottomContent={
            <div className="flex w-full justify-end gap-5">
              {isLoading ? <Spinner size="md" /> : null}
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }>
          <TableHeader columns={kolomBuku}>
            {(buku) => <TableColumn key={buku.key}>{buku.label}</TableColumn>}
          </TableHeader>

          <TableBody
            items={items}
            emptyContent={'Tidak ada data untuk ditampilkan'}>
            {(dataBuku) => (
              <TableRow key={dataBuku._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(dataBuku, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

BookPage.getLayout = function getLayout(page) {
  return (
    <>
      <Sidebar>{page}</Sidebar>
    </>
  );
};
