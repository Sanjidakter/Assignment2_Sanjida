import exp from "constants";
import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Z][a-z]*$/, "capitalize format")
    .messages({
      "string.empty": "First name is required",
      "string.max": "First name must be in 20 char",
      "string.pattern.name": "{#value} is not in capitalize format",
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .pattern(/^[a-zA-Z]+$/, "alphabetic")
    .messages({
      "string.empty": "Last name is required",
      "string.pattern.name": "{#value} is not valid",
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "string.empty": "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "string.empty": "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "string.empty": "Father's contact number is required",
  }),
  motherName: Joi.string().required().messages({
    "string.empty": "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "string.empty": "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "string.empty": "Mother's contact number is required",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    "string.empty": "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Local guardian's address is required",
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "ID is required",
  }),
  name: userNameValidationSchema.required().messages({
    "any.required": "Name is required",
  }),
  gender: Joi.string().valid("male", "female", "other").messages({
    "any.only": "{#value} is not a valid gender",
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact number is required",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "string.empty": "Emergency contact number is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .messages({
      "any.only": "{#value} is not a valid blood group",
    }),
  presentAddress: Joi.string().required().messages({
    "string.empty": "Present address is required",
  }),
  // Uncomment this line if permanent address is needed
  // permanentAddress: Joi.string().required().messages({
  //   "string.empty": "Permanent address is required",
  // }),
  guardian: guardianValidationSchema.required().messages({
    "any.required": "Guardian information is required",
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    "any.required": "Local guardian information is required",
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid("active", "blocked").messages({
    "any.only": "{#value} is not a valid status",
  }),
});


export default studentValidationSchema;