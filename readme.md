
# Blog_API

A clean and secure RESTful Blog API built with Node.js, Express, and MongoDB.  
Includes JWT-based authentication, protected routes, CRUD operations, request validation, centralized error handling, and request logging.

## Endpoints

#### User Endpoints

| Method | Endpoint         | Description                  | Protected |
|--------|------------------|------------------------------|-----------|
| POST   | `/user/signup`   | Register a new user          | No        |
| POST   | `/user/signin`   | Login and get JWT cookie     | No        |
| GET    | `/user/profile`  | Get current user data        | Yes       |
| POST   | `/user/logout`   | Logout and clear JWT cookie  | Yes       |

---

#### Blog Endpoints

| Method | Endpoint             | Description                       | Protected |
|--------|----------------------|-----------------------------------|-----------|
| GET    | `/blog/all`          | Get all blogs                     | No        |
| GET    | `/blog/user/:id`     | Get blogs created by a user       | No        |
| POST   | `/blog/create`       | Create a new blog                 | Yes       |
| PUT    | `/blog/update/:id`   | Update an existing blog by ID     | Yes       |
| DELETE | `/blog/delete/:id`   | Delete a blog by ID               | Yes       |



## Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/Aritra-Dey-117-XT/Blog_API.git
   cd blog-api
 2.  Install dependencies:
 
     ```bash
	 npm install
3.  Configure  `.env`:

	```bash
	MONGODB_URI=your_mongodb_uri
	JWT_SECRET=your_secret_key
4.  Start the server:
    
    ```bash  
    node app.js
    ```
    or use `nodemon` to auto-restarts the server whenever you make changes to the file:
    ```bash  
    nodemon app.js
---

## Sample Postman Collection (in JSON)

A `Blog_API.postman_collection.json` file exported from Postman. 
* Developers are encouraged to test additional API request scenarios, such as missing or invalid parameters (e.g., no email, invalid email format, or weak passwords).
* You may also test access to protected routes without authentication to evaluate the robustness and effectiveness of the API's validation and authorization mechanisms.

Some Example API Requests in `/postman/Blog_API.postman_collection.json` are:

```json
{	
	"item": [
		{
			"name": "signup",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"username\":\"Username\",\r\n    \"email\":\"username@gmail.com\",\r\n    \"password\":\"Password@123\"\r\n}\r\n",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:3000/user/signup",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"user",
						"signup"
					]
				}
			},
			"response": []
		},
		{
			"name": "get-all-blogs",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:3000/blog/all",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"blog",
						"all"
					]
				}
			},
			"response": []
		},
		{
			"name": "update-blog",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"title\": \"I am Iron Man\",\r\n    \"description\": \"'The Truth is, I am Iron Man!', said Tony Stark, famous Billionare.\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:3000/blog/update/:userid",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"blog",
						"update",
						":userid"
					],
					"variable": [
						{
							"key": "userid",
							"value": ""
						}
					]
				}
			},
			"response": []
		},
	]
}