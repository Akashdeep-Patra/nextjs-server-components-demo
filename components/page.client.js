import Header from './header';

export default function Page({ children }) {
  return (
    <>
      <div className='main px-10 py-10'>
        <Header />
        <div className='page'>{children}</div>
      </div>
    </>
  );
}
