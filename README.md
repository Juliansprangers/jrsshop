## Jrsshop

First you need to install npm and composer in this project.

- create a new env file with .env.example
- create a sql database and add it to your env file, I use PhpMyAdmin to create the database.
- If the APP KEY isn't generated, run **php artisan key:generate**
- run: **php artisan migrate**  to create the database tables.
- run: **php artisan db:seed** to create and seed the factories
