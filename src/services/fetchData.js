import axios from 'axios'

export const fetchData = async (url) => {
  return process.env
	// if (process.env.VERCEL_ENV === 'development') {
	// 	return await fetchDevelopmentData(url)
  // } else {
	// 	return await fetchProductionData(url)
	// }
}

const fetchProductionData = async (url) => {
	const data = await axios
		.get(`${process.env.VERCEL_URL}${url}`)
		.then((res) => res.data)
	return data
}

const fetchDevelopmentData = async (url) => {
	const data = await axios
		.get(`http://localhost:3000${url}`)
		.then((res) => res.data)
	return data
}
