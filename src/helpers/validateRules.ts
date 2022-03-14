import { object, string, mixed, addMethod, ref, array } from "yup";
import { validateFileExt } from "utils/CommonUtils";

addMethod(mixed, "isDateValid", isDateValid);

const WEBSITE_URL =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const EXT_TYPE = ["doc", "docx", "pdf", "xlsx", "csv", "msg", "jpeg"];

function getErrorsFromValidationError(validationError: any) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors: any, error: any) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
}

function handleErrorMeg(msg: string, schema: any) {
  try {
    schema.validateSync(msg, { abortEarly: false });
    return {};
  } catch (error) {
    return getErrorsFromValidationError(error);
  }
}

function isDateValid(msg: string) {
  return mixed().test("isDateValid", msg, function (value) {
    value = parseInt(value, 10);
    if (!value || isNaN(value)) return false;
    var isValid = new Date(value).getTime() > 0;
    return isValid;
  });
}

// Validation section

// Login Validation
export function loginValidate(values: any) {
  return handleErrorMeg(values, loginSchema);
}

const loginSchema = object().shape({
  username: string().required("error.username_empty"),
  password: string().required("error.password_empty"),
});

// Forgot Password Validation
export function forgotPasswordValidate(values: any) {
  return handleErrorMeg(values, forgotPasswordSchema);
}

const forgotPasswordSchema = object().shape({
  email: string().email("Invalid Email").required("Email cannot be empty"),
});

// Reset Password Validation
export function resetPasswordValidate(values: any) {
  return handleErrorMeg(values, resetPasswordSchema);
}

const resetPasswordSchema = object().shape({
  password: string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password format incorrect"
    )
    .required("Password cannot be empty"),
  confirmPassword: string()
    .required("Confirm Password cannot be empty")
    .oneOf([ref("password"), null], "Passwords must match"),
});

// Admin Reset Password Validation
export function adminResetPasswordValidate(values: any) {
  return handleErrorMeg(values, adminResetPasswordSchema);
}

const adminResetPasswordSchema = object().shape({
  oldPassword: string().required("Password cannot be empty"),
  newPassword: string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password format not match"
    )
    .required("New Password cannot be empty"),
  confirmPassword: string()
    .required("Confirm Password cannot be empty")
    .oneOf([ref("newPassword"), null], "Passwords must match"),
});

// Org Vendor Validation
export function orgVendorValidate(values: any) {
  return handleErrorMeg(values, orgVendorSchema);
}

const orgVendorSchema = object().shape({
  email: string().email("Invalid email").required("Email cannot be empty"),
});

// Signup Validation
export function signupValidate(values: any) {
  return handleErrorMeg(values, signupSchema);
}

const signupSchema = object().shape({
  firstName: string().required("First name cannot be empty"),
  lastName: string().required("Last name cannot be empty"),
  email: string().email("Invalid email").required("Email cannot be empty"),
  organizationName: string().required("Organization name cannot be empty"),
  organizationType: string().required("Organization type cannot be empty"),
  natureOfBusiness: string().required("Nature of business cannot be empty"),
  companyRegistrationNo: string().required(
    "Company registration no cannot be empty"
  ),
  phoneNumber: string()
    .test(
      "isValidPhoneNumber1",
      "Phone number invalid",
      (phone?: string | null) => {
        const numberRegExp = /^\d*$/;
        return phone && phone.length > 6 && numberRegExp.test(phone)
          ? true
          : false;
      }
    )
    .required("Phone number cannot be empty"),
  password: string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password format incorrect"
    )
    .required("Password cannot be empty"),
});

// Vendor Signup Validation

export function vendorSignupValidate(values: any) {
  return handleErrorMeg(values, vendorSignupSchema);
}

