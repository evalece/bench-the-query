
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

## Reference 


## Referece (For later):
Kube: https://grafana.com/docs/k6/latest/get-started/running-k6/ 
Docker + K6: https://grafana.com/docs/k6/latest/get-started/running-k6/ 