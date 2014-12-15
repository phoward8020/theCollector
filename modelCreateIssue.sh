#!/bin/zsh

node_modules/.bin/sequelize \
\
    model:create            \
    --force                 \
    --name                  \
        issue               \
    --attributes            \
\
"\
api_id:INTEGER,\
api_id_volume:INTEGER,\
api_detail_url:STRING,\
issue_number:INTEGER,\
name:STRING,\
aliases:TEXT,\
date_cover:DATETIME,\
date_store:DATETIME,\
deck:TEXT,\
description:TEXT,\
image_url_tiny:STRING,\
image_url_icon:STRING,\
image_url_thumb:STRING,\
image_url_small:STRING,\
image_url_medium:STRING,\
image_url_super:STRING,\
image_url_screen:STRING,\
date_added:DATETIME,\
date_updated:DATETIME\
"