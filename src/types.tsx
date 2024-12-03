export interface User {
    id: string;
    name: string;
    email: string; 
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface Flight {
    id: string;
    code: string;
    origin: string;
    destination: string;
    departureTime: string;
    departureDate: string;
    arrivalTime: string;
    capacity: number;
    status: string
    img: string
  }

  export interface PaginatedFlights {
    flights: Flight[];
    total: number;
    page: number;
    pageSize: number;
  }

  export interface ApiResponse<T> {
    data: T;
    message: string;
  }

  export interface Modal {
    data : any;
  }