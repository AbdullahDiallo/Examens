
FROM openjdk:17-jdk-slim

WORKDIR /app


COPY target/Classes-0.0.1-SNAPSHOT.jar classes.jar


ENTRYPOINT ["java", "-jar", "classes.jar"]


EXPOSE 8083
