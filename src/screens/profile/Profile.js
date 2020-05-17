import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Header from '../../common/Header';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import { Avatar, Typography, Button } from '@material-ui/core';
import Like from '../../common/Like';


const styles = theme => ({
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 700,
        height: 450,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',

        padding: theme.spacing(2, 4, 3),
    },
})
class Profile extends Component {

    constructor() {
        super();
        this.state = {
            access_token: sessionStorage.getItem("access-token"),
            profile: [],
            posts: [],
            open: false,
            selectedId: "",
            setOpen: false,
            url: "",
            currentPost: ""
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

        let imagedata = null;
        let xhrMedia = new XMLHttpRequest();

        xhrMedia.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                that.setState({
                    posts: JSON.parse(this.responseText).data
                });
            }
        });

        xhrMedia.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=" + this.state.access_token);
        xhrMedia.setRequestHeader("Cache-Control", "no-cache");
        xhrMedia.send(imagedata);
    }
    handleOpen = (post, val) => {
        console.log("click" + post.caption.text)

        this.setState({
            currentPost: post,
            setOpen: true,
            open: true,
            url: val,
            post: ""
        })
    };

    handleClose = () => {
        this.setState({
            setOpen: false,
            open: false
        })
    };

    render() {

        const { classes } = this.props;
        const handleOpen = (event) => {

            this.setState({
                setOpen: true,
                open: true
            })
        };

        const handleClose = () => {
            this.setState({
                setOpen: false
            })
        };

        const body = (
            <div className={classes.paper}>
                <Box>
                    <Box>

                    </Box>
                    <Box>

                    </Box>
                </Box>
                <h2 id="simple-modal-title">Text in a modal</h2>
                <p id="simple-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>

            </div>
        );

        return (
            <React.Fragment>
                <Header profilePicture={true} />
                {this.state.profile &&
                    <React.Fragment>
                        <div style={{ width: '100%', marginLeft: 120, marginRight: 120 }}>
                            <Box
                                display="flex"
                                alignItems="flex-start"
                                p={1}
                                m={1}
                                bgcolor="background.paper"
                                css={{ height: 100 }}
                            >
                                <Box p={1} >
                                    <Avatar className={classes.large} src={this.state.profile.profile_picture}></Avatar>
                                </Box>
                                <Box p={1} alignSelf="flex-end">

                                </Box>
                                <Box p={1} >
                                    <Typography variant="h6">
                                        {this.state.profile.username}
                                    </Typography>
                                    {this.state.profile.counts &&
                                        <Box display="flex" flexDirection="row" >
                                            <Box p={0.4}>
                                                <Typography>Posts: {this.state.profile.counts.media}</Typography>
                                            </Box>

                                            <Box p={0.4}>

                                                <Typography>Follows: {this.state.profile.counts.follows}</Typography>
                                            </Box>
                                            <Box p={0.4}>
                                                <Typography>Followed By: {this.state.profile.counts.followed_by}</Typography>
                                            </Box>
                                            <Box >

                                            </Box>
                                        </Box>
                                    }
                                </Box>
                            </Box>
                            <GridList cellHeight={200} className={classes.gridList} cols={3}>
                                {this.state.posts.map((post) =>

                                    (
                                        <GridListTile key={post.id} >
                                            <img src={post.images.standard_resolution.url} onClick={() => this.handleOpen(post, post.images.standard_resolution)} />
                                            <Modal className={classes.modal}
                                                open={this.state.open}
                                                onClose={this.handleClose}
                                                aria-labelledby="simple-modal-title"
                                                aria-describedby="simple-modal-description"
                                            >

                                                <Box
                                                    display="flex"
                                                    alignItems="flex-start"
                                                    p={1}
                                                    m={1}
                                                    bgcolor="background.paper"
                                                    css={{ height: '100', width: '80' }}>
                                                    <Box p={1} >
                                                        <img src={this.state.url.url} height={this.state.url.height} width={this.state.url.width} />
                                                    </Box>
                                                    <Box p={1} >
                                                        <Box display="flex"
                                                            alignItems="flex-start"
                                                            p={1}
                                                            m={1}
                                                            bgcolor="background.paper">
                                                            <Box p={1}><Avatar src={this.state.profile.profile_picture}></Avatar></Box>
                                                            <Box p={1}>
                                                                <Typography>
                                                                    {this.state.profile.username}
                                                                </Typography>

                                                            </Box>

                                                        </Box>
                                                        <Divider variant="middle" />
                                                        {this.state.currentPost.caption && this.state.currentPost.caption.text &&
                                                            <Typography>
                                                                {this.state.currentPost.caption.text}
                                                            </Typography>}
                                                        {this.state.currentPost.tags &&
                                                            <Typography color="primary">
                                                                {this.state.currentPost.tags.map((tag, index) => (
                                                                    <span key={index} >
                                                                        #{tag}
                                                                    </span>
                                                                ))}
                                                            </Typography>}

                                                        <Typography>
                                                            <Like post={post} />
                                                        </Typography>
                                                    </Box>

                                                </Box>

                                            </Modal>
                                        </GridListTile>

                                    ))}

                            </GridList>

                        </div>

                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(Profile)