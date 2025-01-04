install:
	cp .env.example .env
	docker compose up -d --build
	docker compose exec --user 1000 todo composer install
	docker compose exec --user 1000 todo php artisan key:generate
	docker compose exec --user 1000 todo php artisan migrate:fresh --seed
	docker compose exec --user 1000 todo npm i
	docker compose exec --user 1000 todo npm run build
	docker compose down
	docker compose up -d
build:
	docker compose build --no-cache
up:
	docker compose up -d
down:
	docker compose down
rebuild-fronted:
	docker compose exec --user 1000 todo npm i
	docker compose exec --user 1000 todo npm run build
fronted-dev:
	docker compose exec --user 1000 todo npm i
	docker compose exec --user 1000 todo npm run dev
exec_bash:
	docker compose exec --user 1000 todo bash
pint:
	docker compose exec --user 1000 todo ./vendor/bin/pint
run-tests:
	docker compose exec --user 1000 todo ./vendor/bin/phpunit
look-log:
	docker compose exec --user 1000 todo tail -n 50 storage/logs/laravel.log
