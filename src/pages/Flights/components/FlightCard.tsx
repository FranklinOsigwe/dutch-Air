import { useState } from "react";
import { IFlight } from "services";
import DropdownButton from "./DropdownButton";

const FlightCard = (props: { flight: IFlight, handleClick: (type: 'edit' | 'delete') => void }) => {
  const { flight, handleClick } = props;

  // Component for the status indicator
  const StatusPill = ({ status }: { status: string }) => {
    const statusColor =
      status === "none"
        ? "bg-orange-500 text-gray-100"
        : "bg-green-300 text-gray-50";
    return (
      <div className={`${statusColor} text-xs rounded px-2 py-1 font-medium`}>
        {status}
      </div>
    );
  };

  return (
    <div className="flex items-center border border-gray-200 py-3 px-4 rounded shadow-sm">
      {/* Flight Thumbnail */}
      <div className="w-[50px] h-[50px] bg-gray-100 rounded border border-gray-200"></div>

      {/* Flight Info */}
      <div className="ml-3 flex-1">
        <p className="font-medium">
          {flight.departureDate} (Capacity: {flight.capacity})
        </p>
        <p className="text-sm text-gray-400 tracking-wide mt-1">
          {flight.code}
        </p>
      </div>

      {/* Status and Actions */}
      <div className="flex items-center">
        <StatusPill status={flight.status} />
        <DropdownButton onClick={handleClick} />
      </div>
    </div>
  );
};

export default FlightCard;

// import { useState } from 'react';
// import { IFlight } from 'services';

// const FlightCard = (props: { flight: IFlight }) => {
//     const { flight } = props;

//     const StatusPill = ({ status }: { status: string }) => {
//         const statusColor =
//             status === 'none' ? 'bg-orange-500 text-gray-100' : 'bg-green-300 text-gray-50';
//         return (
//             <div className={`${statusColor} text-xs rounded px-1 py-1 font-medium`}>
//                 {flight.status}
//             </div>
//         );
//     };

//     const DropdownButton = () => {
//         const [isOpen, setIsOpen] = useState(false);

//         const toggleDropdown = () => {
//           setIsOpen(!isOpen);
//         };

//         const handleEdit = () => {
//           console.log("Edit clicked");
//           setIsOpen(false);
//         };

//         const handleDelete = () => {
//           console.log("Delete clicked");
//           setIsOpen(false);
//         };

//     return (
//         <div className="flex border border-gray-200 py-2 px-2 rounded shadow-sm">
//             <div className="w-[50px] h-[50px] bg-gray-100 rounded border border-gray-200"></div>

//             <div className="ml-3">
//                 <p className="font-medium">
//                     {flight.departureDate} (Capacity: {flight.capacity})
//                 </p>
//                 <p className="text-[13px] text-gray-400 tracking-wider mt-0.5">{flight.code}</p>
//             </div>

//             <div className="self-start ml-auto flex">
//                 <StatusPill status={flight.status} />
//                 <div className="relative inline-block">
//       <button
//         onClick={toggleDropdown}
//         className="p-2 rounded hover:bg-gray-200"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className="size-6 w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
//           />
//         </svg>
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg">
//           <button
//             onClick={handleEdit}
//             className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//           >
//             Edit
//           </button>
//           <button
//             onClick={handleDelete}
//             className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//           >
//             Delete
//           </button>
//         </div>
//       )}
//     </div>

//                 {/* <button>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="size-6"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
//                         />
//                     </svg>
//                 </button> */}
//             </div>
//         </div>
//     );
// };

// export default FlightCard
