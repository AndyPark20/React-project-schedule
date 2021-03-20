import React, { useState, useEffect } from 'react';
import Column from './component/column';
import Navigation from './options';
import Background from './component/library/backgroundOption';

const App = () => {
  const [hamburger, hamburgerUpdate] = useState(false);
  const [naviOption, naviOptionUpdate] = useState('');
  const [modalStatus, modalStatusUpdate] = useState(false);

  const change = e => {
    console.log(e.target.className);
    if (!hamburger && e.target.className === 'fas fa-bars') {
      hamburgerUpdate(true);
    }
    if (!hamburger && e.target.className === 'fas fa-bars' && e.target.className === 'rowModal') {
      hamburgerUpdate(false);
    }

    if (e.target.className === 'check') {
      naviOptionUpdate('check');
    } else {
      naviOptionUpdate('');
    }

  };

  const modalChange = () => {
    if (!modalStatus) {
      modalStatusUpdate(true);
    } else {
      modalStatusUpdate(false);
    }
  };

  const userSearch = e => {
    e.preventDefault();
    if (e.key === 'Enter') {
      fetch(`/api/picture/${e.target.value}/${'landscape'}/${'medium'}`)
        .then(res => res.json())
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.error(err);
        });

    }
  };

  return (
    <div style={{
      backgroundImage: 'url(https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1440&w=2500)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      overflow: 'hidden',
      height: '100vh'
    }} className="cursorMain" onClick={e => change(e)}>
      <div className="columnCustom">
        <div>
          <Background status={modalStatus} searchValue={userSearch} />
        </div>
        <div className="hamburgerStyle">
          <Navigation values={hamburger} class={naviOption} modalUpdate={modalChange} />
        </div>
        <Column />
      </div>

    </div>
  );
};

export default App;
