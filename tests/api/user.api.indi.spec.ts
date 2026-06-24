
import { ApiHelper } from '../../src/api/ApiHelper';
import{test,expect} from '../../src/fixtures/apifixtures';

const Token= process.env.API_Token!;
let AUTH_HEADER={Authorization : `Bearer ${Token}`};

// Helper generic function - Create new user

async function createUser(apiHelper:any) {
    let userData ={
            name: 'Sreelakshmi-Auto',
            email: `automation_${Date.now()}@open.com`,
            gender:'Female',
            status:'active'
        };
       let response= await apiHelper.post('/public/v2/users',userData,AUTH_HEADER);
       expect(response.status).toBe(201);
       return response.body;
}

// Test 1 Create user and verify AAA
// POST -> GetUserid -> Verify

test('POST Create a user',async({apiHelper})=>{
    // create the user
    let UserResponse=await createUser(apiHelper);
    // get the user
    let response= await apiHelper.get(`/public/v2/users/${UserResponse.id}`,AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Sreelakshmi-Auto");
})

// Test 2 Update user and verify AAA
// POST -> Userid -> PUT -> GET Userid-> Verify

test('PUT - Update the User',async({apiHelper})=>{
    let UserResponse= await createUser(apiHelper);
    let userUpdatedData = {
        name: 'Sreelakshmi-Auto-Update',
        status:'inactive'
    };
    let response= await apiHelper.put(`/public/v2/users/${UserResponse.id}`,userUpdatedData,AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userUpdatedData.name);
    expect(response.body.status).toBe(userUpdatedData.status);

    let getresponse= await apiHelper.get(`/public/v2/users/${UserResponse.id}`,AUTH_HEADER);
    expect(getresponse.status).toBe(200);
    expect(getresponse.body.name).toBe(userUpdatedData.name);
    expect(getresponse.body.status).toBe(userUpdatedData.status);
});

// Test 2 Update user and verify AAA
// POST -> Userid -> Delete(204) -> GET Userid-> Verify(404)

test('DELET - Delete the User',async({apiHelper})=>{
    let UserResponse= await createUser(apiHelper);
    
    let response= await apiHelper.delete(`/public/v2/users/${UserResponse.id}`,AUTH_HEADER);
    expect(response.status).toBe(204);
    //expect(response.body.name).toBe(userUpdatedData.name);
    //expect(response.body.status).toBe(userUpdatedData.status);

    let getresponse= await apiHelper.get(`/public/v2/users/${UserResponse.id}`,AUTH_HEADER);
    expect(getresponse.status).toBe(404);
    expect(getresponse.body.message).toBe('Resource not found');
    
});