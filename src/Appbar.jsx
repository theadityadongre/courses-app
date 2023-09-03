import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { flexbox } from "@mui/system";
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';


function Appbar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState();

    useEffect(() => {
        fetch("http://localhost:3000/admin/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
                if (data.username) {
                    setUsername(data.username);
                }
            })
        })
    }, [])

    if (username) {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", padding: 4 }}>
                <div>
                    <Typography variant="h6">Courses</Typography>
                </div>

                <div style={{ display: "flex" }}>
                    <div>
                    <Typography variant="h6" style={{paddingRight: 10}}>{username}</Typography>
                    </div>

                    <div style={{ marginRight: 10 }}>
                        <Button variant={"contained"} onClick={() => {
                            localStorage.setItem("token", null);
                            window.location = "/signup";
                        }}>Logout</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-between", padding: 4 }}>
            <div>
                <Typography variant="h6">Courses</Typography>
            </div>

            <div style={{ display: "flex" }}>
                <div style={{ marginRight: 10 }}>
                    <Button variant={"contained"} onClick={() => { navigate("/signup") }}>Sign up</Button>
                </div>

                <div>
                    <Button variant={"contained"} onClick={() => { navigate("/signin") }}>Sign in</Button>
                </div>
            </div>
        </div>
    )
}

export default Appbar;