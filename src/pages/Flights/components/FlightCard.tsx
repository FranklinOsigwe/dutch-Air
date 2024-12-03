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
      
      <div className="w-[50px] h-[50px] bg-gray-100 rounded border border-gray-200"></div>

    
      <div className="ml-3 flex-1">
        <p className="font-medium text-red-100">
          {flight.departureDate} (Capacity: {flight.capacity})
        </p>
        <p className="text-sm text-gray-400 tracking-wide mt-1">
          {flight.code}
        </p>
      </div>

      
      <div className="flex items-center">
        <StatusPill status={flight.status} />
        <DropdownButton onClick={handleClick} />
      </div>
    </div>
  );
};

export default FlightCard;

