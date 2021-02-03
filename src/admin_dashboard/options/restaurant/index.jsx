import React from 'react';
import LimitPeopleInput from './limitInput';
import Number from 'general_components/form/inputs/number';
import Form from 'general_components/form';

const RestaurantForm = function FormForRestaurantOptions() {
  const inputs = [
    {
      name: 'capacity',
      component: Number,
      label: 'Capacity',
      required: true,
    },
    {
      name: 'bookingDuration',
      component: Number,
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
    />
  );
};

export default RestaurantForm;
