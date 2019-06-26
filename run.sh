#!/bin/bash
function pause(){
   read -p "$*"
}
echo -e '\e[33mRUNNING DEV - NO CLEAR USERDB!'
echo -e '\e[31mTo clear userdata, run the cleardb script!'
echo -e '\e[39m============================================================'
#pause 'Press [Enter] key to continue...'
npm run dev
