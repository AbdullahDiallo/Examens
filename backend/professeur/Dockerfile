
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/professeurs-0.0.1-SNAPSHOT.jar professeurs.jar

ENTRYPOINT ["java", "-jar", "professeurs.jar"]

EXPOSE 8082
