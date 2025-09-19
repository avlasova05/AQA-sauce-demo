import {test, expect} from '@playwright/test';

test.describe.serial('@api API-tests for Restful-booker', () => {

    let bookingid;
    let authToken;
    const baseURL = 'https://restful-booker.herokuapp.com';

    const bookingData = {
        firstname :'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: '2025-01-01',
            checkout: '2025-01-09'
        },
        additionalneeds: 'Breakfast'
    };

    test('@api Creating booking POST-request ', async ({ request }) => {  

        const response = await request.post(`${baseURL}/booking`, {
            data: bookingData,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        
        expect (response.status()).toBe(200);
        const responseBody = await response.json();
       
        bookingid = responseBody.bookingid;
    
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody.bookingid).toBeGreaterThan(0);
        expect(responseBody.booking).toMatchObject(bookingData);
    });

    test ('@api Getting info about booking (Get)', async ({request}) => {
       
        expect(bookingid).toBeDefined();
        const response = await request.get(`${baseURL}/booking/${bookingid}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        
        expect(responseBody).toMatchObject(bookingData);
    });

    test('@api Updating the booking', async ({request}) => {

        expect(bookingid).toBeDefined();
        const authResponse = await request.post (`${baseURL}/auth`, {
            data:{
                username: "admin",
                password: "password123"        
            }, 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        expect (authResponse.status()).toBe(200);
        const authBody = await authResponse.json();
        authToken = authBody.token;
        
        const updatedBookingData = {
            firstname: 'James', 
            lastname: 'Brown', 
            totalprice: 200, 
            depositpaid: false, 
            bookingdates: {
                checkin: '2025-01-01', 
                checkout: '2025-01-09'
            },
            additionalneeds: 'Lunch' 
        };

        const response = await request.put(`${baseURL}/booking/${bookingid}`, {
            data:updatedBookingData,
            headers: {
                'Content-Type': 'application/json', 
                'Cookie': `token=${authToken}`
            }
        });
        
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
  
        expect(responseBody).toMatchObject(updatedBookingData);
    });

    test ('@api Deleting the booking', async ({request}) => {
        expect(bookingid).toBeDefined();
        expect(authToken).toBeDefined();

        const response = await request.delete(`${baseURL}/booking/${bookingid}`, {
  
            headers: {
                'Content-Type': 'application/json', 
                'Cookie': `token=${authToken}`
            }
        });
    
        expect(response.status()).toBe(201);
        const getResponse = await request.get(`${baseURL}/booking/${bookingid}`);
        expect(getResponse.status()).toBe(404); 
    });
});