const vendorSignupSchema = object().shape({
  companyName: string().required("Company name cannot be empty"),
  legalStatus: string().required("Legal status cannot be empty"),
  businessName: string().required("Business name cannot be empty"),
  businessRegistrationNo: string().required(
    "Business registration no cannot be empty"
  ),
  businessRegistrationAddress: string().required(
    "Business registration address cannot be empty"
  ),
  city: string().required("City cannot be empty"),
  pincode: string().required("Pincode cannot be empty"),
  fax: string().required("fax cannot be empty"),
  website: string()
    .matches(WEBSITE_URL, "Enter a valid url")
    .required("website cannot be empty"),
  email: string().email("Invalid email").required("Email cannot be empty"),
  phoneNumber: string()
    .test(
      "isValidPhoneNumber1",
      "Phone number invalid",
      (phone?: string | null) => {
        const numberRegExp = /^\d*$/;
        return phone && phone.length > 6 && numberRegExp.test(phone)
          ? true
          : false;
      }
    )
    .required("Phone number cannot be empty"),
  password: string()
    .test(
      "passwordFormatValid",
      "Password format incorrect",
      function (value?: string | null) {
        const numberRegExp =
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (this.parent.formType === "profile") {
          return true;
        } else if (value && numberRegExp.test(value)) {
          return true;
        }
        return false;
      }
    )
    .test("isValidpassword", "Password cannot be empty", function (value) {
      return value !== "" || this.parent.formType === "profile" ? true : false;
    }),
  commBusinessRegistrationAddress: string().required(
    "Business registration address cannot be empty"
  ),
  commCity: string().required("City cannot be empty"),
  commPincode: string().required("Pincode cannot be empty"),
  commPhoneNumber: string()
    .test(
      "isValidPhoneNumber1",
      "Phone number invalid",
      (phone?: string | null) => {
        const numberRegExp = /^\d*$/;
        return phone && phone.length > 6 && numberRegExp.test(phone)
          ? true
          : false;
      }
    )
    .required("Phone number cannot be empty"),
  commFax: string().required("FAX cannot be empty"),
  commEmail: string().email("Invalid email").required("Email cannot be empty"),
  commWebsite: string()
    .matches(WEBSITE_URL, "Enter a valid url")
    .required("Website cannot be empty"),
  commWorkingDays: string().required("Working days cannot be empty"),
  commWorkingHours: string().required("Working hours cannot be empty"),

  bnkBankName: string().required("Bank name cannot be empty"),
  bnkCustomerName: string().required("Customer name cannot be empty"),
  bnkAccountNo: string().required("Account no cannot be empty"),
  bnkAccountType: string().required("Account type cannot be empty"),
  bnkIfscCode: string().required("IFSC cannot be empty"),
  bnkBranchAddress: string().required("Branch address cannot be empty"),
  bnkBranchCode: string().required("Branch code cannot be empty"),

  panNo: string().required("PAN no cannot be empty"),
  gstn: string().required("GSTN cannot be empty"),
  lutDate: string().required("LUT date cannot be empty"),
  lutNo: string().required("LUT no cannot be empty"),

  proprietorName: string().required("Name cannot be empty"),
  proprietorPosition: string().required("Position cannot be empty"),
  proprietorMobile: string().required("Mobile cannot be empty"),
  proprietorPhone: string().required("Phone cannot be empty"),
  proprietorEmail: string()
    .email("Invalid email")
    .required("Email cannot be empty"),

  repName: string().required("Name cannot be empty"),
  repDesignation: string().required("Designation cannot be empty"),
  repMobile: string().required("Mobile cannot be empty"),
  repPhone: string().required("Phone cannot be empty"),
  repEmail: string().email("Invalid email").required("Email cannot be empty"),
  repWorkingDays: string().required("Working days cannot be empty"),
  repWorkingHours: string().required("Working hours cannot be empty"),
  repWorkingHoursAm: string().required("Working AM cannot be empty"),
  repWorkingHoursPm: string().required("Working PM cannot be empty"),

  finRepName: string().required("Name cannot be empty"),
  finRepDesignation: string().required("Designation cannot be empty"),
  finRepMobile: string().required("Mobile cannot be empty"),
  finRepPhone: string().required("Phone cannot be empty"),
  finRepEmail: string()
    .email("Invalid email")
    .required("Email cannot be empty"),
  finRepWorkingDays: string().required("Working days cannot be empty"),
  finRepWorkingHours: string().required("Working hours cannot be empty"),
  finRepWorkingHoursAm: string().required("Working AM cannot be empty"),
  finRepWorkingHoursPm: string().required("Working PM cannot be empty"),

  relManagerName: string().required("Name cannot be empty"),
  relManagerDesignation: string().required("Designation cannot be empty"),
  relManagerMobile: string().required("Mobile cannot be empty"),
  relManagerPhone: string().required("Phone cannot be empty"),
  relManagerEmail: string()
    .email("Invalid email")
    .required("Email cannot be empty"),
  relManagerWorkingDays: string().required("Working days cannot be empty"),
  relManagerWorkingHours: string().required("Working hours cannot be empty"),
  relManagerWorkingHoursAm: string().required("Working AM cannot be empty"),
  relManagerWorkingHoursPm: string().required("Working PM cannot be empty"),
  businnessRegFileAttachment: mixed()
    .test("fileUploadValidate", "Upload file canot be empty", function (value) {
      if (this.parent.formType === "profile") return true;
      return value.length > 0 ? true : false;
    })
    .test("fileUploadFormatValidate", "Invalid file", function (value) {
      if (value.length === 0) {
        return true;
      } else if (
        value.length > 0 &&
        validateFileExt(value[0].name, [
          "jpeg",
          "jpg",
          "png",
          "doc",
          "docx",
          "pdf",
          "xlsx",
          "msg",
          "csv",
          "txt",
        ])
      ) {
        return true;
      } else {
        return false;
      }
    }),
  pancardFileAttachment: mixed()
    .test("fileUploadValidate", "Upload file canot be empty", function (value) {
      if (this.parent.formType === "profile") return true;
      return value.length > 0 ? true : false;
    })
    .test("fileUploadFormatValidate", "Invalid file", function (value) {
      if (value.length === 0) {
        return true;
      } else if (
        value.length > 0 &&
        validateFileExt(value[0].name, [
          "jpeg",
          "jpg",
          "png",
          "doc",
          "docx",
          "pdf",
          "xlsx",
          "msg",
          "csv",
          "txt",
        ])
      ) {
        return true;
      } else {
        return false;
      }
    }),
  cancelledChequeFileAttachment: mixed()
    .test("fileUploadValidate", "Upload file canot be empty", function (value) {
      if (this.parent.formType === "profile") return true;
      return value.length > 0 ? true : false;
    })
    .test("fileUploadFormatValidate", "Invalid file", function (value) {
      if (value.length === 0) {
        return true;
      } else if (
        value.length > 0 &&
        validateFileExt(value[0].name, [
          "jpeg",
          "jpg",
          "png",
          "doc",
          "docx",
          "pdf",
          "xlsx",
          "msg",
          "csv",
          "txt",
        ])
      ) {
        return true;
      } else {
        return false;
      }
    }),
  gstFileAttachment: mixed()
    .test("fileUploadValidate", "Upload file canot be empty", function (value) {
      if (this.parent.formType === "profile") return true;
      return value.length > 0 ? true : false;
    })
    .test("fileUploadFormatValidate", "Invalid file", function (value) {
      if (value.length === 0) {
        return true;
      } else if (
        value.length > 0 &&
        validateFileExt(value[0].name, [
          "jpeg",
          "jpg",
          "png",
          "doc",
          "docx",
          "pdf",
          "xlsx",
          "msg",
          "csv",
          "txt",
        ])
      ) {
        return true;
      } else {
        return false;
      }
    }),
  msmeFileAttachment: mixed().test(
    "fileUploadFormatValidate",
    "Invalid file",
    function (value) {
      if (value.length === 0) {
        return true;
      } else if (
        value.length > 0 &&
        validateFileExt(value[0].name, [
          "jpeg",
          "jpg",
          "png",
          "doc",
          "docx",
          "pdf",
          "xlsx",
          "msg",
          "csv",
          "txt",
        ])
      ) {
        return true;
      } else {
        return false;
      }
    }
  ),
  tdsFileAttachment: mixed().test(
    "fileUploadFormatValidate",
    "Invalid file",
    function (value) {
      if (value.length === 0) {
        return true;
      } else if (
        value.length > 0 &&
        validateFileExt(value[0].name, [
          "jpeg",
          "jpg",
          "png",
          "doc",
          "docx",
          "pdf",
          "xlsx",
          "msg",
          "csv",
          "txt",
        ])
      ) {
        return true;
      } else {
        return false;
      }
    }
  ),
});

