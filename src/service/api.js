
import { apis } from "service";

const COMMON_URL = `https://event-backend.isdemo.in/api/v1/`;


const API_URLS = {
  GET_VENUE_TYPE: `${COMMON_URL}venueType`,
  GET_EVENT_TYPE: `${COMMON_URL}eventType`,
  GET_TIMEZONE: `${COMMON_URL}timezone`,
  GET_COUNTRIES: `${COMMON_URL}list_countries`,
  GET_EVENT: `${COMMON_URL}event`,
  GET_SINGLE_EVENT:`${COMMON_URL}event_single_list`,
  
  GET_SECTION: `${COMMON_URL}listsection`,
  GET_SECTION_LIST: `${COMMON_URL}data-table`,
  GET_LAYOUT: `${COMMON_URL}get_layout`,
  GET_BOOKING_LIST:`${COMMON_URL}ticketbooking`,
  GET_SECTION_BY_ID:`${COMMON_URL}section_list`,
  GET_CANVAS_TABLE:`${COMMON_URL}eventTable`,
  POST_STATE:`${COMMON_URL}list_states`,
  POST_SIGNUP_USER: `${COMMON_URL}signupUser`,
  POST_LOGIN_USER: `${COMMON_URL}loginUser`,
  POST_ADD_VENUE: `${COMMON_URL}venue`,
  POST_ADD_EVENT: `${COMMON_URL}event`,
  POST_CITY: `${COMMON_URL}list_cities`,
  POST_VENUE: `${COMMON_URL}venue_list_by_company`,
  POST_SECTION: `${COMMON_URL}addsection`,
  POST_TABLE: `${COMMON_URL}eventTable`,
  POST_LAYOUT: `${COMMON_URL}layout`,
  POST_SINGLE_VENUE:`${COMMON_URL}venue_detail`,
  POST_BOOK_TICKETS:`${COMMON_URL}ticketbooking`,
  DELETE_SECTION: `${COMMON_URL}sections`,
  UPDATE_SECTION: `${COMMON_URL}sections_update`,


};

  export const getVenueType = (payload) =>
  apis.get(API_URLS.GET_VENUE_TYPE, payload);
  
  
  export const getEvent = (payload) =>
  apis.get(`${API_URLS.GET_EVENT}?venue_id=${payload.data.venue_id}`, payload);
  
  export const getCanvasTable = (payload) =>
  apis.get(`${API_URLS.GET_CANVAS_TABLE}?venue_id=${payload.data.venue_id}`, payload);
  
  export const getTimezone = (payload) =>
  apis.get(API_URLS.GET_TIMEZONE, payload);

  export const getCountry = (payload) =>
  apis.get(API_URLS.GET_COUNTRIES, payload);

  export const getEventType = (payload) =>
  apis.get(API_URLS.GET_EVENT_TYPE, payload);

  export const getSection = (payload) =>
  apis.get(API_URLS.GET_SECTION, payload);

  export const getBookingList = (payload) =>
  apis.get(`${API_URLS.GET_BOOKING_LIST}?venue_id=${payload.data.venue_id}`, payload);


  export const getSectionList = (payload) =>
  apis.get(`${API_URLS.GET_SECTION_LIST}?venue_id=${payload.data.venue_id}`, payload);

  export const getSingleEvent = (payload) =>
  apis.get(`${API_URLS.GET_SINGLE_EVENT}?id=${payload.data.id}`, payload);

  

  export const sectionById = (payload) =>
  apis.get(`${API_URLS.GET_SECTION_BY_ID}?id=${payload.data.id}`, payload);

  export const getLayout = (payload) =>
  apis.get(`${API_URLS.GET_LAYOUT}?venue_id=${payload.data.venue_id}`, payload);

  export const deleteSection = (payload) =>
  apis.delete(`${API_URLS.UPDATE_SECTION}?id=${payload.data.id}`, payload);

  export const updateSection = (payload) =>
  apis.post(`${API_URLS.UPDATE_SECTION}?id=${payload.data.id}`, payload);

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

    export const postSection = (payload) =>
    apis.post(API_URLS.POST_SECTION, {
      ...payload,
      headers: { "Content-type": "application/json", ...payload?.headers },
    });


    export const postTable = (payload) =>
    apis.post(API_URLS.POST_TABLE, {
      ...payload,
      headers: { "Content-type": "application/json", ...payload?.headers },
    });

    export const postLayout = (payload) =>
    apis.post(API_URLS.POST_LAYOUT, {
      ...payload,
      headers: { "Content-type": "application/json", ...payload?.headers },
    });
    export const postSingleVenue = (payload) =>
    apis.post(API_URLS.POST_SINGLE_VENUE, {
      ...payload,
      headers: { "Content-type": "application/json", ...payload?.headers },
    });

    export const postBookTickets = (payload) =>
    apis.post(API_URLS.POST_BOOK_TICKETS, {
      ...payload,
      headers: { "Content-type": "application/json", ...payload?.headers },
    });

  
  