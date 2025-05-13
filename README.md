# Notes Sync Backend

A modern Node.js backend for a notes application with offline sync capability. This server provides a RESTful API for managing notes and supports real-time updates via Socket.IO.

## Features

- RESTful API for notes management
- Real-time updates with Socket.IO
- SQL database storage with Sequelize
- Support for offline sync with batch processing
- Duplicate prevention based on client-generated UUIDs
- CORS enabled for mobile clients
- Request validation with Joi
- ES Modules architecture
- Secure Docker deployment

## Tech Stack

- Node.js with ES Modules
- Express.js
- Sequelize ORM with PostgreSQL (MySQL supported as alternative)
- Socket.IO for real-time communication
- Joi for request validation

## Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL or MySQL database

## Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
cd notes-sync-backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example`
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials

5. Create the database
```bash
# For PostgreSQL
createdb notes_db

# For MySQL
mysql -u root -p
CREATE DATABASE notes_db;
```

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

- `GET /notes` - Fetch all notes
- `POST /notes` - Create a new note
- `POST /notes/batch` - Batch create notes (for syncing)

## Socket.IO Events

- `note:created` - Emitted when a new note is created
- `note:synced` - Emitted when a note is synced
- `notes:batch-synced` - Emitted when a batch of notes is synced

## Using Docker

```bash
# Build and run with Docker Compose
docker-compose up -d
```

## Project Structure

```
notes-sync-backend/
├── config/               # Configuration files
│   └── database.js       # Database configuration
├── controllers/          # Request controllers
│   └── noteController.js # Note-related operations
├── middlewares/          # Express middlewares
│   ├── errorHandler.js   # Global error handler
│   └── validator.js      # Request validation middleware
├── models/               # Sequelize models
│   ├── index.js          # Models initialization
│   └── Note.js           # Note model definition
├── routes/               # API routes
│   └── noteRoutes.js     # Note-related routes
├── utils/                # Utility functions
│   └── socketManager.js  # Socket.IO management
├── .env                  # Environment variables
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── app.js                # Express application setup
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Docker configuration
├── package.json          # Project metadata and dependencies
├── README.md             # Project documentation
└── server.js             # Server entry point
```