// Users Validation
export function userValidate(values: any) {
  return handleErrorMeg(values, userSchema);
}

const userSchema = object().shape({
  firstName: string().required("First name cannot be empty"),
  lastName: string().required("Last name cannot be empty"),
  email: string().email("Invalid email").required("Email cannot be empty"),
  userAccessType: string().required("Role cannot be empty"),
  phoneNumber: string()
    .test(
      "isValidPhoneNumber1",
      "Phone number invalid",
      (phone?: string | null) => {
        const numberRegExp = /^\d*$/;
        return phone && phone.length > 6 && numberRegExp.test(phone)
          ? true
          : false;
      }
    )
    .required("Phone number cannot be empty"),
  password: string()
    .test(
      "passwordformatValidate",
      "Password format incorrect",
      function (password) {
        const passwordRegExp =
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!password) return true;
        return passwordRegExp.test(password) ? true : false;
      }
    )
    .test("passwordValidate", "Password cannot be empty", function (password) {
      return this.parent.id || password !== "" ? true : false;
    }),
});

// OrgItem Validation
export function orgItemValidate(values: any) {
  return handleErrorMeg(values, orgItemSchema);
}

const orgItemSchema = object().shape({
  itemName: string().required("Item name cannot be empty"),
  itemCode: string().required("Item code cannot be empty"),
});

