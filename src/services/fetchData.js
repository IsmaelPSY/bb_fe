import axios from 'axios'

export const fetchData = async (url) => {
	if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'development') {
		return await fetchDevelopmentData(url)
  } else {
		return await fetchProductionData(url)
	}
}

const fetchProductionData = async (url) => {
	const data = await axios
		.get(`${process.env.NEXT_PUBLIC_VERCEL_URL}${url}`)
		.then((res) => res.data)
	return data
}

const fetchDevelopmentData = async (url) => {
	const data = await axios
		.get(`http://localhost:3000${url}`)
		.then((res) => res.data)
	return data
}