# genre.me
GA WDI (SF-18) - Project One

Concept
###
You can learn a lot about a person by learning what they listen to. This is the basic concept behind Genre.me. On the surface, genre.me is a social network for users who love music, and want to tell the world what genres they listen to. However, even deeper, lies a social music discovery tool.

Technologies
###

- HTML/CSS
- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- jQuery
- AJAX
- Underscore

Features
###
Using genre.me users are immediately presented with a list of top genres that users have added to their accounts. In addition, users may view what other users have that genre on their account, and can then link to those users public facing profile page. The homepage also features options to view more additional genres, as well as to play a random song from a random genre that a user has added.

Clicking on any genre name on any page will load a SoundCloud player widget with a song from the genre clicked using the SoundCloud API. Users may at anytime add or remove a genre from their profule page.

Database Models
###
For the database, I created two models, a user model and a genre model. Upon signing up for an account a user is created in the user model. When adding a genre to a users account, users are forced to select from a pre-determined list of 800+ genres. The genre selection utilizes an autocomplete feature to make selecting a genre more efficient. When a user adds a genre to their account a check is performed to see if the genre exists already in the genre model. If the genre does not exist, then a new genre is created with the user's id associated to the genre. Each subsequent time a user adds a genre to their account, the users's id is then pushed to an array in the existing genre entry. Removing a genre from a users account, then, removes their id from the associated genre.
This allows the app to be able to count the number of users that have added a particular genre, as well as to quickly link to those users. 
In the future, this could be useful for determining users that have shared interests in the same genre, and therefore offer recommendations on what other genres they may like.

Planned Development
###
One of the biggest flaws in my application is that it is not yet very scalable. Most of the calculations for top genres occur on the frontend, which with a large user base and large db won't be very efficient. If I could I would refactor this to be handled more in the backend (via cron job or otherwise), or to at least incorporate a caching strategy to cache the top liked genres.

**Smaller features:**

- Add button to remove Soundcloud Widget
- Update styles/design to be more accessible
- Ability to edit user data (other than genres)
- Like/star other users



