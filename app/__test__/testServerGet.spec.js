const express = require("express"); // import express
const serverRoutes = require("../server/routes"); //import testing file
const request = require("supertest"); 
const app = express(); //an instance of an express app, a 'fake' express app

app.use("/", serverRoutes); 

describe("Testing Get Endpoint", () => {
    it("GET /city/sydney - success", async () => {
      const { body } = await request(app).get("/city/sydney"); //uses the request function that calls on express app instance
      expect(body).toEqual(
        {
            total: 237,
            totalHits: 237,
            hits: [
              {
                id: 363244,
                pageURL: 'https://pixabay.com/photos/sydney-opera-house-building-363244/',
                type: 'photo',
                tags: 'sydney opera house, building, architecture',
                previewURL: 'https://cdn.pixabay.com/photo/2014/06/06/09/36/sydney-opera-house-363244_150.jpg',
                previewWidth: 150,
                previewHeight: 100,
                webformatURL: 'https://pixabay.com/get/gf77bcca90212d7da0aab3a0741d55c14d9f35735251e9fd3683dcf9bcff7420f630143263b59a3ad8e074468a02be204_640.jpg',
                webformatWidth: 640,
                webformatHeight: 427,
                largeImageURL: 'https://pixabay.com/get/g0a611a24576074bce60dfd6920973f024a786c05e2114b68acd3db914003b622b5c6426a9e3fd96011f2312217b5f333ba4e2862eef645b6d7ed2335433e93a8_1280.jpg',
                imageWidth: 2000,
                imageHeight: 1335,
                imageSize: 355006,
                views: 148745,
                downloads: 69938,
                favorites: 325,
                likes: 396,
                comments: 77,
                user_id: 154933,
                user: 'pattyjansen',
                userImageURL: 'https://cdn.pixabay.com/user/2014/02/10/05-57-27-667_250x250.jpg'
              },
              {
                id: 3381786,
                pageURL: 'https://pixabay.com/photos/sydney-opera-house-opera-house-3381786/',
                type: 'photo',
                tags: 'sydney opera house, opera house, building',
                previewURL: 'https://cdn.pixabay.com/photo/2018/05/07/22/08/sydney-opera-house-3381786_150.jpg',
                previewWidth: 150,
                previewHeight: 84,
                webformatURL: 'https://pixabay.com/get/g56fb976a4e78aa9a199e7375783718cd6202c19dad886202b6eda04ef0c65b9f866376740b14e5406d191e2dcc1c6baf2d522f8c7520d5f416dea2e82c01cda6_640.jpg',
                webformatWidth: 640,
                webformatHeight: 361,
                largeImageURL: 'https://pixabay.com/get/gde145d9ee2647e82b45eee31c40ec83b34c1c38948ea1e296461de8703fb1421a27274672e5c606a9a7e88aa102bfd2bc807ef50e207fa3bb09581119a2ba4ee_1280.jpg',
                imageWidth: 5768,
                imageHeight: 3255,
                imageSize: 2691318,
                views: 68806,
                downloads: 45465,
                favorites: 211,
                likes: 262,
                comments: 33,
                user_id: 8758721,
                user: 'RobertDychto',
                userImageURL: 'https://cdn.pixabay.com/user/2018/04/21/07-42-28-427_250x250.jpg'
              },
              {
                id: 4034244,
                pageURL: 'https://pixabay.com/photos/sydney-skyline-tower-sunset-4034244/',
                type: 'photo',
                tags: 'sydney, skyline, tower',
                previewURL: 'https://cdn.pixabay.com/photo/2019/03/04/14/35/sydney-4034244_150.jpg',
                previewWidth: 150,
                previewHeight: 89,
                webformatURL: 'https://pixabay.com/get/ge35555d940699910825fc2710e833886e16e189971d6fbd19aaa339624763b7ddc094d7c3c599812e2e915701d6c4a5a03f5b6f989e6e2c9fdbbbdf865852950_640.jpg',
                webformatWidth: 640,
                webformatHeight: 383,
                largeImageURL: 'https://pixabay.com/get/g0e821075f293feee4611e5c61bc2a1b41d33f95a8bd3d4439cd896bcd45a61589b162c3922e9ba3a1c58f5adc4b1610e9c8200fc952312f9d75e7d81e47b20f2_1280.jpg',
                imageWidth: 5361,
                imageHeight: 3210,
                imageSize: 1592885,
                views: 13497,
                downloads: 8795,
                favorites: 50,
                likes: 70,
                comments: 13,
                user_id: 2,
                user: 'Hans',
                userImageURL: 'https://cdn.pixabay.com/user/2019/01/29/15-01-52-802_250x250.jpg'
              }
            ]
          }
      );
    });
  });

