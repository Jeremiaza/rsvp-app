import axios from 'axios';
const baseUrl = '/api/guest'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newGuest => {
    const response = await axios.post(baseUrl, newGuest)
    return response.data

}

const update = async (newObject) => {
    const response = await axios.put(baseUrl, newObject)
    return response.data
}

export default { getAll, create, update }