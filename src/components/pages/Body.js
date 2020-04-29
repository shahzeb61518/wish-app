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
            image: "",
            image_error: "",

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
                <div >
                    <br />
                    <br />
                    <h5>Add Wish</h5>
                    <br />

                    <div>
                        <Card style={{ width: '80%', marginLeft: '10%', padding: "20px", marginTop: '10px', marginBottom: '40px' }}>
                            {
                                this.textTypeForm()
                            }
                            <br />
                            <br />
                        </Card>
                    </div>

                </div>
            </div>
        )
    }


    // this is form of Text Type Wish
    textTypeForm = () => {
        const { title, title_error, description, description_error, image, image_error } = this.state

        return (
            <div>
                <div style={{ width: "70%", marginLeft: '15%' }}>

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

                    <div style={{ marginBottom: 10 }}>
                        <p className="title">Image(optional):</p>
                        <input type="file"
                            onChange={(event) => {
                                this.setState({ image: event.target.files[0] });
                            }} />
                    </div>
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
                        Add MyWish
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
        const { title, title_error, description, description_error, image, image_error } = this.state

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

        console.log("image: " + image + "--" + "title:" + title + "--" + "description:" + description)

        new ApiManager().addWish(
            title,
            description,
            image
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
