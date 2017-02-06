# **View All Orders**
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
**Submit Order**
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
**Update Order**
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
**Submit Order**
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
**Confirm Order**
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
DELETE /order/:id -> 201/401/500
**Delete Order**
Delete order.

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
