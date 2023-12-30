import axios from 'axios'

export const fetchData = async (url) => {
	if (process.env.NODE_ENV === 'production') {
		return await fetchProductionData(url)
	} else {
		return await fetchDevelopmentData(url)
	}
}

const fetchProductionData = async (url) => {
	const data = await axios
		.get(`${process.env.PRODUCTION_APP_URL}${url}`)
		.then((res) => res.data)
	return data
}

const fetchDevelopmentData = async (url) => {
	const data = await axios
		.get(`http://localhost:3000${url}`)
		.then((res) => res.data)
	return data
}
