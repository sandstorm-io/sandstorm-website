#! /usr/bin/env awk -f

BEGIN { p = 1 }
/<i:pgf  id="adobe_illustrator_pgf">/ { p = 0 }
{ if (p) { print } }
/<\/i:pgf>/ { p = 1 }

