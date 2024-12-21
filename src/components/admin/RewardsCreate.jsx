// RewardsCreate.jsx
import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const RewardsCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Reward Name" />
      <NumberInput source="cost" label="Credit Cost" />
    </SimpleForm>
  </Create>
);
