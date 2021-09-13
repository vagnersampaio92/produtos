include .env

.PHONY: up

up:
	docker-compose up -d

.PHONY: down

down:
	docker-compose down

.PHONY: logs
stop:
	docker-compose stop

.PHONY: stop
start:
	docker-compose start

.PHONY: start

logs:
	docker-compose logs -f