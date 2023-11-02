import axios from 'axios'

const axioInstace = axios.create({
    baseURL: 'http://127.0.0.1:3333/api',
    headers: {
        'Content-Type': 'application/json'
    }

})

export default axioInstace