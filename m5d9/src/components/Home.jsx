import { Container, Row, Col, Form, Button, Carousel } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Result from './Result'

const Home = () => {
  const [city, setCity] = useState('')
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [weather, SetWeather] = useState(null)

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
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getWeather = async () => {
      if (lat && lon) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=ea55ae9601661c957dce7ef9562ca922`,
          )
          if (response.ok) {
            const data = await response.json()
            console.log(data)
            SetWeather(data)
            setCity('')
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    getWeather()
  }, [lat, lon])

  return (
    <>
      <div className="mx-0 px-0 header-container">
        <Row
          className="justify-content-center align-content-center"
          style={{ height: '100%' }}
        >
          <Col md={8}>
            <Form
              className="d-flex justify-content-center my-2"
              onSubmit={handleSearch}
            >
              <Form.Group className="mb-0">
                <Form.Control
                  type="text"
                  style={{ height: '50px' }}
                  placeholder="Search city.."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
              <Button variant="dark" type="submit" className="ml-1">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
      <Container className="my-4">
        {!weather ? (
          <Carousel>
            <Carousel.Item>
              {/* <div>{weather.current.weather.icon}</div> */}
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=Second slide&bg=282c34"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=Third slide&bg=20232a"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        ) : (
          <>
            <Row>
              <h3>Current wheather: {weather.timezone}</h3>
            </Row>
            <Row className="mt-3 justify-content-center align-items-center result-container">
              <Result weather={weather} />
            </Row>
          </>
        )}
      </Container>
    </>
  )
}

export default Home
