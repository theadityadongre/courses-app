const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { response } = require('express');
app.use(express.json());
const cors = require("cors");
app.use(cors());

const secret = 'mysecretkey';

//Mongo Schema
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
})

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
})

//mongoose model
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);



mongoose.connect("mongodb+srv://iadityadongre:amo1m2wFUCT3sAja@cluster0.mwlljtx.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403);
      } else {
        req.user = user;
        next();
      }
    })
  } else {
    res.sendStatus(401);
  }
}

app.get('/admin/me', authenticateJwt, (req, res) => {
  res.json({
    username: req.user.username
  });
})

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const body = req.body;
  Admin.findOne({ username }).then((userPresent) => {
    if (userPresent) {
      res.status(403).json({ message: "user already present" });
    } else {
      const token = jwt.sign({ username, role: "admin" }, secret, { expiresIn: "1h" });
      const admin = new Admin(body);
      admin.save().then(() => res.json({ message: "user saved successfully", token })).catch((error) => { console.log("error: "), error });
    }
  }).catch((error) => { console.log(error), error })
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const { username, password } = req.body;
  Admin.findOne({ username, password }).then(data => {
    if (data) {
      const token = jwt.sign({ username, role: "admin" }, secret, { expiresIn: "1h" });
      res.status(200).json({ message: "Logged in scucessfully", token });
    } else {
      res.status(403).json({ message: "Invalid username or password" });
    }
  }).catch(error => { console.log(error) });
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {
  // logic to create a course
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(200).json({ message: "message saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Course not saved" });
    console.log({ message: "Course not saved", error });
  }
}
);

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  // logic to edit a course
  try {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true })
    if (course) {
      res.json({ message: "Course updated successfully" });
    } else {
      res.status(404).json({ message: "Course not found" })
    }
  } catch (error) {
    console.log(error);
  }
});

app.get('/admin/courses', async (req, res) => {
  // logic to get all courses
  try {
    const courses = await Course.find();
    if (courses) {
      res.json(courses);
    } else {
      res.json({ message: "No courses are present" });
    }
  } catch (error) {
    console.log(error);
  }
});

// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: "User already present" });
    } else {
      const token = jwt.sign({ username, role: "user" }, secret, { expiresIn: "1h" });
      const newUser = new User({ username, password });
      await newUser.save();
      res.json({ message: "User created succesfully", token })
    }
  } catch (error) {
    console.log(error)
  }
});

app.post('/users/login', async (req, res) => {
  // logic to log in user
  const username = req.headers.username;
  const password = req.headers.password;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: user }, secret, { expiresIn: "1h" });
      res.json({ message: "Logged in successfully", token })
    } else {
      res.json({ message: "User not found, please signup" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get('/users/courses', authenticateJwt, async (req, res) => {
  // logic to list all courses
  try {
    const courses = await Course.find();
    if (courses) {
      res.json(courses);
    } else {
      res.status(404).json({ message: "No course present" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
  // logic to purchase a course
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);
    if (course) {
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.purchasedCourses.push(course);
        user.save();
        res.json({ message: "Course purchased sucessfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
  // logic to view purchased courses'
  try {
    const user = await User.findOne({ username: req.user.username }).populate("purchasedCourses");
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses });
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }


});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
