import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom'

import validator from 'validator';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import MyTextField from '../../helper/MyTextField'
import MySelection from '../../helper/MySelection'
import ApiManager from '../../helper/ApiManager'

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            name_error: "",

            email: "",
            email_error: "",

            password: "",
            password_error: "",

            confirmPassword: "",
            confirmPassword_error: "",

            successMsg: "",
            isLoading: false,
            disableBtn: false

        }
    }

    render() {
        return (
            <div className="container">
                {
                    this.signupBody()
                }
            </div>
        )
    }


    signupBody = () => {
        const {
            name, name_error,
            email, email_error,
            password, password_error,
            confirmPassword, confirmPassword_error, } = this.state;

        return (
            <div style={{ width: "50%", marginLeft: '25%' }}>
                <br />
                <br />
                <Card style={{ paddingLeft: '50px', paddingRight: '50px', paddingTop: '20px', paddingBottom: '20px' }}>
                    <h5>Sign Up</h5>
                    <br />
                    <MyTextField
                        reference={(ref) => this.name = ref}
                        label="Name"
                        placeholder="name"
                        required={true}
                        type="text"
                        value={name}
                        onChange={(e) => {
                            this.setState({
                                name: e.target.value
                            });
                        }}
                        helperText={name_error ? name_error : ""}
                        error={name_error ? true : false}
                    />
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

                    <MyTextField
                        reference={(ref) => this.confirmPassword = ref}
                        label="Confirm Password"
                        placeholder="confirm password"
                        required={true}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            this.setState({
                                confirmPassword: e.target.value
                            });
                        }}
                        helperText={confirmPassword_error ? confirmPassword_error : ""}
                        error={confirmPassword_error ? true : false}
                    />

                    <Button style={{  }}
                        variant="contained"
                        class="btn btn-primary"
                        onClick={() => {
                            this.signUpFunction()
                        }}
                        disabled={this.state.disableBtn}>
                        {
                            this.state.disableBtn ?
                                <span class="spinner-border spinner-border-sm"></span>
                                :
                                undefined
                        }
                        Sign Up
                        </Button>


                    <Link
                        to='/login'
                        style={{
                            textDecoration: "None",
                            marginLeft: '20px',
                            color: 'blue',
                        }}
                    >Login</Link>
                </Card>
                <br />
                <br />
                <br />
            </div>
        )
    }


    // schooling to the position
    scrollToView = (position) => {
        window.scroll({ top: position - 30, behavior: 'smooth' })
    }



    // Signup
    signUpFunction = () => {
        const {
            name, name_error,
            email, email_error,
            password, password_error,
            confirmPassword, confirmPassword_error, } = this.state;

        if (validator.isEmpty(name + "")) {
            this.setState({
                name_error: "Please enter your Name"
            })
            var position = this.name.offsetTop;
            this.scrollToView(position)
            return;
        } else {
            this.setState({
                name_error: ""
            })
        }

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

        if (validator.isEmpty(confirmPassword + "")) {
            this.setState({
                confirmPassword_error: "Please enter password"
            })
            var position = this.confirmPassword.offsetTop;
            this.scrollToView(position)
            return;
        } else {
            this.setState({
                confirmPassword_error: ""
            })
        }



        this.setState({
            disableBtn: true
        })

        new ApiManager().singUp(
            name,
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
            this.props.history.push('/login');
            this.setState({
                isLoading: false,
                disableBtn: false
            })
            console.log("result after adding>>>", result);
        })

    }
}
