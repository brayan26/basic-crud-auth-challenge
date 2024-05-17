## BASIC CRUD AUTH

1. How to run app - (Docker container):

run in your terminal:

```
docker-compose -f docker-compose.yml up -d
```

Once the docker command finishes executing, you can use the endpoints.

## HTTP Request's

CURL's for using endpoints.


## Login
```
curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "test@mail.com",
	"password": "0000123"
}'
```
## Create User
```
curl --request POST \
  --url http://localhost:3000/users \
  --header 'Content-Type: application/json' \
  --header 'authorization: xxxRESPONSE_TOKENxxx' \
  --data '{
	"name": "Joe Doe",
	"email": "jdoe@mail.com",
	"phone": "0987654321"
}'
```

## Get All
```
curl --request GET \
  --url http://localhost:3000/users \
  --header 'authorization: xxxRESPONSE_TOKENxxx'
```

### IMPORTANT:

> When you receive a token from the /login endpoint, you need to include it in an "authorization" header for the /users endpoints. Without this token, any attempts to access the API resources will result in unauthorized error messages.