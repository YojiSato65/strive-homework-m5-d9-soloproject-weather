import { Navbar, Nav } from 'react-bootstrap'

const MyNavbar = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#eee9e9' }}>
      <Navbar.Brand href="#home">Weather App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MyNavbar
