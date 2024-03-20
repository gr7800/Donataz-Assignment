const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default: "https://avatars.githubusercontent.com/u/97174581?v=4"
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        otp: {
            type: String,
            default: "12345"
        }
    },
    {
        versionKey: false,
        // Set timestamps to true to automatically add createdAt and updatedAt fields.
        timestamps: true,
    }
)

const User = mongoose.model('user', userSchema);

module.exports = User;