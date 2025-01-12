import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'https://liveinnbo-backend.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')  // Add this line
  },
  withCredentials: true     
});

// Add this function to get CSRF cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

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

    verifyTicket(data) {
        const csrfToken = Cookies.get('csrftoken'); 
        return apiClient.post(`/payments/verify_ticket/`, data,
            {
                headers: {
                    'X-CSRFToken': csrfToken, 
                },
            }
        );
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
    authSignUp(data) {
        return apiClient.post('/users/auth/signup/', data);
    },      
    authSignIn(){
        return apiClient.post(`/users/auth/signin/`)
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
