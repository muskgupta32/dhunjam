import React, { useEffect, useState } from 'react';
import './Screen1.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';

let Screen1 = () => {
  const { id, setSharedId } = useData();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('https://stg.dhunjam.in/account/admin/login', formData);

      if (!response || !response.data || !response.data.data || !response.data.data.id) {
        console.error('Invalid response data:', response);
        return;
      }

      const newId = response.data.data.id;

      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);
      console.log('Login successful', response.data);
      console.log('Response id:', newId);

      
      setSharedId(newId);

      
      navigate('/dhunjam');
    } catch (error) {
      
      console.error('Login failed', error);
      console.error('Error Status:', error.response ? error.response.status : 'N/A');
      console.error('Error Message:', error.message);
    }
  };

  useEffect(() => {
    console.log('Value of id in useEffect screen1', id); // 4
  }, [id]);

  return (
    <div className="card">
      <div className="heading">Venue Admin Login</div>

      <form onSubmit={handleLogin} className="inputs">
        <input type="text" name="username" value={formData.username} placeholder="Username" onChange={handleInputChange} />
        <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleInputChange} />
        <button type="submit" className="signin">
          Sign in
        </button>
      </form>

      <div className="reg">
        <a href="">New Registration ?</a>
      </div>
    </div>
  );
};

export default Screen1;
