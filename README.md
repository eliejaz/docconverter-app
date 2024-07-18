# Document Converter Angular App

Document Converter Angular App is a front-end application built using Angular 16 that interacts with a Document Converter microservice. The application provides a user-friendly interface for uploading files, converting documents between different formats (PDF to DOCX, DOCX to PDF), and monitoring the status of conversions.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [License](#license)

## Features

- Upload files with drag-and-drop functionality
- Convert PDF to DOCX
- Convert DOCX to PDF
- View recent conversions and their statuses
- Download converted files once conversion is completed
- Real-time status updates using WebSocket
- Responsive design using Angular Material

## Technologies

- Angular 16
- Angular Material
- RxJS
- TypeScript
- HTML/CSS
- WebSocket

## Setup

### Prerequisites

- Node.js (v16 or higher)
- Angular CLI (v16 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/eliejaz/docconverter-app.git
cd docconverter-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the application:

```bash
ng serve
```

The application will start on `http://localhost:4200`.

## Usage

### Dashboard

The dashboard shows a list of recent conversions with their statuses. It allows users to convert uploaded files and download completed conversions.

### Upload a Document

Users can upload a document using the drag-and-drop feature or by selecting a file from their file system.

### Convert a Document

After uploading, users can request a conversion from PDF to DOCX or from DOCX to PDF by clicking the appropriate button.

### Check Conversion Status

Users can see the status of their conversions in the dashboard.

### Download Converted Document

Once the conversion is completed, users can download the converted document by clicking the download button.

### Real-time Status Updates

The application uses WebSocket to receive real-time updates on the status of document conversions. This ensures that users are immediately informed when their documents are ready for download.

## API Endpoints

The Angular app interacts with the following endpoints provided by the Document Converter microservice:

- `GET /api/conversions/convert/pdf-to-word`: Convert PDF to DOCX
- `GET /api/conversions/convert/word-to-pdf`: Convert DOCX to PDF
- `GET /api/conversions/status/{conversionId}`: Get conversion status
- `GET /api/conversions/download/{conversionId}`: Download converted file
- `POST /api/documents/upload`: Upload a document
- `GET /api/documents/files`: Get all uploaded files

## Testing

To run the tests:

```bash
ng test
```

This will start the Karma test runner and execute all unit tests, displaying the results in both the terminal and a browser window.

## License

This project is licensed under the MIT License.