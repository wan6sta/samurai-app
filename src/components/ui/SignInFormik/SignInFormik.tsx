import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import styles from './signInFormik.module.scss'
import { useDispatch } from 'react-redux'
import { setAuthSignIn } from '../../../store/reducers/authSlice/authSlice-actions'
import { useAppSelector } from '../../../hooks/redux'
import { useNavigate } from 'react-router-dom'

const validate = (values: any) => {
	const errors: any = {}

	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}

	if (!values.password) {
		errors.password = 'Required'
	} else if (values.password.length < 3) {
		errors.password = 'Invalid password'
	}

	return errors
}

const SignInFormik = () => {
	const dispatch = useDispatch<any>()
	const { isLogin, authUser } = useAppSelector((state) => state.authReducer)
	const navigate = useNavigate()

	useEffect(() => {
		if (isLogin) {
			navigate(`/profile/${authUser.id}`, { replace: true })
		}
	}, [isLogin])

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		validate,
		onSubmit: (values) => {
			dispatch(setAuthSignIn(values.email, values.password, values.rememberMe))
		}
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<label htmlFor="email">Email Address</label>
			<input
				className={
					formik.errors.email === 'Invalid email address'
						? styles.error
						: undefined
				}
				id="email"
				name="email"
				type="email"
				onChange={formik.handleChange}
				value={formik.values.email}
			/>

			<label htmlFor="password">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				onChange={formik.handleChange}
				value={formik.values.password}
			/>

			<div className={styles.rememberMeWrap}>
				<label htmlFor="rememberMe">Remember Me</label>
				<input
					className={styles.rememberMe}
					id="rememberMe"
					name="rememberMe"
					type="checkbox"
					onChange={formik.handleChange}
					checked={formik.values.rememberMe}
				/>
			</div>
			<button type="submit">Sign in</button>
		</form>
	)
}

export default SignInFormik
