FROM openjdk:17-jdk-slim
WORKDIR /app
COPY . .
RUN mkdir -p backend/bin && javac -cp "backend/lib/*" -d backend/bin $(find backend/src -name "*.java")
EXPOSE 8080
CMD ["java", "-cp", "backend/bin:backend/lib/*", "com.campuscore.Main"]
