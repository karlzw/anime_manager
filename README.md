#Anime Manager 

##description
This is a Full Stack Anime Management Application which can also be use to manage your Movie or Series. 
It allows you to add to a Download List, Watch List and a Watched List which can also be used as filted. 
It also has search filters together with sort by title, rating and year. 

##technical description
The application using one of two backend APIs one made using express.js and the other made using fastapi.py
The application uses an SQL database, specifically Postgres. 
To connect to express the pg library is used and to connect to fastapi the psycopg2 library is being used. 
The front end using React and it also has a custom useLocalStorage hook that can be used to store data locally without
having to connect to the Postgres. 
