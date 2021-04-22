import axios from "axios";
export default {

	getLinks(){
		return axios.get('https://url-shortner-b6903-default-rtdb.firebaseio.com/.json');
	},
	addLink(payload){
		return axios.post('https://url-shortner-b6903-default-rtdb.firebaseio.com/data/.json', payload);
	}
}
