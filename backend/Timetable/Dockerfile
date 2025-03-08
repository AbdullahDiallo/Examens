
FROM openjdk:17-jdk-slim


WORKDIR /app


COPY target/timetable-0.0.1-SNAPSHOT.jar timetable.jar


ENTRYPOINT ["java", "-jar", "timetable.jar"]

EXPOSE 8085
