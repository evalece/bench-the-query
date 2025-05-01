## Influx DB 

## If dashboard does not load automatically?

0. Import Dashboard from current work directory with pre-configured settigs. 

1. Import dashboard via Grafana.com, search for 2587 for V6 specific metrics dashboard

2. Configure Datasource: (same setting as influx docker compose)
- lcoalhost:8086
- Database: k6db



-Serves as a post-benchmark dashboard for visualization of data and analysis
- V6 dashboard buggy


How to use and setup:
https://docs.influxdata.com/influxdb/v2/install/?t=Docker#install-and-setup-influxdb-in-a-container 

File structure:
https://docs.influxdata.com/influxdb/v2/reference/internals/file-system-layout/?t=Docker#file-system-layout 


- Why influx DB?

Concurrent log sorting from K6 log output


- Next step: 

Feeding to Grafana to create visualization dashboard.
