import {configureStore, createSlice, PayloadAction,} from '@reduxjs/toolkit';
import {Todo} from "./type";
import {v1 as uuid} from "uuid";
import logger from "redux-logger";
const todosInitialState: Todo[] = [
    {
        id: uuid(),
        desc: "Learn React",
        isComplete: true
    },
    {
        id: uuid(),
        desc: "Learn Redux",
        isComplete: true
    },
    {
        id: uuid(),
        desc: "Learn Redux-ToolKit",
        isComplete: false
    }
];


const todosSlice = createSlice({
    name: 'todos',
    initialState: todosInitialState,
    reducers: {
        create: {
            reducer: (state, {payload}: PayloadAction<{ id: string; desc: string; isComplete: boolean }>) => {
                state.push(payload)
            },
            prepare: ({desc}: { desc: string }) => ({
                payload: {
                    id: uuid(),
                    desc,
                    isComplete: false
                }//подготовка данных для редюсера что бы редюсер остался чистым
            })
        },
        edit: (state, {payload}: PayloadAction<{ id: string; desc: string }>) => {
            const todoToEdit = state.find(todo => todo.id === payload.id);
            if (todoToEdit) {
                todoToEdit.desc = payload.desc;
            }
        },
        toggle: (state, {payload}: PayloadAction<{ id: string; isComplete: boolean }>) => {
            const todoToEdit = state.find(todo => todo.id === payload.id);

            if (todoToEdit) {
                todoToEdit.isComplete = payload.isComplete;
            }
        },
        remove: (state, {payload}: PayloadAction<{ id: string }>) => {
            console.log(state)
            const todoToEdit = state.find(todo => todo.id === payload.id);
            if (todoToEdit) {
              return   state.filter((e) => e.id !== payload.id)
            }
        }
    }
})

const selectedTodoSlice = createSlice({
    name: 'selectedTodo',
    initialState: null as string | null,
    reducers: {
        select: (state, {payload}: PayloadAction<{ id: string }>) => payload.id,
    }
});

const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {},
    extraReducers: {
        [todosSlice.actions.create.type]: (state) => state + 1,
        [todosSlice.actions.edit.type]: (state) => state + 1,
        [todosSlice.actions.toggle.type]: (state) => state + 1,
        [todosSlice.actions.remove.type]: (state) => state + 1,
    }
})

export const {
    create: createTodoActionCreator,
    edit: editTodoActionCreator,
    toggle: toggleTodoActionCreator,
    remove: deleteTodoActionCreator,
} = todosSlice.actions;

export const {
    select: selectTodoActionCreator,
} = selectedTodoSlice.actions;

const reducer = {
    todos: todosSlice.reducer,
    selectedTodo: selectedTodoSlice.reducer,
    counter: counterSlice.reducer,
}

export default configureStore({
    reducer,
})