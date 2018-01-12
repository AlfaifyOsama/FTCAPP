import axios from 'axios';
import { AsyncStorage } from 'react-native';

  const Login = (id, pass) => {
    axios.post('http://10.131.192.197:8000/v1/users/login', {
      student_id: id,
      password: pass
    })
      .then(() => {
        try {
            AsyncStorage.setItem('id', id);
          } catch (error) {
            return false;
          }
        return true;
      })
      .catch(() => {
        return false;
      });
  };

  export default Login;
