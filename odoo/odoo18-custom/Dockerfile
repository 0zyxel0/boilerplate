# Use the official Odoo v18 image as the base image
FROM odoo:latest

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Switch to root user to install packages
USER root

# Install system dependencies, including fonts and pip
RUN apt-get update && apt-get install -y \
    fonts-dejavu-core \
    fonts-dejavu-mono \
    fonts-dejavu-extra \
    fonts-liberation \
    ttf-mscorefonts-installer \
    fontconfig \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install pandas using pip
RUN pip3 install pandas rlPyCairo reportlab --break-system-packages

# Expose the default Odoo port
EXPOSE 8069