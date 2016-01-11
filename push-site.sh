#! /usr/bin/env bash

set -eu
shopt -s extglob

if (git grep 'localhost:4000' | egrep -v "(README|push-site)"); then
  echo "ERROR: Your content has links to localhost:4000!" >&2
  exit 1
fi

if [ "x$(git status --porcelain)" != "x" ]; then
  echo -n "git repo has uncommited changes.  Continue anyway? (y/N) " >&2
  read -n 1 YESNO
  echo >&2
  if [ "x$YESNO" != xy ]; then
    exit 1
  fi
fi

case $(git rev-parse --abbrev-ref HEAD) in
  master )
    echo "On master branch.  Will push to sandstorm.io."
    HOST=sandstorm.io
    ;;

  * )
    echo "On devel branch.  Will push to next.sandstorm.io."
    HOST=next.sandstorm.io
    ;;
esac

echo "Regenerating site..."

rm -rf _pushsite _pushsite.tar.gz

jekyll build --safe -d _pushsite

echo -n "Push now? (y/N)"
read -n 1 YESNO
echo

if [ "x$YESNO" == "xy" ]; then
  echo "Pushing..."
  tar cJ --xform='s,_pushsite/,,' _pushsite/* | gce-ss ssh fe --command "cd /var/www/$HOST && tar xJ"
else
  echo "Push CANCELED"
fi
