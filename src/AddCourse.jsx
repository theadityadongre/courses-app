import Button from '@mui/material/Button';
import { Card, TextField } from "@mui/material";
import { useState } from 'react';

function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(""); 
    return (
        <div style={{ display: "flex", justifyContent: "left", padding: 30 }}>
            <Card variant="outlined" style={{ width: 400, padding: 20 }}>
                <TextField onChange={
                    (e) => { setTitle(e.target.value) }}
                    fullWidth={true}
                    label="title"
                    variant="outlined" />
                <br />
                <br />
                <TextField onChange={
                    (e) => { setDescription(e.target.value) }}
                    fullWidth={true}
                    label="description"
                    variant="outlined" />
                <br />
                <br />
                <TextField onChange={
                    (e) => { setImage(e.target.value) }}
                    fullWidth={true}
                    label="Image link"
                    variant="outlined" />
                <br />
                <br />
                <Button variant="contained" onClick={() => {
                    fetch("http://localhost:3000/admin/courses", {
                        method: "post",
                        body: JSON.stringify({
                            title: title,
                            description: description,
                            imageLink: image,
                            published: true
                        }), headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    }).then((res) => {
                        res.json();
                    }).then((data) => {
                        alert("Course added!");
                        window.location = "/courses";
                    })
                }}>Add Course</Button>
            </Card>
        </div>
    )
}

export default AddCourse;