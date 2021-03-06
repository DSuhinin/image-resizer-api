.DEFAULT_GOAL := build
.PHONY: build_docker_image
.PHONY: run_application_dependencies run_application stop_application
.PHONY: run_application_integration_tests
.PHONY: prettify
.PHONY: help

#
# Project-specific variables
#
# Service name. Used for binary name, docker-compose service name, etc...
SERVICE=image-resizer-api

#
# General variables
#
# Path to Docker file.
PATH_DOCKER_FILE=$(realpath ./docker/Dockerfile)
# Path to docker-compose file
PATH_DOCKER_COMPOSE_FILE=$(realpath ./docker/docker-compose.yml)
# Docker compose starting options.
DOCKER_COMPOSE_OPTIONS= -f $(PATH_DOCKER_COMPOSE_FILE)

build_docker_image: ## Build Application Docker Image.
	@echo ">>> Building docker image."
	docker build \
		-t $(SERVICE) \
		-f $(PATH_DOCKER_FILE) \
		. --no-cache

build_application:
	@docker-compose $(DOCKER_COMPOSE_OPTIONS) build --no-cache

run_application_dependencies:
	@echo ">>> Starting application dependencies."
	@docker-compose $(DOCKER_COMPOSE_OPTIONS) up -d mysql rabbitmq localstack
	@echo ">>> Sleeping 60 seconds until dependencies start."
	@sleep 60

run_application: build_docker_image stop_application run_application_dependencies ## Run Application.
	@echo ">>> Starting up service container."
	@docker-compose $(DOCKER_COMPOSE_OPTIONS) up -d $(SERVICE)

stop_application: ## Stop Application.
	@docker-compose $(DOCKER_COMPOSE_OPTIONS) down -v --remove-orphans

run_application_integration_tests: build_application stop_application run_application_dependencies ## Run Application Integration tests.
	@echo ">>> Run Integration tests in Docker."
	@docker-compose $(DOCKER_COMPOSE_OPTIONS) run integration-tests

prettify: ## Run code prettier.
	@npx prettier --write .

help: ## Display this help
	@ echo "Please use \`make <target>' where <target> is one of:"
	@ echo
	@ grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "    \033[36m%-10s\033[0m - %s\n", $$1, $$2}'
	@ echo