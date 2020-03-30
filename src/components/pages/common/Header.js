import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },

}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        MY-WISH
          </Typography>
                    <Link
                        to='/wishes'
                        style={{
                            textDecoration: "None",
                            color: 'white',
                        }}
                    >
                        <Button style={{ marginLeft: '30px', fontSize: '12px' }} color="inherit">Home</Button>
                    </Link>

                    <Link
                        to='/addWish'
                        style={{
                            textDecoration: "None",
                            color: 'white',
                        }}
                    >
                        <Button style={{ marginLeft: '15px', fontSize: '12px' }} color="inherit">Add Wish</Button>
                    </Link>

                </Toolbar>
            </AppBar>
        </div>
    );
}
