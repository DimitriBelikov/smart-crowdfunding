import React from 'react';

//CSS
import './Profile.css';

const SettingsList = ({ itemsList, currentActive, clickFunction }) => {

    return (
        <nav className="nav flex-column">
            {itemsList.map((item, index) => (
                <a key={index} className={`nav-link ${currentActive === item ? "active" : null}`} aria-current="page" onClick={() => clickFunction(item)}>{item}</a>
            ))}
        </nav>
    );
}

export default SettingsList;