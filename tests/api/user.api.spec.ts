import{test,expect} from '@playwright/test';

let AUTH_TOKEN = {Authorization : 'Bearer 3bc8bbe591204b3eef6031100cbcff988ca57f94e4f98b4f783312126df3b3d7'};

test('get user test',async({request})=>{
   let response= await request.get('https://gorest.co.in/public/v2/users/8502651',{
        headers: AUTH_TOKEN
    });
    console.log(response);
    let jsonBody=await response.json();
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(200);
})

test('get all user test',async({request})=>{
   let response= await request.get('https://gorest.co.in/public/v2/users',{
        headers: AUTH_TOKEN
    });
    //console.log(response);
    let jsonBody=await response.json();
    console.log(response.status());
    console.log(response.statusText());
})

test('post user test',async({request})=>{

    let userData={
        name:'Sree',
        email :`Automation_${Date.now()}@open.com`,
        gender:'female',
        status:'active'
    };

   let response= await request.post('https://gorest.co.in/public/v2/users',{
        headers: AUTH_TOKEN,
        data:userData
    });
    //console.log(response);
    let jsonBody=await response.json();
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());
})

test('update user test',async({request})=>{

    let userData={
        name:'Sree@123',
        email :`Automation_${Date.now()}@open.com`,
        gender:'male',
        status:'inactive'
    };

   let response= await request.put('https://gorest.co.in/public/v2/users/8502664',{
        headers: AUTH_TOKEN,
        data:userData
    });
    //console.log(response);
    let jsonBody=await response.json();
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());
})

test('delete the user test',async({request})=>{
   let response= await request.delete('https://gorest.co.in/public/v2/users/8502664',{
        headers: AUTH_TOKEN
    });
    console.log(response.status());
    console.log(response.statusText());
});