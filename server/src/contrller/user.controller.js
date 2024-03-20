const UserModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

exports.LoginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userPersent = await UserModel.findOne({ email: email });
        if (!userPersent) {
            return res.status(401).send({ message: "Incorect useremail" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, userPersent?.password);
        if (!isPasswordCorrect) {
            return res.status(401).send({ messege: "Incorrect Password" });
        }

        const token = jwt.sign(
            {
                email: userPersent?.email,
                name: userPersent?.name,
                role: userPersent?.role,
                _id: userPersent?._id
            },
            process.env.JWT_SECRET,
            { expiresIn: "7 days" }
        )

        return res.status(200).send({ token: token, message: "Login successfull" })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.RegisterController = async (req, res) => {
    const { name, email, password, otp } = req.body;
    try {
        const existinguser = await UserModel.findOne({ email });
        if (existinguser) {
            return res.status(409).send({
                message: 'User already exists',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            otp: otp
        });

        return res.status(201).send({
            user: newUser,
            messege: "User has register Successfully !",
        })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.GetAllUser = async (req, res) => {
    let { token } = req.headers;
    if (!token) {
        return res.status(403).send("Unauthorized");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).send("Invalid token");
        }
        const AllUsers = await UserModel.aggregate([
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    avatar: 1,
                    role: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ]);
        return res.status(200).send({ users: AllUsers });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// Generate a 6-digit OTP
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
    return otp.toString(); // Convert the number to a string
};

exports.GetOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const userpersent = await UserModel.findOne({ email: email });
        // If no user is found, send a 401 Unauthorized status code
        if (!userpersent) {
            return res.status(401).send({ message: 'Incorrect useremail.' });
        }
        // Generate OTP
        const otp = generateOTP();

        userpersent.otp = otp;
        await userpersent.save();

        // Send OTP to the provided email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
        };

        const mailsendinfo = await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP send to email successfully it is valid for 5 minute', mailsendinfo, otp: otp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}


// Update password controller
exports.UpdatePasswordController = async (req, res) => {
    // Extract the user ID and password from the request body
    const { email, otp, newPassword } = req.body;

    try {
        // Find the user in the database by their ID
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            // If no user is found, send a 404 Not Found status code
            return res.status(404).send({ message: 'User with this email does not exist' });
        }

        if (user.otp != otp) {
            return res.status(404).send({ message: "OTP Verfication failed" })
        }

        // Send a success response
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return res.status(200).send({ message: 'Password updated successfully' });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};


// Profile Update controller
exports.ProfileUpdateController = async (req, res) => {
    // Extract user ID, full name, and avatar URL from request body
    const { avatar } = req.body;
    let { id } = req.params;
    let { token } = req.headers;
    if (!token) {
        return res.status(403).send("Unauthorized");
    }
    try {
        // Find the user in the database by their ID
        if (!decodedToken) {
            return res.status(401).send("Invalid token");
        }
        const updateUser = await UserModel.findByIdAndUpdate(
            { _id: id }, 
            { avatar: avatar },
            { new: true }
        );
        return res.status(200).send({ status: true, message: "user updated successfully", user: updateUser });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};

exports.UpdateUserController = async (req,res)=>{
    let { id } = req.params;
    try {
        // Find the user in the database by their ID
        let updateUser = await UserModel.findByIdAndUpdate({ _id: id }, req.body);
        return res.status(200).send({ status: true, message: "user updated successfully" });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
}

exports.deleteAuser = async (req, res) => {
    // Extract user ID, full name, and avatar URL from request body
    let { id } = req.params;
    console.log(id)
    try {
        let user = await UserModel.findByIdAndDelete({ _id: id });
        let alluser = await UserModel.find();
        return res.status(200).send({ status: true, message: "user deleted successfully", user: alluser });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ status: false, message: "something went wrong" });
    }
};