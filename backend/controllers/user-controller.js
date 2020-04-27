const User = require('../models/user-model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create User Account
exports.signUp = (req, res, next) => {
    let date = new Date();
    date.toString;
    bcrypt.hash(req.body.password, 10).then(hash => {
        // console.log("dataaaa", req.body)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            dateofbirth: req.body.dateofbirth,
            phone: req.body.phone,
            education: req.body.education,
            address: req.body.address,
            currentAddress: req.body.currentAddress,
            userViews: req.body.userViews,
            userJob: req.body.userJob,
            profileImage: req.body.profileImage,
            joinDate: date,
        });
        user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "User created successfully!",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Invalid authentication credentials!"
                });
                console.log("error", err)
            });
    });
}

// User login
exports.login = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "User not found"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id, name: fetchedUser.name },
                "secret_this_should_be_longer",
                { expiresIn: "10h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 36000,
                userId: fetchedUser._id,
                name: fetchedUser.name,
                email: fetchedUser.email
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!"
            });
        });
}


// exports.checkAuth = (req, res, next) => {
//     let username = 'shahzeb';
//     let password = "shah123"
//     console.log("body of admin>>>", req.body);

//     if (username == req.body.username && password == req.body.password) {
//         res.status(201).json({
//             message: "Password is matched"
//         });
//     } else {
//         res.status(201).json({
//             message: "Please check username & password"
//         });
//     }
// }



// // Get User By Id
// exports.getUserProfileById = (req, res, next) => {
//     User.findById(req.params.id).then(user => {
//       if (!user)
//         return res.status(404).json({ status: false, message: 'User record not found.' });
//       else
//         // console.log(user);
//         return res.status(200).json(user);
//     });
//   }
  
//   // Get users 
//   exports.getUsersProfile = (req, res, next) => {
//     User.find().then(documents => {
//       // console.log(documents);
//       res.status(200).json({
//         message: 'Users fetched!!!',
//         users: documents
//       });
//     })
//       .catch(error => {
//         res.status(500).json({
//           message: "Fetching Users failed!"
//         });
//       });
//   }
  
//   // Update User Profile
//   exports.updateUserProfile = (req, res, next) => {
//     const user = new User({
//       _id: req.body.id,
//       phone: req.body.phone,
//       education: req.body.education,
//       field: req.body.field,
//       experiance: req.body.experiance,
//       work: req.body.work,
//       address: req.body.address,
//       currentAddress: req.body.currentAddress,
//       profileImage: req.body.profileImage,
//       userScore: req.body.userScore
//     });
//     //  console.log(user);
//     if (req.file) {
//       const url = req.protocol + "://" + req.get("host");
//       user.profileImage = url + "/images/profile/" + req.file.filename;
//     }
//     //  console.log(user);
//     User.updateOne({ _id: req.params.id }, user)
//       .then(result => {
//         // console.log(result);
//         if (result.nModified > 0) {
//           res.status(200).json({ message: "Update successful!" });
//         } else {
//           res.status(401).json({ message: "Not authorized!" });
//         }
//       });
//   }
  
//   // Update User Profile Views
//   exports.updateUserProfileViews = (req, res, next) => {
//     const user = new User({
//       _id: req.body.id,
//     });
//     User.updateOne({ _id: req.params.id }, { $set: { userViews: req.body.userViews } }, user)
//       .then(result => {
//         if (result.n > 0) {
//           res.status(200).json({ message: "User views Update successful!" });
//         } else {
//           res.status(401).json({ message: "Not authorized!" });
//         }
//       });
//   }
  
//   // Update User Score
//   exports.updateUserScore = (req, res, next) => {
//     const user = new User({
//       _id: req.body.id,
//     });
//     // console.log(user);
//     User.updateOne({ _id: req.params.id }, { $set: { userScore: req.body.userScore } }, user)
//       .then(result => {
//         if (result.n > 0) {
//           res.status(200).json({ message: "User Score Update successful!" });
//         } else {
//           res.status(401).json({ message: "Not authorized!" });
//         }
//       });
//   }
  