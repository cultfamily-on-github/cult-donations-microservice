
if [ "$1" = "" ] 
then
    echo "please provide either locally or productionmode as a parameter when calling this shell script"

else


if [ "$1" = "locally" ]
then

    echo "starting the image upload server locally"
    ts-node backend/image-upload/src/server.ts 8047

fi


if [ "$1" = "productionmode" ]
then
    echo "starting the image upload server in production mode"
    pm2 start backend/image-upload/src/server.js 11443
fi 
fi 
