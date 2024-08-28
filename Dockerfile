# Build stage
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Run stage
FROM alpine:3.14
WORKDIR /app
COPY --from=builder /app/main .
COPY static ./static
COPY templates ./templates
EXPOSE 3000
CMD ["./main"]
