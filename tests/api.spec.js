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
        console.log(`Status-code: ${response.status()}`);
        expect (response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Response body:', responseBody);

        bookingid = responseBody.bookingid;
        console.log(`Saved booking ID: ${bookingid}`);
    
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody.bookingid).toBeGreaterThan(0);
        expect(responseBody.booking.firstname).toBe (bookingData.firstname);
        expect (responseBody.booking.lastname).toBe(bookingData.lastname);
        expect (responseBody.booking.totalprice).toBe(bookingData.totalprice);
        expect (responseBody.booking.depositpaid).toBe(bookingData.depositpaid);
        expect (responseBody.booking.bookingdates.checkin).toBe(bookingData.bookingdates.checkin);
        expect (responseBody.booking.bookingdates.checkout).toBe(bookingData.bookingdates.checkout);
        expect (responseBody.booking.additionalneeds).toBe(bookingData.additionalneeds);
        
    });
    test ('@api Getting info about booking (Get)', async ({request}) => {
       
        expect(bookingid).toBeDefined();
        const response = await request.get(`${baseURL}/booking/${bookingid}`);
        console.log(`Status-code:${response.status()}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Responce body:', responseBody);
        expect(responseBody.firstname).toBe(bookingData.firstname);
        expect(responseBody.lastname).toBe(bookingData.lastname);
        expect(responseBody.totalprice).toBe(bookingData.totalprice);
        expect(responseBody.depositpaid).toBe(bookingData.depositpaid);
        expect(responseBody.bookingdates.checkin).toBe(bookingData.bookingdates.checkin);
        expect(responseBody.bookingdates.checkout).toBe(bookingData.bookingdates.checkout);
        expect(responseBody.additionalneeds).toBe(bookingData.additionalneeds);
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
        console.log(`Status-code: ${authResponse.status()}`);
        expect (authResponse.status()).toBe(200);
        const authBody = await authResponse.json();
        authToken = authBody.token;
        console.log('Auth token:', authToken);
        
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
        console.log(`Status-code: ${response.status()}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Updated response body:', responseBody);
        expect(responseBody.firstname).toBe('James');
        expect(responseBody.lastname).toBe('Brown'); 
        expect(responseBody.totalprice).toBe(200);
        expect(responseBody.depositpaid).toBe(false); 
        expect(responseBody.bookingdates.checkin).toBe('2025-01-01'); 
        expect(responseBody.bookingdates.checkout).toBe('2025-01-09'); 
        expect(responseBody.additionalneeds).toBe('Lunch'); 
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
        console.log(`Status-code: ${response.status()}`);
        expect(response.status()).toBe(201);
        const getResponse = await request.get(`${baseURL}/booking/${bookingid}`);
        console.log (`Status-code after deleting: ${getResponse.status()}`);
        expect(getResponse.status()).toBe(404); 
    })

});


