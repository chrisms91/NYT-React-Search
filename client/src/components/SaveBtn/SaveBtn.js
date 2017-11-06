import React from 'react';
import './SaveBtn.css';

const SaveBtn = props => (
    <span className='save-btn' {...props}>
        <i className="fa fa-floppy-o"></i> SAVE
    </span>
)

export default SaveBtn;