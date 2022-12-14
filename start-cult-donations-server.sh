
if [ "$1" = "" ] 
then
    echo "please provide either locally or productionmode as a parameter when calling this shell script"

else


if [ "$1" = "locally" ]
then

    echo "starting the donations server locally"
    deno run --allow-read --allow-net --allow-write --allow-env --unstable backend/cult-donations-server.ts 8046

fi


if [ "$1" = "productionmode" ]
then
    echo "starting the donations server in production mode"
    pm2 start backend/cult-donations-server.ts --interpreter="deno" --interpreter-args="run --allow-read --allow-write --allow-env --allow-net --unstable" -- 443
fi 
fi 
