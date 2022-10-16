if [ -e operational-data ]
then
    echo "ok"
else
    mkdir operational-data 
fi

if [ -e ./operational-data/learn-2-earn-assets.json ]
then
    echo "ok"
else
    echo [] > ./operational-data/learn-2-earn-assets.json
fi

if [ -e ./operational-data/invites.json ]
then
    echo "ok"
else
    echo [] > ./operational-data/invites.json
fi
