import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICriteriaType, defaultValue } from 'app/shared/model/criteria-type.model';

export const ACTION_TYPES = {
  FETCH_CRITERIATYPE_LIST: 'criteriaType/FETCH_CRITERIATYPE_LIST',
  FETCH_CRITERIATYPE: 'criteriaType/FETCH_CRITERIATYPE',
  CREATE_CRITERIATYPE: 'criteriaType/CREATE_CRITERIATYPE',
  UPDATE_CRITERIATYPE: 'criteriaType/UPDATE_CRITERIATYPE',
  DELETE_CRITERIATYPE: 'criteriaType/DELETE_CRITERIATYPE',
  RESET: 'criteriaType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICriteriaType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CriteriaTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: CriteriaTypeState = initialState, action): CriteriaTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CRITERIATYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CRITERIATYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CRITERIATYPE):
    case REQUEST(ACTION_TYPES.UPDATE_CRITERIATYPE):
    case REQUEST(ACTION_TYPES.DELETE_CRITERIATYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CRITERIATYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CRITERIATYPE):
    case FAILURE(ACTION_TYPES.CREATE_CRITERIATYPE):
    case FAILURE(ACTION_TYPES.UPDATE_CRITERIATYPE):
    case FAILURE(ACTION_TYPES.DELETE_CRITERIATYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CRITERIATYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CRITERIATYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CRITERIATYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_CRITERIATYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CRITERIATYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/criteria-types';

// Actions

export const getCriteriaTypeEntities: ICrudGetAllAction<ICriteriaType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CRITERIATYPE_LIST,
  payload: axios.get<ICriteriaType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICriteriaType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CRITERIATYPE,
    payload: axios.get<ICriteriaType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICriteriaType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CRITERIATYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getCriteriaTypeEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICriteriaType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CRITERIATYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getCriteriaTypeEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICriteriaType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CRITERIATYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getCriteriaTypeEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
