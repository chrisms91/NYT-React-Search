import React from 'react';
import './Panel.css';

const Panel = ({ icon, title, children }) =>
    <div className='panel panel-primary'>
        <div className='panel-heading'>
            <h3 className='panel-title'>
                <strong> 
                <i className={icon}></i>
                {title}
                </strong>
            </h3>
        </div>
        <div className='panel-body'>
            {children}
        </div>
    </div>;

export default Panel;