import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
    username: yup. 
    string()
    .min(3, ({min}) => `Username must be at least ${min} characters long`),

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
})