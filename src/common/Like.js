import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
class Like extends Component {


    constructor() {
        super();
        this.state = {
            access_token: sessionStorage.getItem("access-token"),
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
            addEnable: true,
            prevComment: this.state.prevComment.concat(this.state.comment),
            comment: ""
        })
    }

    render() {
        return (

            <React.Fragment>
                <Box p={2} m={2}>
                    <Typography color="initial" >
                        {this.state.commentId === this.props.post.id && this.state.addEnable && this.state.prevComment.map((comm, index) => (
                            <span key={index}> <b>{this.props.post.user.full_name}</b>  :{comm} <br /></span>
                        ))}

                    </Typography>
                </Box>
                <Box style={{ marginRight: 600 }}>
                    <IconButton aria-label="add to favorites" onClick={this.likeClickHandler.bind(this, this.props.post.id)} >

                        {this.state.clickedId === this.props.post.id && this.state.clicked ?
                            <FavoriteOutlinedIcon id={this.props.post.id} color="secondary" /> : <FavoriteBorderIcon id={this.props.post.id} color="action" />
                        }
                    </IconButton>
                    {this.state.clickedId === this.props.post.id && this.state.clicked &&
                        <span>{this.props.post.likes.count + this.state.likeCount} likes </span>
                    }
                    {this.state.clickedId !== this.props.post.id &&
                        <span>{this.props.post.likes.count} likes</span>
                    }
                </Box>
                
                <div style={{ width: '100%' }}>
                    <Box display="flex" p={1} bgcolor="background.paper">
                    <TextField id={this.props.post.id} label="Add a Comment" fullWidth={true} onChange={this.commentHandler} />
                    <Button id={this.props.post.id} variant="contained" color="primary" onClick={() => this.addHandler()} >ADD</Button>
                    </Box>
                  
                </div>
            </React.Fragment>
        )
    }
}

export default Like;