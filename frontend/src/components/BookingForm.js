import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const BookingForm = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchCar();
  }, [carId]);

  const fetchCar = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cars/${carId}`);
      setCar(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load car details');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotalPrice = () => {
    if (!car || !formData.startDate || !formData.endDate) return 0;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return 0;
    
    return days * car.price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.startDate || !formData.endDate) {
      setError('Please select both start and end dates');
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    
    if (end <= start) {
      setError('End date must be after start date');
      return;
    }

    try {
      const totalPrice = calculateTotalPrice();
      // For demo purposes, just show success
      console.log('Booking submitted:', {
        carId: parseInt(carId),
        ...formData,
        totalPrice
      });
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError('Failed to create booking. Car may no longer be available.');
      setSuccess(false);
    }
  };

  if (loading) {
    return <Container className="py-5 text-center"><div className="spinner-border" role="status"></div></Container>;
  }

  if (error && !car) {
    return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  if (success) {
    return (
      <Container className="py-5">
        <Alert variant="success">
          <Alert.Heading>Booking Successful!</Alert.Heading>
          <p>Your booking has been confirmed. You can view your bookings in the admin dashboard.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-success" onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </Alert>
      </Container>
    );
  }

  const totalPrice = calculateTotalPrice();

  return (
    <Container className="py-5">
      <Button as={Link} to={`/cars/${carId}`} variant="secondary" className="mb-4">
        ← Back to Car Details
      </Button>

      <Row>
        <Col md={8}>
          <Card>
            <Card.Header as="h4">Book Your Rental</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        min={formData.startDate || new Date().toISOString().split('T')[0]}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="mb-4">
                  <h5>Booking Summary</h5>
                  <p><strong>Car:</strong> {car?.make} {car?.model}</p>
                  <p><strong>Daily Rate:</strong> ${car?.price}</p>
                  {formData.name && <p><strong>Customer:</strong> {formData.name}</p>}
                  {formData.email && <p><strong>Email:</strong> {formData.email}</p>}
                </div>

                {totalPrice > 0 && (
                  <Alert variant="info">
                    <h4>Total Price: ${totalPrice}</h4>
                    <p className="mb-0">for {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))} day(s)</p>
                  </Alert>
                )}

                <Button 
                  variant="primary" 
                  size="lg" 
                  type="submit" 
                  className="w-100"
                  disabled={!formData.startDate || !formData.endDate || totalPrice === 0}
                >
                  Confirm Booking
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={car?.image} />
            <Card.Body>
              <Card.Title>{car?.make} {car?.model}</Card.Title>
              <Card.Text>${car?.price} / day</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;
