#!/bin/zsh

node_modules/.bin/sequelize \
\
    model:create            \
    --force                 \
    --name                  \
        user                \
    --attributes            \
\
"\
name_first:STRING,\
name_last:STRING,\
name_alias:STRING,\
email:STRING,\
password:TEXT,\
location:STRING,\
bio:TEXT\
"