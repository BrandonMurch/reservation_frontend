import React from 'react';
import LimitPeopleInput from './limitInput';
import Form from 'general_components/form';

const RestaurantForm = function FormForRestaurantOptions() {
  const inputs = [
    {
      name: 'capacity',
      type: 'number',
      label: 'Capacity',
      required: true,
    },
    {
      name: 'bookingDuration',
      type: 'number',
      label: 'Standard booking duration in minutes',
      required: true,
    },
    {
      name: 'occupyLargerTables',
      type: 'checkbox',
      label: 'A booking can occupy larger tables',
    },
    {
      name: 'limitPeoplePerInterval',
      component: LimitPeopleInput,
    },
  ];

  return (
    <Form
      inputs={inputs}
      onSubmit={() => console.log('submitted')}
      submitLabel="Save"
      styleProp={{}}
    />
  );
};

export default RestaurantForm;
