import axios from 'axios'
import { BASE_URL } from './api'

export const execute = axios.create({
	baseURL: BASE_URL,
})
