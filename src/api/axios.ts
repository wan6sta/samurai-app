import axios from 'axios'

export const axiosSocial = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0'
})
