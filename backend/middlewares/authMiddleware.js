const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Extract the authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Authorization header is missing or malformed");
      return res
        .status(401)
        .json({ message: "Unauthorized access. Missing or malformed token.", success: false });
    }

    // Extract token from the authorization header
    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("Token missing from authorization header");
      return res.status(401).json({ message: "Unauthorized access. No token provided.", success: false });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          console.log("Token has expired");
          return res.status(401).json({ message: "Token expired. Please log in again.", success: false });
        }
        console.log("Invalid token", err);
        return res.status(401).json({ message: "Token is invalid. Unauthorized access.", success: false });
      }

      // Attach the decoded user info to the request object
      req.user = { id: decode.id };
      console.log("Token verified successfully for user:", decode.id);
      next();
    });
  } catch (error) {
    console.error("JWT Middleware Error:", error);
    res.status(500).json({ message: "Internal server error. Please try again later.", success: false });
  }
};
