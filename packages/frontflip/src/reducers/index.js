import {  CLEAR_FORM_STATE,
          INITIATE_FORM_STATE,
          UPDATE_VALUE,
          TOGGLE_MULTI_SELECT,
          NEXT_FIELD,
          NEXT_SECTION,
          REVERT_ACTIVE_FIELD,
          SET_DATABASE_VALUES,
          FIELD_ERROR,
          FORM_ERROR,
}         from '../constants/actionTypes';

import    form from '../helpers/formState';

// Initial Login Form state
const initialState = {
  activeField: null,
  fields: [],
  values: {},
  errors: {},
  errorMessage: null
}

export default function formReducer(state = initialState, action){
  // console.log('reducing');
  let values;
  switch (action.type){
    case INITIATE_FORM_STATE:
      if(action.payload.savedValues){
        return form.hydrate(action.payload.savedValues);
      }     
      break;
    case CLEAR_FORM_STATE:
      return form.clear(state.values);
      break;
    case SET_DATABASE_VALUES:
      return {...state, values: action.values.val()}
      break;
    case UPDATE_VALUE:
      values = form.updateValue(state.values, action.payload);
      return {
        ...state,
        values,
      }
      break;
    case TOGGLE_MULTI_SELECT:
      values = form.toggleMultiSelect(state.values, action.payload);
      return {
        ...state,
        values,
      }
      break;
    case NEXT_FIELD:
      return {
        ...state,
        activeField: action.currentIndex + 1,
      }
      break;
    case REVERT_ACTIVE_FIELD:
      return {
        ...state,
        activeField: null,
      }
      break;
    case FORM_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
      break;
    case FIELD_ERROR:
      if(!action.payload.errorText || action.payload.errorText === ''){
        let newErrors = {...state.errors};
        delete(newErrors[action.payload.fieldName])
        return{
          ...state,
          errors: newErrors,
        }
      }

      return {
        ...state,
        errors: {...state.errors, [action.payload.fieldName]: action.payload.errorText}
      }
      // form.alert(state, action.payload);
      break;
    case 'NEXT_SECTION':
      return state //TODO
      break;
    case 'FORM_SUBMIT':
      return form.submit(state, action.payload);
      break;
  }
  return state;
}
