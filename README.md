## Prerequisites
- Node.js
- MongoDB
- Postman

# Follow the steps properly to run the project successfully

- Clone the repository
  
```bash
    git clone https://github.com/Aritra212/assignment_16_09.git
```
Now first let's try to run the backend first.

## Steps to run the backend properly

- For the database open your MongoDB and create a **cluster** then within the cluster create a new **database** with two collections named **logins**, **employes** (do not change the collection name otherwise you need to change the backend also).
- After creating the database get the connection URL ( e.g. mongodb+srv://**username**:**password**@cluster0.occop3z.mongodb.net/**databasename**?retryWrites=true&w=majority&appName=Cluster0 )
- Open the cloned repository in VS Code (you can use other IDEs also).
- Go to the backend folder and create a **.env** file. Now open the file and add two variables. Don't change the name of the variable just change the values according to your need.
  
  ```bash
    PORT= 8000 
    MONGODB_URL = "paste your MongoDB connection URL here"
  ```
- Next, open a new Terminal and execute the following commands to run the backend
  
  ```bash
    cd ./backend
    npm i
    npm start
  ```

- Next open postman to add an admin to the database. ( You can add admin manualy also in the database named as **logins**, but in the backend I already create a route so if you want you can use the following URL. The method must be POST )
  
  **Backend URL**
  ```bash
    http://127.0.0.1:8000/api/v1/admin/create
  ```
  **POST BODY DATA Format**
  ```bash
    {
      "userName" : "admin123",
      "password" : "A12345678"
    }
  ```

Now move on to the frontend setup.

## Steps to run the frontend properly.

- If you changed the backend port then follow this step. Go to the frontend folder then open **vite.config.js** file. Afterthat change the **target** value according to your changed port number.
  ```bash
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  ```
- Next, open a new Terminal and execute the following commands to run the frontend
  
  ```bash
    cd ./frontend
    npm i
    npm run dev
  ```

If you face any problem to run the project contact me - **aritrapaulpc@gmail.com**
