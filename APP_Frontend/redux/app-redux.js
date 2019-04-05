import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const initialState = {
	country: "Ethiopia"
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "changeFilterCountry":
			return { ...state, country: action.value };
		default:
			return state;
	}
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };

const changeFilterCountry = country => {
	return {
		type: "changeFilterCountry",
		value: country
	};
};

export { changeFilterCountry };
