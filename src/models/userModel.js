import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        require: true,
        unique: true
    },
    fullName: {
        type: String,
        default: "",
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role:{
        type: String,
        require: true,
    },
    // isVerified:{
    //     type: Boolean,
    //     default: false
    // },
    // isAdmin:{
    //     type: Boolean,
    //     default: false
    // },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    profileImage: {
        type: String,
        default: ""
    },
    // verifyToken: String,
    // verifyTokenExpiry: Date
},
{imestamps: true}
)

const User =mongoose.models.User || mongoose.model("User" , userSchema);

export default User