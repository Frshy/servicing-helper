auth-build:
	cd auth-microservice && docker compose build
auth-build-prod:
	cd auth-microservice && docker compose -f docker-compose.prod.yml build
auth-up:
	cd auth-microservice && docker compose up
auth-up-prod:
	cd auth-microservice && docker compose -f docker-compose.prod.yml up
auth-start:
	cd auth-microservice && docker compose up -d
auth-start-prod:
	cd auth-microservice && docker compose -f docker-compose.prod.yml up -d
auth-down:
	cd auth-microservice && docker compose down
auth-destroy:
	cd auth-microservice && docker compose down -v
auth-db-deploy:
	docker exec -it auth-microservice-container yarn prisma db push

sales-build:
	cd sales-microservice && docker compose build
sales-build-prod:
	cd sales-microservice && docker compose -f docker-compose.prod.yml build
sales-up:
	cd sales-microservice && docker compose up
sales-up-prod:
	cd sales-microservice && docker compose -f docker-compose.prod.yml up
sales-start:
	cd sales-microservice && docker compose up -d
sales-start-prod:
	cd sales-microservice && docker compose -f docker-compose.prod.yml up -d
sales-down:
	cd sales-microservice && docker compose down
sales-destroy:
	cd sales-microservice && docker compose down -v
sales-db-deploy:
	docker exec -it sales-microservice-container yarn prisma db push

finance-build:
	cd finance-microservice && docker compose build
finance-build-prod:
	cd finance-microservice && docker compose -f docker-compose.prod.yml build
finance-up:
	cd finance-microservice && docker compose up
finance-up-prod:
	cd finance-microservice && docker compose -f docker-compose.prod.yml up
finance-start:
	cd finance-microservice && docker compose up -d
finance-start-prod:
	cd finance-microservice && docker compose -f docker-compose.prod.yml up -d
finance-down:
	cd finance-microservice && docker compose down
finance-destroy:
	cd finance-microservice && docker compose down -v
finance-db-deploy:
	docker exec -it finance-microservice-container yarn prisma db push

mailer-build:
	cd mailer-microservice && docker compose build
mailer-build-prod:
	cd mailer-microservice && docker compose -f docker-compose.prod.yml build
mailer-up:
	cd mailer-microservice && docker compose up
mailer-up-prod:
	cd mailer-microservice && docker compose -f docker-compose.prod.yml up
mailer-start:
	cd mailer-microservice && docker compose up -d
mailer-start-prod:
	cd mailer-microservice && docker compose -f docker-compose.prod.yml up -d
mailer-down:
	cd mailer-microservice && docker compose down
mailer-destroy:
	cd mailer-microservice && docker compose down -v
mailer-db-deploy:
	docker exec -it mailer-microservice-container yarn prisma db push

gateway-build:
	cd gateway-server && docker compose build
gateway-build-prod:
	cd gateway-server && docker compose -f docker-compose.prod.yml build
gateway-up:
	cd gateway-server && docker compose up
gateway-up-prod:
	cd gateway-server && docker compose -f docker-compose.prod.yml up
gateway-start:
	cd gateway-server && docker compose up -d
gateway-start-prod:
	cd gateway-server && docker compose -f docker-compose.prod.yml up -d
gateway-down:
	cd gateway-server && docker compose down
gateway-destroy:
	cd gateway-server && docker compose down -v

cdn-build:
	cd cdn-server && docker compose build
cdn-up:
	cd cdn-server && docker compose up
cdn-start:
	cd cdn-server && docker compose up -d
cdn-down:
	cd cdn-server && docker compose down
cdn-destroy:
	cd cdn-server && docker compose down -v

frontend-up:
	cd frontend && docker compose up
frontend-start:
	cd frontend && docker compose up -d
frontend-down:
	cd frontend && docker compose down
frontend-destroy:
	cd frontend && docker compose down -v

all-start: auth-start sales-start finance-start mailer-start cdn-start gateway-start frontend-start
all-down: auth-down sales-down finance-down mailer-down cdn-down gateway-down frontend-down
all-destroy: auth-destroy sales-destroy finance-destroy mailer-destroy cdn-destroy gateway-destroy frontend-destroy
backend-build: auth-build sales-build finance-build mailer-build cdn-build gateway-build
backend-start: auth-start sales-start finance-start mailer-start cdn-start gateway-start
backend-down: auth-down sales-down finance-down mailer-down cdn-down gateway-down
backend-destroy: auth-destroy sales-destroy finance-destroy mailer-destroy cdn-destroy gateway-destroy