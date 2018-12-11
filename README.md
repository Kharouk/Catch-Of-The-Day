# Catch of the Day
An application built using React and Firebase.

## What I've Learned:
### React:
React Router, differences between props and state, passing down methods for child components to use. How to use refs and this-binding. How to use component validation with propTypes.
### Firebase:
Instead of having the menu reset when you refresh the page, we want to keep that state persistent. Firebase is easy to set that up. Uses WebSockets so that we get data in real-time. Keeps Information on the owner of the store as well as the fish that store has in inventory.

Also, I don't want to keep all the information on Firebase so if a User adds fish to the order, that gets saved into `localstorage`.

Understanding async, await: 
- we can use async, await, when we are getting a Promise in return. Instead of saving that promise into a variable, we can await that promise to resolve, thus storing whatever we were fetching, rather than the promise! An example is when I fetched store...in Inventory.

### Authentication:
Facebook, github, twitter

### CSS & Styles:
Stylus, animation. 
### JavaScript:
Object destructuring, object spread.
### Deployment:
Netlify, Now, and Apache Server.