// Profile Validation
export function profileValidate(values: any) {
  return handleErrorMeg(values, profileSchema);
}

const profileSchema = object().shape({
  firstName: string().required("First name cannot be empty"),
  lastName: string().required("Last name cannot be empty"),
  email: string().email("Invalid email").required("Email cannot be empty"),
  phoneNumber: string()
    .test(
      "isValidPhoneNumber1",
      "Phone number invalid",
      (phone?: string | null) => {
        const numberRegExp = /^\d*$/;
        return phone && phone.length > 6 && numberRegExp.test(phone)
          ? true
          : false;
      }
    )
    .required("Phone number cannot be empty"),
});

// RFQ Validation
export function rfqFormValidate(values: any) {
  return handleErrorMeg(values, rfqFormSchema);
}

const rfqFormSchema = object().shape({
  itemName: string().required("Item name cannot be empty"),
  itemCode: string().required("Item code cannot be empty"),
  hsnCode: string().required("HSN code cannot be empty"),
  unspscCode: string().required("UNSPSC code cannot be empty"),
  isProposalDoc: string().required("Doc Type cannot be empty"),

  proposalDocAttachment: mixed()
    .test("fileUploadValidate", "Upload file canot be empty", function (value) {
      if (this.parent.isProposalDoc === "no") return true;

      return value.length > 0 ? true : false;
    })
    .test("fileUploadFormatValidate", "Invalid file", function (value) {
      if (value.length === 0) {
        return true;
      } else if (value.length > 0 && validateFileExt(value[0].name, EXT_TYPE)) {
        return true;
      } else {
        return false;
      }
    }),
  quantity: string().test(
    "quantityValidate",
    "Quantity cannot be empty",
    function (value) {
      return this.parent.isProposalDoc === "yes" ||
        (this.parent.isProposalDoc === "no" && value !== "")
        ? true
        : false;
    }
  ),
  description: string().test(
    "descriptionValidate",
    "Description cannot be empty",
    function (value) {
      return this.parent.isProposalDoc === "yes" ||
        (this.parent.isProposalDoc === "no" && value !== "")
        ? true
        : false;
    }
  ),
  purchaseRequestNumber: string().required(
    "Purchase request number cannot be empty"
  ),
  bidType: string().required("Bid Type cannot be empty"),
  bidStartDate: string().required("Bid start date cannot be empty"),
  bidEndDate: string().required("Bid end date cannot be empty"),
  vendorIds: array().min(1, "Vendor cannot be empty"),

  address1: string().required("Address cannot be empty"),
  city: string().required("City cannot be empty"),
  pincode: string().required("Pin Code cannot be empty"),
  state: string().required("State cannot be empty"),
  fax: string().required("FAX cannot be empty"),
  phoneNumber: string().required("Mobile number cannot be empty"),
});

