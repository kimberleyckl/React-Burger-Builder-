import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-burger-kimikikiwi-default-rtdb.firebaseio.com/"
})


export default instance;