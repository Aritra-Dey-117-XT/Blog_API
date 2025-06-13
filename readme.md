
# Blog_API

A clean and secure RESTful Blog API built with Node.js, Express, and MongoDB.
Features include JWT-based authentication, protected routes, full CRUD operations, request validation, centralized error handling, request logging, and image uploading using Multer with local storage and public access.

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

---

#### Image Upload Endpoints

| Method | Endpoint             | Description                       | Protected |
|--------|----------------------|-----------------------------------|-----------|
| GET    | `/upload/images`     | Get all uploaded Image URLs       | No        |
| POST   | `/upload/upload`     | Upload a single Image file        | Yes       |

## Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/Aritra-Dey-117-XT/Blog_API.git
   cd blog-api
   ```
   Ensure that the `./uploads` directory exists at the root of the 	  project (for storing uploaded images locally). If it doesn’t exist, create it manually before running the server:
   ```bash
   mkdir uploads
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

## Testing Tips

- Test with missing or invalid parameters (e.g., no email, invalid email format, weak password).
- Try accessing protected routes without authentication to verify authorization.
- Test image upload by:
  - Uploading a valid image via `POST /upload/upload` using form-data with key `image`.
  - Uploading multiple files or non-image files (should be rejected).
- `GET /upload/images` returns an array of image URLs. Visit a URL in the browser to view the image.

> ⚠️ Ensure the `./uploads` folder exists in the project root for storing uploaded images.


## Sample Postman Collection (in JSON)

A `Blog_API.postman_collection.json` file exported from Postman. 
An example `POST /signup` API request in `/postman/Blog_API.postman_collection.json` given below:

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
	]
}