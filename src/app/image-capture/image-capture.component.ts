import { environment } from './../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WebcamImage,WebcamInitError} from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css'],
})
export class ImageCaptureComponent implements OnInit {
  constructor(private router: ActivatedRoute, private route: Router) {}
  sub: string;
  Req: string;
  Id: string;
  ngOnInit(): void {
    this.sub = localStorage.getItem('assessment');
    this.Req = localStorage.getItem('req_id');
    this.Id = localStorage.getItem('cand_id');
  }
  public webcamImage1: WebcamImage = null;
  public webcamImage2: WebcamImage = null;
  public id: string;

  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(id_image: string): void {
    this.id = id_image;
    this.trigger.next();
  }
  handleImage1(webcamImage: WebcamImage): void {
    if (this.id == 'btn1') {
      this.webcamImage1 = webcamImage;
    }
    if (this.id == 'btn2') {
      this.webcamImage2 = webcamImage;
    }
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleInitError(error: WebcamInitError): void{
    if (error.mediaStreamError && error.mediaStreamError.name == "NotAllowedError") {
      alert("Camera Permission was not allowed!");
      this.route.navigate(['login']);
    }
  }
  clicked() {
    $('#move-in').css('display', 'block');
    $('#submit_button').css('display', 'none');
    var data = JSON.parse(
      localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data')
    );
    var ImageArrayObj_start, ImageArrayObj_Id;
    var ImageArrayContent = {
      ImageArray: [],
    };
    let Req = this.Req;
    let Id = this.Id;
    let route = this.route;
    let lat, long;
    if (this.sub == 'theory') {
      data.CandidateAssessmentData.TheoryAssessment.StartImage.FileName =
        'REG' +
        data.CandidateAssessmentData.RegistrationId +
        '_TheoryStart.png';
      data.CandidateAssessmentData.TheoryAssessment.StartImage.TimeStamp = moment().format(
        'DD-MMM-YYYY h:mm:ss a'
      );

      ImageArrayObj_start = {
        FileName:
          'REG' +
          data.CandidateAssessmentData.RegistrationId +
          '_TheoryStart.png',
        Image_Data: this.webcamImage1.imageAsDataUrl,
      };
      ImageArrayContent.ImageArray.push(ImageArrayObj_start);

      data.CandidateAssessmentData.TheoryAssessment.IdentityImage.FileName =
        'REG' + data.CandidateAssessmentData.RegistrationId + '_TheoryId.png';
      data.CandidateAssessmentData.TheoryAssessment.IdentityImage.TimeStamp = moment().format(
        'DD-MMM-YYYY h:mm:ss a'
      );

      ImageArrayObj_Id = {
        FileName:
          'REG' + data.CandidateAssessmentData.RegistrationId + '_TheoryId.png',
        Image_Data: this.webcamImage2.imageAsDataUrl,
      };
      //ImageArrayContent.ImageArray.push(ImageArrayObj_Id);
      this.Uploadfiles(ImageArrayObj_start);
      this.Uploadfiles(ImageArrayObj_Id);
      //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        data.CandidateAssessmentData.TheoryAssessment.StartImage.Latitude = lat as string;
        data.CandidateAssessmentData.TheoryAssessment.StartImage.Longitude = long as string;
        data.CandidateAssessmentData.TheoryAssessment.IdentityImage.Latitude = lat as string;
        data.CandidateAssessmentData.TheoryAssessment.IdentityImage.Longitude = long as string;
        localStorage.setItem('lat', lat as string);
        localStorage.setItem('long', long as string);
        data.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push({
          DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
          SubTypeId: 24,
          Description: "Candidate has captured Start Image",
          Latitude: lat,
          Longitude: long,
        });
        localStorage.setItem(
          Req + '_' + Id + '_' + 'data',
          JSON.stringify(data)
        );
        route.navigate(['theory-instructions']);
      });
    } else if (this.sub == 'practical') {
      data.CandidateAssessmentData.PracticalAssessment.StartImage.FileName =
        'REG' +
        data.CandidateAssessmentData.RegistrationId +
        '_PracticalStart.png';
      data.CandidateAssessmentData.PracticalAssessment.StartImage.TimeStamp = moment().format(
        'DD-MMM-YYYY h:mm:ss a'
      );

      ImageArrayObj_start = {
        FileName:
          'REG' +
          data.CandidateAssessmentData.RegistrationId +
          '_PracticalStart.png',
        Image_Data: this.webcamImage1.imageAsDataUrl,
      };
      ImageArrayContent.ImageArray.push(ImageArrayObj_start);

      data.CandidateAssessmentData.PracticalAssessment.IdentityImage.FileName =
        'REG' +
        data.CandidateAssessmentData.RegistrationId +
        '_PracticalId.png';
      data.CandidateAssessmentData.PracticalAssessment.IdentityImage.TimeStamp = moment().format(
        'DD-MMM-YYYY h:mm:ss a'
      );
      ImageArrayObj_Id = {
        FileName:
          'REG' +
          data.CandidateAssessmentData.RegistrationId +
          '_PracticalId.png',
        Image_Data: this.webcamImage2.imageAsDataUrl,
      };
      //ImageArrayContent.ImageArray.push(ImageArrayObj_Id);
      this.Uploadfiles(ImageArrayObj_start);
      this.Uploadfiles(ImageArrayObj_Id);
      //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));

      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        data.CandidateAssessmentData.PracticalAssessment.StartImage.Latitude = lat as string;
        data.CandidateAssessmentData.PracticalAssessment.StartImage.Longitude = long as string;
        data.CandidateAssessmentData.PracticalAssessment.IdentityImage.Latitude = lat as string;
        data.CandidateAssessmentData.PracticalAssessment.IdentityImage.Longitude = long as string;
        localStorage.setItem('lat', lat as string);
        localStorage.setItem('long', long as string);
        data.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push({
          DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
          SubTypeId: 24,
          Description: "Candidate has captured Start Image",
          Latitude: lat,
          Longitude: long,
        });
        localStorage.setItem(
          Req + '_' + Id + '_' + 'data',
          JSON.stringify(data)
        );
        route.navigate(['practical-instructions']);
      });
    } else if (this.sub == 'viva') {
      data.CandidateAssessmentData.VivaMcqAssessment.StartImage.FileName =
        'REG' + data.CandidateAssessmentData.RegistrationId + '_VivaMcqStart.png';
      data.CandidateAssessmentData.VivaMcqAssessment.StartImage.TimeStamp = moment().format(
        'DD-MMM-YYYY h:mm:ss a'
      );

      ImageArrayObj_start = {
        FileName:
          'REG' +
          data.CandidateAssessmentData.RegistrationId +
          '_VivaMcqStart.png',
        Image_Data: this.webcamImage1.imageAsDataUrl,
      };
      ImageArrayContent.ImageArray.push(ImageArrayObj_start);

      data.CandidateAssessmentData.VivaMcqAssessment.IdentityImage.FileName =
        'REG' + data.CandidateAssessmentData.RegistrationId + '_VivaMcqId.png';
      data.CandidateAssessmentData.VivaMcqAssessment.IdentityImage.TimeStamp = moment().format(
        'DD-MMM-YYYY h:mm:ss a'
      );
      ImageArrayObj_Id = {
        FileName:
          'REG' + data.CandidateAssessmentData.RegistrationId + '_VivaMcqId.png',
        Image_Data: this.webcamImage2.imageAsDataUrl,
      };
      //ImageArrayContent.ImageArray.push(ImageArrayObj_Id);
      this.Uploadfiles(ImageArrayObj_start);
      this.Uploadfiles(ImageArrayObj_Id);
      //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        data.CandidateAssessmentData.VivaMcqAssessment.StartImage.Latitude = lat as string;
        data.CandidateAssessmentData.VivaMcqAssessment.StartImage.Longitude = long as string;
        data.CandidateAssessmentData.VivaMcqAssessment.IdentityImage.Latitude = lat as string;
        data.CandidateAssessmentData.VivaMcqAssessment.IdentityImage.Longitude = long as string;
        localStorage.setItem('lat', lat as string);
        localStorage.setItem('long', long as string);
        data.CandidateAssessmentData.VivaMcqAssessment.AssessmentEvents.push({
          DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
          SubTypeId: 24,
          Description: "Candidate has captured Start Image",
          Latitude: lat,
          Longitude: long,
        });
        localStorage.setItem(
          Req + '_' + Id + '_' + 'data',
          JSON.stringify(data)
        );
        route.navigate(['viva-instructions']);
      });
    }
  }

  Uploadfiles(ImageArrayContent: any) {
    $('#frmImages').append(
      '<input name="image_data" value="' + ImageArrayContent.Image_Data + '">'
    );
    $('#frmImages').append(
      '<input name="image_file_name" value="' +
        ImageArrayContent.FileName +
        '">'
    );

    var varForm = <HTMLFormElement>document.getElementById('frmImages');

    $.ajax({
      url: environment.Upload_files_URL,
      type: 'POST',
      data: new FormData(varForm),
      contentType: false,
      cache: false,
      processData: false,
      success: function (response) {
        console.log(response);
      },
      error: function (e) {
        alert('Error');
      },
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document
      .getElementById('webcam')
      .parentNode.removeChild(document.getElementById('webcam'));
  }
}
