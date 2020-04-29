import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Menu from '../../helper/Menu'
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import { LocalStorage } from "../../helper/LocalStorage";

import { userLogout } from '../../../redux-store/actions/ActionUserData'


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    render() {
        // console.log("this.props.user.user.name", this.props.user.user.name)

        return (
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            MY-WISH
              </Typography>
                        <Link
                            to='/wishes'
                            style={{
                                textDecoration: "None",
                                color: 'white',
                            }}
                        >
                            <Button style={{ marginLeft: '30px', fontSize: '12px' }} color="inherit">Wishes</Button>
                        </Link>

                        <Link
                            to='/add-wish'
                            style={{
                                textDecoration: "None",
                                color: 'white',
                            }}
                        >
                            <Button style={{ marginLeft: '15px', fontSize: '12px' }} color="inherit">Add MyWish</Button>
                        </Link>

                        <div style={{
                            marginLeft: '65%'
                        }}>

                            <AppHeaderDropdown direction="down">
                                <h5>{this.props.user.user.name}</h5>
                                <DropdownToggle nav>
                                    <img
                                        src="avatar.png"
                                        className="img-avatar" alt="avatar" />
                                </DropdownToggle>
                                <DropdownMenu right style={{ right: 'auto' }}>

                                    <DropdownItem
                                        onClick={e => this.props.history.push('/profile')}
                                    ><i className="fa fa-user"></i>  Profile</DropdownItem>

                                    <DropdownItem divider />

                                    <DropdownItem
                                        onClick={e => this.props.userLogout(e)}
                                    ><i className="fa fa-lock"></i> Logout</DropdownItem>
                                </DropdownMenu>
                            </AppHeaderDropdown>
                        </div>


                    </Toolbar>
                </AppBar>
            </div >
        );
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
    userLogout
}

export default withRouter(connect(mapStateToProps, actions)(Header))