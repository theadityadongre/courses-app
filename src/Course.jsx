import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Typography, TextField, Button } from "@mui/material";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function Course() {
    let { courseId } = useParams();
    const setCourses = useSetRecoilState(coursesState);
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
        <div>
            <CourseCard courseId={courseId} />
            <UpdateCard courseId={courseId} />
        </div>
    )
}

function UpdateCard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const course = props.course;
    const [courses, setCourses] = useRecoilState(coursesState);

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: 30 }}>
            <Card variant="outlined" style={{ width: 400, padding: 20 }}>
                <Typography>Update Course</Typography>
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
                    fetch("http://localhost:3000/admin/courses/" + props.courseId, {
                        method: "PUT",
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
                        let updatedCourses = [];
                        for (let i = 0; i < courses.length; i++) {
                            if (courses[i]._id == props.courseId) {
                                updatedCourses.push({
                                    _id: props.courseId,
                                    title: title,
                                    description: description,
                                    imageLink: image
                                })
                            } else {
                                updatedCourses.push(courses[i]);
                            }
                        }
                        setCourses(updatedCourses);
                    })
                }}>Update Course</Button>
            </Card>
        </div>
    )
}

function CourseCard(props) {
    const courses = useRecoilValue(coursesState);
    let course = null;
    for (let i = 0; i < courses.length; i++) {
        if (courses[i]._id == props.courseId) {
            course = courses[i];
        }
    }

    if (!course) {
        return "Loading..."

    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card style={{
                margin: 10,
                width: 300,
                minHeight: 200
            }}>
                <Typography variant="h6" textAlign="center">{course.title}</Typography>
                <Typography variant="subtitle1" textAlign="center">{course.description}</Typography>
                <img src={course.imageLink} style={{ width: 300 }}></img>
            </Card>
        </div>
    )
}

const coursesState = atom({
    key: 'coursesState',
    default: '',
});

export default Course;