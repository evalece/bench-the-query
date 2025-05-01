
### Load Test

## Run
(remove script.js by scripts) ref: https://grafana.com/docs/k6/latest/get-started/running-k6/
`docker run --rm -i grafana/k6 run --vus 10 --duration 30s - <script.js`

This is the Request Container corresponding to ../scheme.jpg
# Purpose:

To simulate user(s) in real life. Control and usage parameters can be passed by docker image inputs. 
Otherwise, defualt.


## Tools:
grafana/k6
grafana/xk6 (binary built to k6)
https://hub.docker.com/r/grafana/xk6/ 

## Reference 


## Referece (For later):
Kube: https://grafana.com/docs/k6/latest/get-started/running-k6/ 
Docker + K6: https://grafana.com/docs/k6/latest/get-started/running-k6/ 



## Dashboard:
 https://hub.docker.com/r/grafana/xk6/ 
docker run --rm -it \
  -e GOOS=darwin \
  -u "$(id -u):$(id -g)" \
  -v "${PWD}:/xk6" \
  -v $GOPATH/pkg/mod:/go/pkg/mod
  grafana/xk6 build v0.43.1 \
  --with github.com/mostafa/xk6-kafka@v0.17.0 \
  --with github.com/grafana/xk6-output-influxdb@v0.3.0
