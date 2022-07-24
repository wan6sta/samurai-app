import styles from './preloader.module.scss'

const Preloader = () => {
	return (
		<div className={styles.ldsRollerWrap}>
			<div className={styles.ldsRoller}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Preloader
