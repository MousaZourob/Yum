# Yum
### Overview:
Yum is a minimalist responsive web application built with the **MERN stack** that allows users to donate excess food and reduce food waste. Did you know that roughly one-third of the food produced in the world for human consumption every year (approximately 1.3 billion tonnes) gets lost or wasted? That is perfectly good food that is thrown away due to imperfections in shape and colour. Yum aims to change this by allowing both individuals and establishments to contribute to solving the food waste problem by donating their excess food. 
<br /> <br />
With Yum, users can create and view postings using the interactive UI built with **React** and **Bootstrap**. To allow users to save listings, a backend server built with **Node** and **Express** allows user's to create accounts and login. Using **JWT**, user authentication is done and passwords are encrypted in the **MongoDB** which stores users and listings. To facilitate meetings between user's a chat function was implemented using **websockets**. Using the interactive map built with the **Google Maps API** users can see which listings are in their area.

### Features:
* Register an account and login using the minimalist and responsive UI which contains a checking system to make sure only one email is used per account
* Create, edit and delete new listings, as well as specify dietary restrictions and location
* View foods listed by other users as well as the location of each posting. Click on each item learn more about the dish.
* Built-in chat function to facilitate meetings between donors and users.
* Interactive map to view the relative location of each listing, allowing users to better coordinate meeting up and dropping off.

### Libraries and Frameworks Used:
* **React:** https://reactjs.org/
* **Express:** https://expressjs.com/
* **Node.js:** https://nodejs.org/en/
* **MongoDB:** https://www.mongodb.com/
* **Bootstrap:** https://getbootstrap.com/
* **Reactjs-popup:** https://react-popup.elazizi.com/
* **Axios:** https://github.com/axios/axios
