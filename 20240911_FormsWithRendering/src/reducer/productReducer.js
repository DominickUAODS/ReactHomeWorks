export const initialState = {
	products: [],
}

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ALL_PRODUCTS":
			return { ...state, products: action.payload };
		default:
			return { ...state };
	}
};