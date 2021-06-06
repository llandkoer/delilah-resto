# Delilah Restó 🍽

![Logo](https://i.imgur.com/6GJ00jE.png "Logo")

Backend for an online ordering system for a restaurant. REST API to perform CRUD operations on a data structure.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The things you need before Installing the project.


- [GIT](https://git-scm.com/)
- [MariaDB](https://mariadb.org/download/)
- A tool for dissecting REST APIs such as [Postman](https://www.postman.com/)
- A database manager such as [DBeaver](https://dbeaver.io/)
- [Node.js](https://nodejs.org/)


### Installing

How to get a development env running.

1. Clone the GitHub repository and run it locally.

2. Take the SQL script and run it in the database manager. This will create the database, the table structure and the initial data that the project needs to work.

2. Install all the dependencies of the project by console with NPM.

```
npm i
```

4. Create an `.env` file inside the `src` folder of the project. Use the `template.env` file to understand what data you need to have. All this data will depend on the configuration you have given to MariaDB and JWT except for the last two (`JWT_ADMIN` and `JWT_USER`). The values to be assigned to these should be `1` and `2` respectively.

5. Run the  server with Node (or Nodemon) and start making requests according to the documentation and through Postman (or a similar application).

**Clarification**: It is not possible to create administrator users via routes. To perform operations that only an administrator can perform, an administrator user will be created in the SQL script. You will be able to log in with the following data.

```json
{
"email": "admin@admin.com",
"password": "44721327248817"
}
```

**Reminder**: The server will run on port 3000 of your computer.

## Documentation

Checkout the API documentation [here]().

## Built With

* JavaScript - Programming language
* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [Express.js](https://expressjs.com/) - Web framework for Node.js
* [MariaDB](https://mariadb.com/) - Open source database
* [JWT](https://jwt.io/) - An open method for representing claims securely between two parties

## Authors

* **Luis Landkoer** - [llandkoer](https://github.com/llandkoer)
* **Daniel Estupiñan Ramos** - [DanielE0802](https://github.com/DanielE0802)

## License

This project is licensed under the MIT License.
