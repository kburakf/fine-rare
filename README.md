# Fine Rare Backend Challenge

## Overview

This repository contains the implementation of a simple GraphQL product API built with TypeScript, managing product and producer entities using MongoDB. The API is designed without the use of the Apollo ecosystem, adhering to the provided challenge specifications.

## Features

- **Entities**: Handles two main entities - `Product` and `Producer`.
- **Queries**:
  - Fetch a single product by its ID.
  - Retrieve products by a producer's ID, including the producer's details.
- **Mutations**:
  - Create multiple products.
  - Update a single product.
  - Delete multiple products.
- **Product Synchronization Mutation**: A special mutation that triggers a background process to fetch, group, and upsert products from a CSV file into MongoDB in batches.

## Getting Started

### Prerequisites

- Docker
- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kburakf/fine-rare.git
   ```

2. Navigate to the project directory:
   ```bash
   cd fine-rare
   ```

   
3. Build and run the Docker containers:
   ```bash
   docker-compose up --build
   ```

### Environment Variables

Ensure the .env file is set up correctly in the project root with the following variables:

- MONGO_URI: Connection string for MongoDB
  - Example: mongodb://mongo:27017/graphql-backend
- PORT: Connection port for NodeJS
  - Example: 3000
- NODE_ENV: System environment
  - Example: development

## Usage

After setting up, you can access the GraphQL API at http://localhost:3000/graphql to perform queries and mutations as defined in the challenge requirements.

## Development Notes
- The API avoids using the Apollo ecosystem as per the challenge requirements.
- Product synchronization is implemented as a mutation that processes a CSV file in the background, ensuring resilience and efficiency.

## Folder Structure


```
fine-rare/
├── src/
│ ├── config/
│ │ └── environment/
│ │   └── index.ts
│ ├── database/
│ │ └── connection.ts
│ ├── dto/
│ │ ├── index.ts
│ │ ├── producer.ts
│ │ └── product.ts
│ ├── interfaces/
│ │ ├── producer.ts
│ │ └── product.ts
│ ├── models/
│ │ ├── index.ts
│ │ ├── producer.ts
│ │ └── product.ts
│ ├── modules/
│ │ ├── producer/
│ │ │ └── services/
│ │ │   └── producer.ts
│ │ └── product/
│ │ ├── graphql/
│ │ │ ├── product.resolvers.ts
│ │ │ └── schema.gql
│ │ └── services/
│ │     └── product.ts
│ └── utils/
│ ├── file-upload.util.ts
│ ├── index.ts
│ ├── resolvers.ts
│ ├── schemas.ts
│ └── server.ts
├── uploads/
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── README.md
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```

## License
This project is open-source and available under the MIT License.

## Acknowledgments
CSV data source: https://api.frw.co.uk/feeds/all_listings.csv
