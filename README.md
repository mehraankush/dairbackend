# Backend Overview

This backend is built using Node.js and Express.js, providing a robust foundation for handling server-side operations. The data is stored in MongoDB, ensuring efficient and scalable data management. The deployment is hosted on AWS EC2, offering a reliable and scalable infrastructure.

## Authentication

Authentication is a crucial aspect of the backend, and it is seamlessly handled with the help of Passport.js. Passport.js provides a flexible and secure authentication mechanism, supporting various strategies. This ensures that user authentication is processed efficiently and securely.

### Passport Strategies

- **Magic Link Login:** Nodemailer is used to send requests for magic link logins. This method allows users to securely log in with a single click, enhancing user experience and security.

- **Google and GitHub Authentication:** The backend integrates with Google and GitHub APIs to enable authentication through these popular platforms. This provides users with the option to sign in using their Google or GitHub credentials, adding convenience and flexibility to the authentication process.

## Deployment on AWS EC2

The backend is deployed on AWS EC2, utilizing Amazon's cloud infrastructure. This choice ensures scalability, reliability, and efficient management of resources. AWS EC2 allows for easy scaling based on demand, making it suitable for applications with varying workloads.

### Deployment Process

1. **Setup on EC2 Instance:** The backend application is set up on an EC2 instance, configuring the necessary environment for the Node.js and Express.js application.

2. **Configuration and Environment Setup:** Environmental variables and configurations are set up on the EC2 instance to ensure the proper functioning of the backend in the AWS environment.

3. **Continuous Monitoring:** AWS EC2 provides monitoring capabilities to track the performance of the backend application, allowing for proactive management and quick resolution of any issues.

![Flow Chart](https://github.com/mehraankush/TypeScript/blob/main/dair/Screenshot%202023-12-21%20160226.png)
