import React from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { FaLink } from "react-icons/fa";
import Home from '../pages/Home'
import Hasil from '../pages/Hasil'

export default function Navigation() {
    return (
        <div>
            <Router>
            <Navbar bg="secondary" className="navbar-custom" variant="light" expand="xl">
            <div className="container">
            <Navbar.Brand href="#home"><FaLink /> Pendekin.io</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to ="/">Donate to developer</Nav.Link>
                        <Nav.Link as={Link} to ="/hasil">See on Github</Nav.Link>
                    </Nav>
            </Navbar.Collapse>
            </div>
            </Navbar>
            <Switch>
                <Route exact path="/">
                    <div className="container">
                    <Home />
                    </div>
                </Route>
                <Route path="/hasil">
                    <div className="container">
                    <Hasil />
                    </div>
                </Route>
            </Switch>
            </Router>
        </div>
    )
}
