import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import SearchInput from '../search/SearchInput';

export default function HeaderMenu() {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            <Nav className="justify-content-end" style={{width: '360px'}}>
              <SearchInput />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
