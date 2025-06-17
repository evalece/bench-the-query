# Step 1: Clone benchmark repo
```bash
git clone 
cd benchmark
```
# Step 2: Build the Docker image locally where needs local build 
```bash
docker build -t bench_image ./
```
# Step 3: Run with Docker Compose or Kubernetes 

```bash
docker-compose -f docker-compose.infra.yml up
docker-compose -f docker-compose.client.yml up
docker-compose -f docker-compose.load.yml up
```