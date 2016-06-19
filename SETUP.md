# Product API Setup and Installation

Please use the following steps to setup `ProductAPI` to your server

### 1. Clone/download source code
Download source codes from this repo or issue the following command to clone this repo to your local directory:

```
cd <target dir>
git clone https://github.com/andresusanto/ProductAPI.git
```


### 2. Set configurations
Copy `.env.example` to `.env`. Open it with your text editor, and set the configuration. 

The following is one example of correct configuration:

```
DBURL=mongodb://localhost/databasename      <-- mongodb url
DBUSER=databaseuser                         <-- mongodb db auth username
DBPASS=databasepassword                     <-- mongodb db auth password
API_KEY=r4Nd0MaP1kEyYy                      <-- api-key to secure api
```

### 3. Install Dependencies
Install dependencies by issuing:
```
npm install
```


### 4. Start the Program
To start `ProductAPI`, issue:
```
npm start
```

### 5. Done
You're good to go!

Please refer to API Guides for usage and Testing Guide for testing.
