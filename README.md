# Yum
### Overview:
Did you know that **roughly one-third of the food produced in the world for human consumption every year (approximately 1.3 billion tonnes) gets wasted?** That is perfectly good food that is thrown away due to imperfections in shape and colour. Roughly 35% of wasted food is thrown out at supermarkets, shops, and households, much of which is perfectly suitable for eating! 
<br /><br />
Introducing Yum! Built with the MERN stack, Yum is a responsive food sharing platform, meant to facilitate the donation and receival of food from donors to recipients. Donors and recipients can register using the register/login system, post listings, and chat with other users! By allowing both individuals and establishments to donate food, Yum aims to help solve the food waste problem and end hunger for the underprivileged.

### Features:
- Register an account and login, using a **JWT (JSON Web Token) based authentication** system. Passwords are securely salted and hashed using industry standard bcrypt before being stored in our database
- Using a back-end built with **Node.js and Express.js**, users can create, edit and delete new listings, as well as specify dietary restrictions and location, which are stored in a **MongoDB collection**
- Through a clean and visually apealing front-end built with **React and Boostrap**, users can view foods listed by other users as well as the location of each posting
- Built-in chat function built with **WebSocket** to facilitate meetings between donors and users and avoid phone call and email spam
- Interactive map built with the **Google Maps and Mapbox APIs**, to view the relative location of each listing, allowing users to better coordinate meeting up and dropping off

### Demo:
#### Register:
![Register](https://user-images.githubusercontent.com/66835262/104817903-584bd900-57f2-11eb-933f-78f3ce75402b.gif)


#### Sign-in/logout:
![Sign-in](https://user-images.githubusercontent.com/66835262/104818036-fe97de80-57f2-11eb-886e-249ff244aede.gif)

#### Create listing:
![Create listing](https://user-images.githubusercontent.com/66835262/104818080-49195b00-57f3-11eb-99a1-9f7895102970.gif)

#### Edit and delete listing:


#### Chat:


### Libraries and Frameworks Used:
* **React:** https://reactjs.org/
* **Express:** https://expressjs.com/
* **Node.js:** https://nodejs.org/en/
* **MongoDB:** https://www.mongodb.com/
* **Bootstrap:** https://getbootstrap.com/
* **Reactjs-popup:** https://react-popup.elazizi.com/
* **Axios:** https://github.com/axios/axios
