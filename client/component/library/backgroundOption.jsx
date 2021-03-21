import React, { useState } from 'react';

const Background = ({ status, searchValue }) => {
  const [type, updateType] = useState('');
  const [search, updateSearch]=useState('')

  const modalUpdate = () => {
    if (!status) {
      return 'container modalPosition hidden';
    }
    return 'container modalPosition';
  };



  return (
    <div className={modalUpdate()}>
      <div className="rowModal">
        <div className="column">
          <form className="airportForm d-flex flex-column" onChange={e => searchValue(e)}>
            <label className="labelStyle"> Airport Code:</label>
            <input className="inputStyle" type="text" name="airportCode"  placeholder="ocean" required></input>
            <button type="button" className="btn btn-primary btnSize">submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Background;
