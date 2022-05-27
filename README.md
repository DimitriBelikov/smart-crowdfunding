# Smart CrowdFunding Using Blockchain

As of today, crowdfunding platforms have accountability and trust problems. In many
cases, money from donors/philanthropists has gone into wrong campaigns and has been misused.
Implementing a blockchain-based platform can bring in a change. With this project and
blockchain smart-contracts, donors would be informed about the payments to be processed by the
Fundraiser through request money forms. A smart contract helps to block the funds within
blockchain until the campaign organizer makes progress in the campaign.

- With the help of our application people would be able to create campaigns to raise fund for natural calamities, start-ups or any other social/personal causes. Similarly, on other end general public can donate funds for these campaigns.
- Our application goal is to create a transparency between donors and the campaign organizers in the respect of how the money is spent and where it is spent.
- The organizers would not be able to spend the money without informing to the donors about the details of spending.
- We aim to accomplish decentralized crowdfunding application using blockchain and smart contracts.

![Current vs Proposed Model](https://user-images.githubusercontent.com/44198993/166906047-3671110d-e956-42b2-88f9-197016b9c007.jpg)

## System Model
![Project Diagrams-System Architecture drawio](https://user-images.githubusercontent.com/44198993/166906082-7e6ddc81-2e37-419f-9ffd-54a5cb18e8ed.png)

## Tech Stack

**Client:** React, HTML, CSS, Bootstrap(v4.0)

**Server:** Node, Express

**Database:** Mongoose

## Technologies and Tools Involved/Used:

- MERN (Mongoose, Express, React and Node)
- Solidity
- Ganache
- Web3.js
- Metamask
- Ant Design
- Bootstrap
## Modules Required

**Backend Module:-**
- bcrypt: ***v5.0.1***
- cookie-parser: ***v.1.4.6***
- dotenv: ***v.10.0.0***
- express: ***v.4.17.1***
- fs: ***0.0.1-security***
- fs-extra: ***v.10.0.0***
- jsonwebtoken: ***v.8.5.1***
- mongoose: ***v.6.0.13***
- multer: ***v.1.4.4***
- solc: ***v.0.8.10***
- web3: ***v.1.6.1***

**Frontend Modules:-**
- @truffle/hdwallet-provider: ***v.1.7.0***
- @ethereumjs/common: ***v.2.6.4***
- @ethereumjs/tx: ***v.3.5.1***
- antd: ***v.4.19.5***
- bootstrap: ***v.4.6.0***
- bson: ***v.4.6.1***
- dotenv: ***v.16.0.0***
- js-cookie: ***v.3.0.1***
- jsonwebtoken: ***v.8.5.1***
- path: ***v.0.12.7***
- react: ***v.17.0.2***
- react-bootstrap: ***v.2.1.1***
- react-dom: ***v.17.0.2***
- react-router-dom: ***v.6.2.1***
- react-scripts: ***4.0.3***
- react-show-more-text: ***v.1.5.2***
- web3: ***v.1.7.0***
## API Reference

#### **API-User**

| **Action** | **URL**                                   | **Description**                                                                                                                                                                                         |**Inputs**|
|------------|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| **POST**   | /api/user                                 | This request will add a user to the Users Database and handle any errors                                                                                                                                | **Body**: { UserSchema Object }
| **GET**    | /api/user/:id                             | This request will return user details                                                                                                                                                                   | **Args**: id
| **PATCH**  | /api/user/:id                             | This request will update the user data corresponding to that particular id                                                                                                                              | **Body**: { userAttributes: , updatedValue: }
| **DELETE** | /api/user/:id                             | This request deletes the user Data for that particular id.                                                                                                                                              | **Args**: id
| **POST**   | /api/user/login                           | This request verifies the User using JWT tokens and logs the user in.                                                                                                                                   | **Body**: { Username: , password: } 
| **POST**   | /api/user/logout                          | This request logs out the user by expiring the JWT token.                                                                                                                                               |  --

#### **API-Campaign Creator**

| **Action** | **URL**                                   | **Description**                                                                                                                                                                                         |**Inputs**|
|------------|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| **POST**   | /api/campaign                             | This request creates a new campaign object                                                                                                                                                              | **Body**: { CampaignSchema Object }
| **PATCH**  | /api/campaign/:id                         | This request will update the campaign data corresponding to the passed particular id                                                                                                                    | **Body**: { campaignAttribute: updatedValue }
| **GET**    | /api/campaign/:id                         | This request will return campaign details corresponding to the passed particular id                                                                                                                     | **Args**: id
| **DELETE** | /api/campaign/:id                         | This request deletes the campaign Data for that particular id.                                                                                                                                          | **Args**: id
| **GET**    | /api/campaign/:id/request                 | This request will return all the requests from requestVOtingHistory of Campaign                                                                                                                         | **Args**: id
| **POST**   | /api/campaign/:id/request                 | This request creates a new campaign request for a campaign with id=id                                                                                                                                   | **Args**: id, **Body**: { campaignRequest: }
| **PATCH**  | /api/campaign/:id/request/current         | This request will update a particular campaign request corresponding to a campaign with id=id                                                                                                           | **Args**: id, **Body**: { campaignRequest: updatedObject }
| **POST**   | /api/campaign/:id/request/current/:status | This request deletes a particular campaign request corresponding to a campaign with id=id                                                                                                               | **Args**: id, status

#### **API-Campaign-Contributor**

| **Action** | **URL**                                   | **Description**                                                                                                                                                                                         |**Inputs**|
|------------|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| **POST**   | api/campaign/:id/vote                     | This request adds a contributor’s  vote for a particular campaign                                                                                                                                       | **Args**: id, **Body**: { userId:, vote: boolean }
| **POST**   | api/campaign/:id/donate                   | This request adds the donor's amount to a campaign’s(with id=id) donor list. Also transfers the amount from the user's Metamask to smart contract. If transactionStatus fails, do not perform anything. | **Args**: id, **Body**: { userId:, amount:, transactionStatus: {Success, Failed} }


## Installation and Setup

You need all the modules installed first to run the Frontend as well as the Backend servers.
To do so, run the following command after git-clone:

- **Installing all the Backend Modules:-**
```
  git clone <github-project-link>
  cd <github-project-name>
  npm install --save
```
- **Installing all the Frontend Modules:-**
```
  cd frontend
  npm install --save
```

- **Setup all the required Environment variables:-**
    - **Environment variables for Backend:-**
        Place this variables in a .env file in the ***root*** directory of your project. The variable list is as follows:
    ```
    ** DATABASE_ENV **
    MONGOOSE_URL --> Mongo Atlas Url for your Database
    API_USER     --> API User of your Database
    API_KEY      --> API User Key 

    ** DEVELOPMENT_ENV **
    PORT         --> Port on which you want your local host to run on
    SALT         --> Salt variable for encoding passwords
    JWT_SECRET   --> Hashed JWT Secket Key for encoding passwords
    ```
    - **Environment variables for Frontend:-**
        Place this variables in a .env file in the ***frontend*** directory of your project. The variable list is as follows:   
    ```
    # GANACHE_ENV
    REACT_APP_GANACHE_API_KEY --> Your Ganache Workspace Mnemonic String

    #METAMASK DUMMIES
    REACT_APP_INFURA_API_KEY --> Your Infura API Key
    REACT_APP_METAMASK_PRIVATEKEY --> Your Metamask Private Key to Sign Transaction on Server Side
    ```
    **Note:** Infura and Metamask keys will not be required unless and until you remember to replace the Infura Section 
    and Metamask Section of Transaction Processing with corresponding Ganache-Hardware-Wallet calls.
## Running the System - Locally

To run this project, follow the following code after completing through the installation phase:

- **Step 0 - Compile Smart Contract**
    ```bash
    cd <github-project-repository>/frontend/src/ETHBackend
    node compile-contract.js
    ```
    Check to see if CLI does not show any errors while compiling mainly due to a different solc version. If not, 
    then check the ***Build*** Folder to see if the build is created successfully.

- **Start Backend Server -** ***NODE.js***
    ```bash
    cd <github-project-repository>
    npm run start-dev
    ```

- **Start Frontend Server -** ***REACT.js***
    ```bash
    cd <github-project-repository>/frontend
    npm start
    ```
    **Note:** If you are using Ganache Wallet and Server, be ready with your Ganache Interface/Workspace. 

## Web Application ScreenShots
1. **HomePage**
![HomePage](https://user-images.githubusercontent.com/44198993/170696586-f224c3e1-89a9-410f-a84e-d6b7ae562ebf.jpeg)


2. **Campaigns Page**
![Campaigns Page](https://user-images.githubusercontent.com/44198993/170696637-bd680a99-80dc-4390-b3b3-d526b0dd8a91.jpeg)


3. **Individual Campaign Page**
![Campaign Page - Campaign Organiser](https://user-images.githubusercontent.com/44198993/170696717-5238b07b-6e06-4681-b4ae-8a73a480fc4b.jpeg)


4. **Campaign Updates**
![Campaign Updates](https://user-images.githubusercontent.com/44198993/170696802-17fe79bb-caf4-441e-9a2e-304fa6fd50cd.jpeg)


5. **Campaign Request History**
![Request History - User Donation](https://user-images.githubusercontent.com/44198993/170696866-1f50a706-7f6e-401c-9802-2645a5f2dfc1.jpeg)


6. **Campaign Documents**
![Campaign Documents](https://user-images.githubusercontent.com/44198993/170696925-33746197-c2d0-4108-87aa-caf02debe6b6.jpeg)


7. **Create Campaign Page**
![Create A Campaign Page - Metamask Connect](https://user-images.githubusercontent.com/44198993/170696969-753e25ab-6182-4690-b8a9-4f9d83628e10.jpg)
![Create A Campaign Page](https://user-images.githubusercontent.com/44198993/170696985-ee261806-d6d2-42f9-9f08-d5cd3a70a9ea.jpeg)


8. **Login**
![Login](https://user-images.githubusercontent.com/44198993/170697052-641b3754-7442-48d1-869a-b4ab6e9bfed9.jpeg)


9. **Register**
![Registration](https://user-images.githubusercontent.com/44198993/170697085-0fdf96eb-9e27-4c3b-8ab8-04927485a587.jpeg)


10. **About Us**
![About Us](https://user-images.githubusercontent.com/44198993/170697128-03cd449e-3764-4538-9c10-7e56cd0e4784.jpeg)

11. **Donating Campaigns**
![Donate Campaign](https://user-images.githubusercontent.com/44198993/170697996-d626c01c-dc8c-4e95-b9e7-b69dcc81bf4f.jpeg)
![Donation Success](https://user-images.githubusercontent.com/44198993/170698009-bacd08fd-3f86-4a6c-9952-cfe1ce5b9aeb.jpeg)


## Authors

- [@Harshavardhan Talele](https://github.com/tharsh1)
- [@Urmil Chandarana](https://github.com/DimitriBelikov)
- [@Niha Shaikh](https://github.com/Niha-21)
- [@Dhairya Mehta](https://github.com/dhairya-mehta)


## Acknowledgements

 - [Venturing Crowdfunding using Smart Contracts in Blockchain | IEEE Conference Publication](https://ieeexplore.ieee.org/document/9214295)
 - [Proposed Solution for Trackable Donations using Blockchain | IEEE Conference Publication](https://ieeexplore.ieee.org/document/8946019)
 - [Tecra Space](https://tecra.space)
 - [GitHub - rushikesh611/DisReliefFund: Ethereum based Crowdfunding website for disaster relief funds.](https://github.com/rushikesh611/DisReliefFund)
 - [How to reduce gas cost in Solidity | by tak | LayerX | Medium](https://medium.com/layerx/how-to-reduce-gas-cost-in-solidity-f2e5321e0395)
 - [Optimizing your Solidity contract's gas usage | by Mark Mathis | Coinmonks | Medium](https://medium.com/coinmonks/optimizing-your-solidity-contracts-gas-usage-9d65334db6c7)

