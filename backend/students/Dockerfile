
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/students-0.0.1-SNAPSHOT.jar students.jar

ENTRYPOINT ["java", "-jar", "students.jar"]


EXPOSE 8081
