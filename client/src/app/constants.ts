const baseUrl = '/api';
export const routes = {
    login: [baseUrl, 'auth'].join('/'),
    appointment: [baseUrl,'Appointment'].join('/'),
    practitioner: [baseUrl, 'Practitioner'].join('/'),
    patient: [baseUrl, 'Patient'].join('/'),
    userInfo: [baseUrl, 'userInfo'].join('/')
}