import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useState } from 'react'

const Home = () => {
  const [city, setCity] = useState('')
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    getCity()
  }

  const getCity = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=ea55ae9601661c957dce7ef9562ca922`,
      )
      if (response.ok) {
        const data = await response.json()
        console.log(data[0].lat)
        console.log(data[0].lon)
        setLat(data[0].lat)
        setLon(data[0].lon)
        getWeather()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=ea55ae9601661c957dce7ef9562ca922`,
      )
      if (response.ok) {
        const data = await response.json()
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Form
            className="d-flex justify-content-center"
            onSubmit={handleSearch}
          >
            <Form.Group className="mb-0">
              <Form.Control
                type="text"
                placeholder="Search city.."
                className="text-center"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Button variant="warning" type="submit" className="ml-2">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
