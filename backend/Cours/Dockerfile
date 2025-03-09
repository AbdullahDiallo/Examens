
FROM openjdk:17-jdk-slim


WORKDIR /app

COPY target/Cours-0.0.1-SNAPSHOT.jar cours.jar

ENTRYPOINT ["java", "-jar", "cours.jar"]

EXPOSE 8084
