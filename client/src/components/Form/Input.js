import React from 'react';
import Label from './Label';

export const Input =  props  =>
    <div className="form-group">
        <Label fn={props.fn} title={props.title} />
        <input className="form-control" {...props} />
    </div>;