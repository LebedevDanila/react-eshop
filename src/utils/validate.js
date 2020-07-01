export default function Validate(component, values) {
	let errors = {}

	switch(component) {
		case 'login':
			if(values.name.length < 3) {
				errors = {
					...errors,
					name: 'Пожалуйста введите больше значений'
				}
			}
			if(values.password.length < 7) {
				errors = {
					...errors,
					password: 'Слишком короткий пароль!'
				}		
			}

			return errors;
		case 'register':
			if(values.name.length < 3) {
				errors = {
					...errors,
					name: 'Пожалуйста введите больше значений'
				}
			}
			if(!values.email.includes('@')) {
				errors = {
					...errors,
					email: 'Некорректный email'
				}		
			}
			if(values.password.length < 7) {
				errors = {
					...errors,
					password: 'Слишком короткий пароль!'
				}		
			}
			/*if(!values.agreement) {
				errors = {
					...errors,
					agreement: 'Чтобы зарегестрироваться примите соглашение!'
				}	
			}*/
			return errors
		default:
			return errors
	}
}