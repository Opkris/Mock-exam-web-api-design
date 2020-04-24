i need to explain what my project does, how it is structured, how i implemented it and
 which different technologies i have choose to use
 
 its a "pitch sale"
 
 
  If you do not attempt to do some of the parts/tasks of this exam, you MUST state so in the “readme.md”
  file, e.g., “I did requirements R1, R2 and partially R3. Did not manage to do R4. Did T1 and T2, but not T3
  and T4”. Failure to do so will further reduce your grade.

Furthermore, in the readme.md you also MUST have the following:

* If you deploy your system on a cloud provider, then give links to where you have deployed it.
* Any instruction on how to run your application.
* If you have special login for users (e.g., an admin), write down login/password, so it can be used.
  If you do not want to write it in the documentation, just provide a separated file in your delivered
  zip file.
     
## *my application have the following features.*
 - [ ] start with command "yarn dev" or "yarn Start"
 - [ ] accessible at "http://localhost:8080/"
 - [ ] NodeJS
 - [ ] NOT rely on any external services / fake it, use memory object's
 - [ ] 
 - [ ]
 
 
 #
 
### R1: Necessary but not sufficient requirement to get at least an E
-[ ] Write a home page with React.
-[ ] At least 2 other React pages that can be accessed via React-Router.
-[ ] At least one page should have some “state”, whose change should be triggerable from the GUI
     (i.e., there should be some actions for which a React component should be re-rendered and
    produce different HTML).
-[ ] From each page, it should be possible to go back to the homepage without having to use the
    “Back” button in the browser. In other words, do not have pages in which, once reached, it is not
    possible to navigate out of them. Example: if you are displaying a list of items, and then you have
    a link to a page to display the details of a specific item, then from such page there should be a link
    back (or at least to the homepage).
    
    
   
### R2: Necessary but not sufficient requirements to get at least a D
-[ ] Create a RESTful API handling at least one GET, one POST, one PUT and one DELETE (besides the
    ones for authentication/authorization of users), using JSON as data transfer format. Note: you
    MUST have those endpoints even if they are not used by the frontend.
-[ ] The REST API MUST follow the best practices for API design (e.g., on the naming conventions of
    the endpoints).
-[ ] The frontend MUST use such API (e.g., using fetch).


### R3: Necessary but not sufficient requirements to get at least a C
-[ ] You need to handle authentication/authorization, which MUST be session-based via cookies (as
    seen in class).
-[ ] In the frontend, provide a page to login. Whether to also provide a signup page (or already existing
    users in the fake-database) will depend on the application topic (more on this later).
-[ ] A logged-in user should get displayed a welcome message


### R4: Necessary but not sufficient requirements to get at least a B
-[ ] Each REST endpoint MUST handle authentication (401), and possibly authorization (403) checks.
    If an endpoint is supposed to be “open” to everyone, explicitly add a code-comment for it in its
    Express handler.
-[ ] Create a test class called security-test.js, where each endpoint is tested for when it returns 401
    and 403 (if applicable, i.e., if they can return such codes).
    
    
### R5: Necessary but not sufficient requirements to get an A:
-[ ] In the eventuality of you finishing all of the above requirements, and only then, if you have extra
    time left you should add new functionalities/features to your project. Those extra functionalities
    need to be briefly discussed/listed in the “readme.md” file (e.g., as bullet points). Note: in the
    marking, examiners will ignore new functionalities that are not listed in the readme document.
    What type of functionalities to add is completely up to you. 

## *Testing coverage:* 

-[ ]  10%.
-[ ]  30%.
-[ ]  50%.
-[ ]  60%.
-[ ]  70%.


# *Application Topic:*

-[ ] T1 (grade E): A visitor of the page should be able to see the menu for the week.
-[ ] T2 (grade E): When the application starts in development mode, you must have some existing
    fake/test data representing a valid menu for the current week. Note: if you fail to setup the REST
    API (requirement for grade D), then hardcode a menu in the frontend.
-[ ] T3 (grade C): A chef should be able to log-in, and create/edit/remove dishes, and specify which
    dishes are used in which day. You will need to provide a login page, but NOT a signup one. You
    can hardcode some userIds/passwords in the backend to represent some existing chef users.
-[ ] T4 (grade A): Add a “chat” system based on WebSockets, in which users can discuss the menu in
    real-time.
