// AdminApp.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import { RewardsList } from './RewardsList';
import { RewardsEdit } from './RewardsEdit';
import { RewardsCreate } from './RewardsCreate';

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="rewards"
      list={RewardsList}
      edit={RewardsEdit}
      create={RewardsCreate}
    />
  </Admin>
);

export default AdminApp;
