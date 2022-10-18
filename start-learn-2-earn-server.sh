
if [ "$1" = "" ] 
then
    echo "please provide either locally or productionmode as a parameter when calling this shell script"

else


if [ "$1" = "locally" ]
then

    echo "starting the learn 2 earn server locally"
    deno run --allow-read --allow-net --allow-write --allow-env --unstable backend/learn-2-earn-server.ts 8046

fi


if [ "$1" = "productionmode" ]
then
    echo "starting the learn 2 earn server in production mode"
    pm2 start backend/server.ts --interpreter="deno" --interpreter-args="run --allow-read --allow-write --allow-env --allow-net --unstable" -- 10443
fi 
fi 
