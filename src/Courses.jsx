import { Card, Typography } from "@mui/material";
import { flexbox, style } from "@mui/system";
import { useEffect, useState } from "react";

function Courses() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
                setCourses(data);
            }).catch((error) => {
                console.error("Error fetching data:", error);
                setCourses([]);
            });
        })
    }, [])

    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {courses.map(course => {
                return <Course course={course} />
            })}
        </div>
    )
}

export function Course(props) {
    return (

        <div>
            <Card style={{
                margin:10,
                width: 300,
                minHeight:200
            }}>
            <Typography variant="h6" textAlign="center">{props.course.title}</Typography>
            <Typography variant="subtitle1" textAlign="center">{props.course.description}</Typography>
            <img src={props.course.imageLink} style={{width: 300}}></img>
            </Card>
        </div>
    );
}

export default Courses;