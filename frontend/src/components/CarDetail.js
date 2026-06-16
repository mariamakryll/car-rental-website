import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
      setCar(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load car details');
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/book/${id}`);
    }
  };

  if (loading) {
    return <Container className="py-5 text-center"><div className="spinner-border" role="status"></div></Container>;
  }

  if (error) {
    return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  if (!car) {
    return <Container className="py-5"><Alert variant="warning">Car not found</Alert></Container>;
  }

  return (
    <Container className="py-5">
      <Button as={Link} to="/" variant="secondary" className="mb-4">
        ← Back to Cars
      </Button>

      <Card>
        <Row>
          <Col md={6}>
            <Card.Img src={car.image} alt={`${car.make} ${car.model}`} style={{ height: '400px', objectFit: 'cover' }} />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title as="h2">{car.make} {car.model}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted h4">{car.year} • {car.category}</Card.Subtitle>
              
              <h3 className="text-primary mb-4">${car.price} <span className="text-muted h6">/ day</span></h3>
              
              <div className="mb-4">
                <strong>Status:</strong>{' '}
                <span className={car.available ? 'text-success' : 'text-danger'}>
                  {car.available ? 'Available' : 'Not Available'}
                </span>
              </div>

              <div className="mb-4">
                <h5>Vehicle Details</h5>
                <ul className="list-unstyled">
                  <li>📅 Year: {car.year}</li>
                  <li>🏷️ Category: {car.category}</li>
                  <li>💰 Daily Rate: ${car.price}</li>
                  <li>📋 ID: #{car.id}</li>
                </ul>
              </div>

              <div className="mb-4">
                <h5>Features</h5>
                <div className="d-flex flex-wrap gap-2">
                  {car.features.map((feature, index) => (
                    <span key={index} className="badge bg-secondary">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h5>Description</h5>
                <p className="text-muted">{car.description}</p>
              </div>

              {car.available ? (
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-100"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              ) : (
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-100"
                  disabled
                >
                  Currently Unavailable
                </Button>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default CarDetail;
