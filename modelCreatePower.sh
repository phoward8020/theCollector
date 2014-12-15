#!/bin/zsh

node_modules/.bin/sequelize \
\
    model:create            \
    --force                 \
    --name                  \
        power               \
    --attributes            \
\
"\
api_id:INTEGER,\
api_detail_url:STRING,\
name:STRING,\
aliases:TEXT,\
description:TEXT,\
date_added:DATETIME,\
date_updated:DATETIME\
"