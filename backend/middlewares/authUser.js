import jwt from 'jsonwebtoken'

//  user authentication middleware
const authUser = async (req,res,next) => {
    try {

        const {token} = req.headers
        if (!token) {
            return res.json({success:false,message:'Not Authorized Login Again'})
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = token_decode.id  
        next()
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export default authUser


// video time stamp 09:34:24











// Debuged Code 
// import jwt from 'jsonwebtoken'

// // User authentication middleware
// const authUser = async (req, res, next) => {
//     try {
//         // Get token from headers - support both 'token' and 'authorization'
//         let token = req.headers.token || req.headers.authorization
        
//         // If authorization header, extract token from "Bearer TOKEN"
//         if (token && token.startsWith('Bearer ')) {
//             token = token.slice(7)
//         }
        
//         if (!token) {
//             return res.json({ success: false, message: 'Not Authorized - Login Again' })
//         }

//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        
//         // Set userId in req object for GET requests (not req.body)
//         req.userId = token_decode.id
//         next()

//     } catch (error) {
//         console.log(error)
//         if (error.name === 'JsonWebTokenError') {
//             return res.json({ success: false, message: 'Invalid token' })
//         } else if (error.name === 'TokenExpiredError') {
//             return res.json({ success: false, message: 'Token expired - Login Again' })
//         }
//         res.json({ success: false, message: error.message })
//     }
// }

// export default authUser