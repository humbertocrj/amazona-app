import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  }, 
  process.env.JWT_SECRET || 'somethingsecret',
  {expiresIn:'30d'});
};

//Middleware to authenticate the user
// It's is used in the routes that needs permission, so the user must be authenticated
export const isAuth = (req,res,next) => {
  const authorization = req.headers.authorization;

  if(authorization){
    const token = authorization.slice(7, authorization.length)// Bearer XXXXXXXXX(Get only the token part)
    
    jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode)=>{
    
      if(err){
        res.status(401).send({message:'Invalid token'})
      }else{ 
       
        req.user = decode
        next()
      }
    })
  }else{
    res.status(401).send({message:'No token'})

  }
}