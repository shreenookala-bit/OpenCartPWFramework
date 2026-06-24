

import { ApiHelper } from '../../src/api/ApiHelper';
import{test,expect} from '../../src/fixtures/apifixtures';

const Token= process.env.API_Token!;
let AUTH_HEADER={Authorization : `Bearer ${Token}`};
let userid: number;

test.describe.serial('running e2e go rest curd api tests',()=>{

test('GET API -- get all user', async({apiHelper})=>{
    let response= await apiHelper.get('/public/v2/users',AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
})

test('POST API -- Create a user',async({apiHelper})=>{
    let userData ={
        name: 'Sreelakshmi-Auto',
        email: `automation_${Date.now()}@open.com`,
        gender:'Female',
        status:'active'
    };
   let response= await apiHelper.post('/public/v2/users',userData,AUTH_HEADER);
   expect(response.status).toBe(201);
   expect(response.body.name).toBe(userData.name);
    userid=response.body.id;
   console.log('Created User Id:', userid);
});

test('PUT API -- Update a user',async({apiHelper})=>{
    let userUpdatedData = {
        name: 'Sreelakshmi-Auto-Update',
        status:'inactive'
    };
   let response = await apiHelper.put(`/public/v2/users/${userid}`,userUpdatedData,AUTH_HEADER);
   expect(response.status).toBe(200);
   expect(response.body.name).toBe('userUpdatedData.name');
   expect(response.body.status).toBe('userUpdatedData.status');
   });

   test('Delete API -- Delete a user',async({apiHelper})=>{
    let response= await apiHelper.delete(`/public/v2/users/${userid}`,AUTH_HEADER);
    expect(response.status).toBe(204);
    
   })
});


