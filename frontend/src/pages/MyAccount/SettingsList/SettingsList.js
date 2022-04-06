import React from 'react';

const SettingsList = ({ itemsList, currentActive, clickFunction }) => {

    return (
        <nav className="nav flex-column">
            {itemsList.map((item, index) => (
                <button key={index} className={`btn btn-link btn-lg ${currentActive === item ? "active" : null}`} aria-current="page" onClick={() => clickFunction(item)}>{item}</button>
            ))}
        </nav>
    );
}

export default SettingsList;