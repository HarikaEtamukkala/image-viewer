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
import Container from '@material-ui/core/Container';
import './Home.css';



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 10,
        paddingTop: '56.25%', // 16:9

    },
    avatar: {
        backgroundColor: red[500],
    },
});

class Home extends Component {

    constructor() {
        super();
        this.searchHandler = this.searchHandler.bind(this);

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
        }
    }

    componentWillMount() {
        //calling instagram  api for posts
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
        //calling instagram  api for profile data
        let data = null;
        let xhr = new XMLHttpRequest();

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

    //Seacrh functionality passing search handler to Header Component
    searchHandler = (event) => {
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
                    <Header home={true} searchHandler={this.searchHandler} profile={this.state.profile} />
                </div>
                <Container maxWidth="lg" style={{ paddingTop: 20 }}>
                    <div className={classes.root} ref="Progress">
                        <Grid container direction={'row'} spacing={3}>
                            {
                                this.state.posts && this.state.posts.length && this.state.posts.map((post, index) => {
                                    const cts = new Date(),
                                        cdate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(cts);
                                    return (
                                        <Grid item md={6} xs={6} key={post.id}>
                                            <Card key={post.id} >
                                                <CardHeader avatar={
                                                    <Avatar aria-label="recipe" className={classes.avatar} src={post.user.profile_picture} />
                                                }
                                                    title={post.user.username} subheader={cdate}
                                                />
                                                <CardContent>
                                                    <CardMedia className={classes.media} image={post.images.standard_resolution.url} height="300" width="300"
                                                    />
                                                    <hr />
                                                    <Typography variant="body2" color="textSecondary" component="p">{post.caption.text}</Typography><br />
                                                    <Typography color="primary">
                                                        {post.tags.map((tag, index) => (
                                                            <span key={index} >
                                                                #{tag} &nbsp;
                                                            </span>
                                                        ))}
                                                    </Typography>
                                                </CardContent>
                                                <Like post={post} home={true} />
                                               
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }

                        </Grid>
                    </div>
                </Container>
            </div>

        )


    }

}
export default withStyles(styles)(Home);