import React, { Component } from 'react'
import { Card, Form, Button, Accordion, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import Ilustrasi from '../asset/ilustrasi.svg'
import { FaRegHandScissors } from "react-icons/fa";
import { HiExclamationCircle } from "react-icons/hi";
import { FaRegCopy, FaRegCheckCircle } from "react-icons/fa";
import QRCode from 'react-qr-code'
// FaRegCopy
export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            link_custom: '',
            copySuccess: false,
            code: '',
        };
        this.baseState = this.state

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeQr = this.handleChangeQr.bind(this);
        this.handleQr = this.handleQr.bind(this);
    }
    
    handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value,
    });
    }
    
    handleChangeQr(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
    }

    handleSubmit(event) {
    event.preventDefault()

    const data = {
        link: this.state.link,
        link_custom: this.state.link_custom
    }

    axios.post('http://127.0.0.1:8000/shorting', data)
    .then(res => {
        if(res.data.status === false){
            const gagal = res.data;
            this.setState({ 
                gagal,
                qrcode: false,
                short: false,
            })
        }else{
            const short = res.data;
            this.setState({
                short,
                copySuccess: false,
                gagal: false,
                qrcode: false,
            })
        }
    })
    }

    handleQr(event){
    event.preventDefault()
    const data = {
        code: this.state.short
    }
    axios.post('http://127.0.0.1:8000/code', data)
    .then(res => {
        const qrcode = res.data;
        this.setState({ qrcode })
    })
    }

    copyCodeToClipboard = () => {
    const el = this.textArea
    el.select()
    document.execCommand("copy")
    this.setState({
        copySuccess: true,
    })
    }
    
    render() {
        return (
            <div className="mt-5 container">
                <Row>
                    <Col sm={12} md={6}>
                        <img 
                        className="align-self-center ilustrasi" 
                        src={Ilustrasi} 
                        alt="Ilustrasi" 
                        />
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="teks-1">
                            When shorter is <p className="color-green">better</p>
                        </div>
                        <div className="teks-2 mt-4 color-grey">
                            Nggak selamanya yang panjang itu bagus ye, link contohnya
                        </div>
                        <div className="mt-4">
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group 
                                controlId="formBasicEmail">
                                    <Form.Control 
                                        size="lg" 
                                        type="text" 
                                        name="link" 
                                        className="teks-form" 
                                        placeholder="Paste link kamu disini untuk memulai...." 
                                        value={this.state.value} 
                                        onChange={this.handleChange} 
                                        required />
                                </Form.Group>
                                <div className="mt-4">
                                    <Accordion defaultActiveKey="0">
                                        <Card.Title>
                                        <Accordion.Toggle as={Button} variant="info" size="sm" eventKey="1">
                                            custom link
                                        </Accordion.Toggle>
                                        </Card.Title>
                                        <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                        <Form.Control size="lg" type="text" name="link_custom" placeholder="linkmu" value={this.state.value} onChange={this.handleChange} />
                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Accordion>
                                    </div>
                                    <div className="mt-4">
                                        <Button variant="success" size="lg" className="custom-botton" type="submit">
                                            Pendekkan <FaRegHandScissors className="flip-icon ml-1 align-self-center" />
                                        </Button>
                                    </div>
                            </Form>
                        </div>
                        <div className="mt-4">
                            { this.state.gagal ?
                            <div className="text-error "> <HiExclamationCircle className="align-self-center pr-1" />{this.state.gagal.message}</div>:null
                            }
                        </div>
                        <div className="mt-4">
                        { this.state.short ?
                        <Card className="hasil">
                            <Card.Body>
                                <div className="teks-3">Good! Now you can copy and share easily </div>
                                <div className="teks-4 mt-4">Link-mu berhasil dibikin pendek </div>
                                <Form onSubmit={this.handleQr}>
                                    <div className="align-items-center mt-4">
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <Form.Control
                                                className="teks-form-copy" 
                                                ref={(textarea) => this.textArea = textarea} 
                                                type="text" 
                                                value={this.state.short} 
                                                onClick={() => this.copyCodeToClipboard()} 
                                                readOnly
                                            />
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <FaRegCopy icon="copy"/>
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                        </InputGroup>
                                    </Form.Group>
                                    </div>
                                {
                                this.state.copySuccess?
                                <div className="text-success">
                                    <FaRegCheckCircle />
                                    Link berhasil dicopy
                                </div>:null
                                }
                                    {
                                    this.state.qrcode?
                                        <div className="mt-4 text-center">
                                            <QRCode value={this.state.qrcode} size="200" bgColor="#ffffff" level="H" />
                                            <div className="text-form">Screenshot segera!!!</div>
                                        </div>
                                        :null
                                    }
                                    <Button variant="success" size="lg" className="mt-4 custom-botton" type="submit">
                                        Code Qr 
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>:null
                        }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
