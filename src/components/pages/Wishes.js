import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

import ApiManager from '../helper/ApiManager'
import Spinner from '../helper/Spinner'

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

class Wishes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wishList: [],
            errorMsg: '',
            isLoading: true,
            wishByIdData: "",
            msg: "",

        }
        // const classes = useStyles();
        this.gettingWishes()

    }


    render() {

        return (
            <div className="container" >

                <div style={{
                    marginTop: '50px',
                    marginBottom: '150px',
                    width: '70%',
                    marginLeft: '15%'
                }}>
                    <h5>Wishes</h5>
                    <Link
                        to='/addWish'
                        style={{
                            textDecoration: "None",
                            color: 'white',
                        }}
                    > <Button style={{ marginLeft: '30px', fontSize: '12px' }} color="inherit">Add Wish</Button>
                    </Link>

                    {this.state.isLoading ?
                        <Spinner />
                        :
                        undefined
                    }

                    {this.state.msg}

                    {this.state.wishList && this.state.wishList.map((item, i) => {

                        return (
                            <List
                                // className={this.classes.root}
                                key={i}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="A" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    // className={this.classes.inline}
                                                    color="textPrimary"
                                                >
                                                    Title: {item.title}
                                                </Typography>

                                                {
                                                    item.userName ?
                                                        <div>By: {item.userName}</div>
                                                        :
                                                        undefined
                                                }
                                                {
                                                    item.image ?
                                                        <div>Image is Attached</div>
                                                        :
                                                        undefined
                                                }
                                                <div
                                                    style={{ float: "right" }}
                                                    className="btn-group mr-2"
                                                    role="group"
                                                    aria-label="First group">

                                                    <button
                                                        className="btn btn-light"
                                                        onClick={() => {
                                                            this.props.history.push('/wish', {
                                                                wish: item
                                                            })
                                                        }} >
                                                        <i className="fa fa-eye"></i>
                                                    </button>

                                                    <button
                                                        className="btn btn-light"
                                                        onClick={() => {
                                                            this.props.history.push('/addWish', {
                                                                wish: item
                                                            })
                                                        }} >
                                                        <i className="fa fa-pencil"></i>
                                                    </button>

                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            this.deleteWish(item)
                                                        }}
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>


                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" /></List>
                        )
                    })
                    }

                </div>
            </div>
        );
    }



    gettingWishes = () => {
        return (
            new ApiManager().getWishList().then(result => {
                if (result.no_result) {
                    return
                }
                if (result.error) {
                    return
                }
                if (result) {
                    if (result.data) {
                        if (result.data.wishes) {
                            console.log("resultttttt>>", result.data.wishes)
                            this.setState({
                                isLoading: false,
                                wishList: result.data.wishes
                            })
                            if (this.state.wishList.length < 1) {
                                this.setState({
                                    msg: "No Wish Created yet..."
                                })
                            }
                        } else {
                            this.setState({
                                errorMsg: "Wish list is empty..."
                            })
                        }

                    } else {
                        this.setState({
                            errorMsg: "Wish list is empty..."
                        })
                    }
                } else {
                    this.setState({
                        errorMsg: "Check your network..."
                    })
                }
            })
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
            this.gettingWishes()
        })
    }



}



const mapStateToProps = (state) => {
    return state
}

const actions = {

}

export default connect(mapStateToProps, actions)(Wishes)