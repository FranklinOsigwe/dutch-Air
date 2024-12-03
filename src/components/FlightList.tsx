import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from 'react-query';
import { createFlight } from '../services/auth';
import { Flight } from '../types';


const flightSchema = z.object({
  code: z.string().min(3, 'Flight code must be at least 3 characters'),
  origin: z.string().nonempty('Origin is required'),
  destination: z.string().nonempty('Destination is required'),
  departureTime: z.string().nonempty('Departure time is required'),
  arrivalTime: z.string().nonempty('Arrival time is required'),
})

type FlightFormValues = z.infer<typeof flightSchema>;

const CreateFlightForm: React.FC = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createFlight, {
    onSuccess: () => {
      queryClient.invalidateQueries(['flights']);
    },
  });


  const { register, handleSubmit, formState: { errors }, reset, } = useForm<FlightFormValues>({ resolver: zodResolver(flightSchema) })

  const onSubmit = (data: FlightFormValues) => {
    mutate(data);
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">Flight Code</label>
        <input {...register('code')} className="w-full p-2 border rounded" />
        {errors.code && <p className="text-red-500">{errors.code.message}</p>}
      </div>
      <div>
        <label className="block">Origin</label>
        <input {...register('origin')} className="w-full p-2 border rounded" />
        {errors.origin && <p className="text-red-500">{errors.origin.message}</p>}
      </div>
      <div>
        <label className="block">Destination</label>
        <input {...register('destination')} className="w-full p-2 border rounded" />
        {errors.destination && <p className="text-red-500">{errors.destination.message}</p>}
      </div>
      <div>
        <label className="block">Departure Time</label>
        <input type="datetime-local" {...register('departureTime')} className="w-full p-2 border rounded" />
        {errors.departureTime && <p className="text-red-500">{errors.departureTime.message}</p>}
      </div>
      <div>
        <label className="block">Arrival Time</label>
        <input type="datetime-local" {...register('arrivalTime')} className="w-full p-2 border rounded" />
        {errors.arrivalTime && <p className="text-red-500">{errors.arrivalTime.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        {isLoading ? 'Creating...' : 'Create Flight'}
      </button>
    </form>
  );
}







































// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { fetchFlights, deleteFlight } from '../flightApi/auth'

// const FlightList: React.FC = () => {
//     const [search, setSearch] = useState('');
//     const queryClient = useQueryClient();

//     const { data: flights = [], isLoading, isError } = useQuery(['flights', search], () => fetchFlights(search))
//         console.log(flights, 'check')
//     const { mutate: deleteFlightMutation } = useMutation(deleteFlight, {
//         onSuccess: () => {
//             queryClient.invalidateQueries(['flights'])
//         },
//     })

//     if (isLoading) return <p>Loading... Flights</p>

//     return (
//         <div>
//             <input type='text' placeholder='Search flights by code' value={search} onChange={(e) => setSearch(e.target.value)} className='mb-4 p-2 border rounded' />
//             <table className='w-full border'>
//                 <thead>
//                     <tr>
//                         <th>Code</th>
//                         <th>Origin</th>
//                         <th>Destination</th>
//                         <th>Departure</th>
//                         <th>Arrival</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {flights.map((flight) => (
//                         <tr key={flight.id}>
//                             <td>{flight.code}</td>
//                             <td>{flight.origin}</td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default FlightList