const { body, validationResult } = require("express-validator");

const signupValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("email").trim().isEmail().withMessage("Please provide a valid email address").normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one lowercase letter, one uppercase letter, and one number"),
];

const loginValidation = [
  body("email").trim().isEmail().withMessage("Please provide a valid email address").normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

const videoValidation = [
  body("title").trim().isLength({ min: 2, max: 100 }).withMessage("Title must be between 2 and 100 characters"),

  body("description").trim().isLength({ min: 2, max: 500 }).withMessage("Description must be between 10 and 500 characters"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};

module.exports = {
  signupValidation,
  loginValidation,
  videoValidation,
  handleValidationErrors,
};
