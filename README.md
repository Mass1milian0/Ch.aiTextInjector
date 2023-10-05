# EOL
This project is unfortunately dead, character.ai switched to websocket, and they implemented it into a IIFE which makes it impossible do
access their socket reliably to modify it

the only way to revive this would be directly manipulating outgoing packets by self MITM 

# Character AI text Injector!

Install at here:
https://greasyfork.org/en/scripts/467254-text-injector

inject text directly into your chats, useful for creating permanent memories, or just being wierd with the ai

whatever you write into that box, it's going to spit it to the ai together with you messages

Example: you write "*Looks around*" in the box

when you send a message to the bot

you are just going to see your message like regular, but the bot will actually receive:

*looking around*

your message here
