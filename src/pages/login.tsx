import React, {useState, useEffect} from 'react'
import {Formik, Form, Field, FormikHelpers} from 'formik';
import * as Yup from 'yup'
import {Link, useHistory} from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import {login} from "../api/firebase-api";


interface Values {
    email: string,
    password:string
}
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email.')
        .required('Enter your email.'),
    password: Yup.string()
        .min(6, 'Password is too short.')
        .max(50, 'Password is too long.')
        .required('Enter your password.'),
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
        document.title = 'Your crypto | Login'
    }, [])

    return (

        <div className="container w-50 bg-light my-3 pb-2">
            <h1 className="text-center">Login</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={async ({email, password}: Values, {resetForm}: FormikHelpers<Values>) => {
                            try {
                                await login(email, password)
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
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        aria-label="Enter your password"
                                        type="password"
                                        placeholder="password..."
                                        className="form-control"
                                    />
                                    {errors.password && touched.password ? (
                                        <small className="form-text text-danger">{errors.password}</small>
                                    ) : null}
                                </div>
                                <div className="text-center my-2">
                                <button
                                    type="submit" className={`btn btn-primary w-100
                                  ${(errors.email || errors.password)&& ' btn-secondary'}
                                `}>Login
                                </button>
                                </div>
                            </Form>)}
                    </Formik>
                <div className="bg-white">
                    <small className="-2">
                        Don`t have an account? {` `}
                        <Link to={ROUTES.SIGNUP}>
                            Sign up
                        </Link>
                    </small>
                </div>
        </div>
    )
}
