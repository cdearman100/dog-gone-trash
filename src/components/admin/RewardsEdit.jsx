// RewardsEdit.jsx
import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const RewardsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" label="Reward Name" />
      <NumberInput source="cost" label="Credit Cost" />
    </SimpleForm>
  </Edit>
);
