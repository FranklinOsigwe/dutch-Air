import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  fetchFlights,
  deleteFlight,
  IFlightData,
  createFlight,
  IFlight,
  updateFlight,
} from "services";

import FlightModal from "./components/FlightModal";
import FlightCard from "./components/FlightCard";
import SearchInput from "components/SearchInput";
import Pagination from "components/Pagination";
import { isLeapYear } from "utilities";
import errorManager from "utilities/errors";
import { useSearchParams } from "react-router";
import Header from "components/Header";
import useDebounce from "hooks/useDebounce";

enum queryKeys {
  fetch_flights = "fetch_flights",
}

const dateSchema = z
  .string()
  .regex(
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    "Invalid date format (YYYY-MM-DD required)"
  )
  .refine((dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);

    // Check for valid month and day
    const daysInMonth = [
      31,
      isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    return day <= daysInMonth[month - 1];
  }, "Invalid day for the given month");

const schema = z.object({
  code: z
    .string()
    .length(6, "Flight code must be exactly 6 characters")
    .regex(/^[a-zA-Z]+$/, {
      message: "The string must contain only alphabetic characters",
    }),
  capacity: z.number().min(1, "Flight capacity must be atleast 1"),
  departureDate: dateSchema,
});

const Flights = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const searchQuery = searchParams.get("q");

  const debouncedValue = useDebounce(searchQuery);

  const { data: response, isLoading } = useQuery({
    queryKey: [queryKeys.fetch_flights, debouncedValue, pageSize, pageNumber],
    queryFn: () => fetchFlights(searchQuery || "", pageSize, pageNumber),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { defaultValues, errors },
  } = useForm<IFlightData>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
      capacity: 1,
      departureDate: "",
    },
  });

  const flights = response?.data.resources;

  const handleCloseModal = () => {
    reset();
    setShowModal(false);
  };

  const handleInvalidateQueries = () =>
    queryClient.invalidateQueries({ queryKey: [queryKeys.fetch_flights] });

  const { mutate: deleteFlightMutation } = useMutation({
    mutationFn: deleteFlight,
    onSuccess: () => {
      toast.success("Successfully deleted flight");
      handleInvalidateQueries();
    },
    onError: (err) => {
      const errorMsg = errorManager.format(err);
      toast.error(errorMsg);
    },
  });

  const { isPending: isUpdating, mutate: updateFlightMutation } = useMutation({
    mutationFn: updateFlight,
    onSuccess: () => {
      toast.success("Successfully updated flight");
      handleInvalidateQueries();
      handleCloseModal();
    },
    onError: (err) => {
      const errorMsg = errorManager.format(err);
      toast.error(errorMsg);
    },
  });

  const { isPending, mutate: createFlightMutation } = useMutation({
    mutationFn: createFlight,
    onSuccess: () => {
      toast.success("Successfully created flight");
      handleInvalidateQueries();
      handleCloseModal();
    },
    onError: (err) => {
      const errorMsg = errorManager.format(err);
      toast.error(errorMsg);
    },
  });

  const onSubmit = (data: IFlightData) => {
    if (selectedFlightId) {
      updateFlightMutation({ id: selectedFlightId, flight: data });
      return;
    }

    createFlightMutation(data);
  };

  const handleClick = (type: "edit" | "delete", flight: IFlight) => {
    if (type === "edit") {
      setValue("code", flight.code);
      setValue("capacity", flight.capacity);
      setValue("departureDate", flight.departureDate);
      setSelectedFlightId(flight.id);
      setShowModal(true);
      return;
    }

    if (type === "delete") {
      deleteFlightMutation(flight.id);
      return;
    }
  };

  const list = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    from: {
      opacity: 0,
      y: 20,
    },
    to: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div>
      <Header />

      <div className="max-w-[480px] mx-auto pt-40 pb-20">
        <SearchInput
          search={searchQuery as string}
          setSearch={(value) => {
            setSearchParams({ q: (value as string) || "" });
          }}
        />

        <button
          className="h-[40px] bg-black text-white w-full rounded mb-4"
          onClick={() => {
            setSelectedFlightId("");
            reset();
            setShowModal(true);
          }}
        >
          Create Flight
        </button>

        {isLoading && <div className="text-center">Loading...</div>}

        {!isLoading && (
          <motion.div
            initial="from"
            animate="to"
            variants={list}
            className="flex flex-col gap-y-2"
          >
            {flights?.map((flight) => (
              <motion.div
                variants={item}
                key={flight?.id}
                data-testid="list-item"
              >
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  handleClick={(type) => handleClick(type, flight)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <Pagination
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          total={response?.data.count || 0}
        />
      </div>

      {/* Modal */}
      <FlightModal
        isEditMode={!!selectedFlightId}
        isPending={isPending || isUpdating}
        showModal={showModal}
        setShowModal={setShowModal}
        register={register}
        defaultValues={defaultValues}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
      />
    </div>
  );
};

export default Flights;
