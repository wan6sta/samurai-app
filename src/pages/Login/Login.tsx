import { FC } from 'react'
import styles from './login.module.scss'
import SignInFormik from '../../components/ui/SignInFormik/SignInFormik'

const Login: FC = () => {
	return (
		<div className={styles.login}>
			<div className={styles.formWrap}>
				<span className={styles.title}>Sign in to Samurai</span>
				<div className={styles.form}>
					<SignInFormik />
				</div>
			</div>
		</div>
	)
}

export default Login
