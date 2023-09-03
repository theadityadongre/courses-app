import { Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Signin() {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 150}}>
            <Typography variant={"h6"}> Welcome back, Sign in below</Typography>
            </div>
            <div>
            </div><div style={{marginBottom: 10, display: "flex", justifyContent: "center" }}>
                {/* <Typography variant={"h6"}> Welcome to Courses app, Sign up below</Typography> */}
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Card variant="outlined" style={{ width: 400, padding: 30 }}>
                        <div>
                            <TextField fullWidth={true} id="outlined-basic" label="Username" variant="outlined" />
                            <br />
                            <br />
                            <TextField fullWidth={true} id="outlined-basic" label="Password" variant="outlined" />
                            <br />
                            <br />
                            <Button variant="contained">Sign in</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Signin;