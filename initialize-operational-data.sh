if [ -e operational-data ]
then
    echo "ok"
else
    mkdir operational-data 
fi

if [ -e ./operational-data/assets.json ]
then
    echo "ok"
else
    echo [] > ./operational-data/assets.json
fi

if [ -e ./operational-data/invites.json ]
then
    echo "ok"
else
    echo {} > ./operational-data/invites.json
fi
