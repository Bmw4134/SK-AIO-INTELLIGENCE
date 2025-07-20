# Dockerfile for Infinity Singularity Kernel
FROM python:3.11-slim

WORKDIR /app
COPY . .

RUN apt-get update && apt-get install -y bash git

RUN pip install -r requirements.txt || true

CMD ["bash", "terminal_setup.sh"]
