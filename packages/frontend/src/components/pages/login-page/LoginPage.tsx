import * as React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { login, register } from '../../../store/userSlice';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Welcome To Dashboard Builder!</h2>
                <div className="form-group">
                  <label htmlFor="username">Username</label>

                  <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>

                  <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button className="btn btn-primary btn-block"
                          onClick={() => dispatch(login({ username, password }))}
                  >
                    Login
                  </button>

                  <button className="btn btn-primary btn-block"
                          onClick={() => dispatch(register({ username, password }))}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;