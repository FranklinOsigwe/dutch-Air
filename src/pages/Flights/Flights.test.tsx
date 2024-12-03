import { describe, test, expect, vi, beforeAll } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { createFlight, fetchFlights } from "../../services";
import Flights from "./index";

import "@testing-library/jest-dom"; // Jest DOM matchers
import { customRender } from "../../utilities/testUtils";

const data = {
  total: 2,
  count: 2,
  resources: [
    {
      id: "482d1ee1-ff44-4c28-b94f-348651e51938",
      img: "",
      status: "none",
      code: "AbcDef",
      capacity: 1,
      departureDate: "2020-10-23",
    },
    {
      id: "bc63ba00-c93d-4ad0-bb74-6c394a04a658",
      img: "",
      status: "none",
      code: "AXERWr",
      capacity: 1,
      departureDate: "2020-10-23",
    },
  ],
};

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock("axios", async (importActual) => {
  const actual = await importActual<typeof import("axios")>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
      })),
    },
  };

  return mockAxios;
});

const renderWithRouter = (Component: () => JSX.Element) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/flights" element={<Component />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Flights", () => {
  beforeAll(() => {
    mocks.get.mockResolvedValue({
      data,
    });
  });

  test("Should render component correctly", () => {
    customRender(renderWithRouter(Flights));
  });

  // test("calls createFlight with correct data on valid form submission", async () => {
  //   customRender(renderWithRouter(Flights));

  //   // Open create flight modal
  //   fireEvent.click(screen.getByRole("button", { name: /Create Flight/i }));

  //   // Fill out the form
  //   userEvent.type(screen.getByLabelText(/code/i), "Abcref");
  //   userEvent.type(screen.getByLabelText(/capacity/i), "20");
  //   userEvent.type(screen.getByLabelText(/departure date/i), "2022-10-10");
  //   // fireEvent.change(screen.getByLabelText(/Departure Time/i), { target: { value: '2024-12-05T10:00' } });
  //   // fireEvent.change(screen.getByLabelText(/Arrival Time/i), { target: { value: '2024-12-05T18:00' } });

  //   userEvent.click(screen.getByRole("button", { name: /submit/i }));

  //   // Wait for mutation to be called
  //   await waitFor(() => {
  //     expect(createFlight).toHaveBeenCalledWith({
  //       code: "Abcref",
  //       capacity: 20,
  //       departureDate: "2022-10-10",
  //       // departureTime: '2024-12-05T10:00',
  //       // arrivalTime: '2024-12-05T18:00',
  //     });
  //   });
  // });

  // test('shows validation errors for invalid inputs', async () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <Flights />
  //     </QueryClientProvider>
  //   );

  //   // Submit the form without filling out fields
  //   fireEvent.click(screen.getByRole('button', { name: /Create Flight/i }));

  //   // Check for validation errors
  //   expect(await screen.findByText(/Flight code must be at least 3 characters/i)).toBeInTheDocument();
  //   expect(await screen.findByText(/Origin is required/i)).toBeInTheDocument();
  //   expect(await screen.findByText(/Destination is required/i)).toBeInTheDocument();
  //   expect(await screen.findByText(/Departure time is required/i)).toBeInTheDocument();
  //   expect(await screen.findByText(/Arrival time is required/i)).toBeInTheDocument();
  // });
});
