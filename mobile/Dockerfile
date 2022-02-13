FROM cirrusci/flutter

COPY . /app
WORKDIR /app

RUN rm -f .packages
RUN flutter pub get
RUN flutter build apk

RUN mkdir /mobile/
RUN cp build/app/outputs/flutter-apk/app-release.apk /mobile/client.apk
