import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Header from '../../common/Header';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import FormControl from '@material-ui/core/FormControl';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import { Avatar, Typography } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: '100% !important',
    height: '100% !important'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
   
    padding: theme.spacing(2, 4, 3),
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  backDrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
})
class Profile extends Component {

  constructor() {
    super();
    this.state = {
      access_token: sessionStorage.getItem("access-token"),
      profile: [],
      posts: [],
      imageDetailsModal: false,
      editOpen: false,
      selectedId: "",
      url: "",
      currentPost: "",
      fullname:""
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
    this.setState({
      currentPost: post,
      imageDetailsModal: true,
      url: val,
      post: ""
    })
  };

  handleClose = () => {
    this.setState({
      imageDetailsModal: false
    })
  };

  handleEditOpen = () => {
    this.setState({
     
      editOpen: true,   
      
    })
  };

  handleEditClose = () => {
    this.setState({
      editOpen: false,
    })
  };

  changeFullNameHandler = event => {
      this.setState({ fullname: event.target.value })
}

  updateNameHandler () {
    const profile = this.state.profile;
    profile.full_name = this.state.fullname;
    this.setState({
      profile: profile,
      fullname: null,
      editOpen: false,
    });
  }

  render() {
    const { classes } = this.props;
    const { currentPost } = this.state;

    return (
      <React.Fragment>
        <Header profilePicture={true} profile={this.state.profile} />
        {this.state.profile &&
          <React.Fragment>
            <Container maxWidth="lg">
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
                <Box p={1} >

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
                  <Box display="flex" flexDirection="row" >
                    <Box p={0.4}>
                      <span>{this.state.profile.full_name}</span>
                    </Box>
                    <Box p={0.4}>
                      <Avatar className={classes.pink} title={this.state.profile.full_name}  >
                        <EditRoundedIcon onClick={()=>this.handleEditOpen()}/>
                      </Avatar>
                      <Modal className={classes.modal}
                        open={this.state.editOpen}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        onClose={this.handleEditClose}
                      >
                        <div className={classes.paper}>
                          <h2 id="simple-modal-title">Edit</h2>
                       
                          <FormControl fullWidth={true} >
                          <TextField id="standard-basic" label="Full Name" required onChange={this.changeFullNameHandler}/> <br/>
                            <Button variant="contained" color="primary" onClick={this.updateNameHandler.bind(this)}>UPDATE</Button>                                
                           </FormControl>
                        </div>
                      </Modal>
                    </Box>
                  </Box>
                </Box>

              </Box>


              <GridList cellHeight={200} className={classes.gridList} cols={3}>
                {
                  this.state.posts.map((post) => (
                    <GridListTile key={post.id} >
                      <img src={post.images.standard_resolution.url} alt="" onClick={() => this.handleOpen(post, post.images.standard_resolution)} />
                    </GridListTile>
                  )
                  )}

                <Modal className={classes.modal}
                  open={this.state.imageDetailsModal}
                  onClose={this.handleClose}
                  aria-labelledby="image-details-title"
                  aria-describedby="image-details-description"
                  BackdropProps={{
                    className: classes.backDrop
                  }}
                >
                  <Box display="flex" alignItems="flex-start" bgcolor="background.paper">
                    <Box p={1} ><img src={this.state.url.url} alt="imae" height="300" width="300" /></Box>
                    <Box p={1} >
                      <Box display="flex" alignItems="flex-start" p={1} m={1} bgcolor="background.paper">
                        <Box p={1}><Avatar src={this.state.profile.profile_picture}></Avatar></Box>
                        <Box p={1}>
                          <Typography>{this.state.profile.username}</Typography>
                        </Box>
                      </Box>
                      <Divider variant="middle" />
                      {
                        currentPost.caption && currentPost.caption.text &&
                        <Typography>{currentPost.caption.text.substring(0,currentPost.caption.text.indexOf('#'))}</Typography>
                      }
                      {currentPost.tags &&
                        <Typography color="primary">
                          {currentPost.tags.map((tag, index) => (
                            <span key={index} >
                              #{tag}
                            </span>
                          ))}
                        </Typography>}
                        <Box><Like post={currentPost} /></Box>
                      
                    </Box>
                  </Box>
                </Modal>

              </GridList>

            </Container>

          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(Profile)