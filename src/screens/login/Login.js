import React, { Component } from 'react';
import Header from '../../common/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import './Login.css';

const styles = theme => ({
    root: {
        width: 400,
       
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
        marginBotton: 24,
    },
    pos: {
        margin: 24,
    },
});
class Login extends Component {

    
        constructor(){
            super();
            this.state={
                accessToken: "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784",
                username:"",
                password:""
            }
        }
    loginHandler = () =>{
        const username = "username";
        const password ="password";
        if(this.state.username === username && this.state.password === password){
            window.sessionStorage.setItem("access-token",this.state.accessToken);
        }
        
    }

    usernameHandler = event  =>{
        this.setState({username:event.target.value})
    }

    passwordChangeHandler = event  =>{
        this.setState({password:event.target.value})
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '35vh' }}>
                        
                    <Card className={classes.root} variant="outlined">

                        <CardContent className={classes.pos}>
                            <form noValidate autoComplete="off">

                                <Typography color="textPrimary" className={classes.title}>LOGIN</Typography>
                            
                                <Typography><br />
                                    <FormControl fullWidth="true">
                                        <InputLabel htmlFor="username" required="true" margin="dense" > Username</InputLabel>
                                        <Input id="username" aria-describedby="my-helper-text" fullWidth="true" onChange={this.usernameHandler} />

                                    </FormControl>
                                </Typography><br/>
                                <Typography>
                                    <FormControl fullWidth="true">
                                        <InputLabel htmlFor="password" required="true">Password</InputLabel>
                                        <Input id="password" aria-describedby="my-helper-text"  onChange={this.passwordChangeHandler} />
                                    </FormControl>
                                </Typography><br />
                                <Typography>
                                    <Button variant="contained" color="primary" onClick={()=>this.loginHandler}>LOGIN</Button>
                                </Typography>


                            </form>
                        </CardContent>

                    </Card>
                    
                </Grid>

            </div>

        )
    }

}
export default withStyles(styles)(Login);