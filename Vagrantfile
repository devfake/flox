# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 2
  end
 
  # Install nvm
  config.vm.provision "nvm",
    type: "shell",
    privileged: false,
    inline: <<-SHELL
      curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | sh
      echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.zshrc
      source /home/vagrant/.zshrc
      nvm install 7.1.0
  SHELL
  
  # Install lamp
  config.vm.provision :shell, path: "bootstrap.sh"

  config.vm.provision :shell, inline: "apt-get install -y unzip"

  # Install composer
  config.vm.provision :shell, inline: "curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 80, host: 3000
  config.vm.network "forwarded_port", guest: 3306, host: 3307, host_ip: "127.0.0.1"

  config.ssh.forward_agent = true

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"
end
