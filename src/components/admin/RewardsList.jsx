// RewardsList.jsx
import React from 'react';
import { List, Datagrid, TextField, EditButton, TextInput, FilterForm } from 'react-admin';

const RewardsFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
];

export const RewardsList = (props) => (
  <List {...props} filters={ <FilterForm filters={RewardsFilters} /> }>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Reward Name" />
      <TextField source="cost" label="Credit Cost" />
      <EditButton />
    </Datagrid>
  </List>
);
