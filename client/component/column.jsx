import React from 'react';
import Item from './item';

const Column = ({ values: { list, id } }) => {

  const listing = () => {

    const controlDragStart = (e, values) => {
      e.dataTransfer.setData('id', values);
    };

    const renderIt = list.map((values, index) => {
      return (
          <div key={index} draggable onDragStart={e => controlDragStart(e, values)} >
            <Item value={values.name} img={values.img} />
          </div>
      );
    });
    return renderIt;
  };

  return (
   <div className="container">
      <div className="row d-flex flex-column align-items-center">
       <div className="col-4">
         <h2>{id}</h2>
       </div>
        <div className="border border-danger w-50 custom">
        {listing()}
      </div>
     </div>
   </div>

  );

};

export default Column;
