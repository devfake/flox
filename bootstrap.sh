#!/usr/bin/env bash

DOCUMENT_ROOT='/vagrant/public' # change if using a subdirectory in your project
SMTP_RELAY='1.2.3.4'

### Bookeeping ###
mkdir -p /root/.provisioning

### Apache + PHP ###
apt-add-repository ppa:ondrej/php -y
apt-get update -y
apt-get install -y apache2
apt-get install -y php7.0-cli php7.0-common libapache2-mod-php7.0 php7.0 php7.0-mysql php7.0-fpm php7.0-curl php7.0-gd php7.0-bz2 php7.0-mbstring php-xml

cat <<CONFIG > /etc/apache2/sites-enabled/000-default.conf
<VirtualHost *:80>
	ServerAdmin webmaster@localhost

	DocumentRoot ${DOCUMENT_ROOT}
	<Directory />
		Options FollowSymLinks
		AllowOverride All
		Require all granted
	</Directory>
	<Directory ${DOCUMENT_ROOT}>
		Options Indexes FollowSymLinks MultiViews
		AllowOverride all
		Order allow,deny
		allow from all
	</Directory>
</VirtualHost>
CONFIG

sudo ln -s /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/
sudo sed -i 's/^User.*/User vagrant/g' /etc/apache2/apache2.conf 
php7enmod mcrypt

service apache2 restart
update-rc.d apache2 defaults

### MYSQL ###
 DEBIAN_FRONTEND=noninteractive apt-get -y install mysql-server mysql-client
 mysqladmin -u root

sed -i "s/^bind-address.*/bind-address = 0.0.0.0/g" /etc/mysql/my.cnf
service mysql restart
update-rc.d mysql defaults

mysql -u root <<-MSQL
	GRANT ALL PRIVILEGES ON *.* TO root@'%';
	FLUSH PRIVILEGES;
MSQL

### SMTP RELAY ###
DEBIAN_FRONTEND=noninteractive apt-get -y install mailutils
sed -i "s/^relayhost.*/relayhost = ${SMTP_RELAY}/g" /etc/postfix/main.cf
service postfix restart
update-rc.d postfix defaults
