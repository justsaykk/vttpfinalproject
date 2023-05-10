# This is the build container
FROM maven:3.9.1-eclipse-temurin-17 AS builder

WORKDIR /app

# Building
COPY pom.xml .
COPY mvnw.cmd .
COPY mvnw .
COPY src src

RUN mvn package -Dmaven.test.skip=true

# # # # Below is the run container

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=builder /app/target/server-0.0.1-SNAPSHOT.jar server.jar

# Running
ENV INSTANCE_NAME="Server"
EXPOSE ${PORT}
ENTRYPOINT java -jar -Dserver.port=${PORT} server.jar