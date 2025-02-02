import SearchBox from './_components/SearchBox';

function SearchLayout({ children }) {
  return (
    <div className="flex w-full">
      <SearchBox />
      {children}
    </div>
  );
}

export default SearchLayout;
