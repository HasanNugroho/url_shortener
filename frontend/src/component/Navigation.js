import React from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { FaLink } from "react-icons/fa";
import Home from '../pages/Home'

export default function Navigation() {
    return (
        <div>
            <Router>
            <Navbar bg="secondary" className="navbar-custom" variant="light" expand="md">
            <div className="container">
            <Navbar.Brand href="#home"><FaLink /> Pendekin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to = {{ pathname: "https://saweria.co/hasannugroho" }} target="_blank">Donate to developer</Nav.Link>
                        <Nav.Link as={Link} to = {{ pathname: "https://github.com/HasanNugroho/url_shortener.git" }} target="_blank">See on Github</Nav.Link>
                    </Nav>
            </Navbar.Collapse>
            </div>
            </Navbar>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                {/* <Route path="/https://github.com/HasanNugroho/url_shortener.git">
                    <div className="container">
                    <Hasil />
                    </div>
                </Route> */}
            </Switch>
            </Router>
        </div>
    )
}
