import React from 'react';
import CoreList from './features/core/CoreList';

export default {title: 'Core List Component'};

const basicSchema = {
    name: 'Customer',
}
export const basicList = ()=> (
    <CoreList schema={basicSchema}></CoreList>
)