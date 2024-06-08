# Environment Variables
COMPOSE_DOCKER_CLI_BUILD = 1
DOCKER_BUILDKIT = 1
DOCKER_DEFAULT_PLATFORM = linux/amd64

# Project-specific Variables
PROJECT_NAME = "form-builder"
LOCAL_DEPLOY_DIR = "./deployment/local"

.DEFAULT_GOAL := up

.PHONY: up down down-clean prune-related-images prune-all help

# ---------------------------------------
# Container up - build and start.
# ---------------------------------------
up: 
	@echo "Starting containers for ${PROJECT_NAME}..."
	@COMPOSE_DOCKER_CLI_BUILD=${COMPOSE_DOCKER_CLI_BUILD} \
		DOCKER_BUILDKIT=${DOCKER_BUILDKIT} \
		DOCKER_DEFAULT_PLATFORM=${DOCKER_DEFAULT_PLATFORM} \
		docker compose -p ${PROJECT_NAME} \
		-f ${LOCAL_DEPLOY_DIR}/docker-compose.yml \
		up --build -d --remove-orphans

# ---------------------------------
# For tearing down local deployment
# ---------------------------------
down: 
	@echo "Stopping and removing containers for ${PROJECT_NAME}..."
	@docker compose -p ${PROJECT_NAME} \
		-f ${LOCAL_DEPLOY_DIR}/docker-compose.yml \
		down

down-clean: 
	@echo "Taking down services, removing volumes, networks, and images..."
	@docker compose -p ${PROJECT_NAME} \
		-f ${LOCAL_DEPLOY_DIR}/docker-compose.yml \
		down --volumes --remove-orphans
	@$(MAKE) prune-related-images

prune-related-images: 
	@echo "This will remove all unused images associated with the ${PROJECT_NAME} project. Continue? [y/N]"; \
	read ans; \
	if [ "$$ans" = "y" ] || [ "$$ans" = "Y" ]; then \
		docker images | grep '${PROJECT_NAME}' | awk '{print $$3}' | xargs -r docker rmi -f || echo "No ${PROJECT_NAME} related images to remove."; \
	else \
		echo "Aborting."; \
	fi

## Note: Prune all unused Docker objects including other projects
prune-all: 
	@echo "Running this command will prune all images, containers, volumes, and networks. Do you want to proceed [y/N]?"; \
	read ans; \
	case "$$ans" in \
		[Yy]*) docker system prune -af ;; \
		*) echo "Aborting." ;; \
	esac

# ---------------------------------------
# Help target to display available commands
# ---------------------------------------
help: 
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
