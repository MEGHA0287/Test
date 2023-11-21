// index.js

const ConnectToMongodb = require('./db');
const express = require('express');
const app = express();
const passport = require('passport'); // Import Passport
require('./passport-config'); // Import your Passport configuration
const jwtMiddleware = require('./jwtmiddleware');
const path=require('path')

var cors = require('cors');
const Employee = require('./models/Employee');
const Company = require('./models/Company');
ConnectToMongodb();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(passport.initialize());
app.use('/uploads/profile-pictures', express.static(path.join(__dirname, 'uploads', 'profile-pictures')));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/company', require('./routes/company'));
app.use('/api/employee', require('./routes/employee'));
app.use('/api/subemployee', require('./routes/subemployee'));
app.use('/api/task', require('./routes/task'));
app.use('/api/files', require('./routes/fileRoutes')); // Adjust the path as needed
app.use('/api/employee', jwtMiddleware); // Apply middleware to employee-related routes

// app.use('/api/protected', jwtMiddleware); // Apply the JWT middleware to the protected route


// app.get('/api/subemployees', jwtMiddleware, async (req, res) => {
//   try {
//     const authenticatedUser = req.user;

//     console.log('Authenticated User:', authenticatedUser);

//     if (!authenticatedUser || authenticatedUser.role !== 'admin') {
//       console.error('Access denied: Not an admin');
//       return res.status(403).json({ error: 'Access denied: Not an admin' });
//     }

//     // Add console logs for debugging
//     console.log('Admin ID:', authenticatedUser._id);

//     const subEmployees = await Employee.find({ adminUserId: authenticatedUser._id });

//     console.log('Sub-Employees:', subEmployees);

//     res.status(200).json(subEmployees);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// app.get('/api/subemployees/company', jwtMiddleware, async (req, res) => {
//   try {
//     const authenticatedUser = req.user;

//     console.log('Authenticated User:', authenticatedUser);

//     if (authenticatedUser.role !== 'admin') {
//       return res.status(403).json({ error: 'Access denied: Not an admin' });
//     }

//     const company = await Company.findOne({ _id: authenticatedUser.adminUserId });

//     if (!company) {
//       return res.status(404).json({ error: 'Company not found' });
//     }

//     res.status(200).json(company);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });




// Example of protecting a route using the JWT middleware
// app.get('/api/protected', (req, res) => {
//   console.log('authenticatedUser:', req.user); // This should log the user if authenticated
//   // Your route logic here
//   res.send(req.user)
// });

app.listen(port, () => {
  console.log(`Task-Manager backend listening at http://localhost:${port}`);
});




// const ConnectToMongodb=require('./db')
// const express = require('express')
// const app = express()


// var cors=require('cors')
// ConnectToMongodb()
// const port = 5000
// app.use(cors())
// app.use(express.json())

// app.use('/api/auth',require('./routes/auth'))
// app.use('/api/company',require('./routes/company'))
// app.use('/api/employee',require('./routes/employee'))
// app.use('/api/task',require('./routes/task'))
// app.use('/api/files', require('./routes/fileRoutes')); // Adjust the path as needed


// app.listen(port, () => {
//   console.log(`Task-Manager backend listening at http://localhost:${port}`)
// })
