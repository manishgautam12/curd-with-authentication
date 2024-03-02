import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefereshTokens=async(userId)=>{
    try {
        const user=await User.findOne(userId)

        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();

        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken};
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating referesh and access token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
     const {fullName,username,email,password}=req.body
    //  console.log(fullName,username,email,password)
    if([fullName,username,email,password].some((field)=>field?.trim()==="")){
        throw new ApiError(401,"All field is required")
    }

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exist");
    }

    const user=await User.create({
        fullName,
        username:username.toLowerCase(),
        email,
        password
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(200).json(new ApiResponse(200,{createdUser},"user register successfuly"))

})

const loginUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body

    if(!username && !email){
        throw new ApiError(400,"username or email required")
    }

    const user=await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"user not register,Please register first");
    }

    const isPassordValid=await user.isPasswordCorrect(password);

    if(!isPassordValid){
        throw new ApiError(401,"wrong password")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefereshTokens(user._id);
    
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )


})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

export {
    registerUser,
    loginUser,
    logoutUser
}
