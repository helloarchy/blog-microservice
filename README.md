# Microservice Blog
A basic prototype to explore creating a blog via microservices.

## User Journey
Navigating to the react app at Posts.com, a user is able to create a new post, and comment on that post. They may also comment on any existing post. However, comments are moderated, and any with a deny-listed word will be blocked by the Moderation service.

## Tech Stack
* Node.js
* Javascript
* React
* Docker
* Kubernetes
* Skaffold

## Services
The app is split across several microservices:

### Event Bus
This provides communication between each microservice, receiving events emitted by the other services, and relaying them to all other services.

### React App
Provides a front end, single page application for the user to interact with.

### Posts
Allows the creation and listing of all posts, emits event on creation.

### Comments
Allows the creation and listing of comments, emits on creation.

### Query
Compiles a list of all posts with attached comments. Provides this data object to the front end.

### Moderation
Moderates a given comment against a deny-list, ensuring no forbidden words are included. Emits an event on completed moderation.
