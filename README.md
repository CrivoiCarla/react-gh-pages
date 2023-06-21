# Play and Win Arena

Application designed and developed by Play and Win Arena team: Crivoi Carla , Stanciu Carol,Tănasă Petrișor, Gonțescu Maria Ruxandra.


## Description of the application:

Play and Win Arena combines PHP backend and React frontend to offer an unparalleled gambling experience. Enjoy classic gambling games, such as Crash, Raffle and Roulette in user-friendly interface. 

Crash is a gambling game in which you can win if you cash out “crash out” before the game stops.

Raffle is an exciting online game, where you have to guess a number between 1 and 6.

You can also try your luck at the roulette game. Watch the wheel spin, and try to anticipate your result. Hope for the best! You can win up to 15 times your bet amount!  Test your luck and enjoy the thrill of this classic casino favorite.

Play and Win Arena  ensures a smooth and fair gaming environment. Join today for a thrilling, secure, and immersive online gambling experience like no other.


## Branches:
1) To view the final code of the project for the frontend part, we must look at the "Final" branch: https://github.com/CrivoiCarla/react-gh-pages/tree/Final

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/fr.PNG?raw=true)

3) To view the backend part, you can enter the following branches:
   1. https://github.com/CrivoiCarla/react-gh-pages/edit/master_backend    *the main*
   2. https://github.com/CrivoiCarla/react-gh-pages/edit/backend_refactoring_001
   3. https://github.com/CrivoiCarla/react-gh-pages/edit/bugfix_002_mentionPOSTforSpinner
   4. https://github.com/CrivoiCarla/react-gh-pages/edit/bugfix_10_SpinnerGetIdEndpoint
   5. https://github.com/CrivoiCarla/react-gh-pages/edit/define_simple_workflow_backend
   6. https://github.com/CrivoiCarla/react-gh-pages/edit/heroku_deployment
   7. https://github.com/CrivoiCarla/react-gh-pages/edit/10-spinner-endpoint-v1getid-doesnt-return-good-id 
   8. And all that begin with "feature"

*All other branches contain cond from the front-end.

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/bk.PNG?raw=true)

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/bk2.PNG?raw=true)
## Demo

### The demo of the application can be found here: https://www.youtube.com/watch?v=yQhORmsvIqY 

## Jira 

We used Jira in order to manage and organise our tasks during the development of the application. This link redirects to our backlog creation. 

Link: https://proiect-mds-2023.atlassian.net/jira/software/projects/PM/boards/1/backlog

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/backlog.PNG?raw=true)
## User stories

User stories are short, simple descriptions of a feature told from the perspective of the person who desires the new capability, usually a user.


1)As a user, I want to be able to create an account and log in.

### Acceptance Criteria:

The app should have a registration page where users can enter their details(email address & password) and create an account.
Users should be able to log in using their registered email and password.
The app provides appropriate error messages for invalid login attempts(the email must contain the '@' character.The password must contain at least one UpperCase letter and a special character. 

2)As a logged in user, on the Home page I will have to chose between 3 possible choices of games on the Home page : Crash, Raffle and Roulette. Also, he/she has the possibility of choosing one of the games from the navigation bar: Crash, Raffle, Roulette, Profile. 

3)As a Crash player, I can stop the game in the moment I am satisfied with my earnings. 

4)As a Raffle player, I want to place a bet alongside other players and to be able to win all the money. 

5)As a Roulette player, if I click on the "Spin" button, the roulette will start. It will stop at one of the options: 
1) 15*
2) Nu ai câștigat
3) 10*
4) 2*
5) 1*
Where 2* means that the initial bet will be doubled etc.

6)As a user, if a click on "Profile" from the navigation bar, I will be directed to a page where I can find informations about my profile( Informations about money, profile picture, password, as well as adding/getting money).

7)As a user, I can change the password. 

8)As a player, I want a user-friendly interface, easy to access, not to crowded because it can accentuate the will of play with bigger bets.

9)As a professional gambler, I want a platform on which I can practice before going to the casino(warm up).

10)As a programmer, I want user to have fun while playing on this app.

11)As an user I want an app which will make my life easier so that I won't worry about how much I have to pay at downtown casinos, which are really expensive.

12)As a developer, I want good communication between team members, so the team can work properly.

13)As a manager, I want to be able to understand my team progress, so I can better report our failures and successes.


## Building tool

Our project was developed in Visual Studio Code, using React and PHP.
There are several reasons to consider using React for the frontend of a gambling app with a PHP backend:
1.	Interactive User Interface: React allows you to build dynamic and interactive user interfaces, enhancing the user experience of your gambling app. With React's component-based architecture and virtual DOM, you can create responsive and real-time updates to provide a seamless and engaging gambling environment.
2.	Efficient Rendering: React's virtual DOM efficiently updates and renders only the necessary components, resulting in optimized performance. This is particularly important for a gambling app where real-time updates and smooth animations are crucial for user engagement.
3.	The combination of React and PHP also facilitates efficient communication between the frontend and backend. React can make HTTP requests to PHP API endpoints, enabling seamless data exchange and real-time updates. This ensures a smooth and responsive gambling experience for users.
4.	By utilizing React for the frontend and PHP for the backend, you can create a feature-rich gambling app that delivers an engaging user interface, robust functionality, secure data handling, and efficient communication between client and server.




## UML Use Case Diagram

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/uml.PNG?raw=true)

## Bug reporting

We have encountered the following bugs:
1.	The returned id from the spinner endpoint is not good for the first request, because the record is not updated and therefore the last played id will be shown. To see the fixing, click here.
   


## Automation Testing

For testing we have used Symphony. Symfony is a PHP framework that provides a solid foundation for building web applications. While Symfony itself does not provide specific tools or features for automation testing, you can leverage various testing libraries and frameworks within the Symfony ecosystem to implement automated testing for your Symfony-based application.

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/autoc.jpeg?raw=true)

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/auto.PNG?raw=true)

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/auto2.PNG?raw=true)

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/exAuto.PNG?raw=true)

## Commented code

[https://github.com/CrivoiCarla/react-gh-pages/tree/Final/Profile.jsx](https://github.com/CrivoiCarla/react-gh-pages/blob/Final/src/components/Profile.jsx)
 
![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/com.PNG?raw=true)

## Design patterns

* MVC

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/mvc.PNG?raw=true)

React Design Patterns are core enablers of React library that enable React Developers to create complex React apps in an easily maintainable manner. There are a number of different pre-built hooks available like the Effect Hook ( useEffect ) and the State Hook. 

 * React Hooks (useEffect )

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/react1.PNG?raw=true)

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/react2.PNG?raw=true)

## Using an AI tool that helps during software development

https://chat.openai.com/share/3d5aa56d-c9ac-40de-9ace-a59a74ce9091

![alt text](https://github.com/CrivoiCarla/react-gh-pages/blob/main/chat.jpeg?raw=true)
   
