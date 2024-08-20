#   Back End Assignment
This project develops and integrates two back-end services—an account manager and a transaction service with Node.js, Express, Prisma, CronJob, and PostgreSQL. The entire setup is containerized using Docker and Docker Compose.

##  Services
### Account Manager Service
1. Handle user authentication and authorization
2. Manage user payment account
3. Get user payment history
### Transaction Service
1. Send Money
2. Withdraw Money
3. Recurring Money

##  Tech Stack
- Node JS with Express
- Postgre SQL
- Prisma for ORM and Migration
- Docker for containerization
- Docker Compose for running multiple container
- Supabase for authentication
- Cron for scheduled process

##  Libraries
- Express Validator -> Validate request body
- Node Cron -> Recurring transaction
- Prisma -> ORM Databases Management and Migration Databases
- Supabase -> Authentication
- dotenv -> Environment Management

##  How To Run
1. Clone the repository
```
git clone https://github.com/wendywinata128/be-assignment.git
```
2. Set up environment variables
    - Create a `.env` files in home project (which contain docker-compose)
    - Add the neccesary variables, such as databases connections and supabase url
    - if you need .env example, you can look  at `.env.example` files.
3. Run `docker-compose up -d` this command will build all images, run the migrations, and run the container for both services.

## API Endpoints
Complete documentation about endpoints can be found at `docs` folder
### Account Manager Service
- `POST /login` Login and getting user Token
- `POST /signup` Sign up new user

- `GET /payments` Get user payment account
- `POST /payments` Add new user payment account
- `PUT /payments/:id` Edit user payment account by its ID
- `DELETE /payments/:id` Delete user payment account by its ID

- `GET /payments/history` Get transaction and payment account history for the authenticated user

### Transaction Service
- `POST /transaction/send` Send money

- `POST /transaction/withdraw` Withdraw money

- `POST /transaction/recurring` Recurring transaction

## Application Logic
### Core Transaction Process
1. Request body for transaction will be validated with `express-validator` library. Validations saved in `validations folder`
2. Receiver of the transaction will be checked if exist with `checkIfReceiverExist` methods.
3. Payment Account will be checked if exist.
4. Currency will be checked if exist.
5. Transaction amount will be **converted** to payment account currency. This process can be found in `src/lib/currencies.js`
6. Payment account balance will be checked if theres enough balance to do transaction.
7. **If all validations is passed, transaction will be created**.
8. A payment history record for the user will be created.
9. The user's payment account balance will be updated to reflect the new amount.

### Recurring Proccess
1. Request body for recurring process will be validated with `express-validator` library.
2. Recurring details will be stored into `transaction recurring table`
3. Recurring transaction will be scheduled with `node-cron` library.
4. In scheduled cron, we will call [Transaction Process](#core-transaction-process).
5. If `processTransaction` failed, scheduled task will be stopped and status column in `transaction recurring data` will be updated to false.

### Maintain Recurring Process
The reason I choose to store recurring details in `transaction recurring table` because I want to maintain recurring process everytime application restarted. The process will be as follow :
1. Application started or restarted.
2. Process `initRecurring()` will be called.
3. Getting all reccurent transactions which status is **true**.
4. If theres no recurrent transaction, the recurring process wil be stopped.
5. Recurring process will be called with the data from `transaction recurring table`.
6. Recurring transaction is maintained and will be process as [Recurring Process](#recurring-proccess)

### Authentication and Authorization
The authentication and authorization is maintained by supabase with JWT token.

### Folder Management
- config -> Manage library config, such as prisma and supabase.
- controllers -> Manage application logic.
- entity -> Manage entity or model in the applications.
- lib -> Manage third party libraries.
- middleware -> Manage application middleware
- routes -> Manage application routes.
- utils -> Manage utils in the application, such as global functions.
- process -> Manage complicated logics.
- validations -> Manage field validations in the applications.

## Contact
- Email: wendywinata128@gmail.com
- LinkedIn: https://www.linkedin.com/in/wendyyy/


