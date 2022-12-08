1. This application named HomeworkProject is a react-native application made using react-native-cli, all the screens have been made using typeScript, also ignite-template have been used to implement proper modelling of the application which is comprised of mainly three screen i.e., 
    - Login Screen : to log in with email id & password.
        * There are 2 textInputs used to store emailId and password with necessary styling used.
        * Password has been enabled by security.
        * User can navigate to the next screen by using navigation if and only if he/she enters the correct email Id and password. This task has been performed using useState hook and snackBar component from react-native-paper library. 
        * Tab Navigator has been used to navigate between home and favorite screen.
    - Home Screen : to load user data and perform add to favorites and delete from favorites task.
        * Home Screen first of all renders the API to render data on the screen. API function has been called via useEffect hook.
        * Further on, styling has been used to make UI according to the screens provided in the test.
        * Two states has been used for storing index of the user whom have to be added or deleted to the favorite list. Another state is a boolean state which checks whether the user is favorite or not. Both the states has been used using the useState hook.
        * Pagination has been implemented to load data. Pagination has been implemented using Flatlist component from react-native and useState hook and a callBack function.
        * User can be added/deleted from this screen from the favorites by just tapping on the button given on the right of all the users.
    - Favorite Screen : to render all the users that have been added to favorites.
        * Favorite screens also uses pagination/loader to load contents.
        * The data has been shown using Flatlist component from react-native.
        * User can be deleted from this screen from the favorites by just tapping on the button given on the right of all the users.

2. The project is uploaded to github by:
    * First of all making a new public repository from the account.
    * The terminal is used to perform clone command to clone the repository into the device.
    * The terminal is used to perform add . command to add all the files to the git repository on which work has been done.
    * The terminal is used to push all the work done by using commit command with a message.
    * The terminal is lastly used to push all the components/files to the repository.
 
 3. The project is developed/tested/run using the following commands:
    npx react-native start - to enable the server.
    react-native run-android - to render the project onto an android device.
    react-native run-ios - to render the project onto an ios device.
 
 4. This homework mainly examines my UI skills to match upto the screens given in the test, it also examines my API integrating skills and performing some major functionalities as given in the test. This test also examines my github skills as well.
 
 5. The development standard which I have implemented in this task is:
    - Naming Conventions : added folders and sub-folders to implement proper structure of the application.
    - Structuring Folder : All the folders have been named and places structurally.
    - Putting imports in an order : All the imports have been added to the top of the screen in entire application.
    
 6. I have met difficulties in enabling the add and to navigate the result onto the next screen and delete functionality. I implemented the functionality using hit and trial and error solving skills.
 
  
 
 
 
 
 
