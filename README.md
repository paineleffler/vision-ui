# Vision-UI

This is the React JS Frontend of the Social Media Image analysis project. This makes requests to the [Vision-API](https://github.com/paineleffler/vision-api).


## Project Background : Social Media Image Analysis

The purpose of this project was to create a tool that could quickly analyze images of a public social media account. Since looking through hundreds of images is time consuming and subjective to opinions, each of the images from a social media account were processed with Google [Cloud's Vision API](https://cloud.google.com/vision/). From the responses, labels are accumulated, filtered, and tracked to build textual data that can represent a person's interests, activities, or hobbies. Individuals' online personas can also be compared to determine if people share common interests. This project idea can be used in many different applications: suggestion algorithms for friends or pages, dating app matching, job recruiting, and even social media marketing analysis.

## Usage
```
  yarn
  yarn start
```

## Screenshots

### Home
![Alt text](screenshots/home.png?raw=true "Home Component")

This is the Home Screen where you can pick which social media to retrieve images for. You can also navigate to the Compare and Analytics Components.

### Results

![Alt text](screenshots/results.png?raw=true "Results Component")

Here you can see the Vision API labels of a specific user and a specific platform. The bar chart is interactive and is implemented with a React variant of Chart JS.

### Compare

![Alt text](screenshots/compare.png?raw=true "Compare Component")

Here you can compare two different usernames. The username url parameters query MongoDB and show labels in common and their respective counts.

### Analytics

![Alt text](screenshots/analytics.png?raw=true "Analytics Component")

This is where you can see how many unique users, labels, and images that are stored in MongoDB.

## Note

Components are a little messy right now. Will clean up eventually.
