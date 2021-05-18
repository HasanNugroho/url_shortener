import React, { Component } from 'react'
import { Card,Form,Button,Alert,Row,Col,Accordion } from 'react-bootstrap'
import axios from 'axios'
import Ilustrasi from '../asset/ilustrasi.svg'
import { FaRegHandScissors } from "react-icons/fa";
import { HiExclamationCircle } from "react-icons/hi";
// FaRegCopy
export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            link_custom: '',
            copySuccess: false,
            code: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeQr = this.handleChangeQr.bind(this);
        this.handleQr = this.handleQr.bind(this);
    }
    
    handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
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
            this.setState({ gagal })
        }else{
            const short = res.data;
            this.setState({ short })
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
    // console.log(this.state.short)
    }

    copyCodeToClipboard = () => {
    const el = this.textArea
    el.select()
    document.execCommand("copy")
    this.setState({copySuccess: true})
    }
    
    render() {
        return (
            <div className="mt-5">
                <Row>
                    <Col xs={12} md={6}>
                        <img className="align-self-center ilustrasi" src={Ilustrasi} alt="Ilustrasi" />
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="teks-1 flex">
                            When shorter is <p className="color-green">better</p>
                        </div>
                        <div className="teks-2 mt-4 color-grey">
                            Nggak selamanya yang panjang itu bagus ye, link contohnya
                        </div>
                        <div className="mt-4">
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                <Form.Control size="lg" type="text" name="link" className="teks-form" placeholder="Paste link kamu disini untuk memulai...." value={this.state.value} onChange={this.handleChange} />
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
                                        <Form.Control size="lg" type="text" name="link_custom" placeholder="https://www.youtube.com/" value={this.state.value} onChange={this.handleChange} />
                                        <Form.Text className="text-muted">
                                        link baru
                                        </Form.Text>
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
                                {
                                this.state.copySuccess?
                                    <Alert variant="success">
                                        Link Berhasil Dicopy
                                    </Alert>:null
                                }
                                <Form onSubmit={this.handleQr}>
                                <div className="align-items-center mt-4">
                                    <Form.Control className="teks-form-copy" ref={(textarea) => this.textArea = textarea} type="text" value={this.state.short} onClick={() => this.copyCodeToClipboard()} readOnly />
                                </div>
                                    {
                                    this.state.qrcode?
                                        <div className="mt-4">
                                            {this.state.qrcode}
                                        </div>:null
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
