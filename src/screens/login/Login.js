import React, { Component } from 'react';
import Header from '../../common/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Login.css';

const styles = theme => ({
    root: {
        width: 380,
        verticalAlign:'middle',
        marginLeft:800,
        marginTop:20,
       },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
    },
    pos: {
        margin: 24,
    },
});
class Login extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <Card className={classes.root} variant="outlined">
                    <CardContent className={classes.pos}>
                        <form noValidate autoComplete="off">

                            <Typography color="textPrimary" className={classes.title}>LOGIN</Typography>
                            <Typography>
                                <TextField id="standard-basic" label="Username"  size="medium" fullWidth="true" required="true"/>
                            </Typography>
                            <Typography>
                                <TextField id="standard-basic" label="Password" fullWidth="true" required="true"/>
                            </Typography><br/>
                            <Typography>
                                <Button variant="contained" color="primary">Login</Button>
                            </Typography>


                        </form>
                    </CardContent>

                </Card>



            </div>

        )
    }

}
export default withStyles(styles)(Login);