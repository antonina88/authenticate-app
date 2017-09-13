import { observable, action } from 'mobx';
import jwt from 'jwt-simple';

class UsersStore {
	@observable token = '';
	@observable isLoggingIn = false;
	@observable isFetching = false;
	@observable Auth = '';
	@observable error = null;
	@observable successMessage = '';
	@observable errorMessage = '';

	@action auth(Username, Password) {
		this.isFetching = true;
		fetch('http://localhost:8000/login', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ Username, Password })
		})
		.then(res => res.json())
		.then(res => {
			this.isFetching = false;
			this.Auth = res.Auth;
			if (this.Auth === 'Logged') {
				this.token = jwt.encode({Username, Password}, 'geekTeam');
				this.successMessage = 'Succesful logged';
				this.isLoggingIn = true;
			} else if (this.Auth === 'Denied') {
				this.errorMessage = 'Login or password is incorrect';
		    }
		})
		.catch(err => {
			this.error = err;
		});
	}
}

const store = new UsersStore();
export default store;
