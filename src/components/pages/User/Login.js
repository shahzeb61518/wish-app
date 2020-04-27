import React, { Component } from 'react'

import Card from '@material-ui/core/Card';

import { Link } from 'react-router-dom'

import validator from 'validator';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import MyTextField from '../../helper/MyTextField'
import MySelection from '../../helper/MySelection'
import ApiManager from '../../helper/ApiManager'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            email_error: "",
            password: "",
            password_error: "",

            successMsg: "",
            isLoading: false,
            disableBtn: false

        }
    }

    render() {
        return (
            <div className="container">
                {
                    this.loginBody()
                }
            </div>
        )
    }


    loginBody = () => {
        const { email, email_error, password, password_error } = this.state;

        return (
            <div style={{ width: "50%", marginLeft: '25%' }}>
                <br />
                <br />
                <Card style={{ padding: '50px' }}>
                    <h5>Login</h5>
                    <br />
                    <MyTextField
                        reference={(ref) => this.email = ref}
                        label="Email"
                        placeholder="email"
                        required={true}
                        type="email"
                        value={email}
                        onChange={(e) => {
                            this.setState({
                                email: e.target.value
                            });
                        }}
                        helperText={email_error ? email_error : ""}
                        error={email_error ? true : false}
                    />

                    <MyTextField
                        reference={(ref) => this.password = ref}
                        label="Password"
                        placeholder="password"
                        required={true}
                        type="password"
                        value={password}
                        onChange={(e) => {
                            this.setState({
                                password: e.target.value
                            });
                        }}
                        helperText={password_error ? password_error : ""}
                        error={password_error ? true : false}
                    />

                    <Button style={{}}
                        variant="contained"
                        class="btn btn-primary"
                        onClick={() => {
                            this.loginFunction()
                        }}
                        disabled={this.state.disableBtn}>
                        {
                            this.state.disableBtn ?
                                <span class="spinner-border spinner-border-sm"></span>
                                :
                                undefined
                        }
                        Login
                        </Button>

                    <Link
                        to='/signup'
                        style={{
                            marginLeft: '20px',
                            textDecoration: "None",
                            color: 'blue',
                        }}
                    >Signup</Link>
                </Card>
                <br />
            </div>
        )
    }


    // schooling to the position
    scrollToView = (position) => {
        window.scroll({ top: position - 30, behavior: 'smooth' })
    }



    // login
    loginFunction = () => {
        const { email, email_error, password, password_error } = this.state


        if (validator.isEmpty(email + "")) {
            this.setState({
                email_error: "Please enter email"
            })
            var position = this.email.offsetTop;
            this.scrollToView(position)
            return;
        } else {
            this.setState({
                email_error: ""
            })
        }


        if (validator.isEmpty(password + "")) {
            this.setState({
                password_error: "Please enter password"
            })
            var position = this.password.offsetTop;
            this.scrollToView(position)
            return;
        } else {
            this.setState({
                password_error: ""
            })
        }



        this.setState({
            disableBtn: true
        })

        new ApiManager().signIn(
            email,
            password,
        ).then(result => {
            this.setState({
                isLoading: true,
            })
            if (result.no_result) {
                this.setState({
                    isLoading: false,
                    disableBtn: false,
                })
                return
            }
            if (result.data) {
                if (result.data.error) {
                    alert(result.data.error)
                    this.setState({
                        isLoading: false,
                        disableBtn: false,
                    })
                    return
                }
            }
            this.props.history.push('/wishes');
            this.setState({
                isLoading: false,
                disableBtn: false
            })
            console.log("result after adding>>>", result);
        })

    }
}
