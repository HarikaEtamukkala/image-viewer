import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Header from '../../common/Header';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import './Home.css';


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '100px',
        marginRight: '50px'

    },
    card: {
        width: 750,
    },
    media: {
        height: 10,
        paddingTop: '56.25%', // 16:9

    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    blue: {
        color: "blue",
    },
    paper: {
        padding: theme.spacing(10),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: 700
    },
    grid: {
        width: '10px',

    },
    actions: {
        width: '700px'
    }
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            access_token: sessionStorage.getItem("access-token"),
            profile: "",
            posts: [],
            outline: false,
            likeCount: 0,
            clicked: false,
            clickedId: "",
            comment: "",
            addEnable: false,
            commentId: "",
        }
    }

    likeClickHandler = (event, id) => {

        console.log(event)
        console.log(id)
        const clicked = this.state.clicked
        console.log("clicked", clicked)
        if (this.state.clickedId !== event) {
            this.setState({
                clicked: false
            })
        }
        if (clicked) {
            this.setState({
                likeCount: this.state.likeCount - 1, clicked: false, clickedId: ""
            })
        } else {
            this.setState({
                likeCount: this.state.likeCount + 1, clicked: true, clickedId: event
            })
        }

    }
    commentHandler = event => {
        console.log(event.target.value)
        console.log(event.target.id)
        this.setState({
            comment: event.target.value,
            commentId: event.target.id
        })
    }

    addHandler = (event) => {

        this.setState({
            addEnable: true
        })
    }

    componentWillMount() {


        let imagedata = null;
        let xhrMedia = new XMLHttpRequest();
        let that = this;
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

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <Header home={true} />
                </div>
                <div className={classes.root}>
                    <Grid container spacing={10}>
                        {
                            this.state.posts && this.state.posts.length && this.state.posts.map((post, index) => {
                                const cts = new Date(),

                                    cdate = (new Date(cts)).toUTCString();
                                return (
                                    <Grid className={classes.grid} item xs={6} key={post.id}>
                                        <Card className={classes.paper} key={post.id}>
                                            <CardHeader avatar={
                                                <Avatar aria-label="recipe" className={classes.avatar} src={post.user.profile_picture} />
                                            }
                                                title={post.user.full_name} subheader={cdate}

                                            />


                                            <CardContent>
                                                <CardMedia className={classes.media} image={post.images.standard_resolution.url} />
                                                <hr />
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {post.caption.text}
                                                </Typography><br />
                                                <Typography>
                                                    {post.tags.map((tag, index) => (
                                                        <span key={index} >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </Typography>

                                            </CardContent>
                                            <CardActions disableSpacing>

                                                <IconButton id={index} aria-label="add to favorites" onClick={this.likeClickHandler.bind(this, post.id)} >

                                                    {this.state.clickedId === post.id && this.state.clicked ?
                                                        <FavoriteOutlinedIcon id={post.id} color="secondary" /> : <FavoriteBorderIcon id={post.id} color="action" />
                                                    }
                                                </IconButton>
                                                {this.state.clickedId === post.id && this.state.clicked &&
                                                    <span>{post.likes.count + this.state.likeCount} </span>
                                                }
                                                {this.state.clickedId !== post.id &&
                                                    <span>{post.likes.count} </span>
                                                }


                                            </CardActions>
                                            <CardActions disableSpacing>
                                                <Typography color="initial" >
                                                    {this.state.commentId === post.id && this.state.addEnable &&
                                                        <span> <b>{post.user.full_name}</b>  :{this.state.comment}</span>}
                                                </Typography>
                                            </CardActions>
                                            <CardActions >


                                                <TextField id={post.id} label="Add a Comment" fullWidth={true} onChange={this.commentHandler} />



                                                <Typography>
                                                    <Button id={post.id} variant="contained" color="primary" onClick={() => this.addHandler()} >ADD</Button>
                                                </Typography>
                                            </CardActions>
                                        </Card>


                                    </Grid>
                                )
                            })
                        }

                    </Grid>
                </div>

            </div>

        )


    }

}
export default withStyles(styles)(Home);