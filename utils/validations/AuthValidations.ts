import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
    username: yup. 
    string()
    .min(3, ({min}) => `Username must be at least ${min} characters long`)
    .required('Username is required'),

    password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required !'),
});


export const signUpValidationSchema = yup.object().shape({
    username: yup. 
    string()
    .min(3, ({min}) => `Username must be at least ${min} characters long`),
    
    email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),

    password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),

    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),

    aadharNo: yup
    .string()
    .max(12, 'Aadhar number must be 12 digits')
    .min(12, 'Aadhar number must be 12 digits')
    .required('Aadhar number is required'),
})

export const OTPValidationSchema = yup.object().shape({
    otp: yup. 
    string()
    .max(4, 'OTP must be 4 digits')
    .min(4, 'OTP must be 4 digits')
    .required('OTP is required'),
});