#!/bin/zsh

node_modules/.bin/sequelize \
\
    model:create            \
    --force                 \
    --name                  \
        characterspowers    \
    --attributes            \
\
"\
characterId:INTEGER,\
powerId:INTEGER\
"