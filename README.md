# Introduction 

This is iris-key-uploader a frontend in Angular with it's rest API.

The aim of this project is to easily import key file to Iris from a web ui.

# Why this project

Unfortunatly the IRIS panel to change key doesn't give the opportunity to upload the license.

![Panel](https://raw.githubusercontent.com/grongierisc/iris-key-uploader/master/misc/panel.gif)

As you can see, you can only browse from the **server side**.

What if, you don't have a direct access to it ?

You would like to have a **simple web page to upload the new key** and activate it.

This is the purpose of this project.

## Demo

![Demo](https://raw.githubusercontent.com/grongierisc/iris-key-uploader/master/misc/UploadDemo.gif)

# UI

```
http://localhost:52773/keyuploader/index.html
```

# Build 
Run the server

```sh
docker-compose up -d
```

# Install with ZPM

```objectscript
zpm "install iris-key-uploader"
```




