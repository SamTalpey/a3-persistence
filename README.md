Assignment 3 - Persistence: Two-tier Web Application with Flat File Database, Express server, and CSS template
===
## AXP House Job Tracker

http://a3-samtalpey.glitch.me

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

- The goal of this tracker is to make it easier to manage house jobs for my duty as house manager, as well as to allow multiple people to edit the jobs without editing the in-depth points spreadsheet we have
- Challenges included understanding the idea of server development vs application development. I had massive trouble grasping the idea of requests and callback up until halfway through this assignment
- For my authentication, I simply use passport-local with the local users being saved to the lowdb database
- All active jobs are displayed, with the current user's jobs being written in red
- Jobs cannot be submitted until a user is logged in
- The main middleware packages I used are:
  - Passport
  - Body-Parser
  - Express-Session
  - Morgan
  - LowDB
  - Compression

## Technical Achievements
- **Dynamic Memory/DB**: Implemented real-time syncing of lowdb and server memory allowing dynamic updates
- **Dynamic Updates**: Page automatically updates when new data is added, including color to indicate the user's data
- **Morgan Request Logging**: Using the morgan middleware package, all requests are logged in a dev format
- **Duplicate Job Handlers**: Treats duplicate entries as an edit, preventing multiple jobs of the same type
- **Full Memory Display**: Displays not only the users data (in red), but all the data residing in the server as well

### Design/Evaluation Achievements
- **Bootstrap Framework**: I implemented the bootstrap framework to do my css styling with fine tuning in my style.css 
