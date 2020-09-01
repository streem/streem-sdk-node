import React, { FormEvent, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    main: {
        position: 'relative'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    iframe: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    instructions: {
        padding: theme.spacing(3, 0, 1, 0),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        wordBreak: 'break-all'
    }
}));

export default function App() {
    const classes = useStyles();

    const [userId, setUserId] = useState("joe");
    const [name, setName] = useState("Joe S.");
    const [email, setEmail] = useState("joe@example.com");
    const [avatarUrl, setAvatarUrl] = useState("https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/99/UP0102-CUSA03962_00-AV00000000000012/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=720&h=720");
    const [companyCode, setCompanyCode] = useState("your-company");
    const [apiEnvironment, setApiEnvironment] = useState("sandbox");
    const [requesting, setRequesting] = useState(true);

    let defaultIframeSource = `https://${companyCode}.swa.${apiEnvironment}.streem.cloud/logout-success`;
    const [iframeSource, setIframeSource] = useState(defaultIframeSource);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setRequesting(true);
        const response = await fetch('http://localhost:3000/token', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, name, email, avatarUrl, apiEnvironment })
        });
        const json = await response.json();
        setIframeSource(`https://${companyCode}.swa.${apiEnvironment}.streem.cloud#token=${json.token}`);
        setRequesting(false);
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Embedded SSO
                    </Typography>
                    <Typography paragraph className={classes.instructions}>
                        Enter the user details below. Normally you would take these values
                        from your database after the user has logged in, but this app let's you
                        experiment by specifying manually.
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="userId"
                            label="User ID"
                            name="userId"
                            autoFocus
                            helperText="This is the persistent identifier for the user, and determines uniqueness"
                            value={userId}
                            onChange={e => setUserId(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            helperText="The display name of the user"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Email"
                            name="email"
                            helperText="The email address of the user"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="avatarUrl"
                            label="Avatar URL"
                            name="avatarUrl"
                            type="url"
                            helperText="The full URL to the avatar for this user"
                            value={avatarUrl}
                            onChange={e => setAvatarUrl(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="companyCode"
                            label="Company Code"
                            name="companyCode"
                            helperText="Your company code in Streem, which is the first part of the URL."
                            value={companyCode}
                            onChange={e => setCompanyCode(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="apiEnvironment"
                            label="API Environment"
                            name="apiEnvironment"
                            helperText="Optionally change this to a different API environment (such as prod-us)"
                            value={apiEnvironment}
                            onChange={e => setApiEnvironment(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Generate Token and Load Streem
                        </Button>
                        {iframeSource !== defaultIframeSource && !requesting && (
                            <Fade in timeout={1000}>
                                <Alert severity="success" className={classes.alert}>
                                    <AlertTitle>iFrame URL</AlertTitle>
                                    {iframeSource}
                                </Alert>
                            </Fade>
                        )}
                    </form>
                </div>
            </Grid>
            <Grid item xs={false} sm={4} md={7} className={classes.main}>
                {iframeSource && <iframe src={iframeSource} frameBorder="0" scrolling="yes" seamless title="embedded-sso-frame"
                                         style={{ display: 'block', width: '100%', height: '100vh' }}/>}
            </Grid>
        </Grid>
    );
}
