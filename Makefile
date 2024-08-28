.PHONY: build release deploy

# Docker Hub username
DOCKER_USERNAME := oliverbutler

# Image name
IMAGE_NAME := oliverbutler

# Full image tag
IMAGE_TAG := $(DOCKER_USERNAME)/$(IMAGE_NAME):latest

# Unraid container name
UNRAID_CONTAINER := oliverbutlergomonolith

# Build the Docker image locally for amd64 architecture
build:
	docker buildx create --use
	docker buildx build --platform linux/amd64 -t $(IMAGE_TAG) --load .

# Build and push the Docker image to Docker Hub for amd64 architecture
release:
	docker buildx create --use
	docker buildx build --platform linux/amd64 -t $(IMAGE_TAG) --push .

# Deploy to Unraid
deploy: release
	ssh unraid '\
		docker pull $(IMAGE_TAG) && \
		(docker stop $(UNRAID_CONTAINER) || true) && \
		(docker rm $(UNRAID_CONTAINER) || true) && \
		docker run -d \
			--name=$(UNRAID_CONTAINER) \
			--net=bridge \
			-e TZ="Europe/London" \
			-e HOST_OS="Unraid" \
			-e HOST_HOSTNAME="sigma" \
			-e HOST_CONTAINERNAME="$(UNRAID_CONTAINER)" \
			-l net.unraid.docker.managed=dockerman \
			-p 6900:3000/tcp \
			$(IMAGE_TAG)'
