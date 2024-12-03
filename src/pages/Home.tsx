import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-6">
          <a href="#" className="text-lg font-bold text-red-600">Frank Airlines</a>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-700 hover:text-red-600">Home</a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-red-600">Flights</a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-red-600">Hotel</a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-red-600">Orders</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-700 hover:text-red-600">Signin</a>
          <a
            href="#"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Register
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-12 px-6">
          {/* Caption */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight">
              Experience Flight Connections <br />
              From All Our Destinations
            </h1>
            <p className="text-lg">
              Book your next adventure with ease and enjoy the best service in the air.
            </p>
            <button className="px-6 py-3 bg-white text-red-600 font-medium rounded-lg shadow-lg hover:bg-gray-200 transition">
              Explore Now
            </button>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src="https://c8.alamy.com/comp/2JKAK2C/multiracial-family-travelling-together-with-small-kids-taking-selfie-in-front-of-brick-wall-2JKAK2C.jpg"
              alt="Airplane flying over a sunset"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
