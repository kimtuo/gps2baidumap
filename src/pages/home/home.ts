import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { baiduPoint } from '../../lib/gps2baidu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  latitude: any;
  longtitude: any;

  baiduPoint: any;

  marker: any;

  opts: any;

  constructor(public navCtrl: NavController, public plt: Platform, private geolocation: Geolocation, private bt: baiduPoint) {

    this.opts = {
      centerAndZoom: {
        lng: 121.506191,
        lat: 31.245554,
        zoom: 15
      }
    };
    this.marker = {
      point: {
        lat: 121.506191,
        lng: 31.245554
      }
    }


    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      this.updateLocation();
    })

  }

  updateLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log("in update location function")
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
      this.baiduPoint = this.bt.wgs2bd(resp.coords.latitude,resp.coords.longitude)

      console.log(this.baiduPoint)

      this.latitude = this.baiduPoint[0]
      this.longtitude = this.baiduPoint[1]

      console.log(this.latitude)
      console.log(this.longtitude)

      this.opts = {
        centerAndZoom: {
          lat: this.latitude,
          lng: this.longtitude,
          zoom: 18
        },
        enableKeyboard: true,
      };

      this.marker = {
        point: {
          lat: this.latitude,
          lng: this.longtitude
        }
      }

    })
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

  }
}
