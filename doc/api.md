#API Needs
* GET / -> index.html
* GET /login -> 200/401 + {role}
* GET /logout -> redirect
* GET /report/production -> file.CSV
* GET /report/invoice -> file.CSV


**View Customers**
----
Gets information for all customers (for a privileged account) or a specific customer associated with a client account
* **URL**
`/customer` or `/customer/id`
* **Method:**
`GET`
*  **URL Params**
**Optional:**
`id=[integer]`
* **Success Response:**
* **Code:** 200 <br />
    **Content if client account or id supplied:**
```
    {
        id: [integer],
        name: [string]
        address: [string],
        phone: [string],
        email: [
            [string]
        ],
        permitted_products: [{
            id: [integer],
            type: [string],
            variety: [string],
            price: [float],
            regular: [boolean]
        }]
    }
```
* **Code:** 200 <br />
    **Content if privileged account:**
```
    [{
        id: [integer]
        address: [string],
        phone: [string],
        email: [
            [string]
        ],
        permitted_products: [{
            id: [integer],
            type: [string],
            variety: [string],
            price: [float],
            regular: [boolean]
        }]
    }, etc..]
```
* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
    OR
    * **Code:** 500 SERVER ERROR <br />
* **Sample Call:**
```
    $http({
      url: '/customer',
      type: 'GET'
    })
```
----
**Add New Customer**
----
Endpoint for customer accounts. Creates a new customer with the information supplied.
* **URL**
    `/customer`
* **Method:**
    `POST`
* **Data Params**
```
    {
        name: [string],
        address: [string],
        phone: [string],
        email: [
            [string]
        ],
        permitted_products: [{
            id: [integer],
            regular: [boolean]
        }]
    }
```
* **Success Response:**
    * **Code:** 201 <br />
* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
    OR
    * **Code:** 500 SERVER ERROR <br />
* **Sample Call:**
```
    $http({
        type: 'POST',
        url: '/customer',
        data: {
            name: 'Frank's Hotel',
            address: '221 Hotel Ave, Hotelville MN 55123',
            email: ['frank@franks.com'],
            permitted_products: [
                {id: 2, regular: true},
                {id: 17, regular: true},
                {id: 24, regular: false}
            ]
        }
    })
```
----
**Update Existing Customer**
----
Endpoint for customer accounts. Updates an existing customer with all of the optional supplied information.
* **URL**
    `/customer`
* **Method:**
    `PUT`
* **Data Params**
```
    {
        id: [integer],
        // All optional:
        name: [string],
        address: [string],
        phone: [string],
        // If supplied, _all_ emails are required
        email: [
            [string]
        ],
        // If supplied, _all_ products are required
        permitted_products: [{
            id: [integer],
            boolean: [true]
        }]
    }
```
* **Success Response:**
    * **Code:** 200 <br />
* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
    OR
    * **Code:** 500 SERVER ERROR <br />
* **Sample Call:**
```
    $http({
        method: 'PUT',
        url: '/customer',
        data: {
            id: 7
            name: 'Frank's Grand Hotel',
            permitted_products: [
                {id: 2, regular: true},
                {id: 17, regular: false},
                {id: 24, regular: true}
                {id: 32, regular: false}
            ]
        }
    })
```
----
**Delete Existing Customer**
----
Endpoint for customer accounts. Deletes an existing customer that matches the supplied id parameter
* **URL**
    `/customer/:id`
* **Method:**
    `DELETE`
    *  **URL Params**
        **Optional:**
        `id=[integer]`
* **Success Response:**
    * **Code:** 200 <br />
* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
    OR
    * **Code:** 500 SERVER ERROR <br />
* **Sample Call:**
```
    $http({
        method: 'DELETE',
        url: '/customer/7'
    })
```
----
**View Products**
----
Gets information for all products or a specific product if an id is supplied
* **URL**
    `/product` or `/product/id`
* **Method:**
    `GET`
*  **URL Params**
    **Optional:**
    `id=[integer]`
* **Success Response:**
    * **Code:** 200 <br />
        **Content if id supplied:**
    ```
        {
            id: [integer],
            type: [string],
            variety: [string],
            price: [float]
        }
    ```
* **Code:** 200 <br />
    **Content without id:**
