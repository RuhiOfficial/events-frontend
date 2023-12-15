
import { apis } from "service";

const COMMON_URL = `https://event-backend.isdemo.in/api/v1/`;

const API_URLS = {
  GET_VENUE_TYPE: `${COMMON_URL}venueType`,
  GET_EVENT_TYPE: `${COMMON_URL}eventType`,
  GET_TIMEZONE: `${COMMON_URL}timezone`,
  GET_COUNTRIES: `${COMMON_URL}list_countries`,
  GET_EVENT: `${COMMON_URL}event`,
  POST_STATE:`${COMMON_URL}list_states`,
  POST_SIGNUP_USER: `${COMMON_URL}signupUser`,
  POST_LOGIN_USER: `${COMMON_URL}loginUser`,
  POST_ADD_VENUE: `${COMMON_URL}venue`,
  POST_ADD_EVENT: `${COMMON_URL}event`,
  POST_CITY: `${COMMON_URL}list_cities`,
  POST_VENUE: `${COMMON_URL}venue_list_by_company`,
};

  export const getVenueType = (payload) =>
  apis.get(API_URLS.GET_VENUE_TYPE, payload);
  
  export const getEvent = (payload) =>
  apis.get(`${API_URLS.GET_EVENT}?venue_id=${payload.data.venue_id}`, payload);
  
  export const getTimezone = (payload) =>
  apis.get(API_URLS.GET_TIMEZONE, payload);

  export const getCountry = (payload) =>
  apis.get(API_URLS.GET_COUNTRIES, payload);

  export const getEventType = (payload) =>
  apis.get(API_URLS.GET_EVENT_TYPE, payload);

  export const postCities = (payload) =>
  apis.post(API_URLS.POST_CITY, {
    ...payload,
    headers: { "Content-type": "application/json", ...payload?.headers },
  });

  export const postStates = (payload) =>
  apis.post(API_URLS.POST_STATE, {
    ...payload,
    headers: { "Content-type": "application/json", ...payload?.headers },
  });

export const postSignupUser = (payload) =>
  apis.post(API_URLS.POST_SIGNUP_USER, {
    ...payload,
    headers: { "Content-type": "application/json", ...payload?.headers },
  });

export const postLoginUser = (payload) =>
  apis.post(API_URLS.POST_LOGIN_USER, {
    ...payload,
    headers: { "Content-type": "application/json", ...payload?.headers },
  });


  export const postAddVenue = (payload) =>
  apis.post(API_URLS.POST_ADD_VENUE, {
    ...payload,
    headers: { "Content-type": "application/json", ...payload?.headers },
  });

  export const postAddEvent = (payload) =>
  apis.post(API_URLS.POST_ADD_EVENT, {
    ...payload,
    headers: { "Content-type": "application/json", ...payload?.headers },
  });

  export const postVenueList = (payload) =>
    apis.post(API_URLS.POST_VENUE, {
      ...payload,
      headers: { "Content-type": "application/json", ...payload?.headers },
    });

  
  