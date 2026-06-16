import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { mockCars } from '../data/mockData';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: ''
  });

  useEffect(() => {
    setCars(mockCars);
  }, []);

  const applyFilters = () => {
    let result = cars;

    if (filters.category) {
      result = result.filter(car => car.category === filters.category);
    }

    if (filters.minPrice) {
      result = result.filter(car => car.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter(car => car.price <= parseInt(filters.maxPrice));
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(car =>
        car.make.toLowerCase().includes(searchLower) ||
        car.model.toLowerCase().includes(searchLower)
      );
    }

    setFilteredCars(result);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      search: ''
    });
  };

  const categories = [...new Set(cars.map(car => car.category))];

  return (
    <Container className="py-4">
      <div className="hero-section mb-4">
        <h1>Welcome to Car Rental</h1>
        <p>Find the perfect car for your journey</p>
      </div>

      <div className="filter-section">
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                name="search"
                placeholder="Make or model..."
                value={filters.search}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Min Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="minPrice"
                placeholder="0"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Max Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="maxPrice"
                placeholder="1000"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>&nbsp;</Form.Label>
              <Button variant="secondary" onClick={resetFilters} className="w-100">
                Reset
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </div>

      <Row>
        {filteredCars.length === 0 ? (
          <Col>
            <p className="text-center text-muted">No cars found matching your criteria.</p>
          </Col>
        ) : (
          filteredCars.map(car => (
            <Col key={car.id} md={4} className="mb-4">
              <Card className="car-card h-100">
                <Card.Img variant="top" src={car.image} className="car-image" />
                <Card.Body>
                  <Card.Title>{car.make} {car.model}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{car.year} • {car.category}</Card.Subtitle>
                  <Card.Text>
                    <strong>${car.price}</strong> / day
                  </Card.Text>
                  <Card.Text className={car.available ? 'text-success' : 'text-danger'}>
                    {car.available ? '✓ Available' : '✗ Not Available'}
                  </Card.Text>
                  <Link to={`/cars/${car.id}`} className="btn btn-primary w-100">
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default CarList;
