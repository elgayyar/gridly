# gridly

Instructions
1. go to your "fabric tools" and do "./startFabric.sh"
2. navigate to "backend" fold
3. do "composer network install -a gridly@0.0.4.bna -c PeerAdmin@hlfv1"
4. do "composer network start -c PeerAdmin@hlfv1 -n gridly -V 0.0.4 -A admin -S adminpw"
5. in the same folder (backend), do "bash -x startServer.sh"
6. navigate to "auth-backend" folder, do "npm install", "npm start"
7. navigate to "frontend" folder, do "npm install", "npm start"

hyperledger api: http://localhost:3000/api
auth-server api: http://localhost:3700
fronetend: http://localhost:4200
