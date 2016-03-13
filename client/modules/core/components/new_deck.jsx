import React from 'react';

const NewDeck = ({repo, pullRequests, syncPullRequests, createDeck}) => {
  function handleSync(e) {
    e.preventDefault();
    syncPullRequests(repo._id);
  }

  return (
    <div className="container">
       <div className="row">
         <div className="col-xs-8 col-xs-offset-2">
           <div className="new-sd-form">
             <input type="text" placeholder="slide deck name" />
             
           </div>
         </div>
       </div>
    </div>
  );
};

export default NewDeck;
