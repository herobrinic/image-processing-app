# 🖼️ Image Processing App

A full-stack application that allows users to upload images, resize them, and retrieve the processed images.

## 🚀 Features

- Upload images via a user-friendly frontend.
- Resize images by specifying width and/or height.
- Retrieve and display processed images.
- Input sanitization to prevent malicious inputs.
- Comprehensive error handling.
- Modular code structure with controllers, services, and middleware.

## 🧰 Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express, TypeScript
- **Image Processing:** Sharp
- **File Uploads:** Multer
- **Security:** sanitize-html
- **Testing:** Jest

## 📁 Project Structure
image-processing-app/
├── frontend/
│ └── index.html
├── src/
│ ├── controllers/
│ ├── middleware/
│ ├── routes/
│ ├── services/
│ ├── types/
│ └── index.ts
├── tests/
├── uploads/
├── package.json
├── tsconfig.json
└── README.md

bash
Copy
Edit
## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/image-processing-app.git
   cd image-processing-app
   npm install
   npm install sanitize-html
   npm run dev
   The server will run on http://localhost:3000.


