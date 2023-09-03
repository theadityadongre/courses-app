import { Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

function Signup() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 150 }}>
                <Typography variant={"h6"}> Welcome to Courses app, Sign up below</Typography>
            </div>
            <div>
            </div><div style={{ marginBottom: 10, display: "flex", justifyContent: "center" }}>
                {/* <Typography variant={"h6"}> Welcome to Courses app, Sign up below</Typography> */}
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Card variant="outlined" style={{ width: 400, padding: 30 }}>
                        <div>
                            <TextField onChange={(e) => { setUsername(e.target.value) }} fullWidth={true} label="Username" variant="outlined" />
                            <br />
                            <br />
                            <TextField onChange={(e) => { setPassword(e.target.value) }} fullWidth={true} label="Password" type={"password"} variant="outlined" />
                            <br />
                            <br />
                            <Button variant="contained" onClick={() => {
                                fetch("http://localhost:3000/admin/signup", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        username,
                                        password
                                    }),
                                    headers: { "Content-Type": "application/json" }
                                }).then((res) => res.json())
                                    .then((data) => {
                                        localStorage.setItem("token", data.token)
                                        window.location = "/courses"
                                    })
                            }}>Sign up</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Signup;