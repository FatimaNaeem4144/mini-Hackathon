import {
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
     database,
    set,ref,update
} from './config.js';
// Loader

const spiner = document.getElementById('spiner');

function showLoader() {
	spiner.style.display = 'flex';
}
function hideLoader() {
	spiner.style.display = 'none';
}
// Sign  Up Button
let flag=true;
const signupBtn = document.getElementById('signupBtn');

const signup = () => {
	let fullName = document.getElementById('fullName');
	let Password = document.getElementById('password');
	let email = document.getElementById('email');

	const user = {
		fullName: fullName.value,
		email: email.value,
		Password: Password.value,
	};
	if (!user.fullName || !user.email  || !user.Password) {
		Swal.fire('Please fill out  all fields');
		return;
	}
	flag = false;

    showLoader();
	createUserWithEmailAndPassword(auth, user.email, user.Password)
		.then((res) => {
            const user = res.user;
			console.log(user);
			set(ref(database,'users/'+user.uid),{
                fullName : fullName.value,
                email : email.value,
                Password : Password.value
            })
            hideLoader();
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Admin Account has been created',
				showConfirmButton: false,
				timer: 1500,
			});

			
			setTimeout(() => {
				flag = true;
				location.href = '/admindashboard.html';
			}, 2000);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			let errorText = errorMessage;
			switch (errorMessage) {
				case 'Firebase: Error (auth/invalid-email).':
					errorText = 'Invalid Email';
					break;
				case 'Firebase: Error (auth/email-already-in-use).':
					errorText = 'This email is already in use. Try different';
					break;
				default:
					errorText = errorText;
			}
            hideLoader();
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: errorText,
			});
		});
};
signupBtn && signupBtn.addEventListener('click', signup);

// Sign IN

const signinBtn = document.getElementById('signInBtn');

const signIn = () => {
	let email = document.getElementById('email');
	let password = document.getElementById('password');
    

	if ((!email.value, !password.value)) {
		Swal.fire('Please fill out  all fields');
		return;
	}
	flag = false;
	showLoader();
	signInWithEmailAndPassword(auth, email.value, password.value)
		.then((res) => {
            const dt = new Date();
			const user = res.user;
			console.log(user);
            update(ref(database,'users/'+user.uid),{
                lastLogin : dt,
            })
            if (email.value == "fatimanaeem969@gmail.com") {
                hideLoader();
                
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'You are an admin',
                    showConfirmButton: false,
                    timer: 1500,
                });
                       
                setTimeout(() => {
                    flag = true;
                    location.href = "/admindashboard.html";
                }, 2000);
                return;
            }
            else{
                hideLoader();
                Swal.fire('You are not a Admin');
                return;
            }        
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			let errorText = errorMessage;
			switch (errorMessage) {
				case 'Firebase: Error (auth/wrong-password).':
					errorText = 'Invalid Password';
					break;
				case 'Firebase: Error (auth/user-not-found).':
					errorText = 'Email is not correct';
					break;
				default:
					errorText = 'Something went wrong';
			}
			hideLoader();
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: errorText,
			});
		});
};
signinBtn && signinBtn.addEventListener('click', signIn);


