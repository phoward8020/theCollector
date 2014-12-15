#!/bin/zsh

node_modules/.bin/sequelize \
\
    model:create            \
    --force                 \
    --name                  \
        team                \
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
date_added:DATETIME,\
date_updated:DATETIME\
"