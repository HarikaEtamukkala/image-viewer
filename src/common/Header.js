import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import history from '../screens/history';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import './Header.css';


const styles = theme => ({

    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    //for search box
    search: {
        position: 'relative',
        borderRadius: '4px',
        backgroundColor: '#c0c0c0',
        width: '300px',
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(2),
            width: 'auto',
        },
    },
    //used for displaying search Icon in Search box
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },

});


class Header extends Component {

    constructor() {
        super();
        this.state = {
            access_token: sessionStorage.getItem("access-token"),
            profile: "",
            setAnchorEl: null,
            anchorEl: null

        }
    }
    //used for opening menu on top right corner
    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    };
    //used for closing the menu
    handleClose = () => {
        this.setState({ anchorEl: null })
    };
    //navigating to profile page
    profileClickHandler = () => {
        history.push("/profile");
    }
    //navigating to home page
    homePageHandler = () => {
        history.push("/home");
    }
    //logout of application
    logoutHandler = () => {
        window.sessionStorage.clear();
        window.location.reload();
        history.push("/");
    }
    render() {
        const { classes } = this.props;
        const open = Boolean(this.state.anchorEl);

        return (
            <div>
                <div >
                    <AppBar position="static" style={{ background: '#263238' }} >
                        <Toolbar>
                            <Typography className={classes.title} variant="h6" noWrap onClick={this.homePageHandler} >
                                Image Viewer
                             </Typography>
                            {this.props.profilePicture &&
                                <div>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="false"
                                        color="inherit"
                                        onClick={this.handleMenu}
                                    >
                                        <Avatar src={this.props.profile.profile_picture} alt={this.props.profile.full_name}>

                                        </Avatar>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={this.state.anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={this.handleClose}
                                    >

                                        <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
                                    </Menu>
                                </div>}
                            {this.props.home &&
                                <div className={classes.parent}>
                                    <Box display="flex">
                                        <Box>
                                            <div className={classes.search}>
                                                <div className={classes.searchIcon}>
                                                    <SearchIcon />
                                                </div>
                                                <InputBase
                                                    placeholder="Search…"
                                                    classes={{
                                                        root: classes.inputRoot,
                                                        input: classes.inputInput,
                                                    }}
                                                    onChange={this.props.searchHandler}
                                                    inputProps={{ 'aria-label': 'search' }}

                                                />
                                            </div>
                                        </Box>
                                        <Box>
                                            <div>
                                                <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={this.handleMenu} color="inherit">
                                                    {this.props.profile && this.props.profile.profile_picture &&
                                                        <Avatar src={this.props.profile.profile_picture} alt={this.props.profile.full_name} />
                                                    }
                                                </IconButton>
                                        <Menu id="menu-appbar" 
                                                    anchorEl={this.state.anchorEl}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    open={open}
                                                    onClose={this.handleClose}
                                                >
                                                <MenuItem onClick={this.profileClickHandler}>My Account</MenuItem>
                                                    <Divider/>
                                                <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
                                        </Menu>
                                            </div>
                                        </Box>
                                    </Box>



                                </div>
                            }
                        </Toolbar>
                    </AppBar>
                </div>
            </div >
        )


    }

}
export default withStyles(styles)(Header);