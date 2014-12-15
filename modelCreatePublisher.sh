#!/bin/zsh

node_modules/.bin/sequelize \
\
    model:create            \
    --force                 \
    --name                  \
        publisher           \
    --attributes            \
\
"\
api_id:INTEGER,\
api_detail_url:STRING,\
name:STRING,\
aliases:TEXT,\
deck:TEXT,\
description:TEXT,\
image_url_tiny:STRING,\
image_url_icon:STRING,\
image_url_thumb:STRING,\
image_url_small:STRING,\
image_url_medium:STRING,\
image_url_super:STRING,\
image_url_screen:STRING,\
location_address:STRING,\
location_city:STRING,\
location_state:STRING,\
location_zip:STRING,\
location_country:STRING,\
date_added:DATETIME,\
date_updated:DATETIME\
"