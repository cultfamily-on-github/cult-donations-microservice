if [ -e operational-data ]
then
    echo "ok"
else
    mkdir operational-data 
fi
echo [] > ./operational-data/asset-links.json
echo [] > ./operational-data/value-creator-keys.json