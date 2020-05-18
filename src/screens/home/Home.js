import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Header from '../../common/Header';
import Grid from '@material-ui/core/Grid';
import Like from '../../common/Like';
import ReactDOM from 'react-dom';
import './Home.css';
import history from '../history';


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
        this.handleChange = this.handleChange.bind(this);
    
        this.state = {
            access_token: sessionStorage.getItem("access-token"),
            profile: "",
            posts: [],
            actualPosts: [],
            outline: false,
            likeCount: 0,
            clicked: false,
            clickedId: "",
            comment: "",
            addEnable: false,
            commentId: "",
            myRef: React.createRef(),

        }
    }
    
    componentWillMount() {


        let imagedata = null;
        let xhrMedia = new XMLHttpRequest();
        let that = this;
        xhrMedia.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                that.setState({
                    posts: JSON.parse(this.responseText).data,
                    actualPosts: JSON.parse(this.responseText).data
                });
            }
        });

        xhrMedia.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=" + this.state.access_token);
        xhrMedia.setRequestHeader("Cache-Control", "no-cache");
        xhrMedia.send(imagedata);
    }

    handleChange = (event) => {
        let posts = []
        let searchBarText = event.target.value;
        this.state.posts.forEach(function (post) {
            if (post.caption.text.indexOf(searchBarText) !== -1) {               
                posts.push(post)
            }
           
        })
        this.setState({
            posts: posts
        })

        if (searchBarText === "") {
            this.setState({
                posts: this.state.actualPosts
            })
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="div">
                <div>
                    <Header home={true} handleChange={this.handleChange} />
                </div>
                <div className={classes.root} ref="Progress">
                    <Grid container spacing={10}>
                        {
                            this.state.posts && this.state.posts.length && this.state.posts.map((post, index) => {
                                const cts = new Date(),

                                    cdate = (new Date(cts)).toUTCString();
                                return (
                                    <Grid className={classes.grid} item xs={6} key={post.id}>
                                        <Card key={post.id}>
                                            <CardHeader avatar={
                                                <Avatar aria-label="recipe" className={classes.avatar} src={post.user.profile_picture} />
                                            }
                                                title={post.user.full_name} subheader={cdate}
                                            />
                                            <CardContent>
                                                <CardMedia className={classes.media} image={post.images.standard_resolution.url}
                                                />
                                                <hr />
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {post.caption.text}
                                                </Typography><br />
                                                <Typography color="primary">
                                                    {post.tags.map((tag, index) => (
                                                        <span key={index} >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </Typography>

                                            </CardContent>
                                            <CardContent >
                                                <Like post={post} />
                                            </CardContent>

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