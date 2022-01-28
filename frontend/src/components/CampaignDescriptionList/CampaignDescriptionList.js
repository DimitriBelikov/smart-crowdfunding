import React from 'react';

const CampaignDescriptionList = ({itemsList, currentActive, clickFunction}) => {
    
    return (
        <>
        <div className="row">
            <div className="col border border-primary">
                <ul className="nav nav-pills nav-fill">
                    {itemsList.map((item, index) =>(
                    <li className="nav-item" key={index}>
                        <a className={`nav-link ${currentActive === item ? "active" : null}`} aria-current="page" onClick={() => clickFunction(item)}>{item}</a>
                    </li>
                    ))}
                </ul>
            </div>
      </div>
      </>
    );
}
 
export default CampaignDescriptionList;