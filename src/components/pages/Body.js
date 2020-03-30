import React, { Component } from 'react'
import Card from '@material-ui/core/Card';

import validator from 'validator';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import MyTextField from './../helper/MyTextField'
import MySelection from './../helper/MySelection'
import ApiManager from './../helper/ApiManager'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            title_error: "",
            description: "",
            description_error: "",
            videoLink: "",
            videoLink_error: "",

            wishType: "text",

            successMsg: "",
            isLoading: false,
            disableBtn: false

        }
    }

    render() {
        return (
            <div>
                <div className="container" style={{ minHeight: '500px' }}>
                    {
                        this.wishBody()
                    }
                </div>
            </div>
        )
    }


    // adding post form
    wishBody = () => {
        const { wishType } = this.state
        return (
            <div>
                <Card style={{ padding: "30px", minHeight: '600px', marginTop: '20px', marginBottom: '120px' }}>
                    <h5>Add Wish</h5>
                    <br />

                    <div
                        style={{
                            width: '100%',
                            textAlign: 'start',
                            marginLeft: '100px'
                        }}>
                        <MySelection
                            value={wishType}
                            onChange={(e) => {
                                this.setState({
                                    wishType: e.target.value
                                })
                            }}>
                            <MenuItem value="text">Text</MenuItem>
                            <MenuItem value="video">Video</MenuItem>
                        </MySelection>
                    </div>
                    <div>
                        <Card style={{ width: '80%', marginLeft: '10%', padding: "20px", marginTop: '10px',marginBottom: '40px'  }}>
                            {
                                this.textTypeForm()
                            }
                        </Card>
                    </div>

                </Card>
            </div>
        )
    }


    // this is form of Text Type Wish
    textTypeForm = () => {
        const { title, title_error, description, description_error, videoLink, videoLink_error } = this.state

        return (
            <div>
                {
                    this.state.wishType === "text" ?
                        <div style={{ width: '100%', padding: '20px' }}>
                            <div
                                style={{
                                    textAlign: 'center',
                                    background: '#eee',
                                    width: '7%',
                                    padding: '4px',
                                    marginLeft: '45%',
                                    borderRadius: '5px',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                }}>
                                <i className="fa fa-pencil" aria-hidden="true"></i> Text
                        </div>
                        </div>
                        :
                        <div style={{ width: '100%', padding: '20px' }}>
                            <div
                                style={{
                                    textAlign: 'center',
                                    background: '#eee',
                                    width: '8%',
                                    marginLeft: '45%',
                                    padding: '4px',
                                    borderRadius: '5px',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                }}>
                                <i className="fa fa-play-circle" aria-hidden="true"></i> Video
                            </div>

                        </div>
                }

                <div style={{ width: "70%", marginLeft: '15%' }}>
                    {
                        this.state.wishType === "video" ?
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">Paste video URL here</span>
                                </div>
                                <input
                                    required="true"
                                    value={videoLink}
                                    onChange={(e) => {
                                        this.setState({
                                            videoLink: e.target.value
                                        });
                                    }}
                                    type="url"
                                    className="form-control"
                                    id="basic-url"
                                    aria-describedby="basic-addon3" />
                                <br />
                                <p style={{ color: 'red' }}>{this.state.videoLink_error}</p>
                            </div>
                            :
                            undefined
                    }

                    <MyTextField
                        reference={(ref) => this.title = ref}
                        label="Title"
                        placeholder="I wish..."
                        required={true}
                        type="text"
                        value={title}
                        onChange={(e) => {
                            this.setState({
                                title: e.target.value
                            });
                        }}
                        helperText={title_error ? title_error : ""}
                        error={title_error ? true : false}
                    />

                    <MyTextField
                        reference={(ref) => this.description = ref}
                        label="Description"
                        placeholder="Describe your wish"
                        required={true}
                        type="text"
                        value={description}
                        onChange={(e) => {
                            this.setState({
                                description: e.target.value
                            });
                        }}
                        helperText={description_error ? description_error : ""}
                        error={description_error ? true : false}
                    />
                    <br />
                    <Button style={{ width: '200px' }}
                        variant="contained"
                        class="btn btn-primary"
                        onClick={() => {
                            this.addWish()
                        }}
                        disabled={this.state.disableBtn}>
                        {
                            this.state.disableBtn ?
                                <span class="spinner-border spinner-border-sm"></span>
                                :
                                undefined
                        }
                        Add Wish
                        </Button>
                </div>
            </div>
        )
    }

    // schooling to the position
    scrollToView = (position) => {
        window.scroll({ top: position - 30, behavior: 'smooth' })
    }



    // adding wish function
    addWish = () => {
        const { title, title_error, description, description_error, videoLink, videoLink_error } = this.state

        if (this.state.wishType === "video") {
            if (validator.isEmpty(videoLink + "")) {
                this.setState({
                    videoLink_error: "Please paste or enter Video Link"
                })
                return;
            } else {
                this.setState({
                    videoLink_error: ""
                })
            }
        } else {
            this.setState({
                videoLink_error: ""
            })
        }

        if (validator.isEmpty(title + "")) {
            this.setState({
                title_error: "Please enter Title"
            })
            var position = this.title.offsetTop;
            this.scrollToView(position)
            return;
        } else {
            this.setState({
                title_error: ""
            })
        }


        if (validator.isEmpty(description + "")) {
            this.setState({
                description_error: "Please enter Description"
            })
            var position = this.description.offsetTop;
            this.scrollToView(position)
            return;
        } else {
            this.setState({
                description_error: ""
            })
        }



        this.setState({
            disableBtn: true
        })

        console.log("videoLik: " + videoLink + "--" + "title:" + title + "--" + "description:" + description)

        new ApiManager().addWish(
            title,
            description,
            videoLink
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
