import jwt from "jsonwebtoken";

export const generateAndSetToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  res.cookie("chat_token", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, //MS
    httponly: true, // prevent XSS attacks cross site scripting attacks
    sameSite: "strict", // CSRF attacks crsos site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};
