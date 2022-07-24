import { FC, useEffect, useRef, useState } from 'react'
import styles from './chat.module.scss'
import icon from '../../assets/images/user2.png'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'

export type MessageType = {
	message: string
	photo: string
	userId: number
	userName: string
}

const Chat: FC = () => {
	const navigate = useNavigate()
	const [messages, setMessages] = useState<MessageType[]>([])
	const [inputValue, setInputValue] = useState('')
	const [sendMess, setSendMess] = useState(false)
	const wsChannel = useRef<any>()
	const lastMessage = useRef<HTMLDivElement | null>(null)
	const { authUser } = useAppSelector(state => state.authReducer)
	useEffect(() => {
		if (!authUser.login) {
			navigate('/login', { replace: true })
		}
	}, [authUser.login])

	useEffect(() => {
		if (!authUser.login) {
			return
		}
		wsChannel.current = new WebSocket(
			'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
		)
		const listener = wsChannel.current.addEventListener(
			'message',
			(event: any) => {
				lastMessage.current?.scrollIntoView()
				setMessages(prev => [...prev, ...JSON.parse(event.data)])
			}
		)

		return () => {
			wsChannel.current.removeEventListener('message', listener, false)
		}
	}, [setSendMess])

	useEffect(() => {
		lastMessage.current?.scrollIntoView()
	}, [lastMessage.current])

	const sendMessage = () => {
		if (!inputValue) return
		setSendMess(true)
		wsChannel.current.send(inputValue)
		setInputValue('')
		setSendMess(false)
	}

	return (
		<div className={styles.chatPage}>
			<div className={styles.chat}>
				<div className={styles.chatMain}>
					{messages.map((mess, index) => (
						<div key={index} className={styles.message}>
							<div className={styles.messageTitle}>
								<img src={mess.photo ? mess.photo : icon} alt='ava' />
								<span>{mess.userName}</span>
							</div>
							<span>{mess.message}</span>
						</div>
					))}
					<div className={styles.lastMess} ref={lastMessage}>
						Samurai Chat 2022
					</div>
				</div>
			</div>

			<div className={styles.formSendMessage}>
				<input
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					type='text'
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
		</div>
	)
}

export default Chat
