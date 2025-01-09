import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://liveinnbo-backend.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  xsrfHeaderName: 'X-CSRFToken', 
  xsrfCookieName: 'csrftoken',     
});

export default {
    // Blog APIs
    getBlogs(page = 1) {
        return apiClient.get(`/blogs/?page=${page}`);
    },
    getBlog(slug) {
        return apiClient.get(`/blogs/${slug}/`);
    },
    // Event APIs
    getEvents(page = 1) {
        return apiClient.get(`/events/?page=${page}`);
    },
    getEvent(eventId) {
        return apiClient.get(`/events/${eventId}/`);
    },
    verifyTicket(ref) {
        return apiClient.post(`/events/verify_ticket/${ref}`)
    },
    // Payment APIs
    initializePayment(paymentData) {
        //console.log("Payment data:", paymentData); 
        return apiClient.post(`/payments/process/${paymentData.eventId}/`, paymentData);
    },
    verifyPayment(reference) {
        return apiClient.get(`/payments/verify_payment/?reference=${reference}`);
    },
    thankYou(transactionId) {
        return apiClient.get(`/payments/thankyou/${transactionId}/`);
    },
    
    // Auth APIs
    authSignUp(){
        return apiClient.post(`/users/auth/signup/`)
    },
    authSignIn(){
        return apiClient.post(`/users/auth/signup/`)
    },
    authSignOut(){
        return apiClient.post(`/users/auth/signout/`)
    },
    updateProfile(){
        return apiClient.put(`/update_profile/`)
    },
    deleteProfile(){
        return apiClient.delete(`/delete_account/`)
    },
    
    // User APIs
    getUsers() {
        return apiClient.get('/users/');
    },
    getUser(userId) {
        return apiClient.get(`/users/${userId}/`);
    },
};
