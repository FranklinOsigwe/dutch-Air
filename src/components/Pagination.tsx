import { Dispatch, SetStateAction } from "react";

interface IProps {
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  total: number;
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
}

const Pagination = (props: IProps) => {
  const { setPageSize, pageSize, total, pageNumber, setPageNumber } = props;

  const totalNumberOfPages = () => {
    return Math.ceil(total / pageSize);
  };

  return (
    <div className="flex justify-between mt-3">
      <div className="text-xs">
        <label htmlFor="page-size" className="font-medium mr-2">
          Page size:{" "}
        </label>

        <select
          id="page-size"
          className="border border-gray-300 shadow-sm rounded text-xs p-1"
          onChange={({ target }) => setPageSize(Number(target.value))}
        >
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="text-xs flex items-center font-medium">
        <button
          className={`border border-gray-300 shadow-sm px-1.5 py-0.5 rounded ${
            pageNumber === 1 ? "cursor-not-allowed bg-gray-100" : ""
          }`}
          onClick={() => setPageNumber((state) => state - 1)}
          disabled={pageNumber === 1}
        >
          {"<"}
        </button>

        <div className="mx-2">
          {pageNumber} - {totalNumberOfPages()}
        </div>

        <button
          className={`border border-gray-300 shadow-sm px-1.5 py-0.5 rounded ${
            pageNumber === totalNumberOfPages()
              ? "cursor-not-allowed bg-gray-100"
              : ""
          }`}
          onClick={() => setPageNumber((state) => state + 1)}
          disabled={pageNumber === totalNumberOfPages()}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
