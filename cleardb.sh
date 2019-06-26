#!/bin/bash
read -p "Running this script will clear the userdata db. Are you sure you want to continue? (y/N)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo 'CLEARING DB'
  echo '===================================================='
  rm src/main/userdata.db
  echo 'RUNNING DEV'
  echo '===================================================='
  npm run dev
fi
