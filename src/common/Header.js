import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import history from '../screens/history';
import { Link } from 'react-router-dom';
import './Header.css';



const styles = theme => ({

    root: {
        flexGrow: 1,
        backgroundColor: '#263238',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: '4px',
        backgroundColor: '#c0c0c0',

        marginLeft: 100,
        width: '300px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(10),
            width: 'auto',
        },
    },
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
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    profile: {
        marginLeft: theme.spacing(25),
        width: 'auto'
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

    handleMenu = (event) => {
        this.setState = {
            setAnchorEl: event.currentTarget
        }

    }

    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                that.setState({
                    profile: JSON.parse(this.responseText).data
                });
            }
        });

        xhr.open("GET", "https://api.instagram.com/v1/users/self/?access_token=" + this.state.access_token);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    };

    handleClose = () => {
        this.setState({ anchorEl: null })
    };

    profileClickHandler = () => {
        history.push("/profile");
    }

    homePageHandler = () => {
        history.push("/home");
    }

    logoutHandler =() =>{
        window.sessionStorage.setItem("access-token", null);
        history.push("/")
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
                                            aria-haspopup="true"
                                            color="inherit"
                                            onClick={this.handleMenu}
                                        >
                                            <Avatar className={classes.large}>
                                                <img src={this.state.profile.profile_picture} className="movie-poster" alt={this.state.profile.full_name}  />

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
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </div>
                                  
                                <div className={classes.profile}>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <Avatar className={classes.large}>
                                            <img src={this.state.profile.profile_picture} className="movie-poster" alt={this.state.profile.full_name} onClick={this.handleMenu} />

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
                                        <MenuItem onClick={this.profileClickHandler}>My Account</MenuItem>
                                        <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
                                    </Menu>
                                </div>
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