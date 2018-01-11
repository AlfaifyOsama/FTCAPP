import axios from 'axios';

  const Login = (id, pass) => {
    axios.post('http://10.131.192.197:8000/v1/users/login', {
      student_id: id,
      password: pass
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  export default Login;
