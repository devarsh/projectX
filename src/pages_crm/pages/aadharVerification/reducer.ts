export const reducer = (state, action) => {
  switch (action.type) {
    case "startInititateAadharValidation":
      return {
        ...state,
        loading: true,
      };
    case "inititateAadharValidation":
      return {
        ...state,
        loading: false,
        currentScreen: "aadharValidation",
        apiResult: action.payload.status,
        apiResultStatus: action.payload.status,
        aadharTransactionID: action.payload.data.transactionId,
        aadharAuthenticationURL: action.payload.data.url,
      };
    case "endAadharValidation":
      return {
        ...state,
        loading: false,
        apiResult: action.apiResult,
        apiResultStatus: action.apiResultStatus,
        currentScreen: "aadharValidationResult",
      };
    default:
      return state;
  }
};
