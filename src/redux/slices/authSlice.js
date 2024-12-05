import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:5000/user-login', {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                if (data.result === 'Not Found') {
                    return thunkAPI.rejectWithValue('User Not Found');
                } else if (data.result === 'Enter Correct Info') {
                    return thunkAPI.rejectWithValue('Please Enter Correct Info');
                } else {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('user_token', data.token); // Store token
                    localStorage.removeItem('seller'); // Remove seller data if any
                    return data.user;
                }
            } else {
                return thunkAPI.rejectWithValue('Login Failed. Please try again.');
            }
        } catch (error) {
            return thunkAPI.rejectWithValue('An error occurred. Please try again.');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('user_token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
