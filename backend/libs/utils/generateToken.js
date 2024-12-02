import JWT from "jsonwebtoken";
const generateTokenAndSetCookie = async (userId, res) => {
  const token = JWT.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "14d"
  });
  res.cookie('token' , token , {
    secure : process.env.NODE_ENV !== 'development',
    httpOnly : true,
    maxAge : 14 * 24 * 60 * 60 * 1000 ,
    path : '/',
    sameSite : 'strict',
  })
};

export default generateTokenAndSetCookie;