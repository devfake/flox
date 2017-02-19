# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 2
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
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
  
  # install jsonpp
  config.vm.provision "jsonpp", 
    type: "shell", 
    inline: <<-SHELL
      wget https://github.com/jmhodges/jsonpp/releases/download/1.3.0/jsonpp-1.3.0-linux-x86_64.zip
      unzip jsonpp-1.3.0-linux-x86_64.zip
      (cd jsonpp-1.3.0 && cp jsonpp /usr/bin/)
      rm -rf jsonpp-1.3.0 jsonpp-1.3.0-linux-x86_64.zip
  SHELL

  # install direnv
  config.vm.provision "direnv",
    type: "shell", 
    inline: <<-SHELL
      wget https://bin.equinox.io/c/4Jbv9XAvTAU/direnv-stable-linux-amd64.tgz
      tar -xvzf direnv-stable-linux-amd64.tgz
      mv direnv /usr/bin
      rm direnv-stable-linux-amd64.tgz 
      echo 'eval "$(direnv hook zsh)"' >> /home/vagrant/.zshrc
      echo 'eval "$(direnv hook bash)"' >> /home/vagrant/.bashrc
  SHELL

  config.vm.network "forwarded_port", guest: 80, host: 3000
  config.vm.network "forwarded_port", guest: 3306, host: 3307, host_ip: "127.0.0.1"

  config.ssh.forward_agent = true
end
