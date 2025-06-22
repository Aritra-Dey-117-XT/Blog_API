
# Secure Node.js Blog API

A clean and secure RESTful Blog API built with Node.js, Express, and MongoDB.
Features include JWT-based authentication, protected routes, full CRUD operations, request validation, centralized error handling, request logging, and image uploading using Multer with local storage and public access.

---

## Features & Working

### User Authentication
- Secure user registration and login using **JWT** stored in HTTP-only cookies.
- Input validation with **express-validator** for safe and clean request data.
- Access to protected routes only for authenticated users.
- Logout mechanism to clear authentication cookies.

### Blog CRUD API
- RESTful API for managing blog posts: **Create**, **Read**, **Update**, and **Delete**.
- Only logged-in users can create, update, or delete blogs.
- Middleware for:
  - **Request logging**
  - **Centralized error handling**
  - **Route protection** using JWT authentication

### Image Uploading API
- Upload a single image using **Multer** with local file storage.
- Uploaded files are stored in a public `/uploads` folder.
- Retrieve public image URLs using a GET endpoint.
- Only image file types (`.jpg`, `.jpeg`, `.png`, `.gif`) are allowed.
- **Note:** This image upload module is **standalone** feature, not yet integrated with blogs or profiles.

---

## User Permissions

| Role        | Capabilities                                                                 |
|-------------|-------------------------------------------------------------------------------|
| Anyone      | Sign up, Sign in, View all blogs, View blogs by user, View uploaded images   |
| Authenticated Users | Create blog, Update/Delete own blogs, View own profile, Upload image      |

---

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
| GET    | `/blog/all?userId=:userid`     | Get blogs created by a user       | No        |
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