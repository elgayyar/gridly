# gridly

Instructions
1. go to your "fabric tools" and do "./startFabric.sh"
2. navigate to "backend/dist" folder
3. do "composer network install -a gridly@0.0.10.bna -c PeerAdmin@hlfv1"
4. do "composer network start -c PeerAdmin@hlfv1 -n gridly -V 0.0.5 -A admin -S adminpw"
5. navigate back to "backend" folder, do "bash -x startServer.sh"
6. navigate to "auth_backend" folder, do "npm install", "npm start"
7. navigate to "frontend" folder, do "npm install", "npm start"

hyperledger api: http://localhost:3000/api

auth-server api: http://localhost:3700

fronetend: http://localhost:4200
