import React from 'react';
import { Admin, Resource, List, Edit, Create, SimpleForm, TextInput, Datagrid, TextField, EditButton, DeleteButton, NumberField, NumberInput, DateInput, ArrayField, DateField, ChipField, SingleFieldList } from 'react-admin';
import { createReward, deleteReward, getReward, getRewards, updateReward } from '../../api/rewardsApi';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../../api/usersApi';
import { getLocations, getLocation, createLocation, updateLocation, deleteLocation } from '../../api/locationsApi';

const dataProvider = {
    getList: async (resource, params) => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const headers = token ? { Authorization: `Token ${token}` } : {};
  
        if (resource === 'rewards') {
          const data = await getRewards(headers);
          return {
            data: data.map((reward) => ({ ...reward, id: reward.id })),
            total: data.length,
          };
        } else if (resource === 'users') {
          const data = await getUsers(headers);
          return {
            data: data.map((user) => ({ ...user, id: user.id })),
            total: data.length,
          };
        } else if (resource === 'locations') {
          const data = await getLocations(headers);
          return {
            data: data.map((location) => ({ ...location, id: location.id })),
            total: data.length,
          };
        }
        throw new Error(`Resource ${resource} not supported.`);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getOne: async (resource, params) => {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Token ${token}` } : {};
  
      if (resource === 'rewards') {
        const data = await getReward(params.id, headers);
        return { data };
      } else if (resource === 'users') {
        const data = await getUser(params.id, headers);
        return { data };
      } else if (resource === 'locations') {
        const data = await getLocation(params.id, headers);
        return { data };
      }
      throw new Error(`Resource ${resource} not supported.`);
    },
    create: async (resource, params) => {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Token ${token}` } : {};
  
      if (resource === 'rewards') {
        const data = await createReward(params.data, headers);
        return { data };
      } else if (resource === 'users') {
        const data = await createUser(params.data, headers);
        return { data };
      } else if (resource === 'locations') {
        const data = await createLocation(params.data, headers);
        return { data };
      }
      throw new Error(`Resource ${resource} not supported.`);
    },
    update: async (resource, params) => {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Token ${token}` } : {};
  
      if (resource === 'rewards') {
        const data = await updateReward(params.id, params.data, headers);
        return { data };
      } else if (resource === 'users') {
        const data = await updateUser(params.id, params.data, headers);
        return { data };
      } else if (resource === 'locations') {
        const data = await updateLocation(params.id, params.data, headers);
        return { data };
      }
      throw new Error(`Resource ${resource} not supported.`);
    },
    delete: async (resource, params) => {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Token ${token}` } : {};
  
      if (resource === 'rewards') {
        await deleteReward(params.id, headers);
        return { data: { id: params.id } };
      } else if (resource === 'users') {
        await deleteUser(params.id, headers);
        return { data: { id: params.id } };
      } else if (resource === 'locations') {
        await deleteLocation(params.id, headers);
        return { data: { id: params.id } };
      }
      throw new Error(`Resource ${resource} not supported.`);
    },
  };

// User List
const UserList = (props) => (
  <List {...props}>
      <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="username" />
          <TextField source="email" />
          <NumberField source="reward_points" />
          <EditButton />
          <DeleteButton />
      </Datagrid>
  </List>
);

// User Edit
const UserEdit = (props) => (
  <Edit {...props}>
      <SimpleForm>
          <TextInput source="username" />
          <TextInput source="email" />
          <NumberInput source="reward_points" />
      </SimpleForm>
  </Edit>
);


// Reward List
const RewardList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <NumberField source="points" />
            <TextField source="description" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// Reward Edit
const RewardEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <NumberInput source="points" />
            <TextInput source="description" multiline />
        </SimpleForm>
    </Edit>
);

// Reward Create
const RewardCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <NumberInput source="points" />
            <TextInput source="description" multiline />
        </SimpleForm>
    </Create>
);

const LocationList = (props) => (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <DateField source="date_of_event" />
        <TextField source="description" />
        <ArrayField source="users_joined">
          <SingleFieldList>
            <ChipField source="email" />
          </SingleFieldList>
        </ArrayField>
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
  
  const LocationEdit = (props) => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" multiline />
        <ArrayField source="users_joined" />
      </SimpleForm>
    </Edit>
  );
  
  // Define create view for TrashLocation
  const LocationCreate = (props) => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <DateInput source="date_of_event" />
        <TextInput source="description" multiline />
      </SimpleForm>
    </Create>
  );

// Admin Panel Component
const AdminPanel = () => (
    <Admin dataProvider={dataProvider} basename='/admin'>
        <Resource
            name="rewards"
            list={RewardList}
            edit={RewardEdit}
            create={RewardCreate}
        />

        <Resource
            name="users"
            list={UserList}
            edit={UserEdit}
        />

        <Resource 
            name="locations" 
            list={LocationList} 
            edit={LocationEdit} 
            create={LocationCreate} 

        />
    </Admin>
);

export default AdminPanel;
