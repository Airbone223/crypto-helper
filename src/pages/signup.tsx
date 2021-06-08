import React, {useState, useEffect} from 'react'
import {Formik, Form, Field, FormikHelpers} from 'formik';
import * as Yup from 'yup'
import {Link, useHistory} from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import {createUser} from "../api/firebase-api";


interface Values {
    email: string,
    password: string,
    repeatedPassword: string,
    username: string
}
const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'username is too short. It must be at least 2 characters.')
        .max(50, 'username is too long.')
        .required('Enter your username.'),
    email: Yup.string()
        .email('Invalid email.')
        .required('Enter your email.'),
    password: Yup.string()
        .min(6, 'Password is too short. It must be at least 6 characters.')
        .max(50, 'Password is too long.')
        .required('Set password'),
    repeatedPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords are not equal.')
        .required('Repeat password.')
})

export default function Login() {
    const history = useHistory()
    const [loginError, setError] = useState<string | null>(null)
    const setLoginError = (value: string) => {
        setError(value)
        const timeout = setTimeout(() => {
            setError(null)
            clearInterval(timeout)
        }, 4000)
    }
    useEffect(() => {
        document.title = 'Your crypto | Signup'
    }, [])

    return (
        <div className="container w-50 bg-light my-3 pb-2">
            <h1 className="text-center">Sign up</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    username: '',
                    repeatedPassword: ''
                }}
                validationSchema={LoginSchema}
                onSubmit={async ({email, password, username, repeatedPassword}: Values,
                                 {resetForm}: FormikHelpers<Values>) => {
                    try {
                        await createUser(email, password, username)
                        history.push(ROUTES.DASHBOARD)
                    } catch ({message}) {
                        setLoginError(message)
                        resetForm()
                    }
                }}
            >
                {({errors, touched}) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                name="email"
                                autoComplete="off"
                                aria-label="Enter your email address"
                                type="email"
                                placeholder="email..."
                                className="form-control"
                            />
                            {errors.email && touched.email ? (
                                <small className="form-text text-danger">{errors.email}</small>
                            ) : null}
                            {loginError ? (
                                <small className="form-text text-danger">{loginError}</small>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">username</label>
                            <Field
                                name="username"
                                aria-label="Enter your username"
                                type="text"
                                autoComplete="off"
                                placeholder="username..."
                                className="form-control"
                            />
                            {errors.username && touched.username ? (
                                <small className="form-text text-danger">{errors.username}</small>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                name="password"
                                aria-label="Enter your password"
                                type="password"
                                autoComplete="off"
                                placeholder="password..."
                                className="form-control"
                            />
                            {errors.password && touched.password ? (
                                <small className="form-text text-danger">{errors.password}</small>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatedPassword">Repeat password</label>
                            <Field
                                name="repeatedPassword"
                                aria-label="Repeat your password"
                                type="password"
                                autoComplete="off"
                                placeholder="repeat password..."
                                className="form-control"
                            />
                            {errors.repeatedPassword && touched.repeatedPassword ? (
                                <small className="form-text text-danger">{errors.repeatedPassword}</small>
                            ) : null}
                        </div>
                        <div className="text-center my-2">
                            <button
                                type="submit" className={`btn btn-primary w-100
                                  ${(errors.email || errors.password || errors.repeatedPassword
                                || errors.username)
                            && ' btn-secondary'}
                                `}>Sign up
                            </button>
                        </div>
                    </Form>)}
            </Formik>
            <div className="bg-white">
                <small className="-2">
                   Already have an account? {` `}
                    <Link to={ROUTES.LOGIN}>
                        Login
                    </Link>
                </small>
            </div>
        </div>
    )
}
