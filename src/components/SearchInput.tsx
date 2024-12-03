import { Dispatch, SetStateAction } from "react";

const SearchInput = (props: { search: string; setSearch: Dispatch<SetStateAction<string>> }) => {
    const { search, setSearch } = props;

    return (
        <div className="relative h-[40px] mb-4">
            <input
                type="text"
                placeholder="Search flights by code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded w-full px-9 text-sm h-full"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 absolute left-3 top-1/2 -translate-y-1/2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
            </svg>
        </div>
    );
};

export default SearchInput