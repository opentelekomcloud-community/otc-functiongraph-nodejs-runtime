FROM openeuler/openeuler:24.03

ENV USER=code
ENV NVM_DIR=/home/${USER}/.nvm
ENV NODE_VERSION=20.15.1
ENV PATH=${NVM_DIR}/versions/node/v${NODE_VERSION}/bin:${PATH}

# Speed up dnf by configuring it to use the fastest mirror and to not install documentation, and to not check GPG signatures (since we are using a base image that is already trusted)
RUN echo "max_parallel_downloads=10" >> /etc/dnf/dnf.conf && \
    echo "fastestmirror=True" >> /etc/dnf/dnf.conf && \
    echo "metadata_expire=300" >> /etc/dnf/dnf.conf && \    
    echo "tsflags=nodocs" >> /etc/dnf/dnf.conf && \
    echo "gpgcheck=0" >> /etc/dnf/dnf.conf && \
    echo "localpkg_gpgcheck=0" >> /etc/dnf/dnf.conf && \
    echo "repo_gpgcheck=0" >> /etc/dnf/dnf.conf

# Install necessary packages
RUN dnf install -y curl zip unzip shadow-utils && \
    dnf clean all

RUN groupadd -g 1000 ${USER} && \
    useradd -m -u 1000 -g 1000 ${USER} -d /home/${USER} -s /bin/bash

USER 1000:1000

# Install Node.js using nvm
RUN curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash && \
    bash -lc "source ${NVM_DIR}/nvm.sh && nvm install ${NODE_VERSION} && nvm alias default ${NODE_VERSION}" && \
    node -v && \
    npm -v


WORKDIR /home/${USER}
