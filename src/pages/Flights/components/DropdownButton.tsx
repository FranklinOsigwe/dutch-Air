import { useState, useRef } from "react";

import useOnClickOutside from "hooks/useOnClickOutside";

const DropdownButton = (props: {
  onClick: (action: "edit" | "delete") => void;
}) => {
  const { onClick } = props;

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<any>();

  useOnClickOutside(modalRef, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    onClick("edit");
    setIsOpen(false);
  };

  const handleDelete = () => {
    onClick("delete");
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block ml-2">
      <button
        onClick={toggleDropdown}
        className="p-2 rounded hover:bg-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10"
          ref={modalRef}
        >
          <button
            onClick={handleEdit}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
