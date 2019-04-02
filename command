./ldapsearch -h localhost -p 1389 -D "cn=Directory Manager" -w rtafadmin123 -b "dc=openam,dc=rtaf,dc=mi,dc=th" objectclass=*

##################### Install Web Agent Silently ##################### 
./agentadmin --s "/etc/httpd/conf/httpd.conf" "http://openam.example.com:8080/openam" "http://app.example.com:80" "/" "myWebAgent" "/tmp/pwd.txt" --changeOwner

##################### ปรับ timezone ของ Centos ให้เป็นเวลา Thai ICT #####################
ntpdate clock.nectec.or.th
