FROM python:3
RUN mkdir -p /usr/src/app/visualizer

# Install required libraries
RUN pip3 install numpy
RUN pip3 install scipy
RUN pip3 install matplotlib

COPY ./requirements.txt /usr/src/app/visualizer
WORKDIR /usr/src/app/visualizer
RUN pip3 install -r requirements.txt

COPY . /usr/src/app
ENV FLASK_APP=visualizer
RUN ls
ENTRYPOINT [ "flask" ]
CMD ["run", "--host=0.0.0.0", "--port=5000"]