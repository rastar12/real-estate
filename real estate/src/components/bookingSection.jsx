import React from 'react';

const BookingSection = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Book Your Stay</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Booking form */}
          <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkInDate">Check-In Date</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="checkInDate" type="date" placeholder="Check-In Date" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkOutDate">Check-Out Date</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="checkOutDate" type="date" placeholder="Check-Out Date" />
            </div>
            <div className="mb-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full">Book Now</button>
            </div>
          </form>
          {/* Booking information */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Information</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget aliquet risus, vel volutpat purus.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
