#!/bin/bash
cd /usr/local/mongodb/bin
./mongoexport -d test -c project -o project.dat
./mongoexport -d test -c work -o work.dat
./mongoexport -d test -c user -o user.dat
./mongoexport -d test -c duty -o duty.dat
./mongoexport -d test -c check -o check.dat
./mongoexport -d test -c sale -o sale.dat
./mongoexport -d test -c worktype -o worktype.dat
./mongoexport -d test -c updatecontent -o updatecontent.dat
# 提前创建好/usr/local/mongodb/backupdata
mv ./*dat /usr/local/mongodb/backupdata
