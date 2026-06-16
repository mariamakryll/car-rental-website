// Static mock data for frontend preview
export const mockCars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 55,
    available: true,
    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Toyota+Camry',
    category: 'Sedan',
    features: ['Automatic', '5 Seats', 'Air Conditioning', 'Bluetooth'],
    description: 'Comfortable and reliable sedan, perfect for city driving and long trips.'
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    price: 50,
    available: true,
    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Honda+Civic',
    category: 'Sedan',
    features: ['Automatic', '5 Seats', 'Air Conditioning', 'Backup Camera'],
    description: 'Fuel-efficient compact sedan with modern technology and safety features.'
  },
  {
    id: 3,
    make: 'BMW',
    model: 'X5',
    year: 2023,
    price: 150,
    available: true,
    image: 'https://via.placeholder.com/400x300/f093fb/ffffff?text=BMW+X5',
    category: 'SUV',
    features: ['Automatic', '7 Seats', 'GPS Navigation', 'Leather Interior'],
    description: 'Luxury SUV with premium features and exceptional performance.'
  },
  {
    id: 4,
    make: 'Mercedes',
    model: 'C-Class',
    year: 2023,
    price: 120,
    available: true,
    image: 'https://via.placeholder.com/400x300/4facfe/ffffff?text=Mercedes+C-Class',
    category: 'Luxury',
    features: ['Automatic', '5 Seats', 'Air Conditioning', 'Premium Sound'],
    description: 'Elegant luxury sedan with cutting-edge technology and comfort.'
  },
  {
    id: 5,
    make: 'Ford',
    model: 'Mustang',
    year: 2022,
    price: 130,
    available: true,
    image: 'https://via.placeholder.com/400x300/43e97b/ffffff?text=Ford+Mustang',
    category: 'Sports',
    features: ['Manual', '4 Seats', 'Air Conditioning', 'Sports Package'],
    description: 'Iconic American muscle car with powerful performance.'
  },
  {
    id: 6,
    make: 'Chevrolet',
    model: 'Tahoe',
    year: 2023,
    price: 140,
    available: true,
    image: 'https://via.placeholder.com/400x300/fa709a/ffffff?text=Chevrolet+Tahoe',
    category: 'SUV',
    features: ['Automatic', '8 Seats', 'GPS Navigation', 'Towing Package'],
    description: 'Full-size SUV perfect for family adventures and road trips.'
  },
  {
    id: 7,
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 100,
    available: true,
    image: 'https://via.placeholder.com/400x300/a8edea/ffffff?text=Tesla+Model+3',
    category: 'Electric',
    features: ['Automatic', '5 Seats', 'Autopilot', 'Electric'],
    description: 'All-electric sedan with advanced technology and zero emissions.'
  },
  {
    id: 8,
    make: 'Jeep',
    model: 'Wrangler',
    year: 2023,
    price: 95,
    available: true,
    image: 'https://via.placeholder.com/400x300/fed6e3/ffffff?text=Jeep+Wrangler',
    category: 'SUV',
    features: ['Manual', '4 Seats', '4WD', 'Removable Top'],
    description: 'Legendary off-road capability with open-air freedom.'
  },
  {
    id: 9,
    make: 'Audi',
    model: 'A6',
    year: 2023,
    price: 135,
    available: true,
    image: 'https://via.placeholder.com/400x300/d299c2/ffffff?text=Audi+A6',
    category: 'Luxury',
    features: ['Automatic', '5 Seats', 'Quattro AWD', 'Virtual Cockpit'],
    description: 'Sophisticated luxury sedan with advanced performance and technology.'
  }
];

// Simulated booking data (stored in localStorage)
export const getMockBookings = () => {
  const stored = localStorage.getItem('mockBookings');
  return stored ? JSON.parse(stored) : [];
};

export const saveMockBooking = (booking) => {
  const bookings = getMockBookings();
  const newBooking = {
    id: bookings.length + 1,
    ...booking,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  bookings.push(newBooking);
  localStorage.setItem('mockBookings', JSON.stringify(bookings));
  return newBooking;
};

// Simulated user data (stored in localStorage)
export const getMockUser = () => {
  const stored = localStorage.getItem('mockUser');
  return stored ? JSON.parse(stored) : null;
};

export const saveMockUser = (user) => {
  localStorage.setItem('mockUser', JSON.stringify(user));
};

export const removeMockUser = () => {
  localStorage.removeItem('mockUser');
};