// RFQ Bidding Details Validation
export function rfqBiddingDetailsValidate(values: any) {
  return handleErrorMeg(values, rfqBiddingDetailsSchema);
}

const rfqBiddingDetailsSchema = object().shape({
  biddingQuantity: string().required("Quantity cannot be empty"),
  biddingUnitPrice: string().required("Unit price cannot be empty"),
  biddingDescription: string().test(
    "descValidate",
    "Description canot be empty",
    function (value) {
      return value !== "" || this.parent.contentType === "fileupload"
        ? true
        : false;
    }
  ),
  biddingProposalDocAttachment: mixed()
    .test("fileUploadValidate", "Upload file canot be empty", function (value) {
      return this.parent.bidType === "open" ||
        value !== "" ||
        this.parent.contentType === "description"
        ? true
        : false;
    })
    .test("fileUploadFormatValidate", "Invalid file", function (value) {
      if (this.parent.contentType === "description") {
        return true;
      } else if (value.length === 0) {
        return false;
      } else if (
        value.length > 0 &&
        validateFileExt(value[0].name, [
          "jpeg",
          "jpg",
          "png",
          "doc",
          "docx",
          "pdf",
          "xlsx",
          "msg",
          "csv",
          "txt",
        ])
      ) {
        return true;
      } else {
        return false;
      }
    }),
});

// Comparison Validation
export function comparisonValidate(values: any) {
  return handleErrorMeg(values, comparisonSchema);
}

const comparisonSchema = object().shape({
  vendorName: string().required("Vendor name cannot be empty"),
  buyerCompareType: string().required("Choose type cannot be empty"),
  vendorCompareType: string().required("Choose type cannot be empty"),
  buyerFileAttachment: mixed()
    .test("fileUploadFormatValidate", "Invalid file", function (value) {
      if (value.length === 0) {
        return true;
      } else if (value.length > 0 && validateFileExt(value[0].name, EXT_TYPE)) {
        return true;
      } else {
        return false;
      }
    })
    .test("fileUploadValidate", "Upload file canot be empty", function (value) {
      return this.parent.buyerCompareType === "description" || value.length > 0
        ? true
        : false;
    }),
  vendorFileAttachment: mixed()
    .test("fileUploadFormatValidate", "Invalid file", function (value) {
      if (value.length === 0) {
        return true;
      } else if (value.length > 0 && validateFileExt(value[0].name, EXT_TYPE)) {
        return true;
      } else {
        return false;
      }
    })
    .test("fileUploadValidate", "Upload file canot be empty", function (value) {
      return this.parent.vendorCompareType === "description" || value.length > 0
        ? true
        : false;
    }),
  buyerDescription: array().test(
    "descriptionValidate",
    "Description cannot be empty",
    function (value) {
      return this.parent.buyerCompareType === "fileupload" ||
        (value && value.length > 0)
        ? true
        : false;
    }
  ),
  vendorDescription: array().test(
    "descriptionValidate",
    "Description cannot be empty",
    function (value) {
      return this.parent.vendorCompareType === "fileupload" ||
        (value && value.length > 0)
        ? true
        : false;
    }
  ),
});
