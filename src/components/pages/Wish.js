import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import ReactPlayer from 'react-player'

import ApiManager from '../helper/ApiManager'


export default class Wish extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wishData: '',

        }
    }

    componentDidMount() {
        const { state } = this.props.location
        if (state) {
            const { wish } = state;
            this.setState({
                wishData: wish
            })
            console.log("my Wish Data", wish)
        }
    }

    render() {
        return (
            <div>
                {
                    this.wishForm()
                }
            </div>
        )
    }

    wishForm = () => {
        const { wishData } = this.state;
        return (
            <div className="container">
                <Card style={{ textAlign: 'left', padding: '30px', marginTop: '20px', marginBottom: '150px' }}>
                    <h4 style={{ marginLeft: '48%' }}>Post</h4>
                    <br />
                    Title:<div style={{ padding: '10px', background: '#eee', borderRadius: '5px' }}>
                        <h5>  {wishData.title}</h5>
                    </div>



                    <br />
                    Description:  <div style={{ padding: '10px', background: '#eee', borderRadius: '5px' }}>
                        <h6> {wishData.description}</h6>
                    </div>
                    <br />
                    <br />

                    {
                        wishData.videoLink ?
                            <div>
                                Video is Attached
                                <div className='player-wrapper'>
                                    <ReactPlayer
                                        className='react-player'
                                        url={wishData.videoLink}
                                        width='100%'
                                        height="450px"
                                        controls="true"
                                    />
                                </div>
                            </div>
                            :
                            undefined
                    }
                    <br />
                    <button
                        style={{ float: 'right' }}
                        className="btn btn-danger"
                        onClick={() => {
                            this.deletePost(wishData._id)
                        }}
                    >
                        Delete
                    </button>
                    <button
                        style={{ float: 'right' }}
                        className="btn btn-primary"
                        onClick={() => {
                            this.props.history.push('/wishes');
                        }}
                    >
                        Back
                    </button>
                </Card>
            </div>
        )
    }


    deleteWish = (id) => {
        this.setState({
            isLoading: true
        })
        new ApiManager().deleteWish(id).then(result => {
            if (result.no_result) {
                return
            }

            if (result.error) {
                alert(result.error)
                return
            }
            this.setState({
                isLoading: false
            })
            console.log("Wish is deleted!!!!! with id>>>", id)
            this.props.history.push('/wishes');
        })
    }

}


