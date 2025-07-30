# URL Shortener Backend

This project is a simple URL shortener backend built with Node.js, Express, and MongoDB.

## Features

- Shorten long URLs to short codes
- Redirect short codes to original URLs
- Track click statistics and details
- URL expiry functionality
- Logging middleware for request tracking

## Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/Siva-kalidindi/22PA1A1261.git
   cd 22PA1A1261
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGO=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>
   ```

4. **Start the server**
   ```sh
   node index.js
   ```
   The server will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints

- `POST /shorten`  
  Shorten a URL.  
  **Body:**  
  ```json
  {
    "origin": "https://example.com",
    "validity": 30
    //optionally
    "shortcode":"customecode"
  }
  ```

- `GET /:shortId`  
  Redirect to the original URL.

- `GET /shorturls/:id`  
  Get details for a short URL.

## Output Screenshots
## /Shorten
<img width="2157" height="1358" alt="Screenshot 2025-07-30 121710" src="https://github.com/user-attachments/assets/05bb1d98-2266-4dd3-9bb8-43cd823aac2e" />

## /shorten with custome code

<img width="2154" height="1350" alt="Screenshot 2025-07-30 121810" src="https://github.com/user-attachments/assets/2b6431e1-68b0-4fea-af39-3b55e0e834fb" />

## /shorten Error Response for existing shortcode

<img width="2157" height="1361" alt="Screenshot 2025-07-30 121751" src="https://github.com/user-attachments/assets/9654a375-a891-463e-9d9d-f385f3be9d6a" />

## Response for /shortcode Details

<img width="2159" height="1368" alt="Screenshot 2025-07-30 121821" src="https://github.com/user-attachments/assets/c28c2e4b-5ee0-4f6a-bb26-2741c736ab63" />
