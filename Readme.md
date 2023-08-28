# Six Cities: a housing search service
by: Egor Pestov <egorpestov2012@yandex.ru>


---

Stack: HTML, CSS, JavaScript, React, TypeScript, Redux, Axios, Vite, Vitest, leaflet

---

Six Cities: a housing search service. Thanks to its functionality, the service enables users to quickly and conveniently find accommodation in any city, with the option to sort listings based on parameters such as price and rating, which is generated from reviews. Each listing page provides comprehensive information, including its location on the map. Users can also read and leave reviews about the accommodation, along with ratings.

The application consists of the following pages:

• Home Page: The main page displaying lists of accommodation options, with city filters and sorting options by price/rating. Each available accommodation option's card presents concise information such as its rating, price, and type. On the right side of the home page, a dynamic map is shown, displaying the location of the option currently being hovered over.

• Accommodation Details Page: Clicking on an accommodation card leads users to a specific accommodation page with extensive information about the property. This information includes a list of amenities, the number of bedrooms, host information, property description, and more. Below this, a list of reviews is presented. If a user is registered and logged in, they can leave their review, which will be immediately displayed on the page. Otherwise, the review submission form is not shown.

• Favorites Page: On this page, users can view the accommodation options they have added to their favorites. The page is accessible only to authorized users.

• Authentication Page: An authentication page for non-authorized users.

• 404 Error Page: A page that displays when users attempt to access non-existent pages.

* The application's header is dynamically generated and, depending on the user's authentication status, displays information such as their login and the number of favorited options, or prompts non-authorized users to authenticate.

* The map, based on Leaflet, dynamically transitions with animation when switching between different cities. It functions both with highlighting the selected option and with nearby offerings that are loaded from the server.

* The project is initialized and built using Vite. The entire codebase is written in TypeScript, with React used for functional components.

* Server communication is managed through Axios and interceptors usage. 

* Redux slices are used as the state manager. Each slice of the store has its own actions, reducers, and, if necessary, extra reducers.

* Errors are handled both through interceptors and in asynchronous actions using try-catch constructions. For notifying users of errors, react-toastify is utilized.

* Almost the entire codebase in the project is covered by tests using Vitest."
