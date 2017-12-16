# utility-monitor server
A tool meant to broadcast `json` packages sent over WebSocket from connected client applications emitting host utility information (repo: `utility-monitor-client`) to the WebSocket clients connected to the server i.e. frontend application. While bradcasting, the app also pushes the packages to the elasticsearch cluster as new documents for data persistency.

## Basic setup
* (optional) change elasticsearch cluster address `db_address` in the `web/ws.js` file
* perform `docker-compose up -d --build` in the main repo catalog
#### optional steps for automatic deploy over rancher using gitlab
* change `RANCHER_ACCESS_KEY`, `RANCHER_SECRET_KEY`, `RANCHER_PROJECT_URL` accordingly in the `.gitlab-ci.yml` file
* move the repository to gitlab.com, pushing will automatically trigger CI pipeline that will ultimately deploy using rancher.
 
## Default configuration
* public port is set up to `80`, you can change it in the `docker-compose.yml` file in the `nginx` section, as it serves as a reverse proxy.
* server tries to save each `message` it receives to the elastic cluster, though you can easily change the DB that is used by default by implementing your communication model.
