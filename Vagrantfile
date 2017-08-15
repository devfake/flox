# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "exane/ubuntu"

  # config.vm.provider "virtualbox" do |v|
  #   v.memory = 2048
  #   v.cpus = 4
  #   v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  # end

  # # Install nvm
  # config.vm.provision "nvm",
  #   type: "shell",
  #   privileged: false,
  #   inline: <<-SHELL
  #     curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | sh
  #     source /home/vagrant/.nvm/nvm.sh
  #     nvm install node
  # SHELL

  # # Install lamp
  # config.vm.provision :shell, path: "bin/bootstrap.sh"

  # config.vm.provision :shell, inline: "apt-get install -y unzip"

  # # Install composer
  # config.vm.provision :shell, inline: "curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer"

  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.network "forwarded_port", guest: 9229, host: 9229
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 3306, host: 3306, host_ip: "127.0.0.1"

  config.ssh.forward_agent = true
end
