import { useRouter } from "next/router";
import { useState } from "react";
import { useContent } from "../../hooks/useContent";

const Search = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    router.push(`/${searchValue}`);
    setSearchValue("");
  };

  return (
    <div class="flex justify-center">
      <div class="mb-3 xl:w-96">
        <div class="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300  bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-700"
            placeholder="Vitalik"
            aria-label="Search"
            aria-describedby="button-addon3"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button
            class="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            type="button"
            id="button-addon3"
            onClick={handleSearch}
            data-te-ripple-init
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
