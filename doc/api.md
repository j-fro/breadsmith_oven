#API Needs
* GET / -> index.html
* GET /login -> 200/401 + {role}
* GET /customer -> {id, usual_items: [], available_items: []} + 200/401/500
* GET /logout -> redirect
* GET /customer -> [{id, name}] + 200/401/500
* GET /customer/id -> {id, usual_items: [], available_items: []} + 200/401/500
* GET /customer -> [{id, type, variety}]
* GET /customer/id -> {all customer info}
* POST /customer {all customer info} -> 201/401/500
* PUT /customer {all customer info} -> 201/401/500
* DELETE /customer/id -> 201/401/500
* GET /order -> [{all the things}] + 200/401/500
* POST /order {customer_id, order_items: [], comments} -> {id} + 200/401/500
* PUT /order -> {a whole order} + 200/401/500
* PUT /order/confirm/id -> 200/401/500
* DELETE /order/id -> 200/401/500
* GET /user -> [{id, email}] + 200/401/500
* GET /user/id -> {id, name, email, role} + 200/401/500
* PUT /user {id, name, email, role} -> 200/401/500
* DELETE /user/id -> 200/401/500
* POST /user {name, email role} -> 201/401/500
* GET /product -> [{id, type, variety}]
* GET /product/id -> {all product info}
* POST /product {all product info} -> 201/401/500
* PUT /product {all product info} -> 201/401/500
* DELETE /product/id -> 201/401/500
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
    **Content if client account or id supplied:** `{
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
            price: [float]
        }]
    }`
  * **Code:** 200 <br />
    **Content if privileged account:** `[{
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
            price: [float]
        }]
    }, etc..]`

* **Error Response:**
  * **Code:** 401 UNAUTHORIZED <br />
  OR
  * **Code:** 422 SERVER ERROR <br />
* **Sample Call:**
  `$http({
      url: '/customer',
      type: 'GET'
  })`

**Add New Customer**
----
Endpoint for customer accounts. Gets information for one or multiple customers and allows for posting, putting, and deleting single customers.

* **URL**

`/customer` or `/customer/id`

* **Method:**

<_The request type_>

`GET` | `POST` | `DELETE` | `PUT`

*  **URL Params**

 **Required for DELETE:**

 `id=[integer]`

 **Optional for GET:**

 `id=[integer]`

* **Data Params**

<_If making a post request, what should the body payload look like? URL Params rules apply here too._>

**POST**

`{
    name: [string],
    address: [string],
    phone: [string],
    email: [
        [string]
    ],
    permitted_products: [{
            id: [integer],
        }]
}`

**PUT**

`{
    id: [integer]
    // optional:
    address: [string],
    phone: [string],
    email: [
        [string]
    ],
    permitted_products: [{
        id: [integer],
    }]
 }`


* **Success Response:**

<_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

* **Code:** 200 <br />
  **Content:** `{ id : 12 }`

* **Error Response:**

<_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

* **Code:** 401 UNAUTHORIZED <br />
  **Content:** `{ error : "Log in" }`

OR

* **Code:** 422 UNPROCESSABLE ENTRY <br />
  **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

<_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._>

* **Notes:**

<_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._>
