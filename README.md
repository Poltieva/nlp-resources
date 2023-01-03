# README

* Ruby version - 3.1.1

* Rails version - 7.0.2.3

Back-end for my master's project and a pet-project
for my personal growth as a developer.

This is an archive with books, courses, videos etc.
dedicated to NLP (which is 'natural language processing',
of course xD).
Even if a resource is a book, it is a design decision
to provide only a url to another site/store to
avoid copyright issues.

#How to run
Prerequisites: Docker, docker-compose.


Running for the first time
1. Run `docker-compose up --build`
2. Run `docker-compose run api rails db:prepare`
3. To seed the development database with fake data, run
`docker-compose run api rails db:seed`
4. Run `docker-compose run api rails c` to get into RoR console
5. Once there, run `Doorkeeper::Application.last.uid` and copy the string
   (without quotes) to your /frontend/env.local or /frontend/env.development.local
as REACT_APP_CLIENT_ID
6. Run `Doorkeeper::Application.last.secret` and copy the string
   (without quotes) to your /frontend/env.local or /frontend/env.development.local
   as REACT_APP_CLIENT_SECRET
7. To exit the console, run `exit`

This will setup the environment and start both backend and frontend,
so now you can visit http://localhost:3001 to see the frontend or
http://localhost:3000/api/v1/ to get the access to the api.

To stop containers, run `docker-compose down`.

To start containers regularly, run `docker-compose up` or `docker-compose up -d` for a detached mode.

To run backend tests, run `docker-compose run api bundle exec rspec`.

To run backend linter (rubocop), run `docker-compose run api bundle exec rubocop -a`.

!NB: if you make changes to /backend/Gemfile or install yarn packages to /frontend,
you'll need to run `docker-compose build` or you won't see the changes.

## How to deploy
```
######### ensure that you have the changes ready amd merged
git checkout main
git pull
##########
docker-compose run api cap production deploy
```
