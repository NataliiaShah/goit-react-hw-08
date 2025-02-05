import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorNotification, successAdd, successDelete, successEdit } from './notification';

export const fetchContacts = createAsyncThunk("contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/contacts');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk("contacts/addContact",
    async (value, thunkAPI) => {
        try {
            const response = await axios.post('/contacts', value);
            successAdd();
            return response.data;
        } catch (error) {
            errorNotification();
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk("contacts/deleteContact",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${id}`);
            successDelete();
            return response.data;
        } catch (error) {
            errorNotification();
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateContact = createAsyncThunk(
    'contacts/updateContact',
    async (data, thunkAPI) => {
        try {
            const response = await axios.patch(`/contacts/${data.id}`, {
                name: data.name,
                number: data.number,
            });
            successEdit();
            return response.data;
        } catch (error) {
            errorNotification();
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logOut = createAsyncThunk("contacts/logOut", 
    async (_, thunkAPI) => {
        try {
            localStorage.removeItem('token');
            return; 
        } catch (error) {
            errorNotification();
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);