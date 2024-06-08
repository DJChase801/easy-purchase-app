import React from 'react';
import { observer } from 'mobx-react';

const NotFoundPage = ({ model }: any) => {
  return (
    <div>
      <div className="stage">
        <div className="title">
          <div>404 Oops</div> 
          <br />
          <span className="fancy">
            Page Not Found
          </span>
        </div>
        <div className="stage-body">
            <p>Sorry, the page you are looking for does not exist.</p>            
        </div>
      </div>
    </div>
  );
};

export default observer(NotFoundPage);
