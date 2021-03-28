import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-52efc-default-rtdb.firebaseio.com/'
})