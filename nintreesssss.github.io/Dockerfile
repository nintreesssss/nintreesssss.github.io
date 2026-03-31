# 阶段1: 构建 - 用 Java 25 + 手动安装 Maven
FROM eclipse-temurin:25 AS builder

# 手动安装 Maven（用阿里云镜像，避免 404）
RUN apt-get update && apt-get install -y wget unzip \
    && wget https://maven.aliyun.com/repository/public/org/apache/maven/apache-maven/3.9.9/apache-maven-3.9.9-bin.zip -O apache-maven-3.9.9-bin.zip \
    && unzip apache-maven-3.9.9-bin.zip -d /opt \
    && rm apache-maven-3.9.9-bin.zip \
    && ln -s /opt/apache-maven-3.9.9/bin/mvn /usr/bin/mvn \
    && mvn -version  # 验证 Maven 安装成功

WORKDIR /app

# 缓存依赖
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 打包
COPY src ./src
RUN mvn clean package -DskipTests

# 阶段2: 运行
FROM eclipse-temurin:25-jre

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE ${PORT:-8080}
ENTRYPOINT ["java", "-jar", "app.jar"]