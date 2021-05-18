import React, { Component } from 'react'
import { Card,Form,Button,Alert } from 'react-bootstrap'
import axios from 'axios'
import { Icon } from '@iconify/react';

export default class Hasil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            copySuccess: false,
        };
    
        this.handleChangeQr = this.handleChangeQr.bind(this);
        this.handleQr = this.handleQr.bind(this);
    }
    


    handleChangeQr(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
    }
    
    
    
    handleQr(event){
    event.preventDefault()
    const codeqr = {
        code: this.state.code
    }
    alert(codeqr)
    
    axios.post('http://127.0.0.1:8000/code', codeqr)
    .then(res => {
        const short = res.data;
        this.setState({ short })
    })
    }
    
    copyCodeToClipboard = () => {
    const el = this.textArea
    el.select()
    document.execCommand("copy")
    this.setState({copySuccess: true})
    }
    render() {
        return (
            <div>
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
                            <Form.Control className="teks-form-copy" ref={(textarea) => this.textArea = textarea} type="text" placeholder={this.props.tampilanHasil.short} onChange={this.handleChangeQr} value={this.props.tampilanHasil.short} onClick={() => this.copyCodeToClipboard()} readOnly />
                        </div>
                            <Button variant="success" size="lg" className="mt-4 custom-botton" type="submit">
                                Code Qr <Icon data-icon="akar-icons:victory-hand" data-inline="true" data-rotate="90deg" data-flip="horizontal" />
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>:null
                }
            </div>
        )
    }
}