```
    [{
        id: [integer],
        type: [string],
        variety: [string],
        price: [float]
    }, etc..]
```
* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
    OR
    * **Code:** 500 SERVER ERROR <br />
* **Sample Call:**
```
    http({
      url: '/product',
      type: 'GET'
    })
```
----
**Add New Product**
----
Creates a new product with the information supplied.
* **URL**
    `/product`
* **Method:**
    `POST`
* **Data Params**
```
    {
        type: [string],
        variety: [string],
        price: [float]
    }
```
* **Success Response:**
    * **Code:** 201 <br />
* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
    OR
    * **Code:** 500 SERVER ERROR <br />

* **Sample Call:**
```
    $http({
        type: 'POST',
        url: '/product',
        data: {
            type: 'French bread',
            variety: '1/2" slice',
            price: 3.65
        }
    })
```
----
**Update Existing Product**
----
Updates an existing product with all of the optional supplied information.
* **URL**
    `/product`
* **Method:**
    `PUT`
* **Data Params**
```
    {
        id: [integer],
        // Optional:
        type: [string],
        variety: [string],
        price: [float]
    }
```
* **Success Response:**
    * **Code:** 200 <br />
* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
    OR
    * **Code:** 500 SERVER ERROR <br />
* **Sample Call:**
```
    $http({
        method: 'PUT',
        url: '/product',
        {
            id: 32,
            price: 3.75
        }
    })
```
----
**Delete Existing Product**
----
Deletes an existing product that matches the supplied id parameter
* **URL**
    `/product/:id`
* **Method:**
    `DELETE`
    *  **URL Params**
        **Optional:**
        `id=[integer]`
* **Success Response:**
    * **Code:** 200 <br />
* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
    OR
    * **Code:** 500 SERVER ERROR <br />
* **Sample Call:**
```
    $http({
        method: 'DELETE',
        url: '/product/32'
    })
```
----
**View Users**
----
Gets information for all users or a specific user if an id is supplied
* **URL**
    `/user` or `/user/id`
* **Method:**
    `GET`
*  **URL Params**
    **Optional:**
    `id=[integer]`
* **Success Response:**
    * **Code:** 200 <br />
        **Content if id supplied:**
    ```
        {
            id: [integer],
            email: [string],
            name: [string]
        }
    ```
* **Code:** 200 <br />
    **Content without id:**
```
    [{
        id: [integer],
        email: [string],
        name: [string]
    }, etc..]
```
* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
    OR
    * **Code:** 500 SERVER ERROR <br />
* **Sample Call:**
```
    http({
      url: '/user',
      type: 'GET'
    })
```
----
**Add New User**
----
Creates a new user with the information supplied.
* **URL**
    `/user`
* **Method:**
    `POST`
* **Data Params**
```
    {
        email: [string],
        // Optional
        name: [string]
    }
```
* **Success Response:**
    * **Code:** 201 <br />
* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
    OR
    * **Code:** 500 SERVER ERROR <br />

* **Sample Call:**
```
    $http({
        type: 'POST',
        url: '/user',
        data: {
            email: 'frank@franks.com',
            name: 'Frank Bank'
        }
    })
```
----
**Update Existing User**
----
Updates an existing user with all of the optional supplied information.
* **URL**
    `/product`
* **Method:**
    `PUT`
* **Data Params**
```
    {
        id: [integer],
        // All optional:
        email: [string],
        name: [string]
    }
```
* **Success Response:**
    * **Code:** 200 <br />
* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
    OR
    * **Code:** 500 SERVER ERROR <br />
* **Sample Call:**
```
    $http({
        method: 'PUT',
        url: '/user',
        {
            id: 2,
            name: 'Franklin Bank'
        }
    })
```
----
**Delete Existing User**
----
Deletes an existing user that matches the supplied id parameter
* **URL**
    `/user/:id`
* **Method:**
    `DELETE`
    *  **URL Params**
        **Optional:**
        `id=[integer]`
* **Success Response:**
    * **Code:** 200 <br />
* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
    OR
    * **Code:** 500 SERVER ERROR <br />
* **Sample Call:**
```
    $http({
        method: 'DELETE',
        url: '/user/2'
    })
```
-------------------------------------------------------
**View All Orders**<br/>
Admin viewing all the orders for the day or for a specific date.

