import jwt from "jsonwebtoken";
import Employee from "../api/user/model.js";

const config = process.env;

const isAuthenticated = (req, res, next) => {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.cookie;

  if (token.slice(0, 4) == "jwt=") {
    token = token.slice(4)
  }
  console.log(token)
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ error: { message: "Employee not authenticated. The token sent is bad or expired." } }).end();
      } else {
        let employee = await Employee.findById(decodedToken.employee_id);
        if (!employee) {
          return res.status(400).json({ error: { message: "Employee not authenticated or token sent is bad or expired." } }).end();
        }
        req.body.employeeId = employee.id;
        next();
      }
    });
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};


const isAuthorized = async (req, res, next) => {
  const authorizedRole = ["ADMIN HR", "HR"];
  try {
    let employee = await Employee.findById(req.body.employeeId);
    if (authorizedRole.includes(employee.role)) {
      req.body.employeeId = employee.id;
      next()
    }
    else {
      return res.status(403).json({ message: "Employee not authorized." })
    }
  }
  catch (error) {
    return res.status(500).json({ message: "Invalid request" })
  }
}

export { isAuthenticated, isAuthorized };


