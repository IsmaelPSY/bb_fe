import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: process.env.BASE_URL
})


export const getAllProducts = async () => {
	return (await axiosInstance.get('/api/products')).data
}

export const getProductById = async (id) => {
	return (await axiosInstance.get(`/api/products/${id}`)).data
}