- **URL**
`/order` or `/order/:date`

- **Method:**
`GET`

- **URL Params**
  **Optional:**
  `date=DATE`

- **Data Params**
  N/A

- **Success Response:**
  - **Code:** 200<br/>
    **Content:**
    ```
    { id: [integer],
      total_qty: [integer],
      total_cost: [integer]],
      order_date: [date],
      order_time: [time],
      status: [string],
      comments: [string]
      };
    ```
- **Error Response:**
  - **Code:** 401 UNAUTHORIZED<br/>
    **Content:** `{ error : "Unauthorized" }`
  OR
  - **Code:** 500 INTERNAL SERVER ERROR<br/>
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**
  ```
  $http({
      type: 'GET',
      url: '/order',
      success: function(response){
        console.log('successful get call', response)
      },
      error: function(response){
        console.log('error with get call', response)
      }
      });
  ```

  ```
    $http({
      type: 'GET',
      url: '/order/:date',
      success: function(response){
        console.log('successful get call', response)
      },
      error: function(response){
        console.log('error with get call', response)
      }
      });
  ```
--------------------------------------------------------------------------------
**Submit Order**<br/>
Submission of new order by client or admin.

- **URL**
  `/order`

- **Method:**
  `POST`

- **Data Params**
  ```
  {
    customer_id: [integer],
    order_items: [array],
    comments: [string]
  }
  ```

* **Success Response:**
    * **Code:** 201 <br />

* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
      OR
    * **Code:** 500 SERVER ERROR <br />`

- **Sample Call:**
  ```
    $http({
    type: 'POST',
    url: '/order',
    data: {
      customer_id: '1',
      order_items: ['honey wheat', 'pretzel'],
      comments: ['1/2 inch slices.']
      }
    });
  ```
--------------------------------------------------------------------------------
**Update Order**<br/>
Update client order.

- **URL**
  `/order`

- **Method:**
  `PUT`

- **Data Params**
  ```
  {
    customer_id: [integer],
    order_items: [array],
    comments: [string]
  }
  ```

* **Success Response:**
    * **Code:** 201 <br />

* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
      OR
    * **Code:** 500 SERVER ERROR <br />`

- **Sample Call:**
  ```
    $http({
    type: 'PUT',
    url: '/order',
    data: {
      customer_id: '1',
      order_items: ['honey wheat', 'pretzel', 'blueberry cornbread'],
      comments: [string]
      }
    });
  ```
--------------------------------------------------------------------------------
**Submit Order**<br/>
Submission of new order by client or admin.

- **URL**
  `/order`

- **Method:**
  `POST`

- **Data Params**
  ```
  {
    customer_id: [integer],
    order_items: [array],
    comments: [string]
  }
  ```

* **Success Response:**
    * **Code:** 201 <br />

* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
      OR
    * **Code:** 500 SERVER ERROR <br />`

- **Sample Call:**
  ```
    $http({
    type: 'POST',
    url: '/order',
    data: {
      customer_id: '1',
      order_items: ['honey wheat', 'pretzel'],
      comments: ['1/2 inch slices.']
      }
    });
  ```
--------------------------------------------------------------------------------
**Confirm Order**<br/>
Update order status to confirmed on button click.

- **URL**
  `/order/confirm/id`

- **Method:**
  `PUT`

*  **URL Params**
  `id=[integer]`

- **Data Params**
  ```
  {
    customer_id: [integer],
  }
  ```

* **Success Response:**
    * **Code:** 201 <br />

* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
      OR
    * **Code:** 500 SERVER ERROR <br />`

- **Sample Call:**
  ```
    $http({
    type: 'PUT',
    url: '/order/confirm/id',
    data: {
      customer_id: '1',
      }
    });
  ```
--------------------------------------------------------------------------------
**Delete Order**<br/>
Delete order by order id.

- **URL**
  `/order/:id`

- **Method:**
  `DELETE`

*  **URL Params**
  `id=[integer]`

* **Success Response:**
    * **Code:** 201 <br />

* **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
      OR
    * **Code:** 500 SERVER ERROR <br />`

- **Sample Call:**
```
    $http({
        method: 'DELETE',
        url: '/order/1'
    })
```
