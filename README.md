# Brauch ich ein GA?

An application for tracking your public transit expenses informing you when it's time to buy a GA

## Vision

A mobile application that requires no user registration and login that lets you track all public transit expenses.
As soon as a user defined limit is reached, the user should be notified.

## Requirements workshop results

* Edit GA price
* Dashboard: Display whether GA should be bought, average GA price (per month), average bought tickets price (per month) and difference of them
* Add ticket
* Edit ticket
* Delete ticket
* View tickets

## Events

* GA price changed
* Limit reached
* Ticket added
* Ticket changed
* Ticket deleted

## Screens

* Edit GA: simple textbox, setting GA price, save button
* Ticket history: all tickets, ordered by time (newest first), with delete button and edit button
* Edit ticket: simple textbox, save button
* Dashboard (first screen when app started): top: "should i buy a GA or not? yes/no", middle: "avg ga price per month, avg bought tickets per month", bottom: simple plus-sign or "add ticket". When clicking on avg ga price = open edit ga. when clicking on avg bought tickets: view ticket history
* First time app start: show edit ga screen
