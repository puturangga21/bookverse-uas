export default function SingleBook() {
  return <div>SingleBook</div>;
}

SingleBook.getLayout = function getLayout(page) {
  return (
    <>
      <nav>Ini navbar client side</nav>
      {page}
    </>
  );
};
