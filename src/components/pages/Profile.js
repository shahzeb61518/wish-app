import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import ApiManager from './../helper/ApiManager'

import MyTextField from './../helper/MyTextField'

import profileImg from './../../images/profile.png'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            name_error: "",
            phone: "",
            phone_error: "",
            email: "",
            email_error: "",
            dob: "",
            dob_error: "",
            education: "",
            education_error: "",
            job: "",
            job_error: "",
            address: "",
            address_error: "",
            joinDate: "",

            image: "",

            btnLabel: "Edit",
            userData: "",

            successMsg: "",
            isLoading: false,
            disableFields: true,
            userId: ""

        }

    }

    componentDidMount() {
        this.getUserById()
    }

    getUserById = () => {
        // console.log("this.props.user.user", this.props.user.user.userId)
        let id = this.props.user.user.userId
        this.setState({
            userId: this.props.user.user.userId
        })
        return (
            new ApiManager().userById(id).then(result => {
                if (result.no_result) {
                    return
                }
                if (result.error) {
                    return
                }
                if (result) {
                    if (result.data) {
                        this.setState({
                            userData: result.data
                        })
                        if (this.state.userData) {
                            this.setState({
                                name: this.state.userData.name,
                                phone: this.state.userData.phone,
                                email: this.state.userData.email,
                                dob: this.state.userData.dob,
                                education: this.state.userData.education,
                                job: this.state.userData.job,
                                address: this.state.userData.address,
                                joinDate: this.state.userData.joinDate,
                                image: this.state.userData.image
                            })
                        }
                        console.log("result.data", result.data)
                    }
                } else {
                    this.setState({
                        errorMsg: "Check your network..."
                    })
                }
            })
        )
    }


    render() {
        return (
            <div>
                {
                    this.profileBody()
                }
            </div>
        )
    }


    profileBody = () => {
        const {
            name,
            name_error,
            phone,
            phone_error,
            email,
            email_error,
            dob,
            dob_error,
            education,
            education_error,
            job,
            job_error,
            address,
            address_error,
            image

        } = this.state

        let img = this.state.userData.image
        return (
            <div
                style={{
                    padding: "50px",
                    marginBottom: "50px"
                }}>
                <Card
                    style={{
                        padding: '50px'
                    }}>

                    {
                        this.state.btnLabel === "Edit" ?

                            this.state.userData.image ?
                                <img

                                    src={img}
                                    alt="profile-img"
                                />
                                :
                                <img
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%'
                                    }}
                                    src={profileImg}
                                    alt="profile-img"
                                />
                            :
                            <div style={{ marginBottom: 10 }}>
                                <p className="title">Upload Profile Image:</p>
                                <input type="file"
                                    onChange={(event) => {
                                        this.setState({ image: event.target.files[0] });
                                    }} />
                            </div>
                    }

                    <br />
                    <br />

                    <div className="row">
                        <div className="col">
                            <MyTextField
                                reference={(ref) => this.name = ref}
                                label="Name"
                                placeholder="name"
                                required={true}
                                type="text"
                                disabled={this.state.disableFields}
                                value={name}
                                onChange={(e) => {
                                    this.setState({
                                        name: e.target.value
                                    });
                                }}
                                helperText={name_error ? name_error : ""}
                                error={name_error ? true : false}
                            />
                        </div>
                        <div className="col">
                            <MyTextField
                                reference={(ref) => this.phone = ref}
                                label="Phone"
                                placeholder="phone"
                                required={true}
                                type="text"
                                disabled={this.state.disableFields}
                                value={phone}
                                onChange={(e) => {
                                    this.setState({
                                        phone: e.target.value
                                    });
                                }}
                                helperText={phone_error ? phone_error : ""}
                                error={phone_error ? true : false}
                            />
                        </div>
                        <div className="col">
                            <MyTextField
                                reference={(ref) => this.email = ref}
                                label="Email"
                                placeholder="email"
                                required={true}
                                type="text"
                                disabled={true}
                                value={email}
                                onChange={(e) => {
                                    this.setState({
                                        email: e.target.value
                                    });
                                }}
                                helperText={email_error ? email_error : ""}
                                error={email_error ? true : false}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <MyTextField
                                reference={(ref) => this.dob = ref}
                                label="Date of birth"
                                placeholder="dob"
                                required={true}
                                disabled={this.state.disableFields}
                                type="text"
                                value={dob}
                                onChange={(e) => {
                                    this.setState({
                                        dob: e.target.value
                                    });
                                }}
                                helperText={dob_error ? dob_error : ""}
                                error={dob_error ? true : false}
                            />
                        </div>
                        <div className="col">
                            <MyTextField
                                reference={(ref) => this.education = ref}
                                label="Education"
                                placeholder="education"
                                required={true}
                                type="text"
                                disabled={this.state.disableFields}
                                value={education}
                                onChange={(e) => {
                                    this.setState({
                                        education: e.target.value
                                    });
                                }}
                                helperText={education_error ? education_error : ""}
                                error={education_error ? true : false}
                            />
                        </div>
                        <div className="col">
                            <MyTextField
                                reference={(ref) => this.job = ref}
                                label="Job"
                                placeholder="job"
                                required={true}
                                type="text"
                                disabled={this.state.disableFields}
                                value={job}
                                onChange={(e) => {
                                    this.setState({
                                        job: e.target.value
                                    });
                                }}
                                helperText={job_error ? job_error : ""}
                                error={job_error ? true : false}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <MyTextField
                                reference={(ref) => this.address = ref}
                                label="Address"
                                placeholder="address"
                                required={true}
                                type="text"
                                disabled={this.state.disableFields}
                                value={address}
                                onChange={(e) => {
                                    this.setState({
                                        address: e.target.value
                                    });
                                }}
                                helperText={address_error ? address_error : ""}
                                error={address_error ? true : false}
                            />
                        </div>
                        <div className="col"></div>

                        <div className="col">
                            <Button style={{ width: '150px', marginTop: '30px' }}
                                variant="contained"
                                class="btn btn-primary"
                                onClick={() => {
                                    this.editProfile()
                                }}>
                                {this.state.btnLabel}
                            </Button>

                        </div>
                    </div>
                </Card>
            </div>
        )
    }


    editProfile = () => {
        const { userId, name, phone, dob, education, job, address, image } = this.state

        this.setState({
            disableFields: false,
            btnLabel: "Update"
        })

        ////
        if (this.state.btnLabel === "Update") {
            new ApiManager().updateUser(
                userId,
                name,
                phone,
                dob,
                education,
                job,
                address,
                image
            ).then(result => {
                this.setState({
                    isLoading: true,
                })
                if (result.no_result) {
                    this.setState({
                        isLoading: false,
                        btnLabel: "Edit",
                        disableFields: true

                    })
                    return
                }
                if (result.data) {
                    if (result.data.error) {
                        alert(result.data.error)
                        this.setState({
                            isLoading: false,
                            btnLabel: "Edit",
                            disableFields: true
                        })
                        return
                    }
                }
                this.setState({
                    isLoading: false,
                    btnLabel: "Edit",
                    disableFields: true
                })
                console.log("result after adding>>>", result);
            })
        }

        ////
    }

}

const mapStateToProps = (state) => {

    const { user, chat } = state
    return {
        user,
        chat
    }
}

const actions = {

}

export default withRouter(connect(mapStateToProps, actions)(Profile))