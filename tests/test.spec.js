const { test, expect } = require('@playwright/test');
const { log } = require("console");
const { Ajv } = require("ajv");

const ajv = new Ajv()


test('test case 1', async ({ request}) => {
  const response = await request.get('https://reqres.in/api/users?page=2');
    console.log(response.status());
    console.log(await response.json());

    expect(response.status()).toBe(200)

    const responseData = await response.json()

    expect(responseData.page).toBe(2)
    expect(responseData.total).toBe(12)

    const valid = ajv.validate(require('./jsonschema/get-User-schema.json'), responseData)

    
});

test('test case 2', async ({ request}) => {
  
    const bodyData = {
      "name": "morpheus",
      "job": "leader"
  }
    const headerData = {
      Accept: 'application/json'
    }

    const response = await request.post('https://reqres.in/api/users', {
      headers: headerData,
      data: bodyData
    });

    console.log(response.status());
    console.log(await response.json());

    expect(response.status()).toBe(201)

    const responseData = await response.json()

    expect(responseData.name).toBe("morpheus")

    const valid = ajv.validate(require('./jsonschema/post-user-schema.json'), responseData)

  });

  test('test case 3', async ({ request}) => {
    const response = await request.delete('https://reqres.in/api/users/2');
      console.log(response.status());
  
      expect(response.status()).toBe(204)

    });

    test('test case 4', async ({ request}) => {
  
      const bodyData = {
        "name": "morpheus",
        "job": "zion resident"
    }
      const headerData = {
        Accept: 'application/json'
      }
  
      const response = await request.put('https://reqres.in/api/users/2', {
        headers: headerData,
        data: bodyData
      });
  
      console.log(response.status());
      console.log(await response.json());
  
      expect(response.status()).toBe(200)
  
      const responseData = await response.json()

      expect(responseData.job).toBe("zion resident")
  
      const valid = ajv.validate(require('./jsonschema/put-update-schema.json'), responseData) 
        
      });
