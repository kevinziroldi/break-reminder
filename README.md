# Break reminder app

## Description 
Break reminder is an app that allows you to choose a timer duration and set a timer.  
Once the timer elapses, the app sends you a notification reminding you to take a break.

## Tools 
This app was realised using Go for backend and HTML, CSS and JS for the frontend, thanks to Wails.  
It also uses a third party library, called Beeep, in order to send desktop notifications when a timer elapses.
References:
* [Go programming language](https://go.dev)
* [Wails](https://wails.io)
* [Beeep](https://github.com/gen2brain/beeep)

## Installation guide
In order to install the app, follow these steps:
1. Clone the repository:  
   `git clone https://github.com/kevinziroldi/break-reminder.git`
2. Move to the project folder
3. Build the project using Wails:  
   `wails build`
4. You will find the app in the `build` folder  

For Mac users, you can move the app to your application folder, copy-pasting / dragging it. 

## App images
<img src="https://github.com/kevinziroldi/break-reminder/blob/main/deliverables/timer_not_active.png">
<img src="https://github.com/kevinziroldi/break-reminder/blob/main/deliverables/timer_active.png">
