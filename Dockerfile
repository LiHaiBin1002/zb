FROM centos:centos7.5.1804
LABEL maintainer="lihaibin@nantian.com.cn"
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8
RUN curl -so /etc/yum.repos.d/Centos-7.repo http://mirrors.aliyun.com/repo/Centos-7.repo
RUN yum install -y python27 python2-devel gcc pcre-devel zlib-devel make net-tools
WORKDIR /server/lcserver
COPY . .
RUN curl  https://bootstrap.pypa.io/pip/2.7/get-pip.py  --output get-pip.py
RUN python2 get-pip.py
RUN pip2 install -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com -r requirements.txt
RUN chmod +x run.sh && rm -rf ~/.cache/pip
EXPOSE 8002
CMD ["./run.sh"]
