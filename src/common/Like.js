import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',

    },
})
class Like extends Component {
    constructor() {
        super();
        this.state = {
            likeCount: 0,
            clicked: false,
            clickedId: "",
            comment: "",
            addEnable: false,
            commentId: "",
            prevComment: []
        }
    }


    likeClickHandler = (event, id) => {

        const clicked = this.state.clicked

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

        this.setState({
            comment: event.target.value,
            commentId: event.target.id
        })
    }

    addHandler = (event) => {

        this.setState({
            addEnable: true,
            prevComment: this.state.prevComment.concat(this.state.comment),
            comment: ""
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.props.profile &&
                    <Box display="flex" m={1}>
                        <Typography color="initial" >
                            {this.state.commentId === this.props.post.id && this.state.addEnable && this.state.prevComment.map((comm, index) => (
                                <span key={index}> <b>{this.props.post.user.full_name}</b>  :{comm} <br /></span>
                            ))}
                        </Typography>
                    </Box>
                }
                <br />  <br />  <br />  <br />
                <Box display="flex">
                    <Box>
                        <IconButton aria-label="add to favorites" onClick={this.likeClickHandler.bind(this, this.props.post.id)} >
                            {this.state.clickedId === this.props.post.id && this.state.clicked ?
                                <FavoriteOutlinedIcon id={this.props.post.id} color="secondary" /> : <FavoriteBorderIcon id={this.props.post.id} color="action" />
                            }
                        </IconButton>
                    </Box>
                    <Box m={1}>
                        {this.state.clickedId === this.props.post.id && this.state.clicked &&
                            <span>{this.props.post.likes.count + this.state.likeCount} likes </span>
                        }
                        {this.state.clickedId !== this.props.post.id &&
                            <span>{this.props.post.likes.count} likes</span>
                        }
                    </Box>
                </Box>
                {this.props.home &&
                    <Box display="flex" m={1}>
                        <Typography color="initial" >
                            {this.state.commentId === this.props.post.id && this.state.addEnable && this.state.prevComment.map((comm, index) => (
                                <span key={index}> <b>{this.props.post.user.full_name}</b>  :{comm} <br /></span>
                            ))}
                        </Typography>
                    </Box>
                }
                <Box display="flex" m={1} bgcolor="background.paper">
                    <TextField id={this.props.post.id} label="Add a Comment" fullWidth={true} onChange={this.commentHandler} />
                    <Button id={this.props.post.id} variant="contained" color="primary" onClick={() => this.addHandler()} >ADD</Button>
                </Box>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Like);