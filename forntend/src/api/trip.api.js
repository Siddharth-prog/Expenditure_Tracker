import api from "./axios";

export const createTrip = (data) =>
  api.post("/trips", data).then(r => r.data);

export const fetchTrips = () =>
  api.get("/trips").then(r => r.data);

export const getTripsById = (tripId) =>
  api.get(`/trips/${tripId}`).then(r => r.data);

export const endTrip = (id) =>
  api.post(`/trips/${id}/end`);

export const fetchTripExpenses = (tripId) =>
  api.get(`/trips/${tripId}/expenses`).then(r => r.data);

export const addTripExpense = (tripId, data) =>
  api.post(`/trips/${tripId}/expenses`, data).then(r => r.data);

export const fetchTripSummary = (tripId) =>
  api.get(`/trips/${tripId}/summary`).then(r => r.data);
