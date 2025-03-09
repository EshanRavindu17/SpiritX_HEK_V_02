# SpiritX_HEK_V_02

# Spirit11 - Fantasy Cricket League

Welcome to **Spirit11**, a thrilling fantasy cricket league where you can unleash your inner team manager! Build your dream team from real university cricket players, dive into detailed statistics, and compete against others to claim the top spot on the leaderboard. Whether you're a cricket enthusiast or a strategy mastermind, Spirit11 brings the excitement of the game right to your fingertips.

---

## ✨Features

- **Dream Team Creation**: Assemble your perfect lineup by selecting from real university cricket players.
- **Player Statistics**: Analyze in-depth stats to make informed decisions and optimize your team.
- **Leaderboard Competition**: Climb the ranks and compete with others for the ultimate bragging rights.
- **Real-Time Updates**: Stay in the game with live leaderboard updates powered by polling or Firestore onSnapshot.
- **User Authentication**: Secure login to manage your team and track your progress.
- **Intuitive UI**: Sleek and responsive design for an enjoyable experience across devices.

---

## 🛠️Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express, Firebase Admin SDK
- **Database**: Firestore (real-time data)
- **Authentication**: Firebase Auth, JWT
- **Notifications**: React Toastify

---

## Getting Started

To get started with theSpirit11 - Fantasy Cricket League, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/EshanRavindu17/SpiritX_HEK_V_02.git
    ```

2. **Install backend dependencies**:
    ```sh
    cd server
    npm install
    ```
3. **Install frontend dependencies**:
    ```sh
    cd client
    npm install
    ```
4. **Start the backend server**:
    ```sh
    cd server
    npm start
        ```
5. **Start the frontend development server**:
    ```sh
    cd client
    npm run dev
    ```
6. **In the server side within the config folder create serviceAccountKey.json file**
    ```sh
    {
    "type": "service_account",
    "project_id": "spiritx-67078",
    "private_key_id": "018b59d12c43c702f1627d6ffdc60d8dd15be9ad",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1v6S01uuPI039\nhDvB4FTrntX6wHfC7SYJRlKu5LGXxYvNFUxnTuLATYPp2SCbxm9PgVz30PeptmIM\nrwddW15z1yQUl/j/vqoMQJjAsGMAjZaXWd9qqrE6TD77heyTybQW/Q1ibRc1BImb\ncmc4z4bqP/7L/VJBwnuIOA/YsgR2r84yuqBvtYrv9F7reySjkPH+10b9oMzbbvIN\nxrdJ3JX/rx4nGkuNk58HkGIY+ACNNBwyJdPYi+3ew6Dw3Tfr1Q/XYyOSoH7RA8tw\nPzSiQGZkMSgU85EC4S1S53/ymaW4WRo+8bnpXDWwZbkAgmYJOvkgGKjGOMRDFMvq\nnp/PXsRLAgMBAAECggEAP2sDueZUg7m5+QAvKdNxTlY6LCkEoQvG/e1/5G8AWQkh\nYwpPgqzQCnIB2ZNeAX0YUhG9sutDwABX7j0UwMqlBp7HhDgTNon9JBFWO8ZQhVzi\ncyV1A+9TsBfy0ilFB7yWDn92MCYItwNCUO92fShM12hFLEDUdwW5vSpyvRZA4HiX\ni6/1EFwS/xPUAmw6PIYHOqko2kuS0Z4hnOzS/CEye4ve00cDBcQ0ZANd0Ah4B8X1\ngCxYORwbPO9JAMFYHvHYwPafIKB83eJJu1JwXsR5Mlgc3ekvb2rxrKRtsG+4GAfj\npnfgRbOsHLmWAEPx4nXYAR5glVHRWJGZgS/n/sx+YQKBgQD7+SxNRykqAMTECOlI\ngNylCLR2T5PfcvkILOUS/xApWxkcHhVsm695Q2fAJhBQkdtJRy3EmUtpC2yn4W4Y\nBKzonHf2q8WqOYb2nOIpZ/YsTosvLzt2CHqpJQSKw1ntdjar+eZqQDA0udoJwKyh\ngqcdqjSz6yV2pvAhdCJhsfO8hQKBgQC4py4KytvHTtizIUHgsdBsqDd2rkUFzJNA\nlKQG+UyYvdwPY4qCd9VBwCGgbt8twzeJ/oRB4CNopefmYxloh+P1Z51ky0aBrgVS\nO5s+tbDQu8NEMUheDMci+CDnyTopSFviqwK6Tlx6k+EMDhBnW+gO97jcOxlRhhRA\n7tWygmN+jwKBgQDKM/tJSIHQIy3D4yLR/BcUmRe4mcOg3TLbTKvHwsfFaEWOOtYW\nghkexujLWcBd566B74za5+mMMo7PaihfPeFECcx7Nv04zVFxNhSIBdWXWLB4/P5K\niiNk+T/b20ifNu5ItBIj0b7dkQdYLDZcpexV8fC5MUqvHOg28Gtm2tctwQKBgFF4\nGV1ToWIvTHbEHp+3dEDsewQW4Ycsem+M5U3aYkwlwFjdzze/DU0kKvHw2PEE55Uv\nwUSbUqQSRt2kLYqsIgydOZlGAoams9xTRiyF10xQ+1cz8zzjoFyyYzpA0zNxpHC+\niMaQWkcOxcUe02f26czoyRwJyyLn6Dm55nkLBEDLAoGAXVr2zhRsCFRsl89y4WC9\nQ440RhRqATM0gp5iF+X4+yWiHnprzWikcPRUCD7z3P1ONeSRN3HNxRMThwMbqWM+\no20n+29FarZI7Cc5AtlnwQGV5u40HS7aWvnoFv9J7oiWzGsakC3uS4Tiaa2cXZnq\nKeUYUJjReN5ByPIegFHU72Y=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@spiritx-67078.iam.gserviceaccount.com",
    "client_id": "110405580107630596599",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40spiritx-67078.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  
    ```
## 🎮How to Play

1. **Sign Up/Login**: Create an account or log in to get started.
2. **Build Your Team**: Pick 11 players from a pool of university cricket stars within a budget.
3. **Analyze Stats**: Use player statistics to strategize your selections.
4. **Submit & Compete**: Lock in your team and watch your points climb as real matches unfold.
5. **Leaderboard Glory**: Outscore others to dominate the leaderboard!
6. **Admin panel** : Add,delete,update players details/veiw tournament summary/view player profiles

---

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Install Dependencies

Clone the repository and install the required dependencies:

![Screenshot 2025-03-09 191805](https://github.com/user-attachments/assets/05fe9a10-5bab-4c1d-84a7-d4cd21dda121)
![WhatsApp Image 2025-03-09 at 19 19 53_e0d0f06f](https://github.com/user-attachments/assets/bb625f20-b96c-4b4e-a74d-d84beb99fbd4)
```bash

git clone https://github.com/EshanRavindu17/SpiritX_HEK_V_02.git
cd client
npm install
