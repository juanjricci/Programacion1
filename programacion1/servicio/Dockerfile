FROM python:3.6
RUN apt update
RUN apt install -y mariadb-client
ENV PYTHONUNBUFFERED 1
RUN mkdir /servicio
WORKDIR /servicio
ADD mysite/requirements.txt /servicio/
RUN pip install --upgrade pip && pip install -r requirements.txt
ADD mysite/ /servicio/