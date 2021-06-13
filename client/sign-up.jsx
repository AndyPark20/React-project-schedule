
import React, { useState, useEffect } from 'react';

const signUp = () => {
  // For the input Titles
  const [userInfo, updateUserInfo] = useState({ firstname: '', lastname: '', userName: '', password: '', confirmPassword: '' });
  const [firstname, updateFirstName] = useState('Firstname:');
  const [lastName, updateLastName] = useState('Lastname:');
  const [userName, updateUserName] = useState('Username:');
  const [password, updatePassword] = useState('Password:');

  // For input value control
  const [firstNameValue, updateFirstNameValue] = useState('');
  const [lastNameValue, updateLastNameValue] = useState('');
  const [userNameValue, updateUserNameValue] = useState('');
  const [passwordValue, updatePasswordValue] = useState('');
  const [confirmPasswordValue, updateConfirmPasswordValue] = useState('');
  // For Red box and font control
  const [confirmPassword, updateConfirmPassword] = useState('Confirm Password:');
  const [firstNameStatus, updateFirstNameStatus] = useState(false);
  const [lastNameStatus, updateLastNameStatus] = useState(false);
  const [usernameStatus, updateUserNameStatus] = useState(false);
  const [passwordStatus, updatePassWordStatus] = useState(false);
  const [confirmPasswordStatus, updateConfirmPasswordStatus] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
  };

  useEffect(() => {

  });

  function handleChange(e) {
    const name = e.target.name;
    const input = e.target.value;
    userInfo[name] = input;
    updateUserInfo(userInfo);

    // Values for the input
    if (name === 'firstname') {
      console.log('true');
      updateFirstNameStatus(false);
      updateFirstName('Firstname:');
      updateFirstNameValue(input);
    }

    if (name === 'lastname') {
      updateLastNameStatus(false);
      updateLastName('Lastname:');
      updateLastNameValue(input);
    }

    if (name === 'userName') {
      updateUserNameStatus(false);
      updateUserName('Username Empty!');
      updateUserNameValue(input);
    }

    if (name === 'password') {
      updatePassWordStatus(false);
      updatePassword('Password:');
      updatePasswordValue(input);
    }

    if (name === 'confirmPassword') {
      updateConfirmPasswordStatus(false);
      updateConfirmPassword('Confirm Password:');
      updateConfirmPasswordValue(input);
    }

  }

  const submitForm = () => {
    if (!userInfo.firstname) {
      updateFirstName('Firstname Empty!');
      updateFirstNameStatus(true);
    }
    if (!userInfo.lastname) {
      updateLastName('Lastname Empty!');
      updateLastNameStatus(true);
    }
    if (!userInfo.userName) {
      updateUserName('Username Empty!');
      updateUserNameStatus(true);
    }
    if (!userInfo.password) {
      updatePassword('Password Empty!');
      updatePassWordStatus(true);
    }
    if (!userInfo.confirmPassword) {
      updateConfirmPassword('Password Empty!');
      updateConfirmPasswordStatus(true);
    }
  };

  const redBox = () => {
    return 'mt-2 border-error';
  };

  const redFont = () => {
    return 'mt-2 font-error';
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <div className="type-column d-flex flex-column align-items-center">
          <form onSubmit={handleSubmit} className="d-flex flex-column w-50">
            {/* Firstname */}
            <label htmlFor="firstname" className={firstNameStatus ? redFont() : 'mt-2'}>{firstname}</label>
            <input type="text" className={firstNameStatus ? redBox() : ''} name="firstname" value={userInfo.firstname} onChange={handleChange}></input>
            {/* lastname */}
            <label htmlFor="lastname" className={lastNameStatus ? redFont() : 'mt-2'}>{lastName}</label>
            <input name="lastname" className={lastNameStatus ? redBox() : ''} type="text" value={userInfo.lastname} onChange={handleChange}></input>
            {/* Username */}
            <label htmlFor="userName" className={usernameStatus ? redFont() : 'mt-2'}>{userName}</label>
            <input name="userName" type="text" className={usernameStatus ? redBox() : ''} value={userInfo.userName} onChange={handleChange}></input>
            {/* Password */}
            <label htmlFor="password" className={passwordStatus ? redFont() : 'mt-2'}>{password}</label>
            <input name="password" type="password" className={passwordStatus ? redBox() : ''} value={userInfo.password} onChange={handleChange}></input>
            {/* re-enter password */}
            <label htmlFor="confirmPassword" className={confirmPasswordStatus ? redFont() : 'mt-2'}>{confirmPassword}</label>
            <input name="confirmPassword" type="password" className={confirmPasswordStatus ? redBox() : ''} value={userInfo.confirmPassword} onChange={handleChange}></input>
            <div className="mt-2 d-flex justify-content-end custom-margin">
              <button name="lastname" type="submit" className="btn btn-success" onClick={submitForm}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signUp;
