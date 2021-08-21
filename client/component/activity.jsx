import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { render } from 'react-dom';

const Activity = ({ characters, renderActivity, updateMasterCharacter, masterCharacter, cardNumber, columnNumber }) => {

  const [userLog, updateUserLog] = useState('');
  const [valueLog, updateValueLog] = useState('');
  const [userLogSubmit, updateUserLogSubmit] = useState([]);
  const [userEdit, updateUserEdit] = useState(false);
  const [editIndexNumber, updateEditIndexNumber] = useState(null);
  const [saveButton, updateSaveButton] = useState(false);
  const [renderActivityItem, updateRenderActivity] = useState(false);
  // track which activity user wants to edit via index number in the array
  const [currentIndex, updateCurrentIndex] = useState(null);

  // store selected activity object that needs to be updated
  const [selectedActivityObject, updateSelectedActivityObject] = useState({});

  // useEffect(() => {
  //   console.log(masterCharacter);
  // });

  useEffect(() => {
    if (userEdit) {
      updateUserLog(masterCharacter[columnNumber].list[cardNumber].activity[editIndexNumber]);
    }
  }, [userEdit]);

  const userActivity = e => {
    e.preventDefault();
    if (!userEdit) {
      updateUserLog({ record: e.target.value, time: Date.now() });
    } else {
      masterCharacter[columnNumber].list[cardNumber].activity.splice(editIndexNumber, 1, { record: e.target.value, time: Date.now() });
      updateUserLog({ record: e.target.value, time: Date.now() });

    }
    if (e.target.value !== '') {
      updateSaveButton(true);
    } else {
      updateSaveButton(false);
    }
  };

  // When clicked "Edit" for activity
  const userEditActivity = index => {
    updateSelectedActivityObject(masterCharacter[columnNumber].list[cardNumber].activity[index]);
    updateUserEdit(true);
    updateEditIndexNumber(index);
    updateValueLog(userLogSubmit[index]);
    updateCurrentIndex(index);

    // update user log
    updateUserLog({ record: masterCharacter[columnNumber].list[cardNumber].activity[index].record });

  };

  const deleteActivityLog = async activityId => {
    // use Delete method to remove the activity in the backend
    const deleteActivity = await fetch(`/api/deleteActivity/${activityId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
  };

  const renderLog = () => {
    if (renderActivity && masterCharacter[columnNumber].list[cardNumber].activity) {
      const data = masterCharacter[columnNumber].list[cardNumber].activity.map((values, index) => {
        return (
          <div key={index} className="d-flex align-items-center">
            <i className="far fa-comment-dots icon"></i>
            <h5 className="pl-2 activity-info">{values.record}</h5>
            <Moment className="timeFontSize pl-2" format='YYYY/MM/DD hh:mm:ss'>{parseInt(values.time)}</Moment>
            <h6 className="pl-2 editActivity" onClick={() => userEditActivity(index)}>Edit</h6>
            <h6 className="pl-2 editActivity" onClick={() => deleteActivityLog(values.activityId)}>Delete</h6>
          </div>
        );
      });
      return data;
    }
  };

  // When user clicks SAVE button next to Activity TextArea
  const userSave = async e => {
    e.preventDefault();
    if (!userEdit && userLog.record) {
      // Properties toa dd from the selected values of MasterCharacter object
      const cardId = masterCharacter[columnNumber].list[cardNumber].cardId;
      const cardName = masterCharacter[columnNumber].list[cardNumber].card;
      const list = masterCharacter[columnNumber].id;
      const activity = masterCharacter[columnNumber].list[cardNumber].activity;

      // Create an object that holds the updated activity log which will be sent to the backend for SQL update
      const copiedActivity = {
        cardId: cardId,
        cardName: cardName,
        list: list,
        cardNumber: cardNumber,
        activity: activity
      };

      updateUserLogSubmit(masterCharacter[columnNumber].list[cardNumber].activity);
      updateUserLog({ record: '' });
      updateUserEdit(false);
      updateRenderActivity(true);

      try {
        const activityPost = await fetch('/api/activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(copiedActivity)
        });
        const result = await activityPost.json();

        // once activity has been updated in the backend
        if (result) {
          try {
            const data = await fetch('/api/retrieve');
            const resultsWithUpdatedActivity = await data.json();

            // Make a copy of the masterCharacter
            const copiedMastercharacter = masterCharacter.concat();

            // loop master character and if the id equals to the column name of the returned promise, push the values form resultWithUpdatedActivity to the values of the object's list.
            copiedMastercharacter.forEach(values => {

              if (values.id === resultsWithUpdatedActivity.column) { values.list.push(resultsWithUpdatedActivity[0]); }
            });
            updateMasterCharacter(copiedMastercharacter);
          } catch (err) {
            console.error(err);
          }
        }

      } catch (err) {
        console.error(err);
      }
      // For editing Existing Activity
    } else {
      updateUserLogSubmit(userLogSubmit);
      updateUserEdit(false);
      const updatedActivity = masterCharacter[columnNumber].list[cardNumber].activity[currentIndex];
      try {
        const editActivity = await fetch('/api/editActivity', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify([updatedActivity, selectedActivityObject])
        });
        // return promise
        const result = await editActivity.json();

        // if promised has been successfully returned, updateMasterCharacter
        if (result) {
          try {
            const data = await fetch('/api/retrieve');
            const result = await data.json();
            // push it to characters array of objects.
            const copiedObject = characters.concat();
            // received Data from back end
            const copiedObjectUpdate = result;
            // Use map method to update the object into an array.
            const updateObject = copiedObject.map(values => {
              copiedObjectUpdate.forEach(copyValues => {
                if (values.id === copyValues.column) {
                  values.list.push({ card: copyValues.card, activity: copyValues.activity, cardId: copyValues.cardId, description: copyValues.description });
                }
              });
              return values;
            });
            updateMasterCharacter(updateObject);
          } catch (err) {
            console.error(err);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // User Cancels editing Activity
  const editActivityCancel = async () => {
    updateUserEdit(false);
    updateSaveButton(false);
    updateUserLog({ record: '' });

    // call backend to update masterCharacter
    try {
      const data = await fetch('/api/retrieve');
      const result = await data.json();
      // push it to characters array of objects.
      const copiedObject = characters.concat();
      // received Data from back end
      const copiedObjectUpdate = result;
      // Use map method to update the object into an array.
      const updateObject = copiedObject.map(values => {
        copiedObjectUpdate.forEach(copyValues => {
          if (values.id === copyValues.column) {
            values.list.push({ card: copyValues.card, activity: copyValues.activity, cardId: copyValues.cardId, description: copyValues.description });
          }
        });
        return values;
      });
      updateMasterCharacter(updateObject);
    } catch (err) {
      console.error(err);
    }
  };

  // Save user Text on Activity
  const renderInputText = () => {
    updateUserLog({ record: '' });
  };

  const saveButtonRender = () => {
    if (saveButton) {
      return 'btn btn-success mt-2 ml-2';
    }
    return 'hidden';
  };

  const cancelButtonRender = () => {
    if (saveButton) {
      return 'btn btn-danger mt-2 ml-2';
    }
    return 'hidden';
  };
  return (
    <div>
      <div className="d-flex align-items-center pl-2">
        <i className="fas fa-chart-line"></i>
        <h3 className="pl-2">Activity</h3>
      </div>
      <form onChange={e => userActivity(e)} className="d-flex" required>
        <textarea className="form-control w-75" rows="1" value={userLog.record} required onChange={renderInputText}></textarea>
        <button type="submit" className={saveButtonRender()} onClick={e => userSave(e)}>Save</button>
        <button type="button" className={cancelButtonRender()} onClick={editActivityCancel}>Cancel</button>
      </form>
      <div className="pl-4">
        {renderLog()}
      </div>
    </div>
  );
};

export default Activity;

// const cardInfo = await fetch('/api/cardIdRetrieve');
// const returnedPromisedCardInfo = await cardInfo.json();
// const cardDataResult = returnedPromisedCardInfo.rows;
// // loop thru CardDataResult and match card name, if it matches add cardId to the appropriate object
// cardDataResult.forEach((resultValues, index) => {
//   if (resultValues.card === copiedActivity.cardName) {
//     copiedActivity.activity.forEach((activityValue, indexValue) => {
//       activityValue.mainCardId = resultValues.cardId;
//     });
//   }
// });
