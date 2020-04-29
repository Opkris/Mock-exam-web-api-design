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

-[x]  10%.
-[x]  30%.
-[ ]  50%.
-[ ]  60%.
-[ ]  70%.


# *Application Topic:*
-[x] T1 (grade E): When the application starts in development mode, you must have some existing
     fake/test data representing a valid collection of n items. Note: if you fail to setup the REST API
     (requirement for grade D), then hardcode the items in the frontend.

-[x] T2 (grade E): Without the need to log-in, a user should be able to see the list of all n items (with
     their description) in the game (e.g., in a separated game-description page)
     
-[x] T3 (grade C): There should be a page in which a logged-in user can see his/her collection (which
     will be empty at the beginning).
 * Every one have a unique name, but all users share the same "list" of items. 
 
-[x] T4 (grade C): A user, when s/he creates a new account, should get t loot-boxes (e.g., t=3). There
     should be a button to be able to redeem loot-boxes, one at a time (and the content of the lootbox must be displayed somehow to the user once opened). The new items will be added to the
     collection of the user (which then should be able to see how many duplicates s/he has, and what
     s/he is still missing).
 * every new user starts with a balance (1000,-) so they can by a 5 new loot boxes, each loot box contains
    3 random items, they may contain 3 items of the same object
     
-[ ] T5 (grade B): A user should have the option to “mill” (i.e., sell) items in his/her collection. Milling
     an item should give in-game currency, which can then be used to buy new loot-boxes (up to you
     what exchange rate you want to give, but based on t and k it should be possible to sell enough
     items to buy at least 1 new loot-box). 
* the mill intent is that every loot box have a combined value (at the lowest end) more then what a new loot box
    will cost. so of the user want to sell all 3 with the (with the lowest value) the user 

-[ ] T6 (grade A): Add a system based on WebSockets in which the user will get (and be notified!) a
     new loot-box every X amount of time (use something small, e.g. X = 1 minute)
