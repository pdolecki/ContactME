# ContactME

This project was generated with Angular-CLI version 13.1.1. and Node.js version 18.12.1. therefore those versions are recommended.

Steps to run project:

1. Download and unpack https://github.com/pdolecki/ContactME code repo.
2. Open project folder (ContactME) in Visual Studio Code (or another editor).
3. Open terminal in the same directory and run command "npm install".
4. After installation finishes open 2 terminals in the same directory.
5. In the first one - run "npm run start:be".
6. In the second one - run "npm run start:fe".
7. Navigate to localhost:4200.
8. Register in the app and then login, after that you will be redirected to contacts list. You can test the app there.
9. If you want to test on existing accounts with some contacts, try credentials:
   "
   pdolecki@test.com
   testSuperSecure
   "

About task approach:
User after logging in should be redirected to contacts page (it can also be done by menu in the right top corner of navbar).
Contacts list is an infinite list (data is light-weight) so there was no need to implement pagination on frontend&backend side.
Contacts can be sorted by clicking on each of the columns header and filtered by typing in filter input abouve the table phrases we want to look for.
User can edit/delete/add users from contacts list view, but can also navigate (through menu) to page done for explicitly creating new contacts.

Considerations:
Although solution is working it is not perfect by any means - taking the time it was implemented in, I find it good enough. Things that should be refactored/fixed/implemented in next interations:

- some of shared components are coupled with the app (should be totaly independet and therefore more reusable)
- there are few places of redundancy (eg. similar components for login/signup or methods in contacts view responsible for opening dialogs - openCreateDialog, openEditDialog, openDeteDialog)
- more specific error handlers should be defined on frontend side (with custom messages, based on backend error codes)
- loader should be implemented for each component (eg. for table gutter) instead of triggering it globally
- and much, much more... :D

### Quick overview of functionalities, modules and solutions:

# Architecture:

Backend:

- folder with backend is located in root directory of project and is called 'backend'
- app.js is main configuration and connection file for backend
- the solution is split between folders that should be self-explanatory, but in case they are not:
  "
  consts - constants, in our case just responses codes and messages
  controllers - controllers responsible for handling requests
  middleware - middleware that will run on specified routes and check client auth
  models - schemas for data in application
  routes - configuration of routing, match method from controller with given route
  "

Frontend:

- app splitted between 2 folders, shared and modules
- in the modules we can find:
  auth module with its components (login, signup), guards, interceptors and services,
  contacts module with its components and services
- in the shared module we can find all that is shared in the app, components, models of data and services

# Approach & explanation:

- Each main module (auth, contacts and shared components) has it's own module and routing and they're lazy-loaded inside main routing module
- User experience might be lacking, but that's because of time restrictions for implementation, but what has been taken care of:

* In case of success opeartions, information messages were defined in each handler and will be displayed using service injecting Angular Material snackbar wrapper
* In case of errors, the messeges will be returned from backend and displayed in the same snakcbar
* There is loader implemented on root level of application that can be triggered by using loader service and will inform about some processes that are ongoing
* All form fields are validated and have error messages displayed if needed

### What was used?

Database:

- MongoDB (cloud version - Atlas)

Backend:

- Node.js,
- Express.js,
- jsonwebtoken
- bcrypt
- mongoose
- nodemon

Frontend:

- Angular
- Angular Material
- Angular RxJs

### It is implementation of below task:

"
Please design and implement a simple contact management application.
The application should consist of:

- a screen with a list of contacts
- a screen for adding a new contact
- a screen for editing a contact
  Creating and editing a contact can be done on the same screen, but in two „modes" or on two
  separate screens.
  The application should allow you to:
- change the way contacts are sorted on the list (it is enough to be able to choose one of two
  sorting criteria)
- adding, editing and deleting contacts
- correct routing (I should be able to view the details of the selected contact by pasting the
  appropriate URL into the browser navigation bar, and I should be able to use the "back" and
  "next" buttons in the browser normally)
  Each contact has a name, phone number and email. Make sure the form fields are validated so
  that a contact with an invalid email or phone number cannot be saved.
  Use node.js to write a simple server, whereby it can be mocked. You don't have to implement the
  actual logic on the server side, including database support. Responses from the server can be
  fixed.
  Put instructions in the README file on how I should run and test your project. Be careful not to
  skip a step!
  "
