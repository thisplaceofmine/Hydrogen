docker run -d --name mongodb \
  -p 27017:27017 \
  --restart always \
  mongo:latest --replSet rs0

echo "Waiting for MongoDB to start..."

sleep 5

docker exec --tty mongodb mongosh --eval "rs.initiate({
  _id: 'rs0',
  members: [
    { _id: 0, host: 'localhost:27017' }
  ]
})"

echo "MongoDB started"

docker exec --tty mongodb mongosh admin --eval "db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [
    { role: 'root', db: 'admin' }
  ]
})"

docker exec --tty mongodb mongosh --eval "rs.status()"