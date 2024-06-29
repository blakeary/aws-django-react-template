# For AWS deployment - from https://hub.docker.com/_/python
FROM --platform=linux/amd64 python:3.11-bookworm

# For local deployment - from https://hub.docker.com/_/python
# FROM python:3.11-bookworm

# Set the environment variable PYTHONUNBUFFERED to 1
ENV PYTHONUNBUFFERED=1

# Set the working directory to /django
WORKDIR /django

# Copy requirements.txt from the current directory to /django, run pip freeze > requirements.txt prior
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip3 install -r requirements.txt

# Copy the current directory contents into the container at /django
COPY . .

# Create a non-root user and group
RUN groupadd -r celery && useradd -r -g celery celery

# Set permissions for the working directory
RUN chown -R celery:celery /django

# Switch to the non-root user
USER celery

# For AWS deployment - Run app.py when the container launches
CMD gunicorn core.wsgi:application --bind 0.0.0.0:8000

# For local deployment - Run app.py when the container launches
# CMD python manage.py runserver 0.0.0.0:8000

# Expose port 8000 for reverse proxy in nginx
EXPOSE 